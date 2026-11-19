import { MessageCircle, Mail, Phone, Clock, MapPin } from "lucide-react";
import { getSiteSettings } from "@/lib/db";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Concierge",
  description: "Connect with the BellaWoman styling concierge team via WhatsApp, email, or direct support.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const whatsappPhone = settings.whatsappPhone || "+919876543210";
  const contactEmail = settings.contactEmail || "support@bellawoman.com";
  const whatsappUrl = buildWhatsAppLink({ phone: whatsappPhone });

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-[#FF312C]">
          We&apos;re Here to Help
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#06262B] tracking-tight uppercase">
          Contact BellaWoman
        </h1>
        <p className="text-sm sm:text-base text-[#71717A] font-light leading-relaxed">
          Have questions about fit, custom orders, wholesale inquiries, or marketplace listings? Reach out to our dedicated concierge.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Primary WhatsApp Card */}
        <div className="bg-[#06262B] text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between space-y-6 shadow-xl border border-[#0B3B42]">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#25D366]/20 flex items-center justify-center text-[#25D366]">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold uppercase">WhatsApp Concierge</h2>
            <p className="text-sm text-white/80 font-light leading-relaxed">
              For instant sizing recommendations, availability checks, or direct custom orders, message our team directly on WhatsApp.
            </p>
            <div className="text-xs text-white/60 space-y-1 pt-2">
              <p>• Mon – Sat: 10:00 AM – 8:00 PM IST</p>
              <p>• Average reply time: Under 15 minutes</p>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-sm px-6 py-3.5 rounded-full shadow-md transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Open WhatsApp Chat</span>
          </a>
        </div>

        {/* Alternate Channels Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EAE6DF] shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#06262B] uppercase">Other Ways to Reach Us</h2>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-[#FF312C] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[#06262B]">Email Inquiries</p>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-[#71717A] hover:text-[#FF312C] transition-colors"
                  >
                    {contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-[#FF312C] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[#06262B]">Direct Phone</p>
                  <p className="text-[#71717A]">{whatsappPhone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-[#FF312C] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[#06262B]">Operating Hours</p>
                  <p className="text-[#71717A]">Monday to Saturday, 10:00 AM – 8:00 PM IST</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-[#EAE6DF] text-xs text-[#71717A]">
            🛡️ <strong>Marketplace Order Queries:</strong> If your order was placed through Meesho or Amazon, please refer to the respective marketplace order dashboard for courier tracking and return logistics.
          </div>
        </div>
      </div>
    </div>
  );
}
