#!/usr/bin/env python3
"""
Generate data/wssi.js dari PostgreSQL database — Layer 07 Koordinat Pelabuhan (WSSI).
Jalankan setelah SSH tunnel aktif: ssh -L 5433:db-host:5432 ...
Usage: python scripts/generate-wssi.py
       python scripts/generate-wssi.py --from-json scripts/wssi-snapshot.json

Mode --from-json membaca snapshot hasil query (mis. via MCP postgres) tanpa
koneksi DB langsung. Format snapshot: {current_week, latest_inv_date, events,
timelines:{sku:[[n,t,sales,intake,bal,wc],...]}, inventory, series, hist:{sku:[[w,qty],...]}}
"""

import os
import re
import sys
import json
from datetime import datetime, date, timedelta
from pathlib import Path

try:
    import psycopg2
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:  # mode --from-json tidak butuh DB
    psycopg2 = None
DB_CONFIG = {
    "host": os.getenv("DB_HOST", "localhost"),
    "port": int(os.getenv("DB_PORT", "5433")),
    "user": os.getenv("DB_USER", "appuser"),
    "password": os.getenv("DB_PASSWORD", ""),
    "dbname": os.getenv("DB_NAME", "dwh"),
}

YEAR = 2026
HIST_WEEKS = 8
# Threshold weeks_cover (PRD §5.2)
TH_DARURAT = 4
TH_WASPADA = 12
TH_AMAN = 16
OUTPUT_PATH = Path(__file__).parent.parent / "data" / "wssi.js"

# ── Warna per series (selaras generate-weekly.py) ──
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

WEEK_RE = re.compile(r"^Y(\d{2})-W(\d{2})(?:-SW(\d))?$")


def get_connection():
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        print(f"  Connected to {DB_CONFIG['dbname']}@{DB_CONFIG['host']}:{DB_CONFIG['port']}")
        return conn
    except Exception as e:
        print(f"  ERROR: Cannot connect to database: {e}")
        print(f"  Make sure SSH tunnel is active and .env is configured.")
        sys.exit(1)


def query(conn, sql, params=None):
    with conn.cursor() as cur:
        cur.execute(sql, params or ())
        cols = [d[0] for d in cur.description]
        return [dict(zip(cols, row)) for row in cur.fetchall()]


def num(v):
    """numeric/Decimal/None → float|None"""
    return None if v is None else float(v)


def status_of(wc):
    if wc is None:
        return "na"
    if wc < TH_DARURAT:
        return "darurat"
    if wc < TH_WASPADA:
        return "waspada"
    if wc < TH_AMAN:
        return "aman"
    return "overstock"


def fetch_wssi(conn):
    """Timeline per SKU + daftar event sub-week global."""
    rows = query(conn, """
        SELECT week, record_type, product_sku,
               sales_volume, intake_volume, balance_mi, weeks_cover
        FROM ff_wssi_reforecasting
        ORDER BY product_sku, week
    """)
    timelines = {}   # sku -> [ {n,w,t,sales,intake,bal,wc} ]
    events = {}      # n -> set of SW labels
    current_week = None
    current_week_num = None

    for r in rows:
        m = WEEK_RE.match(r["week"])
        if not m:
            print(f"  WARNING: week format tidak dikenali: {r['week']}")
            continue
        n = int(m.group(2))
        sw = m.group(3)
        if sw:
            # Baris sub-week = penanda event murni (numerik NULL semua)
            events.setdefault(n, set()).add(f"SW{sw}")
            continue
        t = {"actual": "a", "current week": "c", "forecast": "f"}.get(r["record_type"])
        if t is None:
            print(f"  WARNING: record_type tidak dikenali: {r['record_type']}")
            continue
        if t == "c":
            current_week = r["week"]
            current_week_num = n
        timelines.setdefault(r["product_sku"], []).append({
            "n": n, "w": r["week"], "t": t,
            "sales": num(r["sales_volume"]),
            "intake": num(r["intake_volume"]),
            "bal": num(r["balance_mi"]),
            "wc": num(r["weeks_cover"]),
        })

    for tl in timelines.values():
        tl.sort(key=lambda x: x["n"])
    event_list = [
        {"n": n, "w": f"Y{YEAR % 100}-W{n:02d}", "subweeks": sorted(sws)}
        for n, sws in sorted(events.items())
    ]
    return timelines, event_list, current_week, current_week_num


