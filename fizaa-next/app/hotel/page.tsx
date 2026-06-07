import type { Metadata } from "next";
import SegmentListings from "@/components/SegmentListings";
import { getT } from "@/lib/i18n-server";

export const metadata: Metadata = { title: "Hotel Assets" };

export default function HotelPage() {
  const t = getT();
  return (
    <SegmentListings
      segment="hotel"
      title={t("Hotel Assets")}
      subtitle={t("Investment-grade hotel and hospitality assets, including tenanted opportunities.")}
    />
  );
}
