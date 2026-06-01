#!/usr/bin/env python3
"""
Generate data/weekly.js dari PostgreSQL database.
Jalankan setelah SSH tunnel aktif: ssh -L 5432:db-host:5432 ...
Usage: python scripts/generate-weekly.py
"""

import os
import sys
import json
from datetime import datetime, date
from pathlib import Path

import psycopg2
from dotenv import load_dotenv

# ── Config ──
load_dotenv()
DB_CONFIG = {
    "host": os.getenv("DB_HOST", "localhost"),
    "port": int(os.getenv("DB_PORT", "5432")),
    "user": os.getenv("DB_USER", "appuser"),
    "password": os.getenv("DB_PASSWORD", ""),
    "dbname": os.getenv("DB_NAME", "dwh"),
}

YEAR = 2026
OKR_TARGET = 40_000_000_000
EXCLUDE_SERIES = ["Zhafira Signature"]  # exact match only
TOP_N_SERIES = 12
OUTPUT_PATH = Path(__file__).parent.parent / "data" / "weekly.js"

# ── Warna per series (bisa di-extend) ──
SERIES_COLORS = {
    "Reeyana Jaket": "#e882b0",
    "Reeyana HC": "#d46a9e",
    "Reeyana BDDA": "#c85a8f",
    "Reeyana": "#b04880",
    "Reeyana Prayer Mat": "#a83e75",
    "Reeyana DPP": "#9a3368",
    "Reeyana DPP Non Audible (NA)": "#8c285c",
    "Reeyana Tasbih": "#7e1d50",
    "Heekaya HC": "#a78bfa",
    "Heekaya Jaket": "#9570e8",
    "Heekaya DPP": "#8355d6",
    "Heekaya per Juz": "#7140c4",
    "Heekaya Juz Amma": "#6030b0",
    "Heekaya DPP Non Audible (NA)": "#5025a0",
    "Airees DPP": "#7ab8d8",
    "Zhafira Signature Tasbih New": "#5ecbb0",
    "Abbasy": "#6366f1",
    "Raheela Prayer Set": "#f5a623",
    "Al Mutqin Florish": "#5b9cf6",
    "Najma": "#f05a5a",
}
DEFAULT_COLOR = "#9b9890"


def get_connection():
    """Connect to PostgreSQL."""
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        print(f"  Connected to {DB_CONFIG['dbname']}@{DB_CONFIG['host']}:{DB_CONFIG['port']}")
        return conn
    except Exception as e:
        print(f"  ERROR: Cannot connect to database: {e}")
        print(f"  Make sure SSH tunnel is active and .env is configured.")
        sys.exit(1)


def query(conn, sql, params=None):
    """Execute query and return list of dicts."""
    with conn.cursor() as cur:
        cur.execute(sql, params or ())
        cols = [d[0] for d in cur.description]
        return [dict(zip(cols, row)) for row in cur.fetchall()]


def fetch_mingguan_total(conn):
    """GMV total per minggu."""
    exclude_clause = " AND ".join(
        [f"series != %s" for _ in EXCLUDE_SERIES]
    )
    rows = query(conn, f"""
        SELECT
            EXTRACT(WEEK FROM date::date)::int AS w,
            ROUND(SUM(bruto)::numeric, 0) AS gmv
        FROM mv_daily_sales_performance
        WHERE date::date >= '{YEAR}-01-01'
          AND date::date < '{YEAR+1}-01-01'
          AND (series IS NULL OR ({exclude_clause}))
        GROUP BY 1 ORDER BY 1
    """, tuple(EXCLUDE_SERIES))
    return [{"w": r["w"], "gmv": int(r["gmv"])} for r in rows]


def fetch_top_series(conn):
    """Top N series by YTD GMV."""
    exclude_clause = " AND ".join(
        [f"series != %s" for _ in EXCLUDE_SERIES]
    )
    rows = query(conn, f"""
        SELECT series, ROUND(SUM(bruto)::numeric, 0) AS ytd
        FROM mv_daily_sales_performance
        WHERE date::date >= '{YEAR}-01-01'
          AND date::date < '{YEAR+1}-01-01'
          AND series IS NOT NULL AND ({exclude_clause})
        GROUP BY series
        ORDER BY ytd DESC
        LIMIT %s
    """, tuple(EXCLUDE_SERIES) + (TOP_N_SERIES,))
    return [r["series"] for r in rows]