def fetch_inventory(conn, skus):
    rows = query(conn, """
        SELECT product_sku, MAX(product_name) AS product_name,
               SUM(qty_on_hand) AS qty
        FROM mart_inventory
        WHERE date = (SELECT MAX(date) FROM mart_inventory)
          AND product_sku = ANY(%s)
        GROUP BY product_sku
    """, (list(skus),))
    latest = query(conn, "SELECT MAX(date) AS d FROM mart_inventory")[0]["d"]
    return {r["product_sku"]: {"nama": r["product_name"], "stok": int(r["qty"])} for r in rows}, latest


def fetch_series(conn, skus):
    rows = query(conn, """
        SELECT product_sku, series FROM dim_product_origin
        WHERE product_sku = ANY(%s)
    """, (list(skus),))
    return {r["product_sku"]: r["series"] for r in rows if r["series"]}


def hist_week_numbers():
    """Nomor minggu ISO untuk 8 minggu penuh terakhir (sebelum minggu berjalan)."""
    today = date.today()
    monday = today - timedelta(days=today.weekday())
    return [(monday - timedelta(weeks=k)).isocalendar()[1] for k in range(HIST_WEEKS, 0, -1)]


def fetch_sales_hist(conn, skus):
    """Histori penjualan per minggu ISO, 8 minggu penuh terakhir."""
    rows = query(conn, """
        SELECT product_sku,
               EXTRACT(WEEK FROM date_so_created::date)::int AS w,
               SUM(sku_qty_sold)::int AS qty
        FROM mart_sales_tra_so_created
        WHERE date_so_created::date >= date_trunc('week', CURRENT_DATE) - INTERVAL '56 days'
          AND date_so_created::date <  date_trunc('week', CURRENT_DATE)
          AND product_sku = ANY(%s)
        GROUP BY 1, 2
        ORDER BY 1, 2
    """, (list(skus),))
    week_nums = hist_week_numbers()
    per_sku = {}
    for r in rows:
        per_sku.setdefault(r["product_sku"], {})[r["w"]] = r["qty"]
    hist = {}
    for sku in skus:
        qmap = per_sku.get(sku, {})
        hist[sku] = [{"w": w, "qty": int(qmap.get(w, 0))} for w in week_nums]
    return hist, week_nums


def load_snapshot(path):
    """Muat data dari snapshot JSON (hasil query via MCP) — pengganti koneksi DB."""
    snap = json.load(open(path, encoding="utf-8"))
    timelines = {}
    current_week = snap["current_week"]
    current_week_num = int(WEEK_RE.match(current_week).group(2))
    for sku, rows in snap["timelines"].items():
        timelines[sku] = [
            {"n": n, "w": f"Y{YEAR % 100}-W{n:02d}", "t": t,
             "sales": num(s), "intake": num(i), "bal": num(b), "wc": num(wc)}
            for n, t, s, i, b, wc in rows
        ]
        timelines[sku].sort(key=lambda x: x["n"])
    week_nums = hist_week_numbers()
    hist = {}
    for sku in timelines:
        qmap = {w: q for w, q in snap["hist"].get(sku, [])}
        hist[sku] = [{"w": w, "qty": int(qmap.get(w, 0))} for w in week_nums]
    inv = {k: {"nama": v["nama"], "stok": int(v["stok"])} for k, v in snap["inventory"].items()}
    return {
        "timelines": timelines,
        "events": snap["events"],
        "current_week": current_week,
        "current_week_num": current_week_num,
        "inv": inv,
        "latest_inv_date": snap["latest_inv_date"],
        "series_map": snap["series"],
        "hist": hist,
        "week_nums": week_nums,
    }


