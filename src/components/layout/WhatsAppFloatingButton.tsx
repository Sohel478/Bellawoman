"use client";

import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

interface WhatsAppFloatingButtonProps {
  whatsappPhone?: string;
}

export function WhatsAppFloatingButton({
  whatsappPhone = "+919876543210",
}: WhatsAppFloatingButtonProps) {
  const whatsappUrl = buildWhatsAppLink({ phone: whatsappPhone });

  return (
    <aside aria-label="Customer support" className="hidden md:block fixed bottom-8 right-8 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order or Chat on WhatsApp"
        className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white px-5 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="text-sm font-semibold tracking-wide">
          Chat & Order
        </span>
      </a>
    </aside>
  );
}