def fetch_seri_minggu(conn, top_series):
    """GMV per series per minggu."""
    if not top_series:
        return []
    placeholders_series = ",".join(["%s"] * len(top_series))
    exclude_clause = " AND ".join(
        [f"m.series != %s" for _ in EXCLUDE_SERIES]
    )
    rows = query(conn, f"""
        SELECT
            m.series AS s,
            EXTRACT(WEEK FROM m.date::date)::int AS w,
            ROUND(SUM(m.bruto)::numeric, 0) AS gmv
        FROM mv_daily_sales_performance m
        WHERE m.date::date >= '{YEAR}-01-01'
          AND m.date::date < '{YEAR+1}-01-01'
          AND m.series IN ({placeholders_series})
          AND ({exclude_clause})
        GROUP BY m.series, EXTRACT(WEEK FROM m.date::date)
        ORDER BY m.series, w
    """, tuple(top_series) + tuple(EXCLUDE_SERIES))
    return [{"s": r["s"], "w": r["w"], "gmv": int(r["gmv"])} for r in rows]


def fetch_seri_stok(conn, top_series):
    """Stok dan demand per minggu untuk top series."""
    if not top_series:
        return {}

    # Latest inventory date
    latest = query(conn, "SELECT MAX(date) AS d FROM mart_inventory")
    if not latest or not latest[0]["d"]:
        print("  WARNING: No inventory data found")
        return {}
    latest_date = latest[0]["d"]

    placeholders = ",".join(["%s"] * len(top_series))

    # Stok
    stok_rows = query(conn, f"""
        SELECT
            p.series,
            SUM(i.qty_on_hand) AS stok
        FROM mart_inventory i
        JOIN dim_product_origin p ON i.product_sku = p.product_sku
        WHERE i.date = %s
          AND p.series IN ({placeholders})
        GROUP BY p.series
    """, (latest_date,) + tuple(top_series))
    stok_map = {r["series"]: int(r["stok"]) for r in stok_rows}

    # Demand (rata-rata 4 minggu terakhir dari mv_daily_sales_performance)
    demand_rows = query(conn, f"""
        SELECT
            series,
            ROUND(SUM(qty)::numeric / 4, 0) AS demand_per_minggu
        FROM mv_daily_sales_performance
        WHERE date::date >= (CURRENT_DATE - INTERVAL '28 days')
          AND date::date < CURRENT_DATE
          AND series IN ({placeholders})
        GROUP BY series
    """, tuple(top_series))
    demand_map = {r["series"]: int(r["demand_per_minggu"]) for r in demand_rows}

    result = {}
    for s in top_series:
        stok = stok_map.get(s, 0)
        demand = demand_map.get(s, 0)
        color = SERIES_COLORS.get(s, DEFAULT_COLOR)
        result[s] = {
            "stok": stok,
            "demandPerMinggu": demand,
            "warna": color,
        }
    return result


def format_number(n):
    """Format number with underscore separators for JS readability."""
    s = str(n)
    if len(s) <= 3:
        return s
    # Add underscores every 3 digits from right
    parts = []
    while s:
        parts.append(s[-3:])
        s = s[:-3]
    return "_".join(reversed(parts))