def load_db():
    conn = get_connection()
    try:
        print("\n1. Fetching ff_wssi_reforecasting...")
        timelines, events, current_week, current_week_num = fetch_wssi(conn)
        skus = sorted(timelines.keys())
        print("\n2. Fetching stok terkini (mart_inventory)...")
        inv, latest_inv_date = fetch_inventory(conn, skus)
        print("\n3. Fetching series (dim_product_origin)...")
        series_map = fetch_series(conn, skus)
        print(f"\n4. Fetching histori penjualan {HIST_WEEKS} minggu (mart_sales_tra_so_created)...")
        hist, week_nums = fetch_sales_hist(conn, skus)
        return {
            "timelines": timelines, "events": events,
            "current_week": current_week, "current_week_num": current_week_num,
            "inv": inv, "latest_inv_date": latest_inv_date,
            "series_map": series_map, "hist": hist, "week_nums": week_nums,
        }
    finally:
        conn.close()


def derive_sku(sku, tl, inv, series_map, hist):
    info = inv.get(sku)
    stok = info["stok"] if info else None
    nama = info["nama"] if info else sku
    series = series_map.get(sku, "Lainnya")
    sales_hist = hist.get(sku, [])
    avg_weekly = round(sum(h["qty"] for h in sales_hist) / HIST_WEEKS, 1)

    cur = next((r for r in tl if r["t"] == "c"), None)
    wc = cur["wc"] if cur else None
    if wc is None:
        # Fallback bila weeks_cover tidak tersedia
        if stok is None or stok <= 0:
            wc = 0.0
        elif avg_weekly > 0:
            wc = round(stok / avg_weekly, 1)
        else:
            wc = 999.0
    status = status_of(wc)

    intakes = [{"n": r["n"], "qty": int(r["intake"])}
               for r in tl if (r["intake"] or 0) > 0 and r["t"] in ("c", "f")]

    # Prediksi habis: minggu pertama forecast dengan balance <= 0
    habis_week = None
    habis_date = None
    fc = [r for r in tl if r["t"] == "f"]
    start_bal = cur["bal"] if cur and cur["bal"] is not None else None
    if start_bal is not None and start_bal > 0:
        for r in fc:
            if r["bal"] is not None and r["bal"] <= 0:
                habis_week = r["w"]
                try:
                    habis_date = date.fromisocalendar(YEAR, r["n"], 1).isoformat()
                except ValueError:
                    habis_date = None
                break
    elif start_bal is not None and start_bal <= 0:
        habis_week = cur["w"] if cur else None
        habis_date = date.today().isoformat()
    if habis_week is None and stok and avg_weekly > 0:
        # fallback linear dari stok WMS
        days = int(stok / avg_weekly * 7)
        habis_date = (date.today() + timedelta(days=days)).isoformat()

    return {
        "sku": sku, "nama": nama, "series": series,
        "stok": stok, "avgWeekly": avg_weekly,
        "wc": wc, "status": status,
        "salesHist": sales_hist,
        "timeline": tl,
        "intakes": intakes,
        "habisWeek": habis_week, "habisDate": habis_date,
    }


def js_val(v):
    if v is None:
        return "null"
    if isinstance(v, float) and v == int(v):
        return str(int(v))
    return json.dumps(v, ensure_ascii=False)


