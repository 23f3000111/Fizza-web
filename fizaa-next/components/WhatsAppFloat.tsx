import { SITE } from "@/lib/site";
import { WhatsApp } from "./Icons";

export default function WhatsAppFloat() {
  return (
    <a
      href={SITE.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed left-[22px] bottom-[22px] z-[90] w-14 h-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-[0_8px_24px_-6px_rgba(37,211,102,.6)] transition-transform hover:scale-110"
    >
      <WhatsApp className="w-7 h-7" />
    </a>
  );
}