def generate_js(mingguan, seri_minggu, seri_stok, minggu_terakhir, tanggal_update):
    """Generate the JavaScript file content."""

    lines = []
    lines.append("// " + "=" * 55)
    lines.append("// DATA KAPAL MADEENA — single source of truth")
    lines.append("// Dipakai oleh semua layer game")
    lines.append(f"// Auto-generated: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    lines.append(f"// Source: mv_daily_sales_performance + mart_inventory")
    lines.append("// " + "=" * 55)
    lines.append("")
    lines.append("const DATA = {")
    lines.append("")

    # ── meta ──
    lines.append("  meta: {")
    lines.append("    kapal: 'Kapal Madeena',")
    lines.append("    pelabuhan: 'Pelabuhan 40 Milyar',")
    lines.append(f"    okr: {format_number(OKR_TARGET)},")
    lines.append(f"    tahun: {YEAR},")
    lines.append(f"    mingguTerakhir: {minggu_terakhir},")
    lines.append(f"    tanggalUpdate: '{tanggal_update}'")
    lines.append("  },")
    lines.append("")

    # ── mingguanTotal ──
    lines.append("  // -- GMV total per minggu (semua channel + series) --")
    lines.append("  mingguanTotal: [")
    for d in mingguan:
        w = d["w"]
        gmv = format_number(d["gmv"])
        pad = " " if w < 10 else ""
        lines.append(f"    {{ w:{pad}{w}, gmv: {gmv} }},")
    lines.append("  ],")
    lines.append("")

    # ── anginBuritan (hardcoded) ──
    lines.append("  // -- Angin buritan (event boosts) --")
    lines.append("  anginBuritan: [")
    lines.append("    { nama: 'Ramadan & Lebaran', minggu: [6,7,8,9,10,14], warna: '#f5a623', ikon: '\u{1F319}', multiplier: '3-4x', selesai: true },")
    lines.append("    { nama: '6.6 Sale',          minggu: [23],             warna: '#5b9cf6', ikon: '⚡', multiplier: '2-3x', selesai: false },")
    lines.append("    { nama: 'Idul Adha',         minggu: [24],             warna: '#3ecf7a', ikon: '\u{1F33F}', multiplier: '2-3x', selesai: false },")
    lines.append("    { nama: '7.7 Sale',          minggu: [27],             warna: '#a78bfa', ikon: '⚡', multiplier: '2-3x', selesai: false }")
    lines.append("  ],")
    lines.append("")

    # ── seriMinggu ──
    lines.append("  // -- GMV per series per minggu --")
    lines.append("  seriMinggu: [")
    # Group by week for compact formatting
    current_week = None
    for d in seri_minggu:
        if d["w"] != current_week:
            if current_week is not None:
                lines.append("")
            current_week = d["w"]
        s_escaped = d["s"].replace("'", "\\'")
        lines.append(f"    {{s:'{s_escaped}',w:{d['w']},gmv:{format_number(d['gmv'])}}},")
    lines.append("  ],")
    lines.append("")

    # ── seriStok ──
    lines.append("  // -- Stok & demand series --")
    lines.append("  seriStok: {")
    for series_name, data in seri_stok.items():
        s_escaped = series_name.replace("'", "\\'")
        pad = " " * max(0, 24 - len(s_escaped))
        lines.append(
            f"    '{s_escaped}':{pad} {{ stok: {format_number(data['stok'])}, "
            f"demandPerMinggu: {format_number(data['demandPerMinggu'])}, "
            f"warna: '{data['warna']}' }},"
        )
    lines.append("  },")
    lines.append("")

    # ── misiAwak (hardcoded) ──
    lines.append("  // -- Misi awak (quests / initiatives) --")
    lines.append("  misiAwak: [")
    lines.append("    {")
    lines.append("      id: 'MISI-01',")
    lines.append("      jalur: 'TikTok Shop',")
    lines.append("      judul: 'Mesin TikTok \\u2014 pacu kecepatan utama',")
    lines.append("      deskripsi: 'Scale livestream dan konten TikTok Shop sebagai engine pertumbuhan. Jalur ini paling potensial mendorong kecepatan kapal.',")
    lines.append("      status: 'Belum Dimulai',")
    lines.append("      progres: 0,")
    lines.append("      dampakKnot: 437,")
    lines.append("      warna: '#e8e6de',")
    lines.append("      anakBuah: [")
    lines.append("        { nama: 'Hisyam',  inisial: 'Hi', peran: 'Livestreamer Lead', kapten: true },")
    lines.append("        { nama: 'Manggar', inisial: 'Ma', peran: 'Content Creator', kapten: false },")
    lines.append("        { nama: 'Sarah',   inisial: 'Sa', peran: 'Inhouse Livestreamer', kapten: false },")
    lines.append("        { nama: 'Kania',   inisial: 'Ka', peran: 'Livestreamer', kapten: false, perhatian: true }")
    lines.append("      ]")
    lines.append("    },")
    lines.append("    {")
    lines.append("      id: 'MISI-02',")
    lines.append("      jalur: 'Direct / madeena.co.id',")
    lines.append("      judul: 'Jalur langsung \\u2014 zero fee, margin penuh',")
    lines.append("      deskripsi: 'Kembangkan penjualan direct melalui madeena.co.id. Tidak ada biaya platform \\u2014 setiap rupiah masuk lebih efisien.',")
    lines.append("      status: 'Belum Dimulai',")
    lines.append("      progres: 0,")
    lines.append("      dampakKnot: 146,")
    lines.append("      warna: '#3ecf7a',")
    lines.append("      anakBuah: [")
    lines.append("        { nama: 'Salsa',   inisial: 'Sl', peran: 'Sales non-Marketplace', kapten: true, perhatian: true },")
    lines.append("        { nama: 'Talitha', inisial: 'Ta', peran: 'Customer Support', kapten: false }")
    lines.append("      ]")
    lines.append("    },")
    lines.append("    {")
    lines.append("      id: 'MISI-03',")
    lines.append("      jalur: 'All Channels',")
    lines.append("      judul: 'Event Calendar \\u2014 tangkap angin 6.6, Idul Adha, 7.7',")
    lines.append("      deskripsi: 'Siapkan kampanye untuk tiga angin buritan berikutnya. Ini misi paling menentukan kecepatan kapal di semester kedua.',")
    lines.append("      status: 'Sedang Berlangsung',")
    lines.append("      progres: 25,")
    lines.append("      dampakKnot: 583,")
    lines.append("      warna: '#f5a623',")
    lines.append("      anakBuah: [")
    lines.append("        { nama: 'Fathiya', inisial: 'Fa', peran: 'Content Lead', kapten: true },")
    lines.append("        { nama: 'Dina',    inisial: 'Di', peran: 'Sales Marketplace', kapten: false },")
    lines.append("        { nama: 'Hisyam',  inisial: 'Hi', peran: 'Livestreamer Lead', kapten: false },")
    lines.append("        { nama: 'Ridwan',  inisial: 'Ri', peran: 'Data & Inventori', kapten: false, perhatian: true }")
    lines.append("      ]")
    lines.append("    }")
    lines.append("  ]")
    lines.append("};")
    lines.append("")

    # ── Computed helpers ──
    lines.append("// Computed helpers — dipakai semua layer")
    lines.append("DATA.computed = (() => {")
    lines.append("  const total = DATA.mingguanTotal;")
    lines.append("  const ytd = total.reduce((s, d) => s + d.gmv, 0);")
    lines.append("  const gap = DATA.meta.okr - ytd;")
    lines.append("  const pctTempuh = ytd / DATA.meta.okr;")
    lines.append("  const runRate4W = total.slice(-5, -1).reduce((s, d) => s + d.gmv, 0) / 4;")
    lines.append("  const paceOkr = DATA.meta.okr / 52;")
    lines.append("  const fuelPct = runRate4W / paceOkr;")
    lines.append("  const mingguSisa = 52 - DATA.meta.mingguTerakhir;")
    lines.append("  const proyeksiAkhir = ytd + runRate4W * mingguSisa;")
    lines.append("  return { ytd, gap, pctTempuh, runRate4W, paceOkr, fuelPct, mingguSisa, proyeksiAkhir };")
    lines.append("})();")
    lines.append("")

    return "\n".join(lines)


def main():
    print("=" * 50)
    print("Kapal Madeena — Generate weekly.js")
    print("=" * 50)

    conn = get_connection()

    try:
        # 1. GMV total per minggu
        print("\n1. Fetching GMV mingguan total...")
        mingguan = fetch_mingguan_total(conn)
        minggu_terakhir = max(d["w"] for d in mingguan) if mingguan else 0
        total_ytd = sum(d["gmv"] for d in mingguan)
        print(f"   {len(mingguan)} minggu, W1-W{minggu_terakhir}, YTD: Rp {total_ytd/1e9:.2f}B")

        # 2. Top series
        print("\n2. Fetching top series...")
        top_series = fetch_top_series(conn)
        for i, s in enumerate(top_series, 1):
            print(f"   #{i}: {s}")

        # 3. GMV per series per minggu
        print("\n3. Fetching GMV per series per minggu...")
        seri_minggu = fetch_seri_minggu(conn, top_series)
        print(f"   {len(seri_minggu)} data points")

        # 4. Stok
        print("\n4. Fetching stok & demand per series...")
        seri_stok = fetch_seri_stok(conn, top_series)
        for s, data in seri_stok.items():
            cover = data["stok"] / data["demandPerMinggu"] if data["demandPerMinggu"] > 0 else float("inf")
            status = "KRITIS" if cover < 4 else "MENIPIS" if cover < 8 else "OK"
            print(f"   {s}: stok={data['stok']}, demand={data['demandPerMinggu']}/mgg, cover={cover:.1f}w [{status}]")

        # 5. Generate JS
        print(f"\n5. Generating {OUTPUT_PATH}...")

        # Tanggal update = data terakhir di DB
        latest = query(conn, "SELECT MAX(date::date) AS d FROM mv_daily_sales_performance")
        latest_date = latest[0]["d"] if latest and latest[0]["d"] else date.today()

        # Format tanggal Indonesia
        BULAN_ID = {1:'Januari',2:'Februari',3:'Maret',4:'April',5:'Mei',6:'Juni',
                    7:'Juli',8:'Agustus',9:'September',10:'Oktober',11:'November',12:'Desember'}
        if isinstance(latest_date, str):
            latest_date = datetime.strptime(latest_date, "%Y-%m-%d").date()
        tanggal_update = f"{latest_date.day} {BULAN_ID[latest_date.month]} {latest_date.year}"

        js_content = generate_js(mingguan, seri_minggu, seri_stok, minggu_terakhir, tanggal_update)

        OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
        OUTPUT_PATH.write_text(js_content, encoding="utf-8")

        print(f"   Written: {OUTPUT_PATH} ({len(js_content)} bytes)")
        print(f"   Minggu terakhir: W{minggu_terakhir}")
        print(f"   Tanggal update: {tanggal_update}")
        print(f"   Series: {len(top_series)}")
        print(f"\n{'='*50}")
        print("DONE!")

    finally:
        conn.close()


if __name__ == "__main__":
    main()
