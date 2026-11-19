"use client";

import { useState } from "react";
import { Save, AlertCircle, CheckCircle2, MessageCircle, Sparkles } from "lucide-react";
import { SiteSettingsMap } from "@/types";

interface SettingsFormProps {
  initialSettings: SiteSettingsMap;
}

export function SettingsForm({ initialSettings }: SettingsFormProps) {
  const [brandName, setBrandName] = useState(initialSettings.brandName || "BellaWoman");
  const [whatsappPhone, setWhatsappPhone] = useState(
    initialSettings.whatsappPhone || "+919876543210"
  );
  const [announcementText, setAnnouncementText] = useState(
    initialSettings.announcementText || ""
  );
  const [announcementEnabled, setAnnouncementEnabled] = useState(
    initialSettings.announcementEnabled === "true"
  );
  const [contactEmail, setContactEmail] = useState(
    initialSettings.contactEmail || "support@bellawoman.com"
  );
  const [contactPhone, setContactPhone] = useState(
    initialSettings.contactPhone || "+91 98765 43210"
  );
  const [instagramUrl, setInstagramUrl] = useState(
    initialSettings.instagramUrl || "https://instagram.com/bellawoman"
  );
  const [footerAbout, setFooterAbout] = useState(
    initialSettings.footerAbout || ""
  );
  const [seoTitle, setSeoTitle] = useState(
    initialSettings.seoTitle || "BellaWoman | Trend-Forward Women's Activewear & Fashion"
  );
  const [seoDescription, setSeoDescription] = useState(
    initialSettings.seoDescription || ""
  );

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);

    try {
      const payload = {
        brandName,
        whatsappPhone,
        announcementText,
        announcementEnabled: announcementEnabled ? "true" : "false",
        contactEmail,
        contactPhone,
        instagramUrl,
        footerAbout,
        seoTitle,
        seoDescription,
      };

      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save settings");

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl text-xs flex items-center gap-2 font-medium">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>Site settings saved and updated across live storefront!</span>
        </div>
      )}

      {/* 1. WhatsApp & Social Commerce */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE6DF] shadow-xs space-y-6">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-[#25D366]" />
          <h2 className="text-base font-bold text-[#06262B] uppercase tracking-wider">
            1. WhatsApp Concierge Settings
          </h2>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#06262B] uppercase">
            WhatsApp Business Phone Number (With Country Code) *
          </label>
          <input
            type="text"
            required
            value={whatsappPhone}
            onChange={(e) => setWhatsappPhone(e.target.value)}
            placeholder="+919876543210"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] font-mono text-sm focus:outline-none"
          />
          <p className="text-[11px] text-[#71717A]">
            All &quot;Order on WhatsApp&quot; clicks generate secure wa.me links to this number. Include country code (e.g. +91 for India).
          </p>
        </div>
      </div>

      {/* 2. Announcement Strip */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE6DF] shadow-xs space-y-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#FF312C]" />
          <h2 className="text-base font-bold text-[#06262B] uppercase tracking-wider">
            2. Top Announcement Strip
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#06262B]">
            <input
              type="checkbox"
              checked={announcementEnabled}
              onChange={(e) => setAnnouncementEnabled(e.target.checked)}
              className="w-4 h-4 text-[#FF312C] rounded"
            />
            <span>Enable Announcement Strip on Storefront</span>
          </label>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#06262B] uppercase">Announcement Message</label>
          <input
            type="text"
            value={announcementText}
            onChange={(e) => setAnnouncementText(e.target.value)}
            placeholder="e.g. ✨ New Drop: The Activewear Edit is Live! Tap any piece to order on WhatsApp or Meesho."
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* 3. Brand & Contact Information */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE6DF] shadow-xs space-y-6">
        <h2 className="text-base font-bold text-[#06262B] uppercase tracking-wider">
          3. Brand Details & Social Channels
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#06262B] uppercase">Brand Name</label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] text-sm focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#06262B] uppercase">Support Email</label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] text-sm focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#06262B] uppercase">Display Phone</label>
            <input
              type="text"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] text-sm focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#06262B] uppercase">Instagram Profile URL</label>
            <input
              type="url"
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
              placeholder="https://instagram.com/bellawoman"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#06262B] uppercase">Footer Bio / Summary</label>
          <textarea
            rows={3}
            value={footerAbout}
            onChange={(e) => setFooterAbout(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* 4. Global SEO */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE6DF] shadow-xs space-y-6">
        <h2 className="text-base font-bold text-[#06262B] uppercase tracking-wider">
          4. Global SEO Defaults
        </h2>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#06262B] uppercase">Default Meta Title</label>
          <input
            type="text"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] text-sm focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#06262B] uppercase">Default Meta Description</label>
          <textarea
            rows={3}
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] text-sm focus:outline-none"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 bg-[#FF312C] hover:bg-[#E02621] text-white font-bold text-sm px-8 py-3 rounded-xl shadow-md transition disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving Settings..." : "Save All Settings"}</span>
        </button>
      </div>
    </form>
  );
}
