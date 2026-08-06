import Link from "next/link";
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { getLang, getT } from "@/lib/i18n-server";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about industrial & commercial property in Malaysia, REN registration, agent fees, zoning, BTR and GreenRE.",
};

const FAQS_EN: { q: string; a: React.ReactNode }[] = [
  { q: "What is a Registered Estate Negotiator (REN)?", a: <>A <strong>Registered Estate Negotiator (REN)</strong> is a licensed property professional registered with BOVAEP. A REN must operate under a registered estate agency firm — in M.I.R.&apos;s case, <strong>Esprit Estate Agent Sdn Bhd</strong>. The REN number (<strong>REN 63161</strong>) is verifiable on the BOVAEP public register at <a className="text-brass-2 font-semibold" href="https://www.lppeh.gov.my/" target="_blank" rel="noopener noreferrer">lppeh.gov.my</a>.</> },
  { q: "What types of property does M.I.R. specialise in?", a: <>M.I.R. focuses on <strong>industrial and commercial real estate</strong> — detached and semi-detached factories, superlink warehouses, industrial land, hotel assets, commercial office floors and built-to-rent (BTR) developments. We do not handle residential property, which means our knowledge of the industrial-commercial space runs deeper than a generalist agent&apos;s.</> },
  { q: "How do I find the right factory or warehouse for my business?", a: <>Start by identifying your <strong>operational requirements</strong>: floor area, eave height, power supply (amp), loading access, zoning type and location relative to your supply chain. Share these with us and we&apos;ll match your brief against available listings — including off-market properties. A site visit is always arranged before any commitment.</> },
  { q: "What is Built-To-Rent (BTR) in commercial property?", a: <>A <strong>Built-To-Rent (BTR)</strong> development is a commercial or industrial space purpose-designed and constructed to a tenant&apos;s specific requirements, then leased under a long-term agreement. The developer builds to your spec, you lease it — avoiding the capital outlay of purchasing while securing a facility tailored to your operations.</> },
  { q: "What should I know about industrial zoning in Malaysia?", a: <>Industrial land is zoned into <strong>Light, Medium and Heavy Industry</strong> categories. Your business activity must match the land&apos;s approved zoning — operating heavy industry on light-zoned land risks enforcement action. We check zoning, title restrictions and MITI requirements before recommending any industrial property.</> },
  { q: "How are commercial & industrial agent fees calculated?", a: <>Under the <em>Valuers, Appraisers, Estate Agents and Property Managers Act 1981 (Act 242)</em>, the <strong>maximum fee for a subsale is 3%</strong> of the purchase price. For a rental, the fee is typically <strong>1.25 months</strong> of rent. Both are subject to the prevailing SST. We clarify the fee structure upfront before any listing is taken.</> },
  { q: "What is GreenRE certification and why does it matter?", a: <><strong>GreenRE</strong> is Malaysia&apos;s green-building index for real estate — it certifies that a development meets defined environmental performance standards. For industrial investors and multinational tenants, GreenRE-certified facilities align with <strong>ESG reporting requirements</strong> and can attract premium tenants, better financing terms and long-term capital appreciation.</> },
  { q: "How do I book a site visit?", a: <>The easiest way is to <strong>WhatsApp us</strong> at <a className="text-brass-2 font-semibold" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">{SITE.phone}</a>, or use the <Link className="text-brass-2 font-semibold" href="/quote">Get a Quote</Link> form. Describe the property you need, your budget and timeline. We will respond promptly, match you to relevant listings and arrange a <strong>private site visit</strong>.</> },
];

const FAQS_BM: { q: string; a: React.ReactNode }[] = [
  { q: "Apakah itu Perunding Hartanah Berdaftar (REN)?", a: <>Seorang <strong>Perunding Hartanah Berdaftar (REN)</strong> ialah profesional hartanah berlesen yang berdaftar dengan BOVAEP. Seorang REN mesti beroperasi di bawah firma agensi hartanah berdaftar — dalam kes M.I.R., <strong>Esprit Estate Agent Sdn Bhd</strong>. Nombor REN (<strong>REN 63161</strong>) boleh disahkan dalam daftar awam BOVAEP di <a className="text-brass-2 font-semibold" href="https://www.lppeh.gov.my/" target="_blank" rel="noopener noreferrer">lppeh.gov.my</a>.</> },
  { q: "Jenis hartanah apakah yang menjadi kepakaran M.I.R.?", a: <>M.I.R. tertumpu pada <strong>hartanah perindustrian dan komersial</strong> — kilang berkembar dan sesebuah, gudang superlink, tanah perindustrian, aset hotel, tingkat pejabat komersial dan pembangunan built-to-rent (BTR). Kami tidak mengendalikan hartanah kediaman, bermakna pengetahuan kami dalam ruang perindustrian-komersial lebih mendalam berbanding ejen umum.</> },
  { q: "Bagaimana saya mencari kilang atau gudang yang sesuai untuk perniagaan saya?", a: <>Mulakan dengan mengenal pasti <strong>keperluan operasi</strong> anda: luas lantai, ketinggian bumbung, bekalan kuasa (amp), akses memunggah, jenis zon dan lokasi berbanding rantaian bekalan anda. Kongsikan dengan kami dan kami akan memadankan keperluan anda dengan senarai yang ada — termasuk hartanah luar pasaran. Lawatan tapak sentiasa diatur sebelum sebarang komitmen.</> },
  { q: "Apakah itu Built-To-Rent (BTR) dalam hartanah komersial?", a: <>Pembangunan <strong>Built-To-Rent (BTR)</strong> ialah ruang komersial atau perindustrian yang direka dan dibina khas mengikut keperluan penyewa, kemudian dipajak di bawah perjanjian jangka panjang. Pemaju membina mengikut spesifikasi anda, anda memajaknya — mengelakkan perbelanjaan modal untuk membeli sambil mendapatkan kemudahan yang disesuaikan dengan operasi anda.</> },
  { q: "Apa yang perlu saya tahu tentang zon perindustrian di Malaysia?", a: <>Tanah perindustrian dizonkan kepada kategori <strong>Industri Ringan, Sederhana dan Berat</strong>. Aktiviti perniagaan anda mesti sepadan dengan zon yang diluluskan — mengendalikan industri berat di tanah zon ringan berisiko tindakan penguatkuasaan. Kami menyemak zon, sekatan hakmilik dan keperluan MITI sebelum mengesyorkan sebarang hartanah perindustrian.</> },
  { q: "Bagaimana yuran ejen komersial & perindustrian dikira?", a: <>Di bawah <em>Akta Penilai, Pentaksir, Ejen Hartanah dan Pengurus Harta 1981 (Akta 242)</em>, <strong>yuran maksimum untuk jualan semula ialah 3%</strong> daripada harga belian. Untuk sewaan, yuran biasanya <strong>1.25 bulan</strong> sewa. Kedua-duanya tertakluk kepada SST semasa. Kami menjelaskan struktur yuran terlebih dahulu sebelum sebarang senarai diambil.</> },
  { q: "Apakah pensijilan GreenRE dan mengapa ia penting?", a: <><strong>GreenRE</strong> ialah indeks bangunan hijau Malaysia untuk hartanah — ia mengesahkan bahawa sesuatu pembangunan memenuhi piawaian prestasi alam sekitar yang ditetapkan. Bagi pelabur perindustrian dan penyewa multinasional, kemudahan bertauliah GreenRE selari dengan <strong>keperluan pelaporan ESG</strong> dan boleh menarik penyewa premium, terma pembiayaan lebih baik serta peningkatan nilai modal jangka panjang.</> },
  { q: "Bagaimana saya menempah lawatan tapak?", a: <>Cara paling mudah ialah <strong>WhatsApp kami</strong> di <a className="text-brass-2 font-semibold" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">{SITE.phone}</a>, atau gunakan borang <Link className="text-brass-2 font-semibold" href="/quote">Dapatkan Sebut Harga</Link>. Terangkan hartanah yang anda perlukan, bajet dan jangka masa anda. Kami akan membalas dengan segera, memadankan anda dengan senarai yang berkaitan dan mengatur <strong>lawatan tapak peribadi</strong>.</> },
];

const FAQS_ZH: { q: string; a: React.ReactNode }[] = [
  { q: "什么是注册地产协商员（REN）？", a: <><strong>注册地产协商员（REN）</strong>是在 BOVAEP 注册的持牌地产专业人士。REN 必须隶属于一家注册地产代理行执业——以 M.I.R. 而言，即 <strong>Esprit Estate Agent Sdn Bhd</strong>。其 REN 编号（<strong>REN 63161</strong>）可在 BOVAEP 公开名册查证：<a className="text-brass-2 font-semibold" href="https://www.lppeh.gov.my/" target="_blank" rel="noopener noreferrer">lppeh.gov.my</a>。</> },
  { q: "M.I.R. 专精于哪些类型的物业？", a: <>M.I.R. 专注于<strong>工业与商业地产</strong>——独立式与半独立式厂房、超级连排仓库、工业地段、酒店资产、商业办公楼层以及订制出租（BTR）项目。我们不经手住宅物业，因此在工业与商业领域的专业深度远超全能型经纪。</> },
  { q: "我该如何为公司找到合适的厂房或仓库？", a: <>首先厘清您的<strong>营运需求</strong>：楼面面积、檐高、电力供应（安培）、装卸通道、分区用途，以及相对于供应链的地点。将这些告诉我们，我们会依您的条件匹配现有房源——包括未公开的私洽物业。任何承诺之前，必定先安排实地考察。</> },
  { q: "商业地产中的订制出租（BTR）是什么？", a: <><strong>订制出租（BTR）</strong>项目是指依据租户特定需求专门设计与建造的商业或工业空间，再以长期合约出租。发展商按您的规格兴建，您承租使用——既省去购置的资本支出，又能获得贴合营运需求的设施。</> },
  { q: "关于马来西亚的工业分区，我需要知道什么？", a: <>工业地段分为<strong>轻工业、中工业与重工业</strong>三类。您的营业活动必须符合该地段获批的分区用途——在轻工业地段经营重工业将面临执法风险。在推荐任何工业物业之前，我们都会核实分区用途、地契限制与 MITI 要求。</> },
  { q: "商业与工业地产的代理费如何计算？", a: <>根据《<em>1981 年估价师、估值师、地产代理与物业经理法令（第 242 号法令）</em>》，<strong>转售的最高佣金为售价的 3%</strong>。租赁方面，佣金通常为 <strong>1.25 个月</strong>租金。两者均需另加现行 SST。在接受任何委托之前，我们都会先厘清费用结构。</> },
  { q: "什么是 GreenRE 认证？为什么它重要？", a: <><strong>GreenRE</strong> 是马来西亚的地产绿色建筑指标——用以认证某项目符合既定的环境绩效标准。对工业投资者与跨国租户而言，取得 GreenRE 认证的设施契合<strong>ESG 报告要求</strong>，有助于吸引优质租户、争取更佳融资条件，并带来长期资本增值。</> },
  { q: "我该如何预约实地考察？", a: <>最简单的方式是<strong>透过 WhatsApp 联系我们</strong>：<a className="text-brass-2 font-semibold" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">{SITE.phone}</a>，或使用<Link className="text-brass-2 font-semibold" href="/quote">获取报价</Link>表格。说明您需要的物业、预算与时间安排，我们会尽快回复，为您匹配相关房源并安排<strong>私人实地考察</strong>。</> },
];

const FAQS_BY_LANG = { en: FAQS_EN, bm: FAQS_BM, zh: FAQS_ZH };

export default function FaqPage() {
  const t = getT();
  const FAQS = FAQS_BY_LANG[getLang()] ?? FAQS_EN;
  return (
    <>
      <section className="navy-gradient text-white pt-8 pb-24">
        <div className="container-site">
          <span className="eyebrow text-brass-soft before:bg-brass-soft">{t("Frequently asked")}</span>
          <h1 className="font-serif text-3xl sm:text-[44px] text-white mt-3">{t("Questions, answered.")}</h1>
          <p className="text-[#B9C7D8] mt-2.5 max-w-[56ch]">{t("Common questions about industrial & commercial property, REN registration, agent fees and what we actually do — before you pick up the phone.")}</p>
        </div>
      </section>

      <div className="container-site grid lg:grid-cols-[1fr_320px] gap-7 -mt-16 mb-[70px] items-start">
        <div className="bg-white border border-line rounded-xl2 shadow-md2 overflow-hidden">
          {FAQS.map((f, i) => (
            <details key={i} open={i === 0} className="border-b border-line-2 last:border-0 group [&_summary::-webkit-details-marker]:hidden">
              <summary className="list-none cursor-pointer flex items-center gap-4 px-6 py-5">
                <span className="font-serif text-brass-2 text-[15px] min-w-[24px]">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 font-semibold text-base">{f.q}</span>
                <span className="w-[26px] h-[26px] rounded-full bg-cream grid place-items-center text-navy text-lg transition-transform group-open:rotate-45 group-open:bg-navy group-open:text-white">+</span>
              </summary>
              <div className="px-6 pb-5 pl-6 lg:pl-16 text-ink-2 text-[15px] leading-[1.7]">{f.a}</div>
            </details>
          ))}
        </div>

        <aside className="lg:sticky lg:top-[88px]">
          <div className="bg-navy text-white rounded-xl2 p-[26px]">
            <h3 className="font-serif text-[21px] text-white mb-2">{t("Still have a question?")}</h3>
            <p className="text-[#B9C7D8] text-sm mb-4">{t("Ask us directly — we reply personally, usually within minutes.")}</p>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-brass btn-block mb-2">{t("WhatsApp us")}</a>
            <Link href="/quote" className="btn btn-white btn-block mb-2">{t("Get a quote")}</Link>
            <Link href="/contact" className="btn btn-white btn-block">{t("Contact form")}</Link>
          </div>
        </aside>
      </div>
    </>
  );
}
