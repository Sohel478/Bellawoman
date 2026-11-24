import Link from "next/link";
import { WifiOff, RefreshCw, ShoppingBag } from "lucide-react";

export const metadata = {
  title: "You're Offline | BellaWoman",
};

export default function OfflinePage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-[#EAE6DF] shadow-xs space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#FFF2F1] text-[#FF312C] flex items-center justify-center mx-auto shadow-sm">
          <WifiOff className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-[#06262B] tracking-tight uppercase">
            You Are Currently Offline
          </h1>
          <p className="text-xs sm:text-sm text-[#71717A] leading-relaxed">
            It looks like your internet connection dropped. Any previously browsed pieces remain cached in your BellaWoman App.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#06262B] text-white font-bold text-xs hover:bg-[#FF312C] transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry Connection</span>
          </Link>
          <Link
            href="/categories"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#EAE6DF] text-[#06262B] font-bold text-xs hover:bg-[#FAF9F5] transition-all"
          >
            <ShoppingBag className="w-4 h-4 text-[#FF312C]" />
            <span>Browse Saved Pieces</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
