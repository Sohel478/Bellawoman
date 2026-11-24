"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Download, X, Share, PlusSquare, Sparkles } from "lucide-react";

export function PwaProvider() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [canInstall, setCanInstall] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosPrompt, setShowIosPrompt] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  useEffect(() => {
    // 1. Register Service Worker
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          // Successfully registered
        })
        .catch((err) => {
          console.warn("SW registration error:", err);
        });
    }

    // 2. Check standalone display mode (already installed)
    const inStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(inStandalone);

    // 3. Detect iOS Safari
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    const dismissed = localStorage.getItem("bellawoman_pwa_dismissed");
    if (dismissed) {
      setBannerDismissed(true);
    }

    // 4. Capture beforeinstallprompt for Chrome / Android / Edge
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Check modern navigator.install()
    if (typeof (Navigator.prototype as any).install === "function") {
      setCanInstall(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (typeof (navigator as any).install === "function") {
      try {
        await (navigator as any).install();
        setCanInstall(false);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      }
      return;
    }

    if (!deferredPrompt) return;

    // Prompt user via captured event
    const promptEvent = deferredPrompt;
    setDeferredPrompt(null);
    await promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;

    if (outcome === "accepted") {
      setCanInstall(false);
    }
  };

  const handleDismiss = () => {
    setBannerDismissed(true);
    setShowIosPrompt(false);
    localStorage.setItem("bellawoman_pwa_dismissed", "true");
  };

  // If already running as an installed standalone app or dismissed, hide banner
  if (isStandalone || bannerDismissed) return null;

  return (
    <>
      {/* Android / Desktop Web Install Banner (Shown only when installable) */}
      {canInstall && (
        <aside
          aria-label="Install App"
          className="fixed top-18 left-3 right-3 sm:left-auto sm:right-6 sm:w-96 z-50 bg-[#06262B] text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl border border-white/15 flex items-center justify-between gap-3 animate-in slide-in-from-top-4 duration-300"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#FF312C] flex-shrink-0 flex items-center justify-center p-1.5 shadow-md">
              <Image
                src="/icons/icon-192.png"
                alt="BellaWoman App"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-extrabold text-white truncate">Install BellaWoman App</h4>
                <span className="text-[9px] font-bold uppercase bg-[#FF312C] text-white px-1.5 py-0.2 rounded-full">
                  Fast
                </span>
              </div>
              <p className="text-[11px] text-[#A1A1AA] truncate mt-0.5">
                Instant tap-to-order & full screen browsing
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              type="button"
              onClick={handleInstallClick}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FF312C] hover:bg-[#E02621] text-white font-bold text-xs shadow-xs transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install</span>
            </button>
            <button
              type="button"
              onClick={handleDismiss}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg transition"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </aside>
      )}

      {/* iOS Safari "Add to Home Screen" Helper Banner */}
      {isIos && !canInstall && (
        <aside
          aria-label="Install App on iOS"
          className="fixed bottom-22 left-3 right-3 sm:hidden z-40 bg-[#06262B]/95 backdrop-blur-md text-white p-3.5 rounded-2xl shadow-xl border border-white/10 flex items-center justify-between gap-3 animate-in slide-in-from-bottom-2 duration-300"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl overflow-hidden bg-[#FF312C] flex-shrink-0 p-1 flex items-center justify-center">
              <Image
                src="/icons/icon-192.png"
                alt="BellaWoman"
                width={36}
                height={36}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0 text-xs">
              <p className="font-bold text-white text-[12px] flex items-center gap-1">
                Install as Mobile App
              </p>
              <p className="text-[10px] text-stone-300 flex items-center gap-1 mt-0.5">
                Tap <Share className="w-3 h-3 text-[#FF312C] inline" /> then &quot;Add to Home Screen&quot; <PlusSquare className="w-3 h-3 text-white inline" />
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            className="p-1.5 text-stone-400 hover:text-white"
            aria-label="Close iOS guide"
          >
            <X className="w-4 h-4" />
          </button>
        </aside>
      )}
    </>
  );
}
