"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ArrowUpRight, MessageCircle, Sparkles, X, Eye } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

interface InstagramVideoItem {
  id: string;
  title: string;
  caption: string;
  category: string;
  coverImage: string;
  duration?: string;
  views?: string;
  productSlug?: string;
  productName?: string;
  productPrice?: number;
  reelUrl: string;
}

interface InstagramVideoSectionProps {
  instagramUrl?: string;
  whatsappPhone?: string;
}

const DEFAULT_REELS: InstagramVideoItem[] = [
  {
    id: "reel-1",
    title: "Sculpt & Stretch Field Test",
    caption: "Putting the 4-way micro-nylon blend through deep squats and high-intensity flex tests. 100% squat-proof.",
    category: "Try-On Reel",
    coverImage: "/hero/hero-br1013.jpg",
    views: "18.4K",
    productSlug: "seamless-ribbed-sculpt-bra-br1013",
    productName: "Seamless Ribbed Sculpt Bra",
    productPrice: 799,
    reelUrl: "https://www.instagram.com/official_bellawoman?knvt=MTlud2ZpYmxhMTV0ZQ%3D%3D&utm_source=qr",
  },
  {
    id: "reel-2",
    title: "Crisscross Back Fit Check",
    caption: "Natural studio light fit check on the strappy back detail. Engineered for zero digging and all-day wear.",
    category: "Fit Check",
    coverImage: "/hero/hero-br1034.jpg",
    views: "24.1K",
    productSlug: "crisscross-back-studio-crop-bra-br1034",
    productName: "Crisscross Back Studio Crop Bra",
    productPrice: 799,
    reelUrl: "https://www.instagram.com/official_bellawoman?knvt=MTlud2ZpYmxhMTV0ZQ%3D%3D&utm_source=qr",
  },
  {
    id: "reel-3",
    title: "AirFlex Breathability in Motion",
    caption: "High-airflow mesh panels in action during cardio sessions. Extreme sweat-wicking comfort.",
    category: "Tech Fabric",
    coverImage: "/hero/hero-br1041.jpg",
    views: "15.9K",
    productSlug: "airflex-breathable-mesh-bra-br1041",
    productName: "AirFlex Breathable Mesh Bra",
    productPrice: 849,
    reelUrl: "https://www.instagram.com/official_bellawoman?knvt=MTlud2ZpYmxhMTV0ZQ%3D%3D&utm_source=qr",
  },
  {
    id: "reel-4",
    title: "Behind The Scenes: Active Drop",
    caption: "On set with our creative crew capturing the new silhouettes. Raw motion, honest fit.",
    category: "Studio BTS",
    coverImage: "/hero/hero-br1083.jpg",
    views: "32.8K",
    productSlug: "active-sculpt-keyhole-bra-br1083",
    productName: "Active Sculpt Keyhole Bra",
    productPrice: 799,
    reelUrl: "https://www.instagram.com/official_bellawoman?knvt=MTlud2ZpYmxhMTV0ZQ%3D%3D&utm_source=qr",
  },
  {
    id: "reel-5",
    title: "Velocity Zip-Front Lock Test",
    caption: "Testing the autolock zipper mechanism under high-impact jumps. Maximum bounce containment.",
    category: "High Impact",
    coverImage: "/hero/hero-br1091.jpg",
    views: "21.6K",
    productSlug: "velocity-zip-front-training-bra-br1091",
    productName: "Velocity Zip-Front Training Bra",
    productPrice: 999,
    reelUrl: "https://www.instagram.com/official_bellawoman?knvt=MTlud2ZpYmxhMTV0ZQ%3D%3D&utm_source=qr",
  },
  {
    id: "reel-6",
    title: "PureComfort Studio-to-Street",
    caption: "Styling our minimalist studio crop from reformer pilates to daily oversized blazer layering.",
    category: "Style Guide",
    coverImage: "/hero/hero-f3bca67d.jpg",
    views: "19.2K",
    productSlug: "purecomfort-lounge-studio-bra-br1086",
    productName: "PureComfort Lounge & Studio Bra",
    productPrice: 699,
    reelUrl: "https://www.instagram.com/official_bellawoman?knvt=MTlud2ZpYmxhMTV0ZQ%3D%3D&utm_source=qr",
  },
];

