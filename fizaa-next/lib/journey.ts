// The "Our Journey" narrative, supplied by the client.
// Shared by the home-page teaser (which shows the first paragraph only) and the
// full /journey profile, so the copy is edited in exactly one place.
import type { Lang } from "./i18n";
import { SITE } from "./site";

const CREDENTIAL = `${SITE.ren} · ${SITE.agency}`;

export const JOURNEY_BIO: Record<Lang, string[]> = {
  en: [
    `M.I.R. — My Industrial Realtors — operates under the experienced leadership of Ms Fiza Aziz, ${CREDENTIAL}, specializing in industrial, commercial, hospitality, and investment properties across Malaysia. She advises business owners, investors, developers, hotel operators, and corporate clients on property acquisitions, disposals, leasing strategies, and investment opportunities, with a focus on delivering solutions that support long-term business and investment objectives.`,
    "Leveraging both industry expertise and market knowledge, Fiza's portfolio encompasses factories, warehouses, industrial development land, commercial buildings, shop offices, hotels, and investment properties.",
    "Recognized for her professionalism, integrity, and results-oriented approach, she combines strategic market positioning with modern marketing solutions to help clients maximize asset value, identify growth opportunities, and make informed real estate decisions in Malaysia's dynamic property market.",
  ],
  bm: [
    `M.I.R. — My Industrial Realtors — beroperasi di bawah kepimpinan berpengalaman Ms Fiza Aziz, ${CREDENTIAL}, pakar dalam hartanah perindustrian, komersial, hospitaliti dan pelaburan di seluruh Malaysia. Beliau menasihati pemilik perniagaan, pelabur, pemaju, pengendali hotel dan pelanggan korporat mengenai perolehan, pelupusan, strategi pajakan dan peluang pelaburan hartanah, dengan tumpuan pada penyelesaian yang menyokong objektif perniagaan dan pelaburan jangka panjang.`,
    "Dengan menggabungkan kepakaran industri dan pengetahuan pasaran, portfolio Fiza merangkumi kilang, gudang, tanah pembangunan perindustrian, bangunan komersial, pejabat kedai, hotel dan hartanah pelaburan.",
    "Diiktiraf kerana profesionalisme, integriti dan pendekatan berorientasikan hasil, beliau menggabungkan kedudukan pasaran yang strategik dengan penyelesaian pemasaran moden untuk membantu pelanggan memaksimumkan nilai aset, mengenal pasti peluang pertumbuhan dan membuat keputusan hartanah yang bermaklumat dalam pasaran hartanah Malaysia yang dinamik.",
  ],
  zh: [
    `M.I.R.（My Industrial Realtors）在 Ms Fiza Aziz（${CREDENTIAL}）的资深领导下运作，专精于马来西亚各地的工业、商业、款待业与投资地产。她为企业东主、投资者、发展商、酒店营运商及企业客户提供物业收购、出售、租赁策略与投资机会方面的建议，专注于提供支持长期业务与投资目标的解决方案。`,
    "凭借行业专长与市场洞察，Fiza 的业务组合涵盖厂房、仓库、工业发展地段、商业大楼、店屋办公室、酒店与投资地产。",
    "她以专业素养、诚信与结果导向的作风著称，将策略性的市场定位与现代营销方案相结合，协助客户提升资产价值、发掘增长机会，并在马来西亚瞬息万变的房地产市场中做出明智决策。",
  ],
};
