import Link from "next/link";
import { ArrowLeft, Home, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#FFF2F1] text-[#FF312C] text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-[#FF312C]/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Page Not Found</span>
        </div>

        <h1 className="text-6xl sm:text-7xl font-black text-[#06262B] tracking-tight">
          404
        </h1>

        <p className="text-base text-[#71717A] font-light leading-relaxed">
          The style or page you are looking for has been moved or is no longer available in our current drop.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#06262B] hover:bg-[#FF312C] text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            href="/categories"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FAF9F5] text-[#06262B] border border-[#EAE6DF] text-sm font-semibold px-6 py-3 rounded-full transition-colors"
          >
            <span>Explore Collections</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
