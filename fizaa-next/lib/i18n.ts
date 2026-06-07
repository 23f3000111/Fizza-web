// Lightweight i18n. English is the source language and also the lookup key;
// Bahasa Melayu strings live in the BM map below. translate() falls back to the
// English source whenever a BM string is missing, so the app never shows a key.
// This file is client-safe (no next/headers) — server code uses i18n-server.ts.

export type Lang = "en" | "bm";
export const LANGS: Lang[] = ["en", "bm"];
export const LANG_LABEL: Record<Lang, string> = { en: "EN", bm: "BM" };
export const LANG_COOKIE = "lang";

export function translate(lang: Lang, en: string): string {
  if (lang === "bm") return BM[en] ?? en;
  return en;
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
