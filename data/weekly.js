// ═══════════════════════════════════════════════════
// DATA KAPAL MADEENA — single source of truth
// Dipakai oleh semua layer game
// Auto-generated from: mart_sales_tra_so_rts + dim_product_origin + mart_inventory
// Update: 11 Jun 2026
// ═══════════════════════════════════════════════════

const DATA = {

  meta: {
    kapal: 'Kapal Madeena',
    pelabuhan: 'Pelabuhan 40 Milyar',
    okr: 40_000_000_000,
    tahun: 2026,
    mingguTerakhir: 26,
    tanggalUpdate: '26 Jun 2026'
  },

  // ── GMV total per minggu (semua channel + series, exclude Zhafira Signature) ──
  mingguanTotal: [
    { w: 1,  gmv: 354_875_028 },
    { w: 2,  gmv: 400_127_799 },
    { w: 3,  gmv: 339_991_823 },
    { w: 4,  gmv: 412_802_923 },
    { w: 5,  gmv: 454_829_174 },
    { w: 6,  gmv: 654_678_098 },
    { w: 7,  gmv: 607_899_226 },
    { w: 8,  gmv: 858_092_836 },
    { w: 9,  gmv: 732_790_896 },
    { w:10,  gmv: 745_463_134 },
    { w:11,  gmv: 430_430_586 },
    { w:12,  gmv: 215_255_432 },
    { w:13,  gmv: 478_964_682 },
    { w:14,  gmv: 509_219_778 },
    { w:15,  gmv: 329_766_059 },
    { w:16,  gmv: 390_274_461 },
    { w:17,  gmv: 361_280_402 },
    { w:18,  gmv: 379_650_951 },
    { w:19,  gmv: 515_326_360 },
    { w:20,  gmv: 309_252_041 },
    { w:21,  gmv: 237_073_806 },
    { w:22,  gmv: 313_206_924 },
    { w:23,  gmv: 445_517_031 },
    { w:24,  gmv: 307_884_315 },
    { w:25,  gmv: 301_402_689 },
    { w:26,  gmv: 115_913_906 }
  ],

  // ── Angin buritan (event boosts) ──
  anginBuritan: [
    { nama: 'Ramadan & Lebaran', minggu: [6,7,8,9,10,14], warna: '#f5a623', ikon: '🌙', multiplier: '3–4×', selesai: true },
    { nama: '6.6 Sale',          minggu: [23],             warna: '#5b9cf6', ikon: '⚡', multiplier: '2–3×', selesai: true },
    { nama: 'Idul Adha',         minggu: [24],             warna: '#3ecf7a', ikon: '🌿', multiplier: '2–3×', selesai: true  },
    { nama: '7.7 Sale',          minggu: [27],             warna: '#a78bfa', ikon: '⚡', multiplier: '2–3×', selesai: false }
  ],

  // ── GMV per series per minggu (top 12 + Alamee HC + Lumee) ──
  seriMinggu: [
    // Reeyana Jaket
    {s:'Reeyana Jaket',w:1,gmv:167_790_176},{s:'Reeyana Jaket',w:2,gmv:150_166_808},{s:'Reeyana Jaket',w:3,gmv:113_187_237},{s:'Reeyana Jaket',w:4,gmv:136_925_626},{s:'Reeyana Jaket',w:5,gmv:133_644_805},{s:'Reeyana Jaket',w:6,gmv:176_715_989},{s:'Reeyana Jaket',w:7,gmv:170_014_515},{s:'Reeyana Jaket',w:8,gmv:248_650_640},{s:'Reeyana Jaket',w:9,gmv:216_442_581},{s:'Reeyana Jaket',w:10,gmv:197_383_194},{s:'Reeyana Jaket',w:11,gmv:116_173_120},{s:'Reeyana Jaket',w:12,gmv:77_576_585},{s:'Reeyana Jaket',w:13,gmv:165_174_146},{s:'Reeyana Jaket',w:14,gmv:137_187_530},{s:'Reeyana Jaket',w:15,gmv:87_512_936},{s:'Reeyana Jaket',w:16,gmv:120_686_612},{s:'Reeyana Jaket',w:17,gmv:100_218_328},{s:'Reeyana Jaket',w:18,gmv:112_339_243},{s:'Reeyana Jaket',w:19,gmv:171_034_264},{s:'Reeyana Jaket',w:20,gmv:97_074_124},{s:'Reeyana Jaket',w:21,gmv:80_445_120},{s:'Reeyana Jaket',w:22,gmv:96_780_390},{s:'Reeyana Jaket',w:23,gmv:157_398_262},{s:'Reeyana Jaket',w:24,gmv:133_250_105},{s:'Reeyana Jaket',w:25,gmv:107_245_092},{s:'Reeyana Jaket',w:26,gmv:43_824_111},

    // Reeyana HC
    {s:'Reeyana HC',w:1,gmv:25_505_451},{s:'Reeyana HC',w:2,gmv:35_778_885},{s:'Reeyana HC',w:3,gmv:34_024_326},{s:'Reeyana HC',w:4,gmv:49_966_278},{s:'Reeyana HC',w:5,gmv:81_739_082},{s:'Reeyana HC',w:6,gmv:116_480_965},{s:'Reeyana HC',w:7,gmv:82_152_652},{s:'Reeyana HC',w:8,gmv:113_508_161},{s:'Reeyana HC',w:9,gmv:88_845_092},{s:'Reeyana HC',w:10,gmv:112_669_302},{s:'Reeyana HC',w:11,gmv:84_122_755},{s:'Reeyana HC',w:12,gmv:42_845_532},{s:'Reeyana HC',w:13,gmv:99_483_216},{s:'Reeyana HC',w:14,gmv:132_501_297},{s:'Reeyana HC',w:15,gmv:86_116_293},{s:'Reeyana HC',w:16,gmv:118_050_061},{s:'Reeyana HC',w:17,gmv:108_809_074},{s:'Reeyana HC',w:18,gmv:111_981_343},{s:'Reeyana HC',w:19,gmv:169_732_518},{s:'Reeyana HC',w:20,gmv:86_487_000},{s:'Reeyana HC',w:21,gmv:61_337_847},{s:'Reeyana HC',w:22,gmv:97_122_303},{s:'Reeyana HC',w:23,gmv:118_953_137},{s:'Reeyana HC',w:24,gmv:44_028_122},{s:'Reeyana HC',w:25,gmv:65_417_010},{s:'Reeyana HC',w:26,gmv:19_507_288},

    // Reeyana BDDA
    {s:'Reeyana BDDA',w:1,gmv:7_921_036},{s:'Reeyana BDDA',w:2,gmv:9_434_000},{s:'Reeyana BDDA',w:3,gmv:8_722_036},{s:'Reeyana BDDA',w:4,gmv:13_020_845},{s:'Reeyana BDDA',w:5,gmv:13_439_036},{s:'Reeyana BDDA',w:6,gmv:12_852_200},{s:'Reeyana BDDA',w:7,gmv:11_546_536},{s:'Reeyana BDDA',w:8,gmv:97_634_809},{s:'Reeyana BDDA',w:9,gmv:78_197_609},{s:'Reeyana BDDA',w:10,gmv:91_225_000},{s:'Reeyana BDDA',w:11,gmv:49_306_000},{s:'Reeyana BDDA',w:12,gmv:15_753_000},{s:'Reeyana BDDA',w:13,gmv:49_128_000},{s:'Reeyana BDDA',w:14,gmv:22_979_889},{s:'Reeyana BDDA',w:15,gmv:13_540_460},{s:'Reeyana BDDA',w:16,gmv:13_897_350},{s:'Reeyana BDDA',w:17,gmv:25_122_077},{s:'Reeyana BDDA',w:18,gmv:25_810_000},{s:'Reeyana BDDA',w:19,gmv:20_826_047},{s:'Reeyana BDDA',w:20,gmv:20_826_000},{s:'Reeyana BDDA',w:21,gmv:15_931_000},{s:'Reeyana BDDA',w:22,gmv:14_151_000},{s:'Reeyana BDDA',w:23,gmv:21_093_000},{s:'Reeyana BDDA',w:24,gmv:13_083_000},{s:'Reeyana BDDA',w:25,gmv:13_261_000},{s:'Reeyana BDDA',w:26,gmv:10_235_000},

    // Heekaya HC
    {s:'Heekaya HC',w:1,gmv:40_624_041},{s:'Heekaya HC',w:2,gmv:47_840_978},{s:'Heekaya HC',w:3,gmv:36_702_409},{s:'Heekaya HC',w:4,gmv:26_585_888},{s:'Heekaya HC',w:5,gmv:6_460_700},{s:'Heekaya HC',w:6,gmv:136_000},{s:'Heekaya HC',w:7,gmv:5_500_307},{s:'Heekaya HC',w:8,gmv:58_389_749},{s:'Heekaya HC',w:9,gmv:44_807_227},{s:'Heekaya HC',w:10,gmv:23_760_358},{s:'Heekaya HC',w:11,gmv:4_978_000},{s:'Heekaya HC',w:12,gmv:15_458_000},{s:'Heekaya HC',w:13,gmv:60_149_268},{s:'Heekaya HC',w:14,gmv:72_190_029},{s:'Heekaya HC',w:15,gmv:23_530_067},{s:'Heekaya HC',w:16,gmv:15_381_784},{s:'Heekaya HC',w:17,gmv:19_025_549},{s:'Heekaya HC',w:18,gmv:16_380_000},{s:'Heekaya HC',w:19,gmv:23_711_176},{s:'Heekaya HC',w:20,gmv:9_382_000},{s:'Heekaya HC',w:21,gmv:6_541_066},{s:'Heekaya HC',w:22,gmv:10_277_000},{s:'Heekaya HC',w:23,gmv:13_451_000},{s:'Heekaya HC',w:24,gmv:5_968_000},{s:'Heekaya HC',w:25,gmv:11_468_496},{s:'Heekaya HC',w:26,gmv:8_319_550},

    // Heekaya per Juz
    {s:'Heekaya per Juz',w:1,gmv:5_908_160},{s:'Heekaya per Juz',w:2,gmv:19_412_080},{s:'Heekaya per Juz',w:3,gmv:27_430_561},{s:'Heekaya per Juz',w:4,gmv:44_476_300},{s:'Heekaya per Juz',w:5,gmv:49_217_800},{s:'Heekaya per Juz',w:6,gmv:150_529_760},{s:'Heekaya per Juz',w:7,gmv:147_290_600},{s:'Heekaya per Juz',w:8,gmv:42_299_400},{s:'Heekaya per Juz',w:9,gmv:3_587_000},{s:'Heekaya per Juz',w:10,gmv:1_055_000},{s:'Heekaya per Juz',w:14,gmv:1_900_477},{s:'Heekaya per Juz',w:15,gmv:14_146_917},{s:'Heekaya per Juz',w:16,gmv:9_077_324},{s:'Heekaya per Juz',w:17,gmv:211_000},{s:'Heekaya per Juz',w:24,gmv:2_532_000},{s:'Heekaya per Juz',w:25,gmv:4_431_000},{s:'Heekaya per Juz',w:26,gmv:1_055_000},

    // Heekaya Jaket
    {s:'Heekaya Jaket',w:1,gmv:17_528_199},{s:'Heekaya Jaket',w:2,gmv:21_400_459},{s:'Heekaya Jaket',w:3,gmv:22_071_131},{s:'Heekaya Jaket',w:4,gmv:27_907_265},{s:'Heekaya Jaket',w:5,gmv:35_855_265},{s:'Heekaya Jaket',w:6,gmv:50_639_791},{s:'Heekaya Jaket',w:7,gmv:25_526_398},{s:'Heekaya Jaket',w:8,gmv:47_676_326},{s:'Heekaya Jaket',w:9,gmv:37_730_396},{s:'Heekaya Jaket',w:10,gmv:36_283_301},{s:'Heekaya Jaket',w:11,gmv:24_621_000},{s:'Heekaya Jaket',w:12,gmv:13_461_000},{s:'Heekaya Jaket',w:13,gmv:16_593_086},{s:'Heekaya Jaket',w:14,gmv:27_324_694},{s:'Heekaya Jaket',w:15,gmv:14_142_268},{s:'Heekaya Jaket',w:16,gmv:14_993_330},{s:'Heekaya Jaket',w:17,gmv:14_044_654},{s:'Heekaya Jaket',w:18,gmv:11_338_000},{s:'Heekaya Jaket',w:19,gmv:19_151_000},{s:'Heekaya Jaket',w:20,gmv:7_733_148},{s:'Heekaya Jaket',w:21,gmv:9_576_084},{s:'Heekaya Jaket',w:22,gmv:19_449_000},{s:'Heekaya Jaket',w:23,gmv:18_876_000},{s:'Heekaya Jaket',w:24,gmv:22_839_000},{s:'Heekaya Jaket',w:25,gmv:12_877_000},{s:'Heekaya Jaket',w:26,gmv:4_144_000},

    // Reeyana (base)
    {s:'Reeyana',w:1,gmv:5_646_099},{s:'Reeyana',w:2,gmv:9_711_243},{s:'Reeyana',w:3,gmv:12_702_298},{s:'Reeyana',w:4,gmv:12_276_262},{s:'Reeyana',w:5,gmv:29_104_177},{s:'Reeyana',w:6,gmv:20_931_216},{s:'Reeyana',w:7,gmv:36_608_191},{s:'Reeyana',w:8,gmv:59_899_111},{s:'Reeyana',w:9,gmv:37_440_273},{s:'Reeyana',w:10,gmv:19_121_081},{s:'Reeyana',w:11,gmv:15_343_000},{s:'Reeyana',w:12,gmv:5_918_000},{s:'Reeyana',w:13,gmv:10_136_066},{s:'Reeyana',w:14,gmv:16_817_920},{s:'Reeyana',w:15,gmv:17_112_766},{s:'Reeyana',w:16,gmv:23_032_940},{s:'Reeyana',w:17,gmv:17_019_872},{s:'Reeyana',w:18,gmv:21_378_000},{s:'Reeyana',w:19,gmv:22_540_000},{s:'Reeyana',w:20,gmv:11_964_000},{s:'Reeyana',w:21,gmv:13_026_060},{s:'Reeyana',w:22,gmv:9_393_000},{s:'Reeyana',w:23,gmv:17_255_000},{s:'Reeyana',w:24,gmv:13_678_083},{s:'Reeyana',w:25,gmv:8_573_180},{s:'Reeyana',w:26,gmv:2_769_000},

    // Airees DPP
    {s:'Airees DPP',w:1,gmv:5_165_055},{s:'Airees DPP',w:2,gmv:9_119_022},{s:'Airees DPP',w:3,gmv:8_326_000},{s:'Airees DPP',w:4,gmv:12_651_766},{s:'Airees DPP',w:5,gmv:15_259_411},{s:'Airees DPP',w:6,gmv:15_576_349},{s:'Airees DPP',w:7,gmv:16_586_555},{s:'Airees DPP',w:8,gmv:27_379_189},{s:'Airees DPP',w:9,gmv:24_873_022},{s:'Airees DPP',w:10,gmv:51_402_000},{s:'Airees DPP',w:11,gmv:17_274_057},{s:'Airees DPP',w:12,gmv:6_444_014},{s:'Airees DPP',w:13,gmv:12_745_000},{s:'Airees DPP',w:14,gmv:14_417_412},{s:'Airees DPP',w:15,gmv:9_380_373},{s:'Airees DPP',w:16,gmv:9_802_350},{s:'Airees DPP',w:17,gmv:10_721_841},{s:'Airees DPP',w:18,gmv:9_471_079},{s:'Airees DPP',w:19,gmv:10_424_000},{s:'Airees DPP',w:20,gmv:11_510_426},{s:'Airees DPP',w:21,gmv:4_975_014},{s:'Airees DPP',w:22,gmv:6_363_028},{s:'Airees DPP',w:23,gmv:11_332_043},{s:'Airees DPP',w:24,gmv:11_869_014},{s:'Airees DPP',w:25,gmv:6_769_000},{s:'Airees DPP',w:26,gmv:3_005_000},

    // Heekaya DPP
    {s:'Heekaya DPP',w:1,gmv:7_725_689},{s:'Heekaya DPP',w:2,gmv:16_179_794},{s:'Heekaya DPP',w:3,gmv:10_771_400},{s:'Heekaya DPP',w:4,gmv:11_831_511},{s:'Heekaya DPP',w:5,gmv:14_174_844},{s:'Heekaya DPP',w:6,gmv:18_627_356},{s:'Heekaya DPP',w:7,gmv:15_336_233},{s:'Heekaya DPP',w:8,gmv:26_894_558},{s:'Heekaya DPP',w:9,gmv:22_191_024},{s:'Heekaya DPP',w:10,gmv:23_617_876},{s:'Heekaya DPP',w:11,gmv:11_091_800},{s:'Heekaya DPP',w:12,gmv:4_259_000},{s:'Heekaya DPP',w:13,gmv:8_828_900},{s:'Heekaya DPP',w:14,gmv:11_829_769},{s:'Heekaya DPP',w:15,gmv:9_905_475},{s:'Heekaya DPP',w:16,gmv:9_668_595},{s:'Heekaya DPP',w:17,gmv:11_026_002},{s:'Heekaya DPP',w:18,gmv:10_722_022},{s:'Heekaya DPP',w:19,gmv:13_955_000},{s:'Heekaya DPP',w:20,gmv:6_880_014},{s:'Heekaya DPP',w:21,gmv:7_705_000},{s:'Heekaya DPP',w:22,gmv:10_736_000},{s:'Heekaya DPP',w:23,gmv:16_578_014},{s:'Heekaya DPP',w:24,gmv:14_981_014},{s:'Heekaya DPP',w:25,gmv:13_807_000},{s:'Heekaya DPP',w:26,gmv:5_358_228},

    // Reeyana Prayer Mat
    {s:'Reeyana Prayer Mat',w:1,gmv:7_551_000},{s:'Reeyana Prayer Mat',w:2,gmv:12_626_000},{s:'Reeyana Prayer Mat',w:3,gmv:8_731_000},{s:'Reeyana Prayer Mat',w:4,gmv:6_371_000},{s:'Reeyana Prayer Mat',w:5,gmv:6_248_000},{s:'Reeyana Prayer Mat',w:6,gmv:8_258_186},{s:'Reeyana Prayer Mat',w:7,gmv:14_399_747},{s:'Reeyana Prayer Mat',w:8,gmv:19_584_000},{s:'Reeyana Prayer Mat',w:9,gmv:24_754_140},{s:'Reeyana Prayer Mat',w:10,gmv:40_801_168},{s:'Reeyana Prayer Mat',w:11,gmv:25_002_000},{s:'Reeyana Prayer Mat',w:12,gmv:3_302_000},{s:'Reeyana Prayer Mat',w:13,gmv:6_247_000},{s:'Reeyana Prayer Mat',w:14,gmv:6_849_192},{s:'Reeyana Prayer Mat',w:15,gmv:3_780_248},{s:'Reeyana Prayer Mat',w:16,gmv:3_776_304},{s:'Reeyana Prayer Mat',w:17,gmv:2_005_652},{s:'Reeyana Prayer Mat',w:18,gmv:6_962_000},{s:'Reeyana Prayer Mat',w:19,gmv:7_669_000},{s:'Reeyana Prayer Mat',w:20,gmv:1_415_000},{s:'Reeyana Prayer Mat',w:21,gmv:2_360_000},{s:'Reeyana Prayer Mat',w:22,gmv:3_657_000},{s:'Reeyana Prayer Mat',w:23,gmv:5_663_000},{s:'Reeyana Prayer Mat',w:24,gmv:3_776_000},{s:'Reeyana Prayer Mat',w:25,gmv:2_360_000},{s:'Reeyana Prayer Mat',w:26,gmv:590_000},

    // Zhafira Signature Tasbih New
    {s:'Zhafira Signature Tasbih New',w:1,gmv:4_425_300},{s:'Zhafira Signature Tasbih New',w:2,gmv:4_670_412},{s:'Zhafira Signature Tasbih New',w:3,gmv:8_637_600},{s:'Zhafira Signature Tasbih New',w:4,gmv:6_682_800},{s:'Zhafira Signature Tasbih New',w:5,gmv:15_189_600},{s:'Zhafira Signature Tasbih New',w:6,gmv:9_743_298},{s:'Zhafira Signature Tasbih New',w:7,gmv:10_740_510},{s:'Zhafira Signature Tasbih New',w:8,gmv:7_350_312},{s:'Zhafira Signature Tasbih New',w:9,gmv:16_086_900},{s:'Zhafira Signature Tasbih New',w:10,gmv:17_306_712},{s:'Zhafira Signature Tasbih New',w:11,gmv:8_786_700},{s:'Zhafira Signature Tasbih New',w:12,gmv:3_266_100},{s:'Zhafira Signature Tasbih New',w:13,gmv:6_053_700},{s:'Zhafira Signature Tasbih New',w:14,gmv:14_009_496},{s:'Zhafira Signature Tasbih New',w:15,gmv:10_557_132},{s:'Zhafira Signature Tasbih New',w:16,gmv:7_346_547},{s:'Zhafira Signature Tasbih New',w:17,gmv:9_369_648},{s:'Zhafira Signature Tasbih New',w:18,gmv:9_228_924},{s:'Zhafira Signature Tasbih New',w:19,gmv:13_542_300},{s:'Zhafira Signature Tasbih New',w:20,gmv:7_733_700},{s:'Zhafira Signature Tasbih New',w:21,gmv:4_085_700},{s:'Zhafira Signature Tasbih New',w:22,gmv:7_517_700},{s:'Zhafira Signature Tasbih New',w:23,gmv:8_587_500},{s:'Zhafira Signature Tasbih New',w:24,gmv:3_485_700},{s:'Zhafira Signature Tasbih New',w:25,gmv:3_484_200},{s:'Zhafira Signature Tasbih New',w:26,gmv:1_683_600},

    // Abbasy
    {s:'Abbasy',w:1,gmv:6_238_083},{s:'Abbasy',w:2,gmv:4_159_042},{s:'Abbasy',w:3,gmv:208_000},{s:'Abbasy',w:4,gmv:12_792_083},{s:'Abbasy',w:5,gmv:1_352_000},{s:'Abbasy',w:6,gmv:10_289_083},{s:'Abbasy',w:7,gmv:9_147_166},{s:'Abbasy',w:8,gmv:9_461_083},{s:'Abbasy',w:9,gmv:17_462_083},{s:'Abbasy',w:10,gmv:11_850_054},{s:'Abbasy',w:11,gmv:11_532_054},{s:'Abbasy',w:12,gmv:7_273_000},{s:'Abbasy',w:13,gmv:5_614_000},{s:'Abbasy',w:14,gmv:4_161_808},{s:'Abbasy',w:15,gmv:3_225_704},{s:'Abbasy',w:16,gmv:14_668_408},{s:'Abbasy',w:17,gmv:8_012_072},{s:'Abbasy',w:18,gmv:8_943_208},{s:'Abbasy',w:19,gmv:6_548_054},{s:'Abbasy',w:20,gmv:10_811_000},{s:'Abbasy',w:21,gmv:6_552_000},{s:'Abbasy',w:22,gmv:5_822_000},{s:'Abbasy',w:23,gmv:6_447_000},{s:'Abbasy',w:24,gmv:3_847_000},{s:'Abbasy',w:25,gmv:12_478_000},{s:'Abbasy',w:26,gmv:1_143_000},

    // Alamee HC (new product, mulai W21)
    {s:'Alamee HC',w:21,gmv:1_924_000},{s:'Alamee HC',w:22,gmv:5_772_000},{s:'Alamee HC',w:23,gmv:10_508_000},{s:'Alamee HC',w:24,gmv:7_473_659},{s:'Alamee HC',w:25,gmv:9_324_000},{s:'Alamee HC',w:26,gmv:3_996_000},

    // Lumee (new product, mulai W10)
    {s:'Lumee',w:10,gmv:450_000},{s:'Lumee',w:11,gmv:675_000},{s:'Lumee',w:13,gmv:5_400_000},{s:'Lumee',w:14,gmv:1_350_900},{s:'Lumee',w:15,gmv:675_675},{s:'Lumee',w:17,gmv:1_126_125},{s:'Lumee',w:18,gmv:675_000},{s:'Lumee',w:19,gmv:1_800_000},{s:'Lumee',w:20,gmv:7_875_000},{s:'Lumee',w:21,gmv:450_000},{s:'Lumee',w:22,gmv:1_125_000},{s:'Lumee',w:23,gmv:3_600_000},{s:'Lumee',w:24,gmv:1_575_000},{s:'Lumee',w:25,gmv:1_800_000}
  ],

  // ── Stok & demand series (dari mart_inventory, demand = avg 4 minggu W20–W23) ──
  seriStok: {
    'Reeyana Jaket':                { stok: 3_429, demandPerMinggu: 958, warna: '#e882b0' },
    'Reeyana HC':                   { stok: 4_378, demandPerMinggu: 759, warna: '#d46a9e' },
    'Reeyana BDDA':                 { stok: 5_472, demandPerMinggu: 168, warna: '#c85a8f' },
    'Heekaya HC':                   { stok:   201, demandPerMinggu:  66, warna: '#a78bfa' },
    'Heekaya per Juz':              { stok: 4_342, demandPerMinggu:   8, warna: '#7140c4' },
    'Heekaya Jaket':                { stok:   570, demandPerMinggu:  93, warna: '#9570e8' },
    'Reeyana':                      { stok:   184, demandPerMinggu:  91, warna: '#b04880' },
    'Airees DPP':                   { stok: 23_707, demandPerMinggu: 395, warna: '#7ab8d8' },
    'Heekaya DPP':                  { stok: 30_093, demandPerMinggu: 606, warna: '#8355d6' },
    'Reeyana Prayer Mat':           { stok:   624, demandPerMinggu:  33, warna: '#a83e75' },
    'Zhafira Signature Tasbih New': { stok: 2_874, demandPerMinggu: 231, warna: '#5ecbb0' },
    'Abbasy':                       { stok:   613, demandPerMinggu:  67, warna: '#6366f1' },
    'Alamee HC':                    { stok: 2_043, demandPerMinggu:  55, warna: '#4ecdc4' },
    'Lumee':                        { stok:   786, demandPerMinggu:   8, warna: '#f7b731' }
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
