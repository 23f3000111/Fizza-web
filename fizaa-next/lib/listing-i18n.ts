// Translation for listing *content* (as opposed to UI chrome, which lives in
// i18n.ts). Listings are user data, so there are three layers, tried in order:
//
//   1. A per-listing override block — listing.i18n.zh.title etc. Hand-written,
//      highest quality, used for prose (title, shortDesc, description).
//   2. A whole-string term lookup — closed sets like property type, city and
//      state, plus spec lines that read as sentences.
//   3. Ordered token rules — for the formulaic spec/size strings agents type
//      ("Land 63,340 sqft", "Power supply 200 amp"), so new listings written in
//      the same house style translate without anyone touching this file.
//
// Anything unmatched falls through as English, so a listing never renders blank.

import type { Lang } from "./i18n";
import type { Listing } from "./types";

// ── Whole-string terms ───────────────────────────────────────────────────
const TERMS_BM: Record<string, string> = {
  // Property types
  "Warehouse": "Gudang",
  "Detached Warehouse": "Gudang Sesebuah",
  "Factory": "Kilang",
  "Detached Factory": "Kilang Sesebuah",
  "Semi-D Factory": "Kilang Berkembar",
  "Land": "Tanah",
  "Industrial Land": "Tanah Perindustrian",
  "Development Land": "Tanah Pembangunan",
  // States
  "Selangor": "Selangor",
  "Kuala Lumpur": "Kuala Lumpur",
  "Perak": "Perak",
  "Negeri Sembilan": "Negeri Sembilan",
  // Sentence-style specs
  "Leasehold": "Pajakan",
  "Freehold": "Pegangan bebas",
  "Freehold Malay Reserve": "Pegangan bebas Rizab Melayu",
  "Residential 2 zoning": "Zon Kediaman 2",
  "Light industrial status": "Status industri ringan",
  "Direct main road access": "Akses terus ke jalan utama",
  "Single-floor design": "Reka bentuk satu tingkat",
  "Newly renovated office": "Pejabat baru diubah suai",
  "Solar panel ready": "Sedia untuk panel solar",
  "Also available for sale": "Turut ditawarkan untuk jualan",
  "2 units side by side available": "2 unit bersebelahan tersedia",
  "Next to TTDI": "Bersebelahan TTDI",
  "10 minutes to KL City": "10 minit ke Bandar KL",
  "8km to KLIA": "8km ke KLIA",
  "Sri Delima MRT — walking distance": "MRT Sri Delima — jarak berjalan kaki",
  "Corner lot — 40ft container access": "Lot penjuru — akses kontena 40kaki",
  "Rental on request": "Sewa atas permintaan",
  "2 blocks": "2 blok",
};

const TERMS_ZH: Record<string, string> = {
  // Property types
  "Warehouse": "仓库",
  "Detached Warehouse": "独立式仓库",
  "Factory": "厂房",
  "Detached Factory": "独立式厂房",
  "Semi-D Factory": "半独立式厂房",
  "Land": "地段",
  "Industrial Land": "工业地段",
  "Development Land": "发展地段",
  // Cities — only places with an established Chinese name. Puncak Alam and
  // Bandar Enstek have none in common use, so they stay in Latin script.
  "Kepong": "甲洞",
  "Klang": "巴生",
  "Banting": "万津",
  "Kuala Lumpur": "吉隆坡",
  "Shah Alam": "莎阿南",
  "Rawang": "万挠",
  "Taiping": "太平",
  // States
  "Selangor": "雪兰莪",
  "Perak": "霹雳",
  "Negeri Sembilan": "森美兰",
  // Sentence-style specs
  "Leasehold": "租赁地契",
  "Freehold": "永久地契",
  "Freehold Malay Reserve": "永久地契 · 马来保留地",
  "Residential 2 zoning": "住宅二类分区",
  "Light industrial status": "轻工业地位",
  "Direct main road access": "直通大路",
  "Single-floor design": "单层设计",
  "Newly renovated office": "办公室全新装修",
  "Solar panel ready": "已预留太阳能板",
  "Also available for sale": "亦可出售",
  "2 units side by side available": "两个单位相邻，可一并承租",
  "Next to TTDI": "毗邻 TTDI",
  "10 minutes to KL City": "10 分钟至吉隆坡市中心",
  "8km to KLIA": "距吉隆坡国际机场 8 公里",
  "Sri Delima MRT — walking distance": "Sri Delima 地铁站 — 步行可达",
  "Corner lot — 40ft container access": "转角地段 — 40尺货柜车可进出",
  "Rental on request": "租金请洽询",
  "2 blocks": "2 座",
  "29.3 acres": "29.3 英亩",
};

// ── Ordered token rules ──────────────────────────────────────────────────
// Longest / most specific first — these run as sequential replacements.
type Rule = [RegExp, string];

