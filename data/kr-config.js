// ═══════════════════════════════════════════════════
// KR CONFIG — Kamar Mesin (Layer 06)
// Target tahunan & bulanan per channel (dari CSV Doa 2026).
// STATIS — ubah hanya saat ada revisi target tahunan.
//
// Actions diisi/diperbarui oleh tim secara manual,
// atau akan di-sync otomatis via:
// TODO: Todoist sync — titik integrasi pull sprint actions dari Todoist
// via Claude Code script: todoist -> scripts/sync-actions.py -> kr-config.js (bagian actions)
// ═══════════════════════════════════════════════════

const krConfig = {
  tahun: 2026,

  channels: [
    {
      id: 'shopee',
      nama: 'Shopee',
      dbName: 'Shopee',             // cocok dengan ch_sub_name di postgres
      targetTahunan: 26_800_000_000,
      targetBulanan: {
        1: 2_680_000_000, 2: 3_216_000_000, 3: 3_484_000_000,
        4: 2_144_000_000, 5: 2_412_000_000, 6: 2_412_000_000,
        7: 1_608_000_000, 8: 1_608_000_000, 9: 1_608_000_000,
       10: 1_876_000_000,11: 1_876_000_000,12: 1_876_000_000
      },
      warna: '--hijau-laut',
      ikon: '🟢'
    },
    {
      id: 'tiktok',
      nama: 'TikTok Shop',
      dbName: 'TikTok Shop',
      targetTahunan: 11_800_000_000,
      targetBulanan: {
        1: 1_180_000_000, 2: 1_416_000_000, 3: 1_534_000_000,
        4:   944_000_000, 5: 1_062_000_000, 6: 1_062_000_000,
        7:   708_000_000, 8:   708_000_000, 9:   708_000_000,
       10:   826_000_000,11:   826_000_000,12:   826_000_000
      },
      warna: '--langit',
      ikon: '🎵'
    },
    {
      id: 'qpreneur',
      nama: 'Qpreneur',
      dbName: 'Non Marketplace Madinaquran',
      targetTahunan: 1_400_000_000,
      targetBulanan: {
        1:  140_000_000, 2:  168_000_000, 3:  182_000_000,
        4:  112_000_000, 5:  126_000_000, 6:  126_000_000,
        7:   84_000_000, 8:   84_000_000, 9:   84_000_000,
       10:   98_000_000,11:   98_000_000,12:   98_000_000
      },
      warna: '--ungu',
      ikon: '🏪'
    },
    {
      id: 'lazada',
      nama: 'Lazada',
      dbName: 'Lazada',
      targetTahunan: 400_000_000,
      targetBulanan: {
        1:   40_000_000, 2:   48_000_000, 3:   52_000_000,
        4:   32_000_000, 5:   36_000_000, 6:   36_000_000,
        7:   24_000_000, 8:   24_000_000, 9:   24_000_000,
       10:   28_000_000,11:   28_000_000,12:   28_000_000
      },
      warna: '--emas',
      ikon: '🟡'
    }
  ],

  // ── Sprint Actions ──
  // Catatan update manual: status, outcome, tanggalMulai.
  // channels: many-to-many (satu action bisa berkontribusi ke beberapa channel sekaligus).
  // bobot: "tinggi" | "sedang" | "rendah"
  // status: "selesai" | "berjalan" | "belum"
  actions: [

    // ── Decisions W23 ──
    {
      id: 'dec-001',
      type: 'decision',
      sprint: 'W23',
      tanggalMulai: '2026-06-04',
      deskripsi: 'CPAS ATC Rp 1jt / 48 jam — Mushaf Alamee menjelang 6.6 (target: +185–308 ATC baru, +Rp 5,3jt revenue hari-H)',
      channels: ['shopee'],
      bobot: 'tinggi',
      status: 'pending',
      outcome: '',
      departemen: 'Tim Ads'
    },

    // ── Sprint W23 (2–8 Juni 2026) ──
    {
      id: 'act-001',
      sprint: 'W23',
      tanggalMulai: '2026-06-02',
      deskripsi: 'Optimasi campaign Flash Sale 6.6 Shopee',
      channels: ['shopee'],
      bobot: 'tinggi',
      status: 'selesai',
      outcome: 'ROAS naik dari 2.8 ke 3.4',
      departemen: 'Tim Ads'
    },
    {
      id: 'act-002',
      sprint: 'W23',
      tanggalMulai: '2026-06-03',
      deskripsi: 'Produksi konten video hero product Q2',
      channels: ['shopee', 'tiktok'],   // kontribusi ke dua channel sekaligus
      bobot: 'tinggi',
      status: 'berjalan',
      outcome: '',
      departemen: 'Tim Konten'
    },
    {
      id: 'act-003',
      sprint: 'W23',
      tanggalMulai: '2026-06-02',
      deskripsi: 'Live streaming TikTok harian sprint W23',
      channels: ['tiktok'],
      bobot: 'tinggi',
      status: 'berjalan',
      outcome: '',
      departemen: 'Tim Konten'
    },
    {
      id: 'act-004',
      sprint: 'W23',
      tanggalMulai: '2026-06-02',
      deskripsi: 'Setup bundling produk hero Juni Shopee',
      channels: ['shopee'],
      bobot: 'sedang',
      status: 'berjalan',
      outcome: '',
      departemen: 'Tim Produk'
    },
    {
      id: 'act-005',
      sprint: 'W23',
      tanggalMulai: '2026-06-03',
      deskripsi: 'Finalisasi listing 3 SKU hero di Qpreneur',
      channels: ['qpreneur'],
      bobot: 'sedang',
      status: 'berjalan',
      outcome: '',
      departemen: 'Tim Produk'
    },
    {
      id: 'act-006',
      sprint: 'W23',
      tanggalMulai: '2026-06-03',
      deskripsi: 'Persiapan campaign Idul Adha lintas channel',
      channels: ['shopee', 'tiktok', 'lazada'],
      bobot: 'tinggi',
      status: 'belum',
      outcome: '',
      departemen: 'Tim Ads'
    },

    // ── Sprint W22 (26 Mei–1 Juni 2026) ──
    {
      id: 'act-007',
      sprint: 'W22',
      tanggalMulai: '2026-05-25',
      deskripsi: 'Riset hook viral 20 kompetitor TikTok',
      channels: ['tiktok'],
      bobot: 'rendah',
      status: 'selesai',
      outcome: '24 referensi hook terkumpul di library konten',
      departemen: 'Tim Konten'
    },
    {
      id: 'act-008',
      sprint: 'W22',
      tanggalMulai: '2026-05-28',
      deskripsi: 'A/B test thumbnail listing hero Shopee',
      channels: ['shopee'],
      bobot: 'rendah',
      status: 'selesai',
      outcome: 'Varian B menang, CTR listing +6%',
      departemen: 'Tim Konten'
    },
    {
      id: 'act-009',
      sprint: 'W22',
      tanggalMulai: '2026-05-30',
      deskripsi: 'Audit kelengkapan atribut listing Lazada',
      channels: [],                     // ⚠ Orphan — belum di-assign ke channel
      bobot: 'rendah',
      status: 'selesai',
      outcome: '47 listing diperbaiki, daftar lengkap dibuat',
      departemen: 'Tim Produk'
    },
    {
      id: 'act-010',
      sprint: 'W22',
      tanggalMulai: '2026-05-28',
      deskripsi: 'Rekrut Reseller Qpreneur batch Juni',
      channels: ['qpreneur'],
      bobot: 'sedang',
      status: 'selesai',
      outcome: '12 reseller baru onboard, target 10 tercapai',
      departemen: 'Tim Produk'
    }
  ]
};
