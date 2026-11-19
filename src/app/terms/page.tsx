import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions governing the use of the BellaWoman product showcase platform.",
};

export default function TermsPage() {
  return (
    <div className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-[#FF312C]">
          Legal & Compliance
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#06262B] tracking-tight uppercase mt-1">
          Terms & Conditions
        </h1>
        <p className="text-xs text-[#71717A] mt-2">Last updated: November 2026</p>
      </div>

      <div className="prose prose-sm sm:prose max-w-none text-[#18181B]/80 font-light space-y-6 leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-[#06262B]">1. Nature of the Website</h2>
          <p>
            The website <strong>bellawoman.com</strong> is a product discovery and presentation showcase for <strong>BellaWoman</strong> apparel. This website does not process payments or manage native checkout transactions.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#06262B]">2. Marketplace Transactions</h2>
          <p>
            When purchasing BellaWoman products via external marketplaces (including Meesho, Amazon, or others), you are entering into a transaction governed by the marketplace&apos;s customer terms, shipping schedules, returns, and dispute resolution mechanisms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#06262B]">3. Intellectual Property</h2>
          <p>
            All brand assets, photography, logos, designs, product descriptions, and visual collateral displayed on this website are the intellectual property of BellaWoman and may not be copied, reproduced, or exploited without prior written authorization.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#06262B]">4. Pricing and Product Information</h2>
          <p>
            Prices and specifications displayed on the website reflect current manufacturer recommendations. Final sale prices, delivery charges, and promotions on third-party marketplace listings are determined on those respective platforms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#06262B]">5. Governing Law</h2>
          <p>
            These terms are governed in accordance with the laws of India. For questions regarding our terms, please contact <strong>support@bellawoman.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
