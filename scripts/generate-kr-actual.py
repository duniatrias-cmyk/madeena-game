#!/usr/bin/env python3
"""
Generate data/kr-actual.js dari PostgreSQL database.
Jalankan setelah SSH tunnel aktif: ssh -L 5433:db-host:5432 ...

Usage: python3 scripts/generate-kr-actual.py

Output: data/kr-actual.js
  - GMV net & jumlah order per channel per bulan (tahun berjalan)
  - Untuk bulan aktif: tambah gmvNetMingguLalu (s.d. 7 hari lalu)
    → dipakai oleh Layer 06 untuk deteksi alert "Mesin Macet"
"""

import os
import sys
from datetime import datetime, date, timedelta
from pathlib import Path

import psycopg2
from dotenv import load_dotenv

# ── Config ──
load_dotenv()
DB_CONFIG = {
    "host":     os.getenv("DB_HOST", "localhost"),
    "port":     int(os.getenv("DB_PORT", "5433")),
    "user":     os.getenv("DB_USER", "appuser"),
    "password": os.getenv("DB_PASSWORD", ""),
    "dbname":   os.getenv("DB_NAME", "dwh"),
}

YEAR        = 2026
OUTPUT_PATH = Path(__file__).parent.parent / "data" / "kr-actual.js"

# Channel mapping: ch_sub_name (postgres) → channel id (kr-config.js)
CHANNEL_MAP = {
    "Shopee":                          "shopee",
    "TikTok Shop":                     "tiktok",
    "Non Marketplace Madinaquran":     "qpreneur",
    "Lazada":                          "lazada",
}
CHANNEL_NAMES = list(CHANNEL_MAP.keys())


# ── DB helpers ──

def get_connection():
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        print(f"  Connected: {DB_CONFIG['dbname']}@{DB_CONFIG['host']}:{DB_CONFIG['port']}")
        return conn
    except Exception as e:
        print(f"  ERROR: Cannot connect — {e}")
        print(f"  Make sure SSH tunnel is active and .env is configured.")
        sys.exit(1)


def query(conn, sql, params=None):
    with conn.cursor() as cur:
        cur.execute(sql, params or ())
        cols = [d[0] for d in cur.description]
        return [dict(zip(cols, row)) for row in cur.fetchall()]


# ── Query 1: GMV per channel per bulan (full year) ──

def fetch_gmv_per_channel_month(conn):
    placeholders = ",".join(["%s"] * len(CHANNEL_NAMES))
    sql = f"""
        SELECT
            ch_sub_name                                AS channel,
            EXTRACT(MONTH FROM date_so_created)::int  AS bulan,
            EXTRACT(YEAR  FROM date_so_created)::int  AS tahun,
            SUM(sku_netrevenue_after_stdiscallowance)  AS gmv_net,
            COUNT(DISTINCT dd_so_id)                  AS jumlah_order
        FROM mart_sales_tra_so_created
        WHERE date_so_created >= %s
          AND ch_sub_name IN ({placeholders})
        GROUP BY 1, 2, 3
        ORDER BY 3, 2, 1
    """
    return query(conn, sql, (f"{YEAR}-01-01",) + tuple(CHANNEL_NAMES))


# ── Query 2: GMV per channel s.d. 7 hari lalu (untuk deteksi Mesin Macet) ──

def fetch_gmv_7_days_ago(conn, bulan_aktif):
    cutoff      = date.today() - timedelta(days=7)
    bulan_start = date(YEAR, bulan_aktif, 1)
    # Jangan query melewati awal bulan — ambil max(bulan_start, cutoff)
    if cutoff < bulan_start:
        return {}
    placeholders = ",".join(["%s"] * len(CHANNEL_NAMES))
    sql = f"""
        SELECT
            ch_sub_name                               AS channel,
            SUM(sku_netrevenue_after_stdiscallowance) AS gmv_net
        FROM mart_sales_tra_so_created
        WHERE date_so_created >= %s
          AND date_so_created <= %s
          AND ch_sub_name IN ({placeholders})
        GROUP BY 1
    """
    rows = query(conn, sql, (bulan_start, cutoff) + tuple(CHANNEL_NAMES))
    return {r["channel"]: int(r["gmv_net"] or 0) for r in rows}


# ── Format & write ──

