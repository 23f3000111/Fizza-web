// Lightweight i18n. English is the source language and also the lookup key;
// translated strings live in the per-language maps below. translate() falls back
// to the English source whenever a translation is missing, so the app never shows
// a key. This file is client-safe (no next/headers) — server code uses
// i18n-server.ts.

export type Lang = "en" | "bm" | "zh";
export const LANGS: Lang[] = ["en", "bm", "zh"];
export const LANG_LABEL: Record<Lang, string> = { en: "EN", bm: "BM", zh: "中文" };
export const LANG_COOKIE = "lang";

// HTML lang attribute per language (BCP 47).
export const HTML_LANG: Record<Lang, string> = { en: "en", bm: "ms", zh: "zh-Hans" };

export const isLang = (v: unknown): v is Lang => LANGS.includes(v as Lang);

export function translate(lang: Lang, en: string): string {
  return DICT[lang]?.[en] ?? en;
}

// ── English → Bahasa Melayu ──────────────────────────────────────────────
export const BM: Record<string, string> = {
  // Nav
  "Home": "Utama",
  "Listings": "Senarai Hartanah",
  "Our Journey": "Perjalanan Kami",
  "FAQ": "Soalan Lazim",
  "Contact": "Hubungi",
  "Get a Quote": "Dapatkan Sebut Harga",
  "Industrial & Commercial · Malaysia": "Perindustrian & Komersial · Malaysia",

  // Home — hero
  "Your Trusted Partner in Industrial & Commercial Property.": "Rakan Dipercayai Anda dalam Hartanah Perindustrian & Komersial.",
  "Factories, warehouses, hotels, offices and industrial land across Malaysia — handled personally by one dedicated negotiator, from first enquiry to final handover.":
    "Kilang, gudang, hotel, pejabat dan tanah perindustrian di seluruh Malaysia — diuruskan secara peribadi oleh seorang perunding yang berdedikasi, dari pertanyaan pertama hingga serah kunci.",
  "Browse listings": "Lihat senarai",
  "Get a quote": "Dapatkan sebut harga",
  "Registered Estate Negotiator": "Perunding Hartanah Berdaftar",
  "Active listings nationwide": "Senarai aktif seluruh negara",
  "Industrial & commercial focus": "Fokus perindustrian & komersial",

  // Home — brands strip
  "Trusted across": "Dipercayai di",

  // Home — values
  "Why work with Fizaa": "Mengapa bekerja dengan Fizaa",
  "Property is a people business — handled by one pair of hands.":
    "Hartanah ialah perniagaan tentang manusia — diuruskan oleh sepasang tangan yang sama.",
  "No call-centres, no handoffs, no template replies. Every industrial and commercial enquiry is personally vetted and personally served.":
    "Tiada pusat panggilan, tiada serah-menyerah, tiada jawapan templat. Setiap pertanyaan perindustrian dan komersial disemak dan dilayan secara peribadi.",
  "A registered hand": "Tangan yang berdaftar",
  "REN 63161 under Esprit Estate Agent Sdn Bhd — licensed, compliant, and operating within BOVAEP's framework.":
    "REN 63161 di bawah Esprit Estate Agent Sdn Bhd — berlesen, mematuhi peraturan, dan beroperasi dalam rangka kerja BOVAEP.",
  "Industrial specialist": "Pakar perindustrian",
  "Focused only on factories, warehouses, lands, commercial plots and hotel assets — sharper advice than any generalist.":
    "Tertumpu hanya pada kilang, gudang, tanah, lot komersial dan aset hotel — nasihat yang lebih tajam daripada ejen umum.",
  "Verified before viewing": "Disahkan sebelum melihat",
  "Title, zoning, power supply and lease terms checked before you visit — not discovered after the offer.":
    "Hakmilik, zon, bekalan kuasa dan terma pajakan disemak sebelum anda melawat — bukan ditemui selepas tawaran.",

  // Home — latest
  "Latest projects": "Projek terkini",
  "Currently in the portfolio.": "Dalam portfolio sekarang.",
  "View all listings": "Lihat semua senarai",
  "New listings coming soon.": "Senarai baharu akan datang.",
  "Fizaa is curating the latest industrial & commercial opportunities. Get in touch to discuss your requirement.":
    "Fizaa sedang menyusun peluang perindustrian & komersial terkini. Hubungi kami untuk membincangkan keperluan anda.",
  "Tell Fizaa what you need": "Beritahu Fizaa keperluan anda",

  // Home — reviews
  "What clients say": "Apa kata pelanggan",
  "Trusted by businesses across Malaysia.": "Dipercayai oleh perniagaan di seluruh Malaysia.",
  "Logistics Director": "Pengarah Logistik",
  "Manufacturing Owner": "Pemilik Pembuatan",
  "Private Investor": "Pelabur Persendirian",

  // Home — CTA
  "Let's find your next property.": "Mari cari hartanah anda yang seterusnya.",
  "Tell Fizaa what your business needs — type, size, power, location and budget — and get matched to the right industrial or commercial space.":
    "Beritahu Fizaa keperluan perniagaan anda — jenis, saiz, kuasa, lokasi dan bajet — dan dipadankan dengan ruang perindustrian atau komersial yang tepat.",

  // Footer
  "A dedicated estate negotiator under": "Seorang perunding hartanah berdedikasi di bawah",
  "Licensed, focused, and genuinely committed to solving your industrial & commercial property needs.":
    "Berlesen, fokus, dan benar-benar komited untuk menyelesaikan keperluan hartanah perindustrian & komersial anda.",
  "Explore": "Terokai",
  "All Listings": "Semua Senarai",
  "Specialties": "Kepakaran",
  "Factories": "Kilang",
  "Warehouses": "Gudang",
  "Hotel Assets": "Aset Hotel",
  "Industrial Land": "Tanah Perindustrian",
  "Reach": "Hubungan",
  "Built for industrial & commercial Malaysia": "Dibina untuk Malaysia perindustrian & komersial",

  // Listings
  "Our Listings": "Senarai Kami",
  "Industrial & commercial property across Malaysia.": "Hartanah perindustrian & komersial di seluruh Malaysia.",
  "Search by type, location and more — and see everything on the map.": "Cari mengikut jenis, lokasi dan lagi — dan lihat semuanya di peta.",
  "All": "Semua",
  "Sale": "Jual",
  "Rent": "Sewa",
  "Search keyword (e.g. factory, warehouse, Banting)": "Cari kata kunci (cth. kilang, gudang, Banting)",
  "Property Type": "Jenis Hartanah",
  "All Cities": "Semua Bandar",
  "Search": "Cari",
  "Filters": "Penapis",
  "Clear all": "Kosongkan semua",
  "Type": "Jenis",
  "Location": "Lokasi",
  "Price (MYR)": "Harga (MYR)",
  "Min": "Min",
  "Max": "Maks",
  "Others": "Lain-lain",
  "No extra filters yet": "Tiada penapis tambahan lagi",
  "None yet": "Tiada lagi",
  "property": "hartanah",
  "properties": "hartanah",
  "Show map": "Tunjuk peta",
  "Hide map": "Sembunyi peta",
  "Sort: Newest": "Susun: Terbaharu",
  "Price: Low to High": "Harga: Rendah ke Tinggi",
  "Price: High to Low": "Harga: Tinggi ke Rendah",
  "Oldest": "Terlama",
  "No properties match your filters.": "Tiada hartanah sepadan dengan penapis anda.",
  "Clear filters": "Kosongkan penapis",
  "Loading…": "Memuatkan…",

  // Listing detail
  "For Rent": "Untuk Disewa",
  "For Sale": "Untuk Dijual",
  "Rental": "Sewaan",
  "Sale price": "Harga jualan",
  "Contact for price": "Hubungi untuk harga",
  "Highlights": "Sorotan",
  "About this property": "Mengenai hartanah ini",
  "Details": "Butiran",
  "Documents & brochures": "Dokumen & risalah",
  "Download": "Muat turun",
  "Property type": "Jenis hartanah",
  "Deal": "Transaksi",
  "City": "Bandar",
  "State": "Negeri",
  "Size": "Saiz",
  "Beds": "Bilik tidur",
  "Baths": "Bilik air",
  "WhatsApp about this": "WhatsApp tentang ini",
  "Call": "Telefon",
  "Enquire about this property": "Tanya tentang hartanah ini",
  "Fizaa will reply personally.": "Fizaa akan membalas secara peribadi.",
  "View": "Lihat",

  // Inquiry / forms (shared)
  "Your name *": "Nama anda *",
  "Phone / WhatsApp *": "Telefon / WhatsApp *",
  "Email (optional)": "E-mel (pilihan)",
  "Send enquiry": "Hantar pertanyaan",
  "Sending…": "Menghantar…",
  "Thank you! Fizaa will be in touch shortly.": "Terima kasih! Fizaa akan menghubungi anda sebentar lagi.",

  // Quote page
  "Tell Fizaa what your business needs.": "Beritahu Fizaa keperluan perniagaan anda.",
  "Share your requirement — type, size, power, location and budget — and get a tailored shortlist of industrial & commercial options, including off-market properties.":
    "Kongsi keperluan anda — jenis, saiz, kuasa, lokasi dan bajet — dan dapatkan senarai pendek pilihan perindustrian & komersial yang disesuaikan, termasuk hartanah luar pasaran.",
  "Property requirement": "Keperluan hartanah",
  "Your enquiry": "Pertanyaan anda",
  "Inquiry Type": "Jenis Pertanyaan",
  "Select…": "Pilih…",
  "I'm a…": "Saya seorang…",
  "Contact details": "Maklumat perhubungan",
  "First Name": "Nama Pertama",
  "Last Name": "Nama Akhir",
  "Your first name": "Nama pertama anda",
  "Your last name": "Nama akhir anda",
  "Email": "E-mel",
  "Mobile": "Telefon Bimbit",
  "Area": "Kawasan",
  "Country": "Negara",
  "Zip Code": "Poskod",
  "Property preferences": "Pilihan hartanah",
  "Max Price (MYR)": "Harga Maksimum (MYR)",
  "Minimum Size (sq ft)": "Saiz Minimum (kaki persegi)",
  "No. of Beds": "Bil. Bilik Tidur",
  "No. of Baths": "Bil. Bilik Air",
  "Message": "Mesej",
  "Send my requirement": "Hantar keperluan saya",
  "Speak to Fizaa": "Bercakap dengan Fizaa",
  "Mobile / WhatsApp": "Telefon / WhatsApp",
  "Licence": "Lesen",
  "Thank you — request received.": "Terima kasih — permintaan diterima.",
  "Fizaa will personally review your requirement and get back to you shortly, usually within hours.":
    "Fizaa akan menyemak keperluan anda secara peribadi dan menghubungi anda sebentar lagi, biasanya dalam beberapa jam.",
  "WhatsApp Fizaa": "WhatsApp Fizaa",

  // Contact page
  "Contact Us": "Hubungi Kami",
  "Let's start a conversation.": "Mari mulakan perbualan.",
  "Send a message": "Hantar mesej",
  "Submit": "Hantar",
  "Message sent!": "Mesej dihantar!",
  "For inquiries": "Untuk pertanyaan",
  "Agency": "Agensi",
  "Office": "Pejabat",
  "Hours": "Waktu",
  "Registration": "Pendaftaran",

  // FAQ
  "Frequently asked": "Kerap ditanya",
  "Questions, answered.": "Soalan, dijawab.",
  "Still have a question?": "Masih ada soalan?",
  "Ask Fizaa directly — she replies personally, usually within minutes.":
    "Tanya Fizaa terus — beliau membalas secara peribadi, biasanya dalam beberapa minit.",
  "Contact form": "Borang hubungi",

  // Journey
  "Property is a people business.": "Hartanah ialah perniagaan tentang manusia.",
  "Work with Fizaa": "Bekerja dengan Fizaa",
  "What we do": "Apa yang kami buat",
  "Specialist advice across the industrial & commercial spectrum.":
    "Nasihat pakar merentas spektrum perindustrian & komersial.",
  "Factories & warehouses": "Kilang & gudang",
  "Commercial & hotel": "Komersial & hotel",
  "Honours & achievements": "Penghargaan & pencapaian",
  "Milestones along the way.": "Pencapaian sepanjang perjalanan.",
  "Selected projects": "Projek terpilih",
  "From the portfolio.": "Daripada portfolio.",
  "Projects coming soon.": "Projek akan datang.",
  "Discuss your requirement": "Bincang keperluan anda",

  // Chatbot
  "Property Assistant": "Pembantu Hartanah",
  "Online · replies in minutes": "Dalam talian · membalas dalam minit",
  "Hi, I'm Fizaa's assistant 👋": "Hai, saya pembantu Fizaa 👋",
  "Industrial & commercial property across Malaysia. Leave your details so Fizaa can follow up, then let's chat.":
    "Hartanah perindustrian & komersial di seluruh Malaysia. Tinggalkan butiran anda supaya Fizaa boleh menyusul, kemudian mari berbual.",
  "Phone (WhatsApp) *": "Telefon (WhatsApp) *",
  "Start chat →": "Mula bersembang →",
  "By starting, you agree Fizaa may contact you about your enquiry.":
    "Dengan memulakan, anda bersetuju Fizaa boleh menghubungi anda mengenai pertanyaan anda.",
  "Type a message…": "Taip mesej…",
  "Prefer WhatsApp? Chat with Fizaa directly →": "Lebih suka WhatsApp? Berbual dengan Fizaa terus →",
  "Talk to Fizaa": "Bercakap dengan Fizaa",
  "Agent fees": "Yuran ejen",

  // Quote — extra
  "Fields marked * are required. Fizaa replies in hours, not days.":
    "Medan bertanda * adalah wajib. Fizaa membalas dalam beberapa jam, bukan berhari-hari.",
  "Tell Fizaa more — eave height, power supply, zoning, timeline…":
    "Beritahu Fizaa lebih lanjut — ketinggian bumbung, bekalan kuasa, zon, jangka masa…",
  "No obligation.": "Tiada obligasi.",
  "Your details are used only to respond to your enquiry — never shared or sold. Fizaa handles every requirement personally.":
    "Butiran anda hanya digunakan untuk membalas pertanyaan anda — tidak pernah dikongsi atau dijual. Fizaa mengendalikan setiap keperluan secara peribadi.",

  // Contact — extra
  "Whether it's a site visit, a second opinion on a deal, or a quiet chat about buying, leasing or investing — Fizaa replies personally.":
    "Sama ada lawatan tapak, pandangan kedua tentang sesuatu transaksi, atau perbualan ringkas tentang membeli, memajak atau melabur — Fizaa membalas secara peribadi.",
  "Thanks for reaching out — Fizaa will reply to you shortly.":
    "Terima kasih kerana menghubungi — Fizaa akan membalas anda sebentar lagi.",
  "Fill in the form and Fizaa will get back to you directly.":
    "Isi borang ini dan Fizaa akan menghubungi anda secara terus.",
  "Enter your name": "Masukkan nama anda",
  "Enter your last name": "Masukkan nama akhir anda",
  "How can Fizaa help?": "Bagaimana Fizaa boleh membantu?",
  "I consent to having this website store my submitted information.":
    "Saya bersetuju laman web ini menyimpan maklumat yang saya hantar.",

  // Journey — extra
  "Available": "Tersedia",
  "I'm just a friendly agent who goes the extra mile to solve my client's problems.":
    "Saya hanyalah ejen yang mesra dan sanggup berusaha lebih untuk menyelesaikan masalah pelanggan saya.",
  "Her approach is simple: understand the business first, then match it to the right space. Every listing is personally vetted, every client personally served — nothing handed off to an assistant or resolved by a template reply.":
    "Pendekatannya mudah: fahami perniagaan dahulu, kemudian padankan dengan ruang yang tepat. Setiap senarai disemak secara peribadi, setiap pelanggan dilayan secara peribadi — tiada yang diserahkan kepada pembantu atau diselesaikan dengan jawapan templat.",
  "24/7 Response": "Respons 24/7",
  "Industrial & Commercial": "Perindustrian & Komersial",
  "Nur Hafizah · Personal Philosophy": "Nur Hafizah · Falsafah Peribadi",
  "Detached and semi-detached factories, superlink warehouses and logistics facilities — matched to your floor area, eave height, power and loading needs.":
    "Kilang sesebuah dan berkembar, gudang superlink dan kemudahan logistik — dipadankan dengan luas lantai, ketinggian bumbung, kuasa dan keperluan memunggah anda.",
  "Freehold and leasehold plots in established parks and ESG-certified developments, with zoning, title and MITI requirements verified up front.":
    "Lot pegangan bebas dan pajakan di taman mantap dan pembangunan bertauliah ESG, dengan zon, hakmilik dan keperluan MITI disahkan terlebih dahulu.",
  "Office floors, shoplots, built-to-rent developments and hotel assets — including investment-grade, tenanted opportunities with verified yields.":
    "Tingkat pejabat, lot kedai, pembangunan built-to-rent dan aset hotel — termasuk peluang gred pelaburan yang telah disewa dengan pulangan disahkan.",
  "Attended the ESP Global Ascend Bootcamp — a transformational programme on mindset, courage and professional purpose, including a Letter to Future Self.":
    "Menghadiri ESP Global Ascend Bootcamp — program transformasi tentang minda, keberanian dan tujuan profesional, termasuk Surat kepada Diri Masa Depan.",
  "Recognised among Esprit's top performers for consistent results and dedication — a milestone that's never about the trophy, but the standard it represents.":
    "Diiktiraf antara penyumbang terbaik Esprit kerana hasil yang konsisten dan dedikasi — satu pencapaian yang bukan tentang trofi, tetapi piawai yang diwakilinya.",
  "On the ground, every deal": "Di lapangan, setiap transaksi",
  "Every deal starts with a site visit. Fizaa walks the property — rain or shine — so clients get accurate, first-hand information, not recycled brochure data.":
    "Setiap transaksi bermula dengan lawatan tapak. Fizaa menyelusuri hartanah — hujan atau panas — supaya pelanggan mendapat maklumat tepat dan terus, bukan data risalah kitar semula.",
  "Fizaa's latest industrial & commercial projects will appear here.":
    "Projek perindustrian & komersial terkini Fizaa akan dipaparkan di sini.",

  // FAQ — extra
  "Common questions about industrial & commercial property, REN registration, agent fees and what Fizaa actually does — before you pick up the phone.":
    "Soalan lazim tentang hartanah perindustrian & komersial, pendaftaran REN, yuran ejen dan apa yang Fizaa sebenarnya lakukan — sebelum anda menghubunginya.",

  // v2 — nav segments
  "Industrial": "Perindustrian",
  "Commercial": "Komersial",
  "Hotel": "Hotel",
  "FAQs": "Soalan Lazim",
  "Contacts": "Hubungi",

  // v2 — home hero & search
  "All Malaysia": "Seluruh Malaysia",
  "Search property…": "Cari hartanah…",
  "Explore:": "Terokai:",
  "Min price": "Harga min",
  "Max price": "Harga maks",

  // v2 — segment pages
  "Industrial Property": "Hartanah Perindustrian",
  "Factories, warehouses, logistics facilities and industrial land across Malaysia.":
    "Kilang, gudang, kemudahan logistik dan tanah perindustrian di seluruh Malaysia.",
  "Commercial Property": "Hartanah Komersial",
  "Office floors, shoplots, retail and built-to-rent commercial space.":
    "Tingkat pejabat, lot kedai, runcit dan ruang komersial built-to-rent.",
  "Investment-grade hotel and hospitality assets, including tenanted opportunities.":
    "Aset hotel dan hospitaliti gred pelaburan, termasuk peluang yang telah disewa.",
  "No properties here yet.": "Belum ada hartanah di sini.",
  "Tell Fizaa what you need and she'll source it for you.":
    "Beritahu Fizaa keperluan anda dan beliau akan mencarikannya untuk anda.",
  "beds": "bilik tidur",
  "baths": "bilik air",
  "Looking for something specific?": "Mencari sesuatu yang khusus?",
  "Share your brief — size, power, zoning, budget — and get matched, including off-market.":
    "Kongsi keperluan anda — saiz, kuasa, zon, bajet — dan dipadankan, termasuk luar pasaran.",
  "Tell Fizaa": "Beritahu Fizaa",

  // v2 — footer
  "Powered by": "Dikuasakan oleh",
};

