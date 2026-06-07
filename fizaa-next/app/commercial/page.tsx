import type { Metadata } from "next";
import SegmentListings from "@/components/SegmentListings";
import { getT } from "@/lib/i18n-server";

export const metadata: Metadata = { title: "Commercial Property" };

export default function CommercialPage() {
  const t = getT();
  return (
    <SegmentListings
      segment="commercial"
      title={t("Commercial Property")}
      subtitle={t("Office floors, shoplots, retail and built-to-rent commercial space.")}
    />
  );
}