def fmt_int(v):
    """Format integer with underscores for JS readability."""
    s = str(abs(int(v)))
    parts = []
    while s:
        parts.append(s[-3:])
        s = s[:-3]
    return ("" if v >= 0 else "-") + "_".join(reversed(parts))


def build_js(rows, gmv_7d, bulan_aktif):
    today = date.today()
    lines = [
        "// AUTO-GENERATED oleh scripts/generate-kr-actual.py",
        f"// Terakhir update: {today.strftime('%Y-%m-%d %H:%M')}",
        "// Jangan edit manual — jalankan ulang script untuk update.",
        "//",
        "// Struktur per baris:",
        "//   channel         → ch_sub_name dari postgres (sama dengan krConfig.channels[n].dbName)",
        "//   bulan / tahun   → periode",
        "//   gmvNet          → SUM(sku_netrevenue_after_stdiscallowance)",
        "//   jumlahOrder     → COUNT(DISTINCT dd_so_id)",
        "//   gmvNetMingguLalu → gmvNet s.d. 7 hari lalu (hanya bulan aktif; deteksi Mesin Macet)",
        "",
        "const krActual = {",
        f"  lastUpdated: '{today.isoformat()}',",
        f"  bulanAktif: {bulan_aktif},",
        f"  tahun: {YEAR},",
        "  data: [",
    ]

    prev_bulan = None
    for r in rows:
        channel_id = CHANNEL_MAP.get(r["channel"])
        if not channel_id:
            continue  # skip unmapped channels

        bulan = int(r["bulan"])
        if bulan != prev_bulan:
            from calendar import month_abbr
            BULAN_ID = ['','Januari','Februari','Maret','April','Mei','Juni',
                        'Juli','Agustus','September','Oktober','November','Desember']
            lines.append(f"    // ── {BULAN_ID[bulan]} ──")
            prev_bulan = bulan

        gmv   = int(r["gmv_net"]   or 0)
        order = int(r["jumlah_order"] or 0)
        entry = (
            f'    {{ channel: "{r["channel"]}"'
            f', bulan: {bulan}'
            f', tahun: {int(r["tahun"])}'
            f', gmvNet: {fmt_int(gmv)}'
            f', jumlahOrder: {fmt_int(order)}'
        )
        # Tambah gmvNetMingguLalu hanya untuk bulan aktif
        if bulan == bulan_aktif and r["tahun"] == YEAR:
            lalu = gmv_7d.get(r["channel"], 0)
            entry += f', gmvNetMingguLalu: {fmt_int(lalu)}'
        entry += ' },'
        lines.append(entry)

    lines += ["  ]", "};", ""]
    return "\n".join(lines)


# ── Main ──

def main():
    print("=" * 50)
    print("Kapal Madeena — Generate kr-actual.js")
    print("=" * 50)

    conn = get_connection()
    try:
        today       = date.today()
        bulan_aktif = today.month

        print(f"\n1. Fetching GMV per channel per bulan ({YEAR})...")
        rows = fetch_gmv_per_channel_month(conn)
        print(f"   {len(rows)} data points")

        print(f"\n2. Fetching GMV s.d. 7 hari lalu (cutoff: {today - timedelta(days=7)})...")
        gmv_7d = fetch_gmv_7_days_ago(conn, bulan_aktif)
        for ch, v in gmv_7d.items():
            print(f"   {ch:40s}: Rp {v/1e6:7.1f}jt")

        print(f"\n3. Generating {OUTPUT_PATH}...")
        js = build_js(rows, gmv_7d, bulan_aktif)
        OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
        OUTPUT_PATH.write_text(js, encoding="utf-8")
        print(f"   Written: {OUTPUT_PATH} ({len(js):,} bytes)")

        # Summary untuk bulan aktif
        print(f"\n   Ringkasan bulan aktif (bulan {bulan_aktif}):")
        for r in rows:
            if int(r["bulan"]) == bulan_aktif:
                lalu = gmv_7d.get(r["channel"], 0)
                gmv  = int(r["gmv_net"] or 0)
                print(f"   {r['channel']:40s}: Rp {gmv/1e6:7.1f}jt "
                      f"(7d lalu: Rp {lalu/1e6:6.1f}jt, "
                      f"delta: Rp {(gmv-lalu)/1e6:6.1f}jt)")

        print(f"\n{'='*50}")
        print("DONE!")
    finally:
        conn.close()


if __name__ == "__main__":
    main()
