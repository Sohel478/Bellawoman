"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Trash2, Edit2, Upload, Save, AlertCircle } from "lucide-react";
import { BannerItem } from "@/types";

interface BannerManagerProps {
  initialBanners: BannerItem[];
}

export function BannerManager({ initialBanners }: BannerManagerProps) {
  const [banners, setBanners] = useState<BannerItem[]>(initialBanners);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // Form
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [desktopImage, setDesktopImage] = useState("");
  const [mobileImage, setMobileImage] = useState("");
  const [ctaLabel, setCtaLabel] = useState("Shop the Collection");
  const [ctaTarget, setCtaTarget] = useState("/category/activewear");
  const [status, setStatus] = useState("published");
  const [sortOrder, setSortOrder] = useState(0);

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const resetForm = () => {
    setIsEditing(false);
    setEditId(null);
    setTitle("");
    setSubtitle("");
    setDesktopImage("");
    setMobileImage("");
    setCtaLabel("Shop the Collection");
    setCtaTarget("/category/activewear");
    setStatus("published");
    setSortOrder(0);
    setError("");
  };

  const handleEdit = (banner: BannerItem) => {
    setIsEditing(true);
    setEditId(banner.id);
    setTitle(banner.title);
    setSubtitle(banner.subtitle || "");
    setDesktopImage(banner.desktopImage);
    setMobileImage(banner.mobileImage || "");
    setCtaLabel(banner.ctaLabel || "Shop the Collection");
    setCtaTarget(banner.ctaTarget || "/category/activewear");
    setStatus(banner.status);
    setSortOrder(banner.sortOrder);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: "desktop" | "mobile") => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      if (target === "desktop") setDesktopImage(data.url);
      else setMobileImage(data.url);
    } catch (err: any) {
      setError(err.message || "Upload error");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = {
        id: editId,
        title,
        subtitle,
        desktopImage,
        mobileImage: mobileImage || desktopImage,
        ctaLabel,
        ctaTarget,
        status,
        sortOrder: Number(sortOrder),
      };

      const res = await fetch("/api/admin/banners", {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save banner");

      if (editId) {
        setBanners((prev) => prev.map((b) => (b.id === editId ? data : b)));
      } else {
        setBanners((prev) => [...prev, data]);
      }

      resetForm();
    } catch (err: any) {
      setError(err.message || "Error saving banner");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this banner?")) return;

    try {
      const res = await fetch(`/api/admin/banners?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");

      setBanners((prev) => prev.filter((b) => b.id !== id));
      if (editId === id) resetForm();
    } catch (err: any) {
      alert("Failed to delete banner");
    }
  };

  return (
    <div className="space-y-8">
      {/* Existing Banners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-3xl overflow-hidden border border-[#EAE6DF] shadow-xs flex flex-col justify-between"
          >
            <div className="relative aspect-[16/9] w-full bg-[#06262B]">
              <Image src={b.desktopImage} alt={b.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">
                  {b.status}
                </span>
                <h3 className="text-base font-extrabold mt-1 uppercase line-clamp-1">{b.title}</h3>
              </div>
            </div>

            <div className="p-4 flex items-center justify-between text-xs">
              <span className="text-[#71717A]">
                CTA: <strong>{b.ctaLabel}</strong> → <code className="font-mono">{b.ctaTarget}</code>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(b)}
                  className="p-1.5 text-[#06262B] hover:text-[#FF312C] font-semibold"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(b.id)}
                  className="p-1.5 text-rose-500 hover:text-rose-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Editor / Creator Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE6DF] shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-[#EAE6DF] pb-4">
          <h2 className="text-base font-bold text-[#06262B] uppercase tracking-wider">
            {editId ? "Edit Campaign Banner" : "Create New Campaign Banner"}
          </h2>
          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="text-xs text-[#71717A] hover:underline"
            >
              Cancel Edit
            </button>
          )}
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#06262B] uppercase">Banner Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. SCULPTED FOR MOVEMENT"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] text-sm focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#06262B] uppercase">Subtitle / Supporting Copy</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. Discover high-performance sports bras..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Desktop Media */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#06262B] uppercase">Desktop Image URL *</label>
            <div className="flex items-center gap-3">
              {desktopImage && (
                <div className="relative w-24 h-14 rounded-xl overflow-hidden bg-[#FAF9F5] border border-[#EAE6DF] flex-shrink-0">
                  <Image src={desktopImage} alt="Preview" fill className="object-cover" />
                </div>
              )}
              <div className="flex-1">
                <input
                  type="text"
                  required
                  value={desktopImage}
                  onChange={(e) => setDesktopImage(e.target.value)}
                  placeholder="/products/image-010.jpg"
                  className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-[#EAE6DF] mb-2 focus:outline-none"
                />
                <label className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#FAF9F5] hover:bg-[#EAE6DF] px-3 py-1.5 rounded-lg cursor-pointer border border-[#EAE6DF]">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Desktop</span>
                  <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "desktop")} className="hidden" />
                </label>
              </div>
            </div>
          </div>

          {/* Mobile Media */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#06262B] uppercase">Mobile Image URL (Optional)</label>
            <div className="flex items-center gap-3">
              {mobileImage && (
                <div className="relative w-16 h-14 rounded-xl overflow-hidden bg-[#FAF9F5] border border-[#EAE6DF] flex-shrink-0">
                  <Image src={mobileImage} alt="Mobile Preview" fill className="object-cover" />
                </div>
              )}
              <div className="flex-1">
                <input
                  type="text"
                  value={mobileImage}
                  onChange={(e) => setMobileImage(e.target.value)}
                  placeholder="/products/image-011.jpg"
                  className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-[#EAE6DF] mb-2 focus:outline-none"
                />
                <label className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#FAF9F5] hover:bg-[#EAE6DF] px-3 py-1.5 rounded-lg cursor-pointer border border-[#EAE6DF]">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Mobile</span>
                  <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "mobile")} className="hidden" />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* CTA & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-4 border-t border-[#EAE6DF]">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#06262B] uppercase">CTA Button Text</label>
            <input
              type="text"
              value={ctaLabel}
              onChange={(e) => setCtaLabel(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] text-sm focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#06262B] uppercase">CTA Destination Link</label>
            <input
              type="text"
              value={ctaTarget}
              onChange={(e) => setCtaTarget(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] font-mono text-sm focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#06262B] uppercase">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] text-sm bg-white focus:outline-none"
            >
              <option value="published">Published</option>
              <option value="draft">Draft (Hidden)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#06262B] uppercase">Sort Order</label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-[#EAE6DF] flex justify-end">
          <button
            type="submit"
            disabled={saving || uploading}
            className="inline-flex items-center gap-2 bg-[#FF312C] hover:bg-[#E02621] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md transition disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving..." : editId ? "Save Banner" : "Create Banner"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
