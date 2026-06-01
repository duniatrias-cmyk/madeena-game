// ═══════════════════════════════════════════════════
// DATA KAPAL MADEENA — single source of truth
// Dipakai oleh semua layer game
// Auto-generated from: mv_daily_sales_performance + mart_inventory
// Update: setiap minggu setelah data mart tersedia
// ═══════════════════════════════════════════════════

const DATA = {

  meta: {
    kapal: 'Kapal Madeena',
    pelabuhan: 'Pelabuhan 40 Milyar',
    okr: 40_000_000_000,
    tahun: 2026,
    mingguTerakhir: 22,
    tanggalUpdate: '25 Mei 2026'
  },

  // ── GMV total per minggu (semua channel + series, exclude Zhafira Signature) ──
  mingguanTotal: [
    { w: 1,  gmv: 378_399_054 },
    { w: 2,  gmv: 395_790_005 },
    { w: 3,  gmv: 341_701_128 },
    { w: 4,  gmv: 420_263_536 },
    { w: 5,  gmv: 466_944_199 },
    { w: 6,  gmv: 736_341_342 },
    { w: 7,  gmv: 519_339_505 },
    { w: 8,  gmv: 808_862_318 },
    { w: 9,  gmv: 699_035_169 },
    { w:10,  gmv: 694_402_646 },
    { w:11,  gmv: 405_710_658 },
    { w:12,  gmv: 201_778_360 },
    { w:13,  gmv: 465_237_809 },
    { w:14,  gmv: 477_175_017 },
    { w:15,  gmv: 320_280_234 },
    { w:16,  gmv: 373_567_917 },
    { w:17,  gmv: 336_534_424 },
    { w:18,  gmv: 356_980_106 },
    { w:19,  gmv: 484_349_448 },
    { w:20,  gmv: 290_631_363 },
    { w:21,  gmv: 224_681_705 },
    { w:22,  gmv:  74_809_712 }
  ],

  // ── Angin buritan (event boosts) ──
  anginBuritan: [
    { nama: 'Ramadan & Lebaran', minggu: [6,7,8,9,10,14], warna: '#f5a623', ikon: '🌙', multiplier: '3–4×', selesai: true },
    { nama: '6.6 Sale',          minggu: [23],             warna: '#5b9cf6', ikon: '⚡', multiplier: '2–3×', selesai: false },
    { nama: 'Idul Adha',         minggu: [24],             warna: '#3ecf7a', ikon: '🌿', multiplier: '2–3×', selesai: false },
    { nama: '7.7 Sale',          minggu: [27],             warna: '#a78bfa', ikon: '⚡', multiplier: '2–3×', selesai: false }
  ],

  // ── GMV per series per minggu (top 12 series by YTD) ──
  seriMinggu: [
    // Reeyana Jaket
    {s:'Reeyana Jaket',w:1,gmv:169_740_039},{s:'Reeyana Jaket',w:2,gmv:140_142_294},{s:'Reeyana Jaket',w:3,gmv:115_440_885},{s:'Reeyana Jaket',w:4,gmv:135_255_031},{s:'Reeyana Jaket',w:5,gmv:132_299_127},{s:'Reeyana Jaket',w:6,gmv:174_285_158},{s:'Reeyana Jaket',w:7,gmv:174_580_010},{s:'Reeyana Jaket',w:8,gmv:238_568_659},{s:'Reeyana Jaket',w:9,gmv:199_181_824},{s:'Reeyana Jaket',w:10,gmv:176_306_659},{s:'Reeyana Jaket',w:11,gmv:109_057_222},{s:'Reeyana Jaket',w:12,gmv:72_491_992},{s:'Reeyana Jaket',w:13,gmv:158_879_878},{s:'Reeyana Jaket',w:14,gmv:128_523_372},{s:'Reeyana Jaket',w:15,gmv:84_002_707},{s:'Reeyana Jaket',w:16,gmv:115_073_905},{s:'Reeyana Jaket',w:17,gmv:94_084_505},{s:'Reeyana Jaket',w:18,gmv:106_448_377},{s:'Reeyana Jaket',w:19,gmv:149_289_534},{s:'Reeyana Jaket',w:20,gmv:91_592_773},{s:'Reeyana Jaket',w:21,gmv:73_719_022},{s:'Reeyana Jaket',w:22,gmv:24_001_898},

    // Reeyana HC
    {s:'Reeyana HC',w:1,gmv:25_650_522},{s:'Reeyana HC',w:2,gmv:42_315_699},{s:'Reeyana HC',w:3,gmv:27_544_807},{s:'Reeyana HC',w:4,gmv:47_274_022},{s:'Reeyana HC',w:5,gmv:78_085_058},{s:'Reeyana HC',w:6,gmv:114_634_216},{s:'Reeyana HC',w:7,gmv:83_347_975},{s:'Reeyana HC',w:8,gmv:110_248_237},{s:'Reeyana HC',w:9,gmv:85_917_025},{s:'Reeyana HC',w:10,gmv:108_099_850},{s:'Reeyana HC',w:11,gmv:78_845_312},{s:'Reeyana HC',w:12,gmv:41_459_440},{s:'Reeyana HC',w:13,gmv:96_126_724},{s:'Reeyana HC',w:14,gmv:121_214_818},{s:'Reeyana HC',w:15,gmv:85_927_778},{s:'Reeyana HC',w:16,gmv:111_863_452},{s:'Reeyana HC',w:17,gmv:94_718_841},{s:'Reeyana HC',w:18,gmv:105_241_155},{s:'Reeyana HC',w:19,gmv:161_587_848},{s:'Reeyana HC',w:20,gmv:82_027_500},{s:'Reeyana HC',w:21,gmv:58_304_739},{s:'Reeyana HC',w:22,gmv:23_298_414},

    // Reeyana BDDA
    {s:'Reeyana BDDA',w:1,gmv:7_800_295},{s:'Reeyana BDDA',w:2,gmv:10_235_000},{s:'Reeyana BDDA',w:3,gmv:8_067_295},{s:'Reeyana BDDA',w:4,gmv:13_249_879},{s:'Reeyana BDDA',w:5,gmv:13_285_495},{s:'Reeyana BDDA',w:6,gmv:12_815_400},{s:'Reeyana BDDA',w:7,gmv:11_908_595},{s:'Reeyana BDDA',w:8,gmv:95_312_884},{s:'Reeyana BDDA',w:9,gmv:74_575_884},{s:'Reeyana BDDA',w:10,gmv:88_199_000},{s:'Reeyana BDDA',w:11,gmv:47_259_000},{s:'Reeyana BDDA',w:12,gmv:15_041_000},{s:'Reeyana BDDA',w:13,gmv:47_971_000},{s:'Reeyana BDDA',w:14,gmv:22_000_088},{s:'Reeyana BDDA',w:15,gmv:13_006_015},{s:'Reeyana BDDA',w:16,gmv:13_630_083},{s:'Reeyana BDDA',w:17,gmv:24_421_323},{s:'Reeyana BDDA',w:18,gmv:23_585_000},{s:'Reeyana BDDA',w:19,gmv:20_482_183},{s:'Reeyana BDDA',w:20,gmv:19_758_000},{s:'Reeyana BDDA',w:21,gmv:15_575_000},{s:'Reeyana BDDA',w:22,gmv:1_869_000},

    // Heekaya HC
    {s:'Heekaya HC',w:1,gmv:42_303_598},{s:'Heekaya HC',w:2,gmv:53_424_122},{s:'Heekaya HC',w:3,gmv:37_478_717},{s:'Heekaya HC',w:4,gmv:28_073_331},{s:'Heekaya HC',w:5,gmv:3_624_700},{s:'Heekaya HC',w:7,gmv:7_391_614},{s:'Heekaya HC',w:8,gmv:72_275_414},{s:'Heekaya HC',w:9,gmv:49_797_457},{s:'Heekaya HC',w:10,gmv:19_389_614},{s:'Heekaya HC',w:11,gmv:4_192_000},{s:'Heekaya HC',w:12,gmv:14_541_000},{s:'Heekaya HC',w:13,gmv:60_559_929},{s:'Heekaya HC',w:14,gmv:69_161_373},{s:'Heekaya HC',w:15,gmv:22_346_418},{s:'Heekaya HC',w:16,gmv:14_721_522},{s:'Heekaya HC',w:17,gmv:17_320_158},{s:'Heekaya HC',w:18,gmv:15_058_000},{s:'Heekaya HC',w:19,gmv:22_925_422},{s:'Heekaya HC',w:20,gmv:8_781_000},{s:'Heekaya HC',w:21,gmv:5_997_925},{s:'Heekaya HC',w:22,gmv:2_139_000},

    // Heekaya per Juz
    {s:'Heekaya per Juz',w:1,gmv:10_773_470},{s:'Heekaya per Juz',w:2,gmv:23_321_735},{s:'Heekaya per Juz',w:3,gmv:36_230_146},{s:'Heekaya per Juz',w:4,gmv:48_173_900},{s:'Heekaya per Juz',w:5,gmv:80_537_500},{s:'Heekaya per Juz',w:6,gmv:227_899_070},{s:'Heekaya per Juz',w:7,gmv:53_583_700},{s:'Heekaya per Juz',w:10,gmv:211_000},{s:'Heekaya per Juz',w:14,gmv:1_900_477},{s:'Heekaya per Juz',w:15,gmv:13_513_495},{s:'Heekaya per Juz',w:16,gmv:8_652_338},{s:'Heekaya per Juz',w:17,gmv:211_000},

    // Heekaya Jaket
    {s:'Heekaya Jaket',w:1,gmv:16_425_962},{s:'Heekaya Jaket',w:2,gmv:22_051_843},{s:'Heekaya Jaket',w:3,gmv:21_395_508},{s:'Heekaya Jaket',w:4,gmv:27_092_282},{s:'Heekaya Jaket',w:5,gmv:34_021_282},{s:'Heekaya Jaket',w:6,gmv:51_091_446},{s:'Heekaya Jaket',w:7,gmv:25_399_923},{s:'Heekaya Jaket',w:8,gmv:46_585_202},{s:'Heekaya Jaket',w:9,gmv:35_881_790},{s:'Heekaya Jaket',w:10,gmv:33_716_144},{s:'Heekaya Jaket',w:11,gmv:23_249_000},{s:'Heekaya Jaket',w:12,gmv:12_611_000},{s:'Heekaya Jaket',w:13,gmv:15_916_521},{s:'Heekaya Jaket',w:14,gmv:25_453_941},{s:'Heekaya Jaket',w:15,gmv:12_476_299},{s:'Heekaya Jaket',w:16,gmv:15_157_327},{s:'Heekaya Jaket',w:17,gmv:14_653_869},{s:'Heekaya Jaket',w:18,gmv:10_493_000},{s:'Heekaya Jaket',w:19,gmv:17_064_000},{s:'Heekaya Jaket',w:20,gmv:7_813_874},{s:'Heekaya Jaket',w:21,gmv:9_452_251},{s:'Heekaya Jaket',w:22,gmv:3_647_000},

    // Reeyana (base)
    {s:'Reeyana',w:1,gmv:6_458_938},{s:'Reeyana',w:2,gmv:10_037_263},{s:'Reeyana',w:3,gmv:13_007_947},{s:'Reeyana',w:4,gmv:12_940_653},{s:'Reeyana',w:5,gmv:28_192_749},{s:'Reeyana',w:6,gmv:20_014_368},{s:'Reeyana',w:7,gmv:41_797_025},{s:'Reeyana',w:8,gmv:61_458_581},{s:'Reeyana',w:9,gmv:33_953_943},{s:'Reeyana',w:10,gmv:14_811_161},{s:'Reeyana',w:11,gmv:14_438_000},{s:'Reeyana',w:12,gmv:5_498_000},{s:'Reeyana',w:13,gmv:9_531_258},{s:'Reeyana',w:14,gmv:15_720_235},{s:'Reeyana',w:15,gmv:16_716_949},{s:'Reeyana',w:16,gmv:22_129_064},{s:'Reeyana',w:17,gmv:16_345_371},{s:'Reeyana',w:18,gmv:20_060_000},{s:'Reeyana',w:19,gmv:21_431_000},{s:'Reeyana',w:20,gmv:11_461_000},{s:'Reeyana',w:21,gmv:12_174_011},{s:'Reeyana',w:22,gmv:1_763_000},

    // Airees DPP
    {s:'Airees DPP',w:1,gmv:5_754_047},{s:'Airees DPP',w:2,gmv:8_784_019},{s:'Airees DPP',w:3,gmv:8_541_000},{s:'Airees DPP',w:4,gmv:12_545_456},{s:'Airees DPP',w:5,gmv:14_847_709},{s:'Airees DPP',w:6,gmv:16_674_299},{s:'Airees DPP',w:7,gmv:15_944_547},{s:'Airees DPP',w:8,gmv:26_290_426},{s:'Airees DPP',w:9,gmv:23_628_019},{s:'Airees DPP',w:10,gmv:49_907_000},{s:'Airees DPP',w:11,gmv:16_719_913},{s:'Airees DPP',w:12,gmv:5_665_228},{s:'Airees DPP',w:13,gmv:12_503_000},{s:'Airees DPP',w:14,gmv:13_892_369},{s:'Airees DPP',w:15,gmv:9_317_916},{s:'Airees DPP',w:16,gmv:9_581_471},{s:'Airees DPP',w:17,gmv:10_173_315},{s:'Airees DPP',w:18,gmv:9_342_913},{s:'Airees DPP',w:19,gmv:9_986_000},{s:'Airees DPP',w:20,gmv:13_116_848},{s:'Airees DPP',w:21,gmv:4_829_228},{s:'Airees DPP',w:22,gmv:1_516_000},

    // Heekaya DPP
    {s:'Heekaya DPP',w:1,gmv:8_555_808},{s:'Heekaya DPP',w:2,gmv:15_143_308},{s:'Heekaya DPP',w:3,gmv:11_245_400},{s:'Heekaya DPP',w:4,gmv:11_240_509},{s:'Heekaya DPP',w:5,gmv:13_950_537},{s:'Heekaya DPP',w:6,gmv:19_101_998},{s:'Heekaya DPP',w:7,gmv:14_585_828},{s:'Heekaya DPP',w:8,gmv:25_971_114},{s:'Heekaya DPP',w:9,gmv:20_285_152},{s:'Heekaya DPP',w:10,gmv:21_159_656},{s:'Heekaya DPP',w:11,gmv:10_602_800},{s:'Heekaya DPP',w:12,gmv:4_019_000},{s:'Heekaya DPP',w:13,gmv:8_559_900},{s:'Heekaya DPP',w:14,gmv:11_255_511},{s:'Heekaya DPP',w:15,gmv:9_675_250},{s:'Heekaya DPP',w:16,gmv:9_307_567},{s:'Heekaya DPP',w:17,gmv:10_685_711},{s:'Heekaya DPP',w:18,gmv:10_326_000},{s:'Heekaya DPP',w:19,gmv:13_290_000},{s:'Heekaya DPP',w:20,gmv:6_580_228},{s:'Heekaya DPP',w:21,gmv:7_399_000},{s:'Heekaya DPP',w:22,gmv:3_650_000},

    // Reeyana Prayer Mat
    {s:'Reeyana Prayer Mat',w:1,gmv:7_197_000},{s:'Reeyana Prayer Mat',w:2,gmv:12_508_000},{s:'Reeyana Prayer Mat',w:3,gmv:8_495_000},{s:'Reeyana Prayer Mat',w:4,gmv:6_371_000},{s:'Reeyana Prayer Mat',w:5,gmv:5_658_000},{s:'Reeyana Prayer Mat',w:6,gmv:9_480_255},{s:'Reeyana Prayer Mat',w:7,gmv:13_761_264},{s:'Reeyana Prayer Mat',w:8,gmv:17_106_000},{s:'Reeyana Prayer Mat',w:9,gmv:23_667_691},{s:'Reeyana Prayer Mat',w:10,gmv:39_947_213},{s:'Reeyana Prayer Mat',w:11,gmv:24_296_000},{s:'Reeyana Prayer Mat',w:12,gmv:2_005_000},{s:'Reeyana Prayer Mat',w:13,gmv:6_012_000},{s:'Reeyana Prayer Mat',w:14,gmv:6_258_602},{s:'Reeyana Prayer Mat',w:15,gmv:3_425_894},{s:'Reeyana Prayer Mat',w:16,gmv:3_423_068},{s:'Reeyana Prayer Mat',w:17,gmv:1_887_534},{s:'Reeyana Prayer Mat',w:18,gmv:6_726_000},{s:'Reeyana Prayer Mat',w:19,gmv:7_434_000},{s:'Reeyana Prayer Mat',w:20,gmv:1_415_000},{s:'Reeyana Prayer Mat',w:21,gmv:2_360_000},{s:'Reeyana Prayer Mat',w:22,gmv:944_000},

    // Zhafira Signature Tasbih New
    {s:'Zhafira Signature Tasbih New',w:1,gmv:4_238_400},{s:'Zhafira Signature Tasbih New',w:2,gmv:4_357_311},{s:'Zhafira Signature Tasbih New',w:3,gmv:8_469_600},{s:'Zhafira Signature Tasbih New',w:4,gmv:6_298_800},{s:'Zhafira Signature Tasbih New',w:5,gmv:14_877_600},{s:'Zhafira Signature Tasbih New',w:6,gmv:10_084_588},{s:'Zhafira Signature Tasbih New',w:7,gmv:10_888_699},{s:'Zhafira Signature Tasbih New',w:8,gmv:7_062_711},{s:'Zhafira Signature Tasbih New',w:9,gmv:15_613_500},{s:'Zhafira Signature Tasbih New',w:10,gmv:16_415_511},{s:'Zhafira Signature Tasbih New',w:11,gmv:8_042_700},{s:'Zhafira Signature Tasbih New',w:12,gmv:3_060_300},{s:'Zhafira Signature Tasbih New',w:13,gmv:6_053_700},{s:'Zhafira Signature Tasbih New',w:14,gmv:13_168_728},{s:'Zhafira Signature Tasbih New',w:15,gmv:8_779_284},{s:'Zhafira Signature Tasbih New',w:16,gmv:6_903_004},{s:'Zhafira Signature Tasbih New',w:17,gmv:8_985_264},{s:'Zhafira Signature Tasbih New',w:18,gmv:8_724_900},{s:'Zhafira Signature Tasbih New',w:19,gmv:12_813_600},{s:'Zhafira Signature Tasbih New',w:20,gmv:7_493_700},{s:'Zhafira Signature Tasbih New',w:21,gmv:3_749_700},{s:'Zhafira Signature Tasbih New',w:22,gmv:2_283_600},

    // Abbasy
    {s:'Abbasy',w:1,gmv:6_469_229},{s:'Abbasy',w:2,gmv:4_118_614},{s:'Abbasy',w:3,gmv:208_000},{s:'Abbasy',w:4,gmv:13_127_229},{s:'Abbasy',w:5,gmv:1_663_000},{s:'Abbasy',w:6,gmv:10_001_229},{s:'Abbasy',w:7,gmv:9_402_457},{s:'Abbasy',w:8,gmv:9_277_229},{s:'Abbasy',w:9,gmv:17_381_229},{s:'Abbasy',w:10,gmv:11_859_911},{s:'Abbasy',w:11,gmv:10_293_911},{s:'Abbasy',w:12,gmv:6_546_000},{s:'Abbasy',w:13,gmv:5_614_000},{s:'Abbasy',w:14,gmv:3_433_288},{s:'Abbasy',w:15,gmv:2_601_496},{s:'Abbasy',w:16,gmv:14_668_408},{s:'Abbasy',w:17,gmv:8_116_176},{s:'Abbasy',w:18,gmv:7_903_000},{s:'Abbasy',w:19,gmv:6_453_911},{s:'Abbasy',w:20,gmv:10_291_000},{s:'Abbasy',w:21,gmv:6_552_000},{s:'Abbasy',w:22,gmv:1_248_000}
  ],

  // ── Stok & demand series (dari mart_inventory + mv_daily_sales_performance) ──
  seriStok: {
    'Reeyana Jaket':                { stok: 1_824, demandPerMinggu: 673, warna: '#e882b0' },
    'Reeyana HC':                   { stok: 6_047, demandPerMinggu: 784, warna: '#d46a9e' },
    'Reeyana BDDA':                 { stok: 5_720, demandPerMinggu: 162, warna: '#c85a8f' },
    'Heekaya HC':                   { stok:   401, demandPerMinggu:  64, warna: '#a78bfa' },
    'Heekaya per Juz':              { stok: 5_004, demandPerMinggu:   0, warna: '#7140c4' },
    'Heekaya Jaket':                { stok:   646, demandPerMinggu:  52, warna: '#9570e8' },
    'Reeyana':                      { stok:   160, demandPerMinggu:  91, warna: '#b04880' },
    'Airees DPP':                   { stok: 24_672, demandPerMinggu: 320, warna: '#7ab8d8' },
    'Heekaya DPP':                  { stok: 31_795, demandPerMinggu: 349, warna: '#8355d6' },
    'Reeyana Prayer Mat':           { stok:   742, demandPerMinggu:  26, warna: '#a83e75' },
    'Zhafira Signature Tasbih New': { stok: 3_098, demandPerMinggu: 277, warna: '#5ecbb0' },
    'Abbasy':                       { stok:   224, demandPerMinggu:  59, warna: '#6366f1' }
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
