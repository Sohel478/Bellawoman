import { MessageCircle, ArrowRight } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

interface WhatsAppCtaBannerProps {
  whatsappPhone?: string;
}

export function WhatsAppCtaBanner({
  whatsappPhone = "+919876543210",
}: WhatsAppCtaBannerProps) {
  const whatsappUrl = buildWhatsAppLink({ phone: whatsappPhone });

  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-[#06262B] text-white p-8 sm:p-12 lg:p-16 border border-[#0B3B42] shadow-xl">
        {/* Subtle decorative circles */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#FF312C]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#25D366]/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-white/90">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span>Direct Concierge Available</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight uppercase leading-tight">
            Have Questions About Sizing or Custom Orders?
          </h2>

          <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed">
            Our styling specialists are on WhatsApp ready to assist. Send us a message to confirm your exact fit, check instant stock, or place an order in seconds.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all group"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat on WhatsApp</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <span className="text-xs text-white/60">Typically replies within 15 minutes</span>
          </div>
        </div>
      </div>
    </section>
  );
}
