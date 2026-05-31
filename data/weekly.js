// ═══════════════════════════════════════════════════
// DATA KAPAL MADEENA — single source of truth
// Dipakai oleh semua layer game
// Update: setiap minggu setelah data mart tersedia
// ═══════════════════════════════════════════════════

const DATA = {

  meta: {
    kapal: 'Kapal Madeena',
    pelabuhan: 'Pelabuhan 40 Milyar',
    okr: 40_000_000_000,
    tahun: 2026,
    mingguTerakhir: 22,
    tanggalUpdate: '24 Mei 2026'
  },

  // ── GMV total per minggu (semua channel + series) ──
  mingguanTotal: [
    { w:1,  gmv: 378_988_053 },
    { w:2,  gmv: 395_951_005 },
    { w:3,  gmv: 341_725_127 },
    { w:4,  gmv: 421_194_535 },
    { w:5,  gmv: 467_166_198 },
    { w:6,  gmv: 738_020_241 },
    { w:7,  gmv: 525_431_004 },
    { w:8,  gmv: 810_140_318 },
    { w:9,  gmv: 699_059_169 },
    { w:10, gmv: 694_520_646 },
    { w:11, gmv: 412_104_100 },
    { w:12, gmv: 202_012_359 },
    { w:13, gmv: 465_441_309 },
    { w:14, gmv: 519_790_531 },
    { w:15, gmv: 345_006_186 },
    { w:16, gmv: 373_716_757 },
    { w:17, gmv: 336_535_038 },
    { w:18, gmv: 356_980_106 },
    { w:19, gmv: 476_520_898 },
    { w:20, gmv: 284_106_363 },
    { w:21, gmv: 222_189_205 },
    { w:22, gmv:  74_809_712 }
  ],

  // ── Angin buritan (event boosts) ──
  anginBuritan: [
    { nama: 'Ramadan & Lebaran', minggu: [6,7,8,9,10,14], warna: '#f5a623', ikon: '🌙', multiplier: '3–4×', selesai: true },
    { nama: '6.6 Sale',          minggu: [23],             warna: '#5b9cf6', ikon: '⚡', multiplier: '2–3×', selesai: false },
    { nama: 'Idul Adha',         minggu: [24],             warna: '#3ecf7a', ikon: '🌿', multiplier: '2–3×', selesai: false },
    { nama: '7.7 Sale',          minggu: [27],             warna: '#a78bfa', ikon: '⚡', multiplier: '2–3×', selesai: false }
  ],

  // ── GMV per series per minggu ──
  seriMinggu: [
    {s:'Reeyana',w:1,gmv:223_651_713},{s:'Heekaya',w:1,gmv:119_230_204},{s:'Lainnya',w:1,gmv:7_096_340},{s:'Abbasy',w:1,gmv:6_469_228},{s:'Zhafira Signature',w:1,gmv:5_941_400},{s:'Airees',w:1,gmv:5_754_046},{s:'Al Mutqin Florish',w:1,gmv:4_188_000},{s:'Najma',w:1,gmv:3_543_999},{s:'Raheela',w:1,gmv:3_113_119},
    {s:'Reeyana',w:2,gmv:223_826_972},{s:'Heekaya',w:2,gmv:134_398_191},{s:'Lainnya',w:2,gmv:8_827_189},{s:'Airees',w:2,gmv:8_784_018},{s:'Zhafira Signature',w:2,gmv:6_544_659},{s:'Abbasy',w:2,gmv:4_118_614},{s:'Najma',w:2,gmv:4_018_000},{s:'Raheela',w:2,gmv:2_865_359},{s:'Al Mutqin Florish',w:2,gmv:2_568_000},
    {s:'Reeyana',w:3,gmv:183_332_987},{s:'Heekaya',w:3,gmv:116_119_670},{s:'Lainnya',w:3,gmv:12_322_993},{s:'Zhafira Signature',w:3,gmv:10_304_475},{s:'Airees',w:3,gmv:8_541_000},{s:'Al Mutqin Florish',w:3,gmv:4_470_000},{s:'Raheela',w:3,gmv:3_486_000},{s:'Najma',w:3,gmv:2_940_000},{s:'Abbasy',w:3,gmv:208_000},
    {s:'Reeyana',w:4,gmv:236_613_779},{s:'Heekaya',w:4,gmv:116_039_022},{s:'Abbasy',w:4,gmv:13_127_228},{s:'Airees',w:4,gmv:12_567_456},{s:'Lainnya',w:4,gmv:9_274_731},{s:'Al Mutqin Florish',w:4,gmv:8_989_000},{s:'Zhafira Signature',w:4,gmv:8_805_497},{s:'Raheela',w:4,gmv:8_191_119},{s:'Najma',w:4,gmv:7_586_700},
    {s:'Reeyana',w:5,gmv:269_331_239},{s:'Heekaya',w:5,gmv:134_919_702},{s:'Zhafira Signature',w:5,gmv:17_293_313},{s:'Lainnya',w:5,gmv:14_983_233},{s:'Airees',w:5,gmv:14_847_709},{s:'Raheela',w:5,gmv:6_723_000},{s:'Najma',w:5,gmv:5_978_000},{s:'Abbasy',w:5,gmv:1_663_000},{s:'Al Mutqin Florish',w:5,gmv:1_427_000},
    {s:'Reeyana',w:6,gmv:361_977_310},{s:'Heekaya',w:6,gmv:304_467_414},{s:'Lainnya',w:6,gmv:17_682_345},{s:'Airees',w:6,gmv:16_674_299},{s:'Zhafira Signature',w:6,gmv:12_186_285},{s:'Raheela',w:6,gmv:10_033_359},{s:'Abbasy',w:6,gmv:10_001_228},{s:'Najma',w:6,gmv:4_998_000},
    {s:'Reeyana',w:7,gmv:351_400_520},{s:'Heekaya',w:7,gmv:107_824_465},{s:'Lainnya',w:7,gmv:17_835_375},{s:'Airees',w:7,gmv:15_944_546},{s:'Zhafira Signature',w:7,gmv:12_029_699},{s:'Abbasy',w:7,gmv:9_402_457},{s:'Raheela',w:7,gmv:7_320_239},{s:'Najma',w:7,gmv:3_435_700},{s:'Al Mutqin Florish',w:7,gmv:238_000},
    {s:'Reeyana',w:8,gmv:551_532_663},{s:'Heekaya',w:8,gmv:156_239_867},{s:'Lainnya',w:8,gmv:35_698_484},{s:'Airees',w:8,gmv:26_312_425},{s:'Raheela',w:8,gmv:13_447_239},{s:'Abbasy',w:8,gmv:9_381_228},{s:'Zhafira Signature',w:8,gmv:8_462_408},{s:'Najma',w:8,gmv:5_096_000},{s:'Al Mutqin Florish',w:8,gmv:3_970_000},
    {s:'Reeyana',w:9,gmv:450_232_156},{s:'Heekaya',w:9,gmv:116_160_164},{s:'Lainnya',w:9,gmv:34_877_099},{s:'Raheela',w:9,gmv:24_900_000},{s:'Airees',w:9,gmv:23_628_018},{s:'Abbasy',w:9,gmv:17_381_228},{s:'Zhafira Signature',w:9,gmv:16_053_500},{s:'Al Mutqin Florish',w:9,gmv:12_789_000},{s:'Najma',w:9,gmv:3_038_000},
    {s:'Reeyana',w:10,gmv:469_282_119},{s:'Heekaya',w:10,gmv:86_144_265},{s:'Airees',w:10,gmv:49_907_000},{s:'Lainnya',w:10,gmv:25_218_600},{s:'Raheela',w:10,gmv:20_419_239},{s:'Zhafira Signature',w:10,gmv:16_520_511},{s:'Abbasy',w:10,gmv:11_859_910},{s:'Al Mutqin Florish',w:10,gmv:11_486_000},{s:'Najma',w:10,gmv:3_682_999},
    {s:'Reeyana',w:11,gmv:298_286_009},{s:'Heekaya',w:11,gmv:43_599_600},{s:'Airees',w:11,gmv:17_059_369},{s:'Lainnya',w:11,gmv:15_287_800},{s:'Abbasy',w:11,gmv:10_925_821},{s:'Al Mutqin Florish',w:11,gmv:9_156_000},{s:'Raheela',w:11,gmv:8_466_000},{s:'Zhafira Signature',w:11,gmv:8_147_500},{s:'Najma',w:11,gmv:1_176_000},
    {s:'Reeyana',w:12,gmv:140_643_031},{s:'Heekaya',w:12,gmv:34_334_500},{s:'Abbasy',w:12,gmv:6_546_000},{s:'Airees',w:12,gmv:5_665_228},{s:'Al Mutqin Florish',w:12,gmv:4_422_000},{s:'Raheela',w:12,gmv:4_233_000},{s:'Zhafira Signature',w:12,gmv:3_127_300},{s:'Lainnya',w:12,gmv:2_159_300},{s:'Najma',w:12,gmv:882_000},
    {s:'Reeyana',w:13,gmv:328_700_859},{s:'Heekaya',w:13,gmv:88_093_749},{s:'Airees',w:13,gmv:12_503_000},{s:'Lainnya',w:13,gmv:9_041_000},{s:'Al Mutqin Florish',w:13,gmv:6_416_000},{s:'Zhafira Signature',w:13,gmv:6_053_700},{s:'Najma',w:13,gmv:5_782_000},{s:'Abbasy',w:13,gmv:5_614_000},{s:'Raheela',w:13,gmv:3_237_000},
    {s:'Reeyana',w:14,gmv:334_696_546},{s:'Heekaya',w:14,gmv:122_798_155},{s:'Airees',w:14,gmv:15_354_369},{s:'Zhafira Signature',w:14,gmv:14_728_728},{s:'Najma',w:14,gmv:13_145_838},{s:'Al Mutqin Florish',w:14,gmv:6_324_856},{s:'Raheela',w:14,gmv:4_484_490},{s:'Lainnya',w:14,gmv:4_408_260},{s:'Abbasy',w:14,gmv:3_849_288},
    {s:'Reeyana',w:15,gmv:225_488_192},{s:'Heekaya',w:15,gmv:64_950_451},{s:'Lainnya',w:15,gmv:16_974_853},{s:'Najma',w:15,gmv:10_395_546},{s:'Airees',w:15,gmv:10_241_938},{s:'Zhafira Signature',w:15,gmv:9_643_284},{s:'Al Mutqin Florish',w:15,gmv:3_401_428},{s:'Abbasy',w:15,gmv:2_913_496},{s:'Raheela',w:15,gmv:996_996},
    {s:'Reeyana',w:16,gmv:271_481_795},{s:'Heekaya',w:16,gmv:51_052_913},{s:'Abbasy',w:16,gmv:14_668_408},{s:'Najma',w:16,gmv:13_332_802},{s:'Airees',w:16,gmv:9_581_470},{s:'Zhafira Signature',w:16,gmv:6_903_004},{s:'Lainnya',w:16,gmv:3_378_950},{s:'Al Mutqin Florish',w:16,gmv:2_569_666},{s:'Raheela',w:16,gmv:747_747},
    {s:'Reeyana',w:17,gmv:240_073_824},{s:'Heekaya',w:17,gmv:47_404_498},{s:'Najma',w:17,gmv:12_161_134},{s:'Airees',w:17,gmv:10_173_359},{s:'Zhafira Signature',w:17,gmv:8_985_288},{s:'Abbasy',w:17,gmv:8_116_280},{s:'Al Mutqin Florish',w:17,gmv:4_046_547},{s:'Lainnya',w:17,gmv:3_780_613},{s:'Raheela',w:17,gmv:1_793_494},
    {s:'Reeyana',w:18,gmv:280_736_142},{s:'Heekaya',w:18,gmv:38_033_800},{s:'Zhafira Signature',w:18,gmv:9_508_900},{s:'Airees',w:18,gmv:9_369_913},{s:'Abbasy',w:18,gmv:7_903_000},{s:'Najma',w:18,gmv:4_018_000},{s:'Lainnya',w:18,gmv:3_753_300},{s:'Raheela',w:18,gmv:2_739_000},{s:'Al Mutqin Florish',w:18,gmv:1_902_000},
    {s:'Reeyana',w:19,gmv:376_844_465},{s:'Heekaya',w:19,gmv:57_305_121},{s:'Zhafira Signature',w:19,gmv:13_768_600},{s:'Airees',w:19,gmv:10_123_000},{s:'Abbasy',w:19,gmv:6_557_910},{s:'Lainnya',w:19,gmv:6_081_400},{s:'Najma',w:19,gmv:4_508_000},{s:'Al Mutqin Florish',w:19,gmv:3_331_000},{s:'Raheela',w:19,gmv:1_743_000},
    {s:'Reeyana',w:20,gmv:203_895_672},{s:'Heekaya',w:20,gmv:29_506_513},{s:'Abbasy',w:20,gmv:10_291_000},{s:'Airees',w:20,gmv:9_466_948},{s:'Zhafira Signature',w:20,gmv:8_040_700},{s:'Lainnya',w:20,gmv:7_753_400},{s:'Raheela',w:20,gmv:4_731_000},{s:'Al Mutqin Florish',w:20,gmv:2_853_929},{s:'Najma',w:20,gmv:2_450_000},
    {s:'Reeyana',w:21,gmv:176_417_600},{s:'Heekaya',w:21,gmv:31_526_076},{s:'Abbasy',w:21,gmv:6_552_000},{s:'Zhafira Signature',w:21,gmv:4_343_700},{s:'Lainnya',w:21,gmv:4_318_500},{s:'Najma',w:21,gmv:3_234_000},{s:'Raheela',w:21,gmv:2_988_000},{s:'Al Mutqin Florish',w:21,gmv:1_665_000},{s:'Airees',w:21,gmv:684_928},
    {s:'Reeyana',w:22,gmv:54_128_612},{s:'Heekaya',w:22,gmv:10_048_300},{s:'Lainnya',w:22,gmv:2_909_200},{s:'Zhafira Signature',w:22,gmv:2_283_600},{s:'Airees',w:22,gmv:1_516_000},{s:'Abbasy',w:22,gmv:1_248_000},{s:'Al Mutqin Florish',w:22,gmv:1_190_000},{s:'Raheela',w:22,gmv:996_000},{s:'Najma',w:22,gmv:490_000}
  ],

  // ── Stok & demand series (per 24 Mei 2026) ──
  seriStok: {
    'Reeyana':           { stok: 74_911, demandPerMinggu: 3769, warna: '#e882b0' },
    'Heekaya':           { stok: 40_860, demandPerMinggu: 1852, warna: '#a78bfa' },
    'Airees':            { stok: 13_620, demandPerMinggu:  766, warna: '#7ab8d8' },
    'Zhafira Signature': { stok:  1_259, demandPerMinggu:  476, warna: '#5ecbb0' },
    'Abbasy':            { stok:  3_149, demandPerMinggu:   85, warna: '#6366f1' },
    'Raheela':           { stok:  1_889, demandPerMinggu:   29, warna: '#f5a623' },
    'Al Mutqin Florish': { stok:  2_187, demandPerMinggu:   25, warna: '#5b9cf6' },
    'Najma':             { stok:  3_645, demandPerMinggu:   73, warna: '#f05a5a' },
    'Lainnya':           { stok:  1_674, demandPerMinggu:  119, warna: '#9b9890' }
  },

  // ── Misi awak (quests / initiatives) ──
  misiAwak: [
    {
      id: 'MISI-01',
      jalur: 'TikTok Shop',
      judul: 'Mesin TikTok — pacu kecepatan utama',
      deskripsi: 'Scale livestream dan konten TikTok Shop sebagai engine pertumbuhan. Jalur ini paling potensial mendorong kecepatan kapal.',
      status: 'Belum Dimulai',
      progres: 0,
      dampakKnot: 437,
      warna: '#e8e6de',
      anakBuah: [
        { nama: 'Hisyam',  inisial: 'Hi', peran: 'Livestreamer Lead', kapten: true },
        { nama: 'Manggar', inisial: 'Ma', peran: 'Content Creator', kapten: false },
        { nama: 'Sarah',   inisial: 'Sa', peran: 'Inhouse Livestreamer', kapten: false },
        { nama: 'Kania',   inisial: 'Ka', peran: 'Livestreamer', kapten: false, perhatian: true }
      ]
    },
    {
      id: 'MISI-02',
      jalur: 'Direct / madeena.co.id',
      judul: 'Jalur langsung — zero fee, margin penuh',
      deskripsi: 'Kembangkan penjualan direct melalui madeena.co.id. Tidak ada biaya platform — setiap rupiah masuk lebih efisien.',
      status: 'Belum Dimulai',
      progres: 0,
      dampakKnot: 146,
      warna: '#3ecf7a',
      anakBuah: [
        { nama: 'Salsa',   inisial: 'Sl', peran: 'Sales non-Marketplace', kapten: true, perhatian: true },
        { nama: 'Talitha', inisial: 'Ta', peran: 'Customer Support', kapten: false }
      ]
    },
    {
      id: 'MISI-03',
      jalur: 'All Channels',
      judul: 'Event Calendar — tangkap angin 6.6, Idul Adha, 7.7',
      deskripsi: 'Siapkan kampanye untuk tiga angin buritan berikutnya. Ini misi paling menentukan kecepatan kapal di semester kedua.',
      status: 'Sedang Berlangsung',
      progres: 25,
      dampakKnot: 583,
      warna: '#f5a623',
      anakBuah: [
        { nama: 'Fathiya', inisial: 'Fa', peran: 'Content Lead', kapten: true },
        { nama: 'Dina',    inisial: 'Di', peran: 'Sales Marketplace', kapten: false },
        { nama: 'Hisyam',  inisial: 'Hi', peran: 'Livestreamer Lead', kapten: false },
        { nama: 'Ridwan',  inisial: 'Ri', peran: 'Data & Inventori', kapten: false, perhatian: true }
      ]
    }
  ]
};

// Computed helpers — dipakai semua layer
DATA.computed = (() => {
  const total = DATA.mingguanTotal;
  const ytd = total.reduce((s, d) => s + d.gmv, 0);
  const gap = DATA.meta.okr - ytd;
  const pctTempuh = ytd / DATA.meta.okr;
  const runRate4W = total.slice(-5, -1).reduce((s, d) => s + d.gmv, 0) / 4;
  const paceOkr = DATA.meta.okr / 52;
  const fuelPct = runRate4W / paceOkr;
  const mingguSisa = 52 - DATA.meta.mingguTerakhir;
  const proyeksiAkhir = ytd + runRate4W * mingguSisa;
  return { ytd, gap, pctTempuh, runRate4W, paceOkr, fuelPct, mingguSisa, proyeksiAkhir };
})();
