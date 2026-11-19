"use client";

import { useState } from "react";
import { X, Sparkles } from "lucide-react";

interface AnnouncementBarProps {
  text?: string;
  enabled?: boolean;
}

export function AnnouncementBar({ text, enabled = true }: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(false);

  if (!enabled || !text || dismissed) return null;

  return (
    <aside aria-label="Announcement" className="bg-[#06262B] text-white text-xs md:text-sm font-medium tracking-wide py-2.5 px-4 relative flex items-center justify-center transition-all duration-300">
      <div className="flex items-center gap-2 text-center">
        <Sparkles className="w-3.5 h-3.5 text-[#FF312C] animate-pulse flex-shrink-0" />
        <span>{text}</span>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 text-white/70 hover:text-white p-1 rounded-full transition-colors"
        aria-label="Dismiss announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
}