def generate_js(meta, events, series, skus):
    L = []
    L.append("// " + "=" * 55)
    L.append("// DATA WSSI — Koordinat Pelabuhan (Layer 07)")
    L.append(f"// Auto-generated: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    L.append("// Source: ff_wssi_reforecasting + mart_inventory")
    L.append("//         + dim_product_origin + mart_sales_tra_so_created")
    L.append("// " + "=" * 55)
    L.append("")
    L.append("const WSSI = {")
    L.append("")
    L.append("  meta: " + json.dumps(meta, ensure_ascii=False, indent=4).replace("\n}", "\n  }") + ",")
    L.append("")
    L.append("  // -- Kalender event sub-week (SW) global --")
    L.append("  events: [")
    for e in events:
        L.append(f"    {json.dumps(e, ensure_ascii=False)},")
    L.append("  ],")
    L.append("")
    L.append("  // -- Series → warna + anggota SKU --")
    L.append("  series: {")
    for name, info in series.items():
        L.append(f"    {json.dumps(name, ensure_ascii=False)}: {json.dumps(info, ensure_ascii=False)},")
    L.append("  },")
    L.append("")
    L.append("  // -- Detail per SKU --")
    L.append("  skus: [")
    for s in skus:
        L.append("    {")
        L.append(f"      sku: {js_val(s['sku'])}, nama: {js_val(s['nama'])}, series: {js_val(s['series'])},")
        L.append(f"      stok: {js_val(s['stok'])}, avgWeekly: {js_val(s['avgWeekly'])}, wc: {js_val(s['wc'])}, status: {js_val(s['status'])},")
        L.append(f"      salesHist: {json.dumps(s['salesHist'])},")
        L.append("      timeline: [")
        for r in s["timeline"]:
            L.append(
                f"        {{ n:{r['n']}, w:{js_val(r['w'])}, t:{js_val(r['t'])}, "
                f"sales:{js_val(r['sales'])}, intake:{js_val(r['intake'])}, "
                f"bal:{js_val(r['bal'])}, wc:{js_val(r['wc'])} }},"
            )
        L.append("      ],")
        L.append(f"      intakes: {json.dumps(s['intakes'])},")
        L.append(f"      habisWeek: {js_val(s['habisWeek'])}, habisDate: {js_val(s['habisDate'])}")
        L.append("    },")
    L.append("  ]")
    L.append("};")
    L.append("")
    return "\n".join(L)


def main():
    print("=" * 50)
    print("Kapal Madeena — Generate wssi.js (Layer 07)")
    print("=" * 50)

    if "--from-json" in sys.argv:
        path = sys.argv[sys.argv.index("--from-json") + 1]
        print(f"\nLoading snapshot: {path}")
        data = load_snapshot(path)
    else:
        data = load_db()

    timelines = data["timelines"]
    events = data["events"]
    skus = sorted(timelines.keys())
    print(f"   {len(skus)} SKU, current week: {data['current_week']}, "
          f"events: {[e['n'] for e in events]}")
    print(f"   Minggu histori: {data['week_nums']}")

    missing_inv = [s for s in skus if s not in data["inv"]]
    if missing_inv:
        print(f"   WARNING: {len(missing_inv)} SKU tanpa stok di mart_inventory: {missing_inv}")
    missing_series = [s for s in skus if s not in data["series_map"]]
    if missing_series:
        print(f"   WARNING: {len(missing_series)} SKU tanpa series (→ 'Lainnya'): {missing_series}")

    print("\nDeriving per-SKU...")
    sku_rows = [derive_sku(s, timelines[s], data["inv"], data["series_map"], data["hist"])
                for s in skus]
    counts = {}
    for r in sku_rows:
        counts[r["status"]] = counts.get(r["status"], 0) + 1
    print(f"   Status: {counts}")

    # series map: nama -> {warna, skus}
    series_obj = {}
    for r in sku_rows:
        entry = series_obj.setdefault(r["series"], {
            "warna": SERIES_COLORS.get(r["series"], DEFAULT_COLOR), "skus": []})
        entry["skus"].append(r["sku"])

    BULAN_ID = {1: 'Januari', 2: 'Februari', 3: 'Maret', 4: 'April', 5: 'Mei', 6: 'Juni',
                7: 'Juli', 8: 'Agustus', 9: 'September', 10: 'Oktober', 11: 'November', 12: 'Desember'}
    d = data["latest_inv_date"]
    if isinstance(d, str):
        d = datetime.strptime(d[:10], "%Y-%m-%d").date()
    meta = {
        "tanggalUpdate": f"{d.day} {BULAN_ID[d.month]} {d.year}",
        "currentWeek": data["current_week"],
        "currentWeekNum": data["current_week_num"],
        "tahun": YEAR,
        "thresholds": {"darurat": TH_DARURAT, "waspada": TH_WASPADA, "aman": TH_AMAN},
        "histWeeks": data["week_nums"],
    }

    print(f"\nGenerating {OUTPUT_PATH}...")
    js = generate_js(meta, events, series_obj, sku_rows)
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(js, encoding="utf-8")
    print(f"   Written: {OUTPUT_PATH} ({len(js)} bytes)")
    print(f"   SKU: {len(sku_rows)} | Series: {len(series_obj)} | Events: {len(events)}")
    print(f"\n{'=' * 50}")
    print("DONE!")


if __name__ == "__main__":
    main()
