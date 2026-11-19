import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "BellaWoman privacy policy regarding data collection, website usage, and marketplace redirection.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-[#FF312C]">
          Legal & Compliance
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#06262B] tracking-tight uppercase mt-1">
          Privacy Policy
        </h1>
        <p className="text-xs text-[#71717A] mt-2">Last updated: November 2026</p>
      </div>

      <div className="prose prose-sm sm:prose max-w-none text-[#18181B]/80 font-light space-y-6 leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-[#06262B]">1. Overview</h2>
          <p>
            Welcome to <strong>BellaWoman</strong>. We respect your privacy and are committed to protecting your personal information. This website serves as a product discovery and showcase platform for BellaWoman fashion collections.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#06262B]">2. Information We Do NOT Collect</h2>
          <p>
            Because this website does not process transactions directly, <strong>we do not collect, process, or store credit card numbers, debit card details, bank account credentials, or digital wallet balances</strong>. 
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#06262B]">3. Third-Party Marketplace Redirection</h2>
          <p>
            When you click &quot;Buy on Meesho&quot; or &quot;Buy on Amazon&quot;, you are redirected to an external marketplace. Any transaction, payment handling, shipping address entry, and fulfilment is governed entirely by the privacy policy and terms of service of Meesho or Amazon.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#06262B]">4. WhatsApp Communication</h2>
          <p>
            When you initiate a conversation with BellaWoman through WhatsApp, your communication takes place over the WhatsApp platform in accordance with Meta&apos;s privacy policies. We use your contact information strictly to assist with sizing, availability checks, and order coordination requested by you.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#06262B]">5. Cookies & Analytics</h2>
          <p>
            We may use minimal session cookies and aggregated analytics hooks to understand website traffic, popular categories, and product view patterns to improve our catalog experience. No personal identifying information is sold or traded.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#06262B]">6. Contact Us</h2>
          <p>
            For any privacy inquiries or data requests, please contact our team at <strong>support@bellawoman.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