const RULES_BM: Rule[] = [
  [/\bTotal built-?up\b/gi, "Jumlah binaan"],
  [/\bPotential built-?up\b/gi, "Potensi binaan"],
  [/\bBuilt-?up\b/gi, "Binaan"],
  [/\bLand area\b/gi, "Luas tanah"],
  [/\bLand size\b/gi, "Saiz tanah"],
  [/\bLand\b/gi, "Tanah"],
  [/\bPower supply\b/gi, "Bekalan kuasa"],
  [/\bPower up to\b/gi, "Kuasa sehingga"],
  [/\bPower\b/gi, "Kuasa"],
  [/\bCeiling height\b/gi, "Ketinggian siling"],
  [/\bEaves? height\b/gi, "Ketinggian bumbung"],
  [/\bWarehouse height\b/gi, "Ketinggian gudang"],
  [/\bFloor loading\b/gi, "Beban lantai"],
  [/\bGround floor\b/gi, "Tingkat bawah"],
  [/\bloading bays?\b/gi, "ruang memunggah"],
  [/\bCargo lift\b/gi, "Lif kargo"],
  [/\bindustrial land\b/gi, "tanah perindustrian"],
  [/\bLeasehold\b/gi, "Pajakan"],
  [/\bFreehold\b/gi, "Pegangan bebas"],
  [/\bapprox\.?/gi, "anggaran"],
  [/\byears\b/gi, "tahun"],
  [/\bacres?\b/gi, "ekar"],
  [/\bmonth\b/gi, "bulan"],
  [/\bSize\b/g, "Saiz"],
  [/\bland\b/g, "tanah"],
];

const RULES_ZH: Rule[] = [
  [/\bTotal built-?up\b/gi, "总建筑面积"],
  [/\bPotential built-?up\b/gi, "潜在建筑面积"],
  [/\bBuilt-?up\b/gi, "建筑面积"],
  [/\bLand area\b/gi, "地段面积"],
  [/\bLand size\b/gi, "地段面积"],
  [/\bLand\b/gi, "地段"],
  [/\bPower supply\b/gi, "电力供应"],
  [/\bPower up to\b/gi, "电力最高"],
  [/\bPower\b/gi, "电力"],
  [/\bCeiling height\b/gi, "净空高度"],
  [/\bEaves? height\b/gi, "檐高"],
  [/\bWarehouse height\b/gi, "仓库高度"],
  [/\bFloor loading\b/gi, "楼面承重"],
  [/\bGround floor\b/gi, "底层"],
  [/\bloading bays?\b/gi, "装卸月台"],
  [/\bCargo lift\b/gi, "货梯"],
  [/\bindustrial land\b/gi, "工业地段"],
  [/\bLeasehold\b/gi, "租赁地契"],
  [/\bFreehold\b/gi, "永久地契"],
  [/\bTenanted\b/gi, "已出租"],
  [/\bupgradeable\b/gi, "可提升"],
  [/\badjoining parcels\b/gi, "相邻地块"],
  [/\bapprox\.?/gi, "约"],
  [/\bup to\b/gi, "最高"],
  [/\bbuildings?\b/gi, "座建筑"],
  [/\byears\b/gi, "年"],
  [/\bacres?\b/gi, "英亩"],
  [/\bsqft\b/gi, "平方尺"],
  [/\bsq\.? ?ft\b/gi, "平方尺"],
  [/\bamps?\b/gi, "安培"],
  [/\btonnes?\b/gi, "吨"],
  [/\bSize\b/g, "面积"],
  [/\bland\b/g, "地段"],
  [/\/\s*month\b/gi, "/月"],
  [/\bMYR\b/g, "马币"],
];

const TERMS: Partial<Record<Lang, Record<string, string>>> = { bm: TERMS_BM, zh: TERMS_ZH };
const RULES: Partial<Record<Lang, Rule[]>> = { bm: RULES_BM, zh: RULES_ZH };

/** Translate one listing string: whole-string term first, then token rules. */
export function tPhrase(lang: Lang, s: string | undefined | null): string {
  if (!s) return s ?? "";
  if (lang === "en") return s;
  const term = TERMS[lang]?.[s.trim()];
  if (term) return term;
  const rules = RULES[lang];
  if (!rules) return s;
  return rules.reduce((acc, [re, to]) => acc.replace(re, to), s);
}

/** Localised view of a listing. Falls back to English field by field. */
export function tListing(lang: Lang, l: Listing) {
  const over = lang === "en" ? undefined : l.i18n?.[lang];
  return {
    title: over?.title || l.title,
    shortDesc: over?.shortDesc || l.shortDesc,
    description: over?.description || l.description,
    specs: over?.specs || (l.specs || []).map((s) => tPhrase(lang, s)),
    propertyType: tPhrase(lang, l.propertyType),
    city: tPhrase(lang, l.city),
    state: tPhrase(lang, l.state),
    sizeUnit: tPhrase(lang, l.sizeUnit),
    priceLabel: tPhrase(lang, l.priceLabel),
  };
}