export function InstagramVideoSection({
  instagramUrl = "https://www.instagram.com/official_bellawoman?knvt=MTlud2ZpYmxhMTV0ZQ%3D%3D&utm_source=qr",
  whatsappPhone = "+919876543210",
}: InstagramVideoSectionProps) {
  const [selectedVideo, setSelectedVideo] = useState<InstagramVideoItem | null>(null);

  const activeWhatsAppUrl = selectedVideo?.productName
    ? buildWhatsAppLink({
        phone: whatsappPhone,
        productName: selectedVideo.productName,
        price: selectedVideo.productPrice,
      })
    : buildWhatsAppLink({ phone: whatsappPhone });

  return (
    <section className="py-16 sm:py-20 border-t border-[#EAE6DF]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#833AB4]/10 via-[#FD1D1D]/10 to-[#F77737]/10 border border-[#FD1D1D]/20">
            <svg className="w-3.5 h-3.5 text-[#FD1D1D] fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span className="text-[11px] font-bold text-[#06262B] uppercase tracking-wider">
              @official_bellawoman in Motion
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#06262B] tracking-tight uppercase">
            Our Stories, Try-Ons & Reels
          </h2>
          <p className="text-sm sm:text-base text-[#71717A] font-light leading-relaxed">
            Experience BellaWoman activewear moving in real life. Browse our try-on reels, workout flexibility tests, and studio behind-the-scenes.
          </p>
        </div>

        {/* Action Button to Official Profile */}
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all group flex-shrink-0"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          <span>Follow @official_bellawoman</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* Video / Reels Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
        {DEFAULT_REELS.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedVideo(item)}
            className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-[#06262B] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-[#EAE6DF] hover:border-[#FF312C]"
          >
            {/* Background Thumbnail Photo */}
            <Image
              src={item.coverImage}
              alt={item.title}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 group-hover:from-black/90 transition-all duration-300" />

            {/* Top Bar: Badge & Reel Icon */}
            <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
              <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/20">
                {item.category}
              </span>
              <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
                </svg>
              </div>
            </div>

            {/* Centered Play Button */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 text-[#06262B] group-hover:bg-[#FF312C] group-hover:text-white shadow-lg flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">
                <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5 fill-current" />
              </div>
            </div>

            {/* Bottom Meta & Caption */}
            <div className="absolute bottom-0 inset-x-0 p-3 sm:p-3.5 text-white space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] text-white/80 font-mono">
                <Eye className="w-3 h-3" />
                <span>{item.views}</span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold line-clamp-1 group-hover:text-[#FF312C] transition-colors">
                {item.title}
              </h3>
              <p className="text-[11px] text-white/70 line-clamp-2 font-light leading-snug">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

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
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#06262B]">@official_bellawoman</h4>
                  <p className="text-[11px] text-[#71717A]">{selectedVideo.category}</p>
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

            {/* Modal Body Preview */}
            <div className="relative aspect-[4/5] bg-black">
              <Image
                src={selectedVideo.coverImage}
                alt={selectedVideo.title}
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              <a
                href={selectedVideo.reelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white group"
              >
                <div className="w-16 h-16 rounded-full bg-white/95 text-[#06262B] group-hover:bg-[#FF312C] group-hover:text-white flex items-center justify-center shadow-2xl transition-all transform group-hover:scale-110">
                  <Play className="w-6 h-6 ml-1 fill-current" />
                </div>
                <span className="text-xs font-semibold bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                  Tap to Watch Video on Instagram
                </span>
              </a>
            </div>

            {/* Modal Footer Info & Commerce Bridge */}
            <div className="p-5 space-y-4">
              <div>
                <h4 className="text-base font-bold text-[#06262B]">
                  {selectedVideo.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#71717A] font-light mt-1">
                  {selectedVideo.caption}
                </p>
              </div>

              {selectedVideo.productSlug && (
                <div className="bg-[#FAF9F5] p-3.5 rounded-2xl border border-[#EAE6DF] flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF312C]">
                      Featured Product
                    </span>
                    <h5 className="text-xs sm:text-sm font-bold text-[#06262B]">
                      {selectedVideo.productName}
                    </h5>
                    {selectedVideo.productPrice && (
                      <p className="text-xs font-bold text-[#18181B] mt-0.5">
                        ₹{selectedVideo.productPrice.toLocaleString("en-IN")}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/product/${selectedVideo.productSlug}`}
                      onClick={() => setSelectedVideo(null)}
                      className="text-xs font-semibold text-[#06262B] hover:text-[#FF312C] underline px-2 py-1"
                    >
                      View Piece
                    </Link>
                    <a
                      href={activeWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#06262B] hover:bg-[#FF312C] text-white text-xs font-semibold px-3 py-2 rounded-xl transition"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Inquire</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Direct Instagram Watch Button */}
              <a
                href={selectedVideo.reelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white font-bold text-sm py-3.5 rounded-2xl shadow-sm hover:opacity-95 transition"
              >
                <span>Open in Instagram (@official_bellawoman)</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
