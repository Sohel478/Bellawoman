"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ArrowUpRight, MessageCircle, Sparkles, X, Key, ShieldCheck } from "lucide-react";
import { cleanPhoneNumber } from "@/lib/whatsapp";
import { InstagramFeedItem } from "@/lib/instagram";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

interface InstagramVideoSectionProps {
  instagramUrl?: string;
  whatsappPhone?: string;
  initialItems?: InstagramFeedItem[];
  isConnected?: boolean;
  errorMessage?: string;
}

export function InstagramVideoSection({
  instagramUrl = "https://www.instagram.com/official_bellawoman?knvt=MTlud2ZpYmxhMTV0ZQ%3D%3D&utm_source=qr",
  whatsappPhone = "+917249498924",
  initialItems = [],
  isConnected = false,
  errorMessage,
}: InstagramVideoSectionProps) {
  const [selectedVideo, setSelectedVideo] = useState<InstagramFeedItem | null>(null);

  const cleanPhone = cleanPhoneNumber(whatsappPhone);
  const waText = encodeURIComponent(
    selectedVideo
      ? `Hi BellaWoman! I saw your reel on Instagram ("${selectedVideo.title}") and wanted to ask about the featured activewear.`
      : "Hi BellaWoman! I'd like to ask about your activewear collection."
  );
  const activeWhatsAppUrl = `https://wa.me/${cleanPhone}?text=${waText}`;

  return (
    <section className="py-16 sm:py-20 border-t border-[#EAE6DF]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#833AB4]/10 via-[#FD1D1D]/10 to-[#F77737]/10 border border-[#FD1D1D]/20">
            <InstagramIcon className="w-3.5 h-3.5 text-[#FD1D1D]" />
            <span className="text-[11px] font-bold text-[#06262B] uppercase tracking-wider">
              @official_bellawoman on Instagram
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#06262B] tracking-tight uppercase">
            Our Stories, Try-Ons & Reels
          </h2>
          <p className="text-sm sm:text-base text-[#71717A] font-light leading-relaxed">
            Experience BellaWoman activewear in motion. Real fabric stretch, fit checks, styling ideas, and behind-the-scenes shoots directly from our official Instagram.
          </p>
        </div>

        {/* Action Button to Official Profile */}
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-95 text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all group flex-shrink-0"
        >
          <InstagramIcon className="w-4 h-4" />
          <span>Follow @official_bellawoman</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* Case 1: Meta Graph API Connected with Real Reels */}
      {isConnected && initialItems.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
          {initialItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedVideo(item)}
              className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-[#06262B] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-[#EAE6DF] hover:border-[#FD1D1D]"
            >
              {/* Media Thumbnail */}
              <Image
                src={item.coverImage}
                alt={item.title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 group-hover:from-black/90 transition-all duration-300" />

              {/* Top Bar: Reel Icon & Official Tag */}
              <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/20">
                  {item.mediaType === "VIDEO" ? "Reel" : "Post"}
                </span>
                <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <InstagramIcon className="w-3 h-3" />
                </div>
              </div>

              {/* Centered Play Button (for Videos) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 text-[#06262B] group-hover:bg-[#FD1D1D] group-hover:text-white shadow-lg flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5 fill-current" />
                </div>
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-0 inset-x-0 p-3 sm:p-3.5 text-white space-y-1">
                <h3 className="text-xs sm:text-sm font-bold line-clamp-1 group-hover:text-[#FD1D1D] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] text-white/70 line-clamp-2 font-light leading-snug">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Case 2: Meta Graph API Awaiting Access Token */
        <div className="bg-gradient-to-br from-[#FAF9F5] via-white to-[#FFF2F1] rounded-3xl p-8 sm:p-12 border border-[#EAE6DF] shadow-xs text-center max-w-3xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#F77737] flex items-center justify-center text-white mx-auto shadow-md">
            <InstagramIcon className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#06262B]">
              Stream Live Reels from @official_bellawoman
            </h3>
            <p className="text-sm text-[#71717A] max-w-xl mx-auto leading-relaxed">
              Meta Graph API integration is enabled for this store. Add your Meta Access Token in Admin Settings to stream all your authentic Instagram Reels directly here.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-95 text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-full shadow-sm transition"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Watch Reels on Instagram</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <Link
              href="/admin/settings"
              className="inline-flex items-center gap-2 bg-white hover:bg-[#FAF9F5] text-[#06262B] text-xs sm:text-sm font-bold px-6 py-3 rounded-full border border-[#EAE6DF] transition"
            >
              <Key className="w-4 h-4 text-[#FD1D1D]" />
              <span>Configure Meta API in Admin</span>
            </Link>
          </div>
        </div>
      )}

      {/* Bottom CTA Card */}
      <div className="mt-10 sm:mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE6DF] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Sparkles className="w-4 h-4 text-[#FF312C]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#06262B]">
              Never Miss A Drop
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-[#06262B]">
            Follow BellaWoman on Instagram for Exclusive Launch Previews
          </h3>
          <p className="text-xs sm:text-sm text-[#71717A] font-light max-w-xl">
            See our activewear worn by real athletes, behind-the-scenes shoots, upcoming colorway polls, and direct flash drops.
          </p>
        </div>

        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#06262B] hover:bg-[#FF312C] text-white text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-full transition-colors group flex-shrink-0"
        >
          <span>View All Videos on Instagram</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* Interactive Quick-View Reel Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#EAE6DF]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#F77737] flex items-center justify-center text-white">
                  <InstagramIcon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#06262B]">@official_bellawoman</h4>
                  <p className="text-[11px] text-[#71717A]">
                    {new Date(selectedVideo.timestamp).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedVideo(null)}
                className="p-1.5 rounded-full hover:bg-[#FAF9F5] text-[#71717A] hover:text-[#06262B] transition"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Video Player */}
            <div className="relative aspect-[4/5] bg-black flex items-center justify-center">
              {selectedVideo.videoUrl ? (
                <video
                  src={selectedVideo.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              ) : (
                <Image
                  src={selectedVideo.coverImage}
                  alt={selectedVideo.title}
                  fill
                  className="object-cover object-center"
                />
              )}
            </div>

            {/* Modal Footer Info & Commerce Bridge */}
            <div className="p-5 space-y-4">
              <div>
                <h4 className="text-base font-bold text-[#06262B]">
                  {selectedVideo.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#71717A] font-light mt-1 max-h-24 overflow-y-auto leading-relaxed">
                  {selectedVideo.caption}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <a
                  href={activeWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#06262B] hover:bg-[#0B3B42] text-white font-bold text-xs py-3 rounded-xl transition"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Inquire on WhatsApp</span>
                </a>

                <a
                  href={selectedVideo.reelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white font-bold text-xs py-3 rounded-xl shadow-xs hover:opacity-95 transition"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>Open in Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
