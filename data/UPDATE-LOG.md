# Update Log — 12 Jun 2026

## weekly.js — PROMPT-UPDATE-DATA (stok refresh)

**Sumber data:** mart_inventory per 12 Jun 2026 (MAX date = 2026-06-12)

GMV tidak berubah (mart_sales_tra_so_rts W24 belum settle untuk tanggal 12 Jun).
Update hanya pada stok dan tanggalUpdate.

| Series | Stok Lama | Stok Baru | Cover Baru |
|---|---|---|---|
| Reeyana Jaket | 3.338 | **3.229** | **3,6 mgg** 🔴 |
| Reeyana HC | 4.564 | **4.523** | 5,0 mgg |
| Reeyana BDDA | 5.473 | **5.472** | 27,0 mgg |
| Heekaya HC | 209 | **208** | **3,2 mgg** 🔴 |
| Heekaya Jaket | 625 | **611** | 7,8 mgg |
| Reeyana | 220 | **210** | **2,1 mgg** 🔴 |
| Airees DPP | 23.755 | **23.746** | 60,4 mgg |
| Heekaya DPP | 30.251 | **30.175** | 63,9 mgg |
| Reeyana Prayer Mat | 634 | **633** | 22,6 mgg |
| Zhafira Signature Tasbih New | 2.904 | **2.891** | 9,8 mgg |
| Abbasy | 628 | **625** | 8,8 mgg |
| Alamee HC | 2.077 | **2.060** | 66,5 mgg |
| Lumee | 665 | **750** | 50,0 mgg (+restok) |
| Heekaya per Juz | 4.576 | 4.576 | ∞ |

**KRITIS — cover < 4 minggu:**
- **Reeyana**: 210 ÷ 102 = **2,1 minggu** 🔴
- **Heekaya HC**: 208 ÷ 66 = **3,2 minggu** 🔴
- **Reeyana Jaket**: 3.229 ÷ 888 = **3,6 minggu** 🔴

---

# Update Log — 11 Jun 2026

## weekly.js — PROMPT-UPDATE-DATA (W24 fresh run)

**Sumber data:** mart_sales_tra_so_rts + dim_product_origin + mart_inventory via PostgreSQL

| Metrik | Sebelumnya | Sekarang |
|---|---|---|
| mingguTerakhir | W23 | W24 |
| tanggalUpdate | 2 Jun 2026 | 11 Jun 2026 |
| YTD total (mingguanTotal) | ~8.4 M | **Rp 10.604.633.070** |
| W23 GMV total (koreksi!) | 133.662.308 | **432.617.031** |
| W24 GMV total (baru) | — | 141.763.620 (parsial, ~3 hari) |

### Koreksi W23 — signifikan
W23 sebelumnya dihitung pada awal June ketika mart belum fully settled. Setelah data lengkap:

| Series | W23 Lama | W23 Baru | Δ |
|---|---|---|---|
| Reeyana Jaket | 51.048.761 | 157.398.262 | +208% |
| Reeyana HC | 34.186.218 | 106.053.137 | +210% |
| Reeyana BDDA | 6.497.000 | 21.093.000 | +225% |
| Reeyana | 6.126.000 | 17.255.000 | +182% |
| Heekaya DPP | 5.821.228 | 16.578.014 | +185% |
| Heekaya Jaket | 4.675.000 | 18.876.000 | +304% |
| Airees DPP | 3.268.000 | 11.332.043 | +247% |
| Heekaya HC | 2.816.000 | 13.451.000 | +378% |
| Abbasy | 2.495.000 | 6.447.000 | +158% |
| Lumee (baru) | 225.000 | 3.600.000 | +1500% |
| Alamee HC | 2.524.000 | 10.508.000 | +316% |

_Catatan: Data W23 pertama diambil 4 Jun 2026 sebelum mart_sales_tra_so_rts selesai settle. Data sekarang full week (Jun 1-7)._

### W24 ditambahkan (Jun 8–10, parsial)
Data W24 tersedia untuk semua series. Angka akan tumbuh sampai akhir minggu (Jun 14).

### Stok & Demand diperbarui (per 1 Jun 2026)
Demand = rata-rata qty sold W20–W23.

| Series | Stok | Demand/Mgg | Cover |
|---|---|---|---|
| Reeyana Jaket | 3.338 | 888 | **3,8 mgg** 🔴 |
| Reeyana HC | 4.564 | 900 | 5,1 mgg |
| Reeyana BDDA | 5.473 | 203 | 27,0 mgg |
| Heekaya HC | 209 | 66 | **3,2 mgg** 🔴 |
| Heekaya per Juz | 4.576 | 0 | ∞ |
| Heekaya Jaket | 625 | 78 | 8,0 mgg |
| Reeyana | 220 | 102 | **2,2 mgg** 🔴 |
| Airees DPP | 23.755 | 393 | 60,4 mgg |
| Heekaya DPP | 30.251 | 472 | 64,1 mgg |
| Reeyana Prayer Mat | 634 | 28 | 22,6 mgg |
| Zhafira Signature Tasbih New | 2.904 | 294 | 9,9 mgg |
| Abbasy | 628 | 71 | 8,8 mgg |
| Alamee HC | 2.077 | 31 | 67,0 mgg |
| Lumee | 665 | 15 | 44,3 mgg |

