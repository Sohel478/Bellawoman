"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06262B] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-[#EAE6DF]">
        {/* Brand Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="block mx-auto mb-2 flex justify-center">
            <Image
              src="/brand/Bellawomen-default.svg"
              alt="BellaWoman"
              width={180}
              height={36}
              className="h-8 w-auto object-contain"
              priority
            />
          </div>
          <div className="inline-flex items-center gap-1.5 bg-[#FFF2F1] text-[#FF312C] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin CMS Portal</span>
          </div>
          <p className="text-xs text-[#71717A] mt-1">
            Sign in to manage categories, products, banners, and settings.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#06262B] uppercase tracking-wider">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#71717A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sohel@techflux.in"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#EAE6DF] focus:border-[#FF312C] focus:ring-1 focus:ring-[#FF312C] focus:outline-none text-sm text-[#18181B]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#06262B] uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#71717A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#EAE6DF] focus:border-[#FF312C] focus:ring-1 focus:ring-[#FF312C] focus:outline-none text-sm text-[#18181B]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-[#FF312C] hover:bg-[#E02621] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-6"
          >
            <span>{loading ? "Authenticating..." : "Sign In to Admin"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#EAE6DF] text-center text-[11px] text-[#71717A]">
          Authorized credential: <code className="bg-[#FAF9F5] px-2 py-0.5 rounded text-[#06262B] font-mono">Sohel@techflux.in</code>
        </div>
      </div>
    </div>
  );
}