// ── English → 简体中文 (Simplified Chinese) ───────────────────────────────
export const ZH: Record<string, string> = {
  // Nav
  "Home": "首页",
  "Listings": "房源",
  "Our Journey": "我们的历程",
  "FAQ": "常见问题",
  "Contact": "联系",
  "Get a Quote": "获取报价",
  "Industrial & Commercial · Malaysia": "工业与商业 · 马来西亚",

  // Home — hero
  "Your Trusted Partner in Industrial & Commercial Property.": "您值得信赖的工业与商业地产伙伴。",
  "Factories, warehouses, hotels, offices and industrial land across Malaysia — handled personally by one dedicated negotiator, from first enquiry to final handover.":
    "遍布马来西亚的厂房、仓库、酒店、办公室与工业地段——由一位专属地产协商员亲自跟进，从初次咨询到最终交接。",
  "Browse listings": "浏览房源",
  "Get a quote": "获取报价",
  "Registered Estate Negotiator": "注册地产协商员",
  "Active listings nationwide": "全国在售在租房源",
  "Industrial & commercial focus": "专注工业与商业地产",

  // Home — brands strip
  "Trusted across": "值得信赖于",

  // Home — values
  "Why work with Fizaa": "为什么选择 Fizaa",
  "Property is a people business — handled by one pair of hands.":
    "地产是与人打交道的生意——始终由同一双手亲自处理。",
  "No call-centres, no handoffs, no template replies. Every industrial and commercial enquiry is personally vetted and personally served.":
    "没有客服中心，没有转手，没有模板回复。每一宗工业与商业咨询都由本人亲自审核、亲自服务。",
  "A registered hand": "持牌专业",
  "REN 63161 under Esprit Estate Agent Sdn Bhd — licensed, compliant, and operating within BOVAEP's framework.":
    "隶属 Esprit Estate Agent Sdn Bhd 的 REN 63161——持牌合规，在 BOVAEP 监管框架内执业。",
  "Industrial specialist": "工业地产专家",
  "Focused only on factories, warehouses, lands, commercial plots and hotel assets — sharper advice than any generalist.":
    "只专注于厂房、仓库、地段、商业用地与酒店资产——比全能型经纪更精准的建议。",
  "Verified before viewing": "看房前先核实",
  "Title, zoning, power supply and lease terms checked before you visit — not discovered after the offer.":
    "地契、分区、电力供应与租约条款在您到场前已核实——而非出价后才发现。",

  // Home — latest
  "Latest projects": "最新项目",
  "Currently in the portfolio.": "目前的房源组合。",
  "View all listings": "查看全部房源",
  "New listings coming soon.": "新房源即将上架。",
  "Fizaa is curating the latest industrial & commercial opportunities. Get in touch to discuss your requirement.":
    "Fizaa 正在筛选最新的工业与商业机会。欢迎联系，详谈您的需求。",
  "Tell Fizaa what you need": "告诉 Fizaa 您的需求",

  // Home — reviews
  "What clients say": "客户评价",
  "Trusted by businesses across Malaysia.": "深受马来西亚各地企业信赖。",
  "Logistics Director": "物流总监",
  "Manufacturing Owner": "制造业东主",
  "Private Investor": "私人投资者",

  // Home — CTA
  "Let's find your next property.": "让我们找到您的下一处物业。",
  "Tell Fizaa what your business needs — type, size, power, location and budget — and get matched to the right industrial or commercial space.":
    "告诉 Fizaa 您企业的需求——类型、面积、电力、地点与预算——即可匹配到合适的工业或商业空间。",

  // Footer
  "A dedicated estate negotiator under": "专属地产协商员，隶属",
  "Licensed, focused, and genuinely committed to solving your industrial & commercial property needs.":
    "持牌、专注，真诚致力于解决您的工业与商业地产需求。",
  "Explore": "探索",
  "All Listings": "全部房源",
  "Specialties": "专业领域",
  "Factories": "厂房",
  "Warehouses": "仓库",
  "Hotel Assets": "酒店资产",
  "Industrial Land": "工业地段",
  "Reach": "联系方式",
  "Built for industrial & commercial Malaysia": "为马来西亚工业与商业地产而建",

  // Listings
  "Our Listings": "我们的房源",
  "Industrial & commercial property across Malaysia.": "遍布马来西亚的工业与商业地产。",
  "Search by type, location and more — and see everything on the map.": "按类型、地点等条件搜索——并在地图上一览无遗。",
  "All": "全部",
  "Sale": "出售",
  "Rent": "出租",
  "Search keyword (e.g. factory, warehouse, Banting)": "搜索关键词（例如：厂房、仓库、Banting）",
  "Property Type": "物业类型",
  "All Cities": "所有城市",
  "Search": "搜索",
  "Filters": "筛选",
  "Clear all": "清除全部",
  "Type": "类型",
  "Location": "地点",
  "Price (MYR)": "价格（马币）",
  "Min": "最低",
  "Max": "最高",
  "Others": "其他",
  "No extra filters yet": "暂无其他筛选条件",
  "None yet": "暂无",
  "property": "个物业",
  "properties": "个物业",
  "Show map": "显示地图",
  "Hide map": "隐藏地图",
  "Sort: Newest": "排序：最新",
  "Price: Low to High": "价格：由低至高",
  "Price: High to Low": "价格：由高至低",
  "Oldest": "最早",
  "No properties match your filters.": "没有符合筛选条件的物业。",
  "Clear filters": "清除筛选",
  "Loading…": "加载中…",

  // Listing detail
  "For Rent": "出租",
  "For Sale": "出售",
  "Rental": "租金",
  "Sale price": "售价",
  "Contact for price": "价格请洽询",
  "Highlights": "亮点",
  "About this property": "物业简介",
  "Details": "详细资料",
  "Documents & brochures": "文件与宣传册",
  "Download": "下载",
  "Property type": "物业类型",
  "Deal": "交易方式",
  "City": "城市",
  "State": "州属",
  "Size": "面积",
  "Beds": "卧室",
  "Baths": "浴室",
  "WhatsApp about this": "WhatsApp 咨询此物业",
  "Call": "致电",
  "Enquire about this property": "咨询此物业",
  "Fizaa will reply personally.": "Fizaa 将亲自回复。",
  "View": "查看",

  // Inquiry / forms (shared)
  "Your name *": "您的姓名 *",
  "Phone / WhatsApp *": "电话 / WhatsApp *",
  "Email (optional)": "电邮（选填）",
  "Send enquiry": "发送咨询",
  "Sending…": "发送中…",
  "Thank you! Fizaa will be in touch shortly.": "谢谢！Fizaa 将尽快与您联系。",

  // Quote page
  "Tell Fizaa what your business needs.": "告诉 Fizaa 您企业的需求。",
  "Share your requirement — type, size, power, location and budget — and get a tailored shortlist of industrial & commercial options, including off-market properties.":
    "分享您的需求——类型、面积、电力、地点与预算——即可获得一份量身定制的工业与商业选项清单，包括未公开的私洽房源。",
  "Property requirement": "物业需求",
  "Your enquiry": "您的咨询",
  "Inquiry Type": "咨询类型",
  "Select…": "请选择…",
  "I'm a…": "我是…",
  "Contact details": "联络资料",
  "First Name": "名字",
  "Last Name": "姓氏",
  "Your first name": "您的名字",
  "Your last name": "您的姓氏",
  "Email": "电邮",
  "Mobile": "手机",
  "Area": "地区",
  "Country": "国家",
  "Zip Code": "邮政编码",
  "Property preferences": "物业偏好",
  "Max Price (MYR)": "最高价格（马币）",
  "Minimum Size (sq ft)": "最小面积（平方尺）",
  "No. of Beds": "卧室数量",
  "No. of Baths": "浴室数量",
  "Message": "留言",
  "Send my requirement": "发送我的需求",
  "Speak to Fizaa": "与 Fizaa 洽谈",
  "Mobile / WhatsApp": "手机 / WhatsApp",
  "Licence": "执照",
  "Thank you — request received.": "谢谢——已收到您的请求。",
  "Fizaa will personally review your requirement and get back to you shortly, usually within hours.":
    "Fizaa 将亲自审阅您的需求并尽快回复，通常在数小时之内。",
  "WhatsApp Fizaa": "WhatsApp 联系 Fizaa",

  // Contact page
  "Contact Us": "联系我们",
  "Let's start a conversation.": "让我们聊一聊。",
  "Send a message": "发送讯息",
  "Submit": "提交",
  "Message sent!": "讯息已发送！",
  "For inquiries": "咨询请洽",
  "Agency": "代理行",
  "Office": "办公室",
  "Hours": "营业时间",
  "Registration": "注册编号",

  // FAQ
  "Frequently asked": "常见问题",
  "Questions, answered.": "为您解答。",
  "Still have a question?": "还有疑问？",
  "Ask Fizaa directly — she replies personally, usually within minutes.":
    "直接询问 Fizaa——本人亲自回复，通常只需几分钟。",
  "Contact form": "联络表格",

  // Journey
  "Property is a people business.": "地产是与人打交道的生意。",
  "Work with Fizaa": "与 Fizaa 合作",
  "What we do": "我们的服务",
  "Specialist advice across the industrial & commercial spectrum.":
    "涵盖整个工业与商业领域的专业建议。",
  "Factories & warehouses": "厂房与仓库",
  "Commercial & hotel": "商业与酒店",
  "Honours & achievements": "荣誉与成就",
  "Milestones along the way.": "一路走来的里程碑。",
  "Selected projects": "精选项目",
  "From the portfolio.": "来自房源组合。",
  "Projects coming soon.": "项目即将呈现。",
  "Discuss your requirement": "洽谈您的需求",

  // Chatbot
  "Property Assistant": "地产助理",
  "Online · replies in minutes": "在线 · 数分钟内回复",
  "Hi, I'm Fizaa's assistant 👋": "您好，我是 Fizaa 的助理 👋",
  "Industrial & commercial property across Malaysia. Leave your details so Fizaa can follow up, then let's chat.":
    "遍布马来西亚的工业与商业地产。请留下您的联络资料以便 Fizaa 跟进，然后我们聊聊。",
  "Phone (WhatsApp) *": "电话（WhatsApp）*",
  "Start chat →": "开始对话 →",
  "By starting, you agree Fizaa may contact you about your enquiry.":
    "开始即表示您同意 Fizaa 就您的咨询与您联系。",
  "Type a message…": "输入讯息…",
  "Prefer WhatsApp? Chat with Fizaa directly →": "更喜欢用 WhatsApp？直接与 Fizaa 对话 →",
  "Talk to Fizaa": "与 Fizaa 交谈",
  "Agent fees": "代理费用",

  // Quote — extra
  "Fields marked * are required. Fizaa replies in hours, not days.":
    "标有 * 的栏位为必填。Fizaa 以小时计回复，而非以天计。",
  "Tell Fizaa more — eave height, power supply, zoning, timeline…":
    "告诉 Fizaa 更多细节——檐高、电力供应、分区用途、时间安排…",
  "No obligation.": "绝无义务。",
  "Your details are used only to respond to your enquiry — never shared or sold. Fizaa handles every requirement personally.":
    "您的资料仅用于回复您的咨询——绝不分享或出售。每一项需求均由 Fizaa 亲自处理。",

  // Contact — extra
  "Whether it's a site visit, a second opinion on a deal, or a quiet chat about buying, leasing or investing — Fizaa replies personally.":
    "无论是实地考察、对某宗交易的第二意见，还是关于买卖、租赁或投资的私下交流——Fizaa 都会亲自回复。",
  "Thanks for reaching out — Fizaa will reply to you shortly.":
    "感谢您的联系——Fizaa 将尽快回复您。",
  "Fill in the form and Fizaa will get back to you directly.":
    "填写表格，Fizaa 将直接与您联系。",
  "Enter your name": "请输入您的姓名",
  "Enter your last name": "请输入您的姓氏",
  "How can Fizaa help?": "Fizaa 能为您做些什么？",
  "I consent to having this website store my submitted information.":
    "我同意本网站储存我所提交的资料。",

  // Journey — extra
  "Available": "可洽询",
  "I'm just a friendly agent who goes the extra mile to solve my client's problems.":
    "我只是一位亲切的经纪，愿意多走一步，为客户解决问题。",
  "Her approach is simple: understand the business first, then match it to the right space. Every listing is personally vetted, every client personally served — nothing handed off to an assistant or resolved by a template reply.":
    "她的做法很简单：先了解生意，再匹配合适的空间。每一个房源都由本人亲自审核，每一位客户都由本人亲自服务——绝不转交助理，也绝不以模板回复敷衍。",
  "24/7 Response": "全天候回应",
  "Industrial & Commercial": "工业与商业",
  "Nur Hafizah · Personal Philosophy": "Nur Hafizah · 个人理念",
  "Detached and semi-detached factories, superlink warehouses and logistics facilities — matched to your floor area, eave height, power and loading needs.":
    "独立式与半独立式厂房、超级连排仓库及物流设施——依您对楼面面积、檐高、电力与装卸的需求进行匹配。",
  "Freehold and leasehold plots in established parks and ESG-certified developments, with zoning, title and MITI requirements verified up front.":
    "位于成熟工业园及 ESG 认证发展项目内的永久地契与租赁地契地段，分区用途、地契与 MITI 要求均已事先核实。",
  "Office floors, shoplots, built-to-rent developments and hotel assets — including investment-grade, tenanted opportunities with verified yields.":
    "办公楼层、店铺、订制出租（BTR）项目与酒店资产——包括已出租、回酬经核实的投资级机会。",
  "Attended the ESP Global Ascend Bootcamp — a transformational programme on mindset, courage and professional purpose, including a Letter to Future Self.":
    "参与 ESP Global Ascend 集训营——一项关于心态、勇气与职业使命的蜕变课程，包括写给未来自己的一封信。",
  "Recognised among Esprit's top performers for consistent results and dedication — a milestone that's never about the trophy, but the standard it represents.":
    "凭借稳定的业绩与投入，获选为 Esprit 顶尖表现者之一——这个里程碑重要的从不是奖杯，而是它所代表的标准。",
  "On the ground, every deal": "每一宗交易，都亲临现场",
  "Every deal starts with a site visit. Fizaa walks the property — rain or shine — so clients get accurate, first-hand information, not recycled brochure data.":
    "每一宗交易都始于实地考察。无论晴雨，Fizaa 都会亲自走遍物业——让客户获得准确的第一手资讯，而非照搬的宣传册数据。",
  "Fizaa's latest industrial & commercial projects will appear here.":
    "Fizaa 最新的工业与商业项目将在此呈现。",

  // FAQ — extra
  "Common questions about industrial & commercial property, REN registration, agent fees and what Fizaa actually does — before you pick up the phone.":
    "关于工业与商业地产、REN 注册、代理费用以及 Fizaa 实际提供哪些服务的常见问题——在您拨打电话之前。",

  // v2 — nav segments
  "Industrial": "工业",
  "Commercial": "商业",
  "Hotel": "酒店",
  "FAQs": "常见问题",
  "Contacts": "联系",

  // v2 — home hero & search
  "All Malaysia": "全马来西亚",
  "Search property…": "搜索物业…",
  "Explore:": "探索：",
  "Min price": "最低价",
  "Max price": "最高价",

  // v2 — segment pages
  "Industrial Property": "工业地产",
  "Factories, warehouses, logistics facilities and industrial land across Malaysia.":
    "遍布马来西亚的厂房、仓库、物流设施与工业地段。",
  "Commercial Property": "商业地产",
  "Office floors, shoplots, retail and built-to-rent commercial space.":
    "办公楼层、店铺、零售与订制出租商业空间。",
  "Investment-grade hotel and hospitality assets, including tenanted opportunities.":
    "投资级酒店与款待业资产，包括已出租的机会。",
  "No properties here yet.": "此处暂无物业。",
  "Tell Fizaa what you need and she'll source it for you.":
    "告诉 Fizaa 您的需求，她将为您寻找。",
  "beds": "卧室",
  "baths": "浴室",
  "Looking for something specific?": "在寻找特定的物业？",
  "Share your brief — size, power, zoning, budget — and get matched, including off-market.":
    "分享您的需求——面积、电力、分区用途、预算——即可获得匹配，包括未公开的私洽房源。",
  "Tell Fizaa": "告诉 Fizaa",

  // v2 — footer
  "Powered by": "技术支持",
};

// Lookup table used by translate(). English has no map — it is the source.
const DICT: Partial<Record<Lang, Record<string, string>>> = { bm: BM, zh: ZH };