**KRITIS — cover < 4 minggu:**
- **Reeyana Jaket**: 3.338 ÷ 888 = **3,8 minggu** 🔴 (turun dari 2,9 → stok naik, demand naik lebih besar)
- **Heekaya HC**: 209 ÷ 66 = **3,2 minggu** 🔴 (baru masuk radar!)
- **Reeyana**: 220 ÷ 102 = **2,2 minggu** 🔴 (kritis, stok sangat rendah)

### Proyeksi kapal (per W24)

| Metrik | Nilai |
|---|---|
| YTD | Rp 10,6 M (26,5% dari target) |
| Run rate 4W (W20–W23) | ~323 juta/mgg |
| Target pace | ~769 juta/mgg |
| Fuel % | 42% (di bawah pace) |
| Gap tersisa | ~29,4 M |
| Minggu sisa | 28 |
| Proyeksi akhir tahun | ~Rp 19,6 M (49% target) |

_Perlu akselerasi signifikan — terutama lewat angin buritan Idul Adha (W24) dan 7.7 (W27)._

---

# Update Log — 2026-06-04

## kr-actual.js

| Channel | Bulan | GMV Lama | GMV Baru | Δ |
|---|---|---|---|---|
| Shopee | Juni | Rp 74.725.200 | Rp 116.087.329 | +55,3% |
| TikTok Shop | Juni | Rp 15.427.068 | Rp 26.567.700 | +72,2% |
| Semua bulan lain | Jan–Mei | — | tidak berubah | — |

Bulan baru yang muncul: —
Bulan yang hilang: —

Catatan: Lazada tidak muncul di Mei dan Juni (tidak ada transaksi).

---

## weekly.js

| Metrik | Lama | Baru |
|---|---|---|
| Minggu terakhir | W23 | W23 |
| tanggalUpdate | 1 Juni 2026 | 2 Juni 2026 |
| YTD total (mingguanTotal) | Rp 8.362.361.621 | Rp 8.412.991.715 |
| W23 GMV total | Rp 83.032.214 | Rp 133.662.308 | 

### W23 seriMinggu — perubahan signifikan

| Series | Lama | Baru | Δ |
|---|---|---|---|
| Reeyana Jaket | 29.724.000 | 51.048.761 | +71,7% |
| Reeyana HC | 21.488.914 | 34.186.218 | +59,1% |
| Reeyana BDDA | 4.806.000 | 6.497.000 | +35,2% |
| Reeyana | 4.144.000 | 6.126.000 | +47,8% |
| Heekaya DPP | 3.590.000 | 5.821.228 | +62,2% |
| Heekaya Jaket | 3.612.000 | 4.675.000 | +29,4% |
| Airees DPP | 2.505.000 | 3.268.000 | +30,5% |
| Zhafira Signature Tasbih New | 1.568.700 | 2.422.500 | +54,4% |
| Heekaya HC | 1.866.000 | 2.816.000 | +50,9% |
| Reeyana Prayer Mat | 472.000 | 1.061.000 | +124,8% |
| Abbasy | 1.351.000 | 2.495.000 | +84,7% |

### Stok & Demand (per 3 Juni 2026)

| Series | Stok | Demand Lama | Demand Baru | Cover |
|---|---|---|---|---|
| Reeyana Jaket | 2.160 | 704 | 747 | **2,9 mgg** 🔴 |
| Reeyana HC | 5.289 | 771 | 809 | 6,5 mgg |
| Reeyana | 316 | 87 | 90 | **3,5 mgg** 🟡 |
| Heekaya HC | 349 | 54 | 55 | 6,3 mgg |
| Heekaya Jaket | 552 | 57 | 58 | 9,5 mgg |
| Reeyana BDDA | 5.563 | 186 | 191 | 29,1 mgg |
| Abbasy | 730 | 65 | 67 | 10,9 mgg |
| Reeyana Prayer Mat | 714 | 23 | 24 | 29,8 mgg |
| Airees DPP | 24.485 | 331 | 340 | 72,0 mgg |
| Heekaya DPP | 31.490 | 374 | 399 | 78,9 mgg |
| Zhafira Signature Tasbih New | 3.274 | 244 | 253 | 12,9 mgg |
| Heekaya per Juz | 5.004 | 0 | 0 | ∞ |

**PERHATIAN — cover < 4 minggu:**
- **Reeyana Jaket**: 2.160 ÷ 747 = **2,9 minggu** 🔴
- **Reeyana**: 316 ÷ 90 = **3,5 minggu** 🟡

### Misi

| Misi | Status | Progres Lama | Progres Baru |
|---|---|---|---|
| MISI-01 (TikTok Shop) | Sedang Berlangsung | 17% | 17% |
| MISI-02 (Direct/Qpreneur) | Sedang Berlangsung | 27% | 27% |
| MISI-03 (Event Calendar) | Sedang Berlangsung | 25% | 25% (tidak diubah) |

YTD TikTok Shop: Rp 2.008.738.336 / Rp 11.800.000.000 = 17,0% → progres 17
YTD Non Marketplace: Rp 371.056.795 / Rp 1.400.000.000 = 26,5% → progres 27

---

## anginBuritan
Tidak diubah (dikelola manual).
