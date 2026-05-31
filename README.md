# Kapal Madeena — Game Bisnis 2026

Dashboard gamifikasi berbasis metafora laut untuk membantu tim memahami konteks bisnis PT. Madinaquran secara intuitif.

## Struktur Repo

```
madeena-game/
├── index.html              # Pintu masuk — peta navigasi
├── data/
│   └── weekly.js           # Semua data GMV, stok, misi (update di sini)
├── shared/
│   └── style.css           # Design system bersama semua layer
└── layers/
    ├── 01-voyage.html      # Peta Pelayaran — OKR tracker
    ├── 02-misi.html        # Misi Awak — Quest board
    ├── 03-ombak.html       # Ombak Mingguan — Boss fight
    └── 04-muatan.html      # Palka Muatan — Inventory health
```

## Cara Deploy ke GitHub Pages

1. Push semua file ke repo GitHub
2. Masuk ke **Settings → Pages**
3. Source: **Deploy from a branch** → branch `main` → folder `/ (root)`
4. Save → tunggu 1–2 menit → buka `https://[username].github.io/[repo-name]`

## Cara Update Data Mingguan

Edit satu file: `data/weekly.js`

- Tambah baris baru di `mingguanTotal` setiap minggu baru
- Update `meta.mingguTerakhir` ke nomor minggu terbaru
- Update `meta.tanggalUpdate`
- Push → GitHub Pages otomatis update

## Cara Kerja Iteratif dengan Claude Code

```bash
# Clone repo
git clone https://github.com/[username]/madeena-game

# Buka di Claude Code (terminal)
cd madeena-game
claude

# Setelah edit, push
git add .
git commit -m "Update W23 data"
git push
```

## Metafora Bisnis

| Elemen Bisnis | Metafora Laut |
|---|---|
| OKR Rp 40B | Pelabuhan tujuan |
| GMV kumulatif | Jarak yang sudah ditempuh |
| Run-rate mingguan | Kecepatan / knot |
| Event spike | Angin buritan kencang |
| Minggu lemah | Badai / ombak besar |
| Initiative | Misi awak kapal |
| Series produk | Palka muatan |
| Stock cover | Sisa bekal |
| OOS risk | Palka bocor / bekal habis |

## Dependensi

Semua via CDN — tidak perlu `npm install` atau build step:
- [Chart.js 4.4](https://www.chartjs.org/) — untuk grafik
- [Google Fonts](https://fonts.google.com/) — Fraunces, DM Mono, DM Sans
