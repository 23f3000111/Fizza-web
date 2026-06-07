import type { Metadata } from "next";
import SegmentListings from "@/components/SegmentListings";
import { getT } from "@/lib/i18n-server";

export const metadata: Metadata = { title: "Industrial Property" };

export default function IndustrialPage() {
  const t = getT();
  return (
    <SegmentListings
      segment="industrial"
      title={t("Industrial Property")}
      subtitle={t("Factories, warehouses, logistics facilities and industrial land across Malaysia.")}
    />
  );
}
