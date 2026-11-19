"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Save, Trash2, Upload, AlertCircle } from "lucide-react";
import { CategoryItem } from "@/types";

interface CategoryFormProps {
  initialData?: CategoryItem | null;
}

export function CategoryForm({ initialData }: CategoryFormProps) {
  const router = useRouter();
  const isEditing = Boolean(initialData);

  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [shortDescription, setShortDescription] = useState(initialData?.shortDescription || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [image, setImage] = useState(initialData?.image || "");
  const [bannerImage, setBannerImage] = useState(initialData?.bannerImage || "");
  const [status, setStatus] = useState(initialData?.status || "published");
  const [isFeatured, setIsFeatured] = useState(Boolean(initialData?.isFeatured));
  const [sortOrder, setSortOrder] = useState(initialData?.sortOrder ?? 0);
  const [seoTitle, setSeoTitle] = useState(initialData?.seoTitle || "");
  const [seoDescription, setSeoDescription] = useState(initialData?.seoDescription || "");

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEditing) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      );
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: "image" | "banner") => {
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

      if (target === "image") setImage(data.url);
      else setBannerImage(data.url);
    } catch (err: any) {
      setError(err.message || "Failed to upload image");
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
        name,
        slug,
        shortDescription,
        description,
        image,
        bannerImage,
        status,
        isFeatured,
        sortOrder: Number(sortOrder),
        seoTitle,
        seoDescription,
      };

      const url = isEditing
        ? `/api/admin/categories/${initialData?.id}`
        : "/api/admin/categories";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save category");

      router.push("/admin/categories");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Error saving category");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData) return;
    if (!confirm("Are you sure you want to delete this category?")) return;

    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/categories/${initialData.id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete");

      router.push("/admin/categories");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Delete error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {/* Top action header */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/categories"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#71717A] hover:text-[#06262B] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Categories</span>
        </Link>
        <div className="flex items-center gap-3">
          {isEditing && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={saving}
              className="px-4 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition"
            >
              Delete Category
            </button>
          )}
          <button
            type="submit"
            disabled={saving || uploading}
            className="inline-flex items-center gap-2 bg-[#FF312C] hover:bg-[#E02621] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md transition disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving..." : isEditing ? "Save Changes" : "Create Category"}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs flex items-center gap-2 font-medium">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Form Fields */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE6DF] shadow-xs space-y-6">
        <h2 className="text-base font-bold text-[#06262B] uppercase tracking-wider">
          Basic Category Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#06262B] uppercase">Category Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Activewear"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] focus:border-[#FF312C] text-sm focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#06262B] uppercase">URL Slug *</label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. activewear"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] focus:border-[#FF312C] font-mono text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#06262B] uppercase">Short Description</label>
          <input
            type="text"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="One-line summary shown on category cards"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] focus:border-[#FF312C] text-sm focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#06262B] uppercase">Full Description</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detailed description shown at top of category page"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] focus:border-[#FF312C] text-sm focus:outline-none"
          />
        </div>

        {/* Media */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#EAE6DF]">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#06262B] uppercase">Card Image (3:4 Ratio)</label>
            <div className="flex items-center gap-3">
              {image && (
                <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-[#FAF9F5] border border-[#EAE6DF] flex-shrink-0">
                  <Image src={image} alt="Preview" fill className="object-cover" />
                </div>
              )}
              <div className="flex-1">
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="/products/image-001.jpg"
                  className="w-full px-3 py-2 rounded-xl border border-[#EAE6DF] text-xs font-mono mb-2 focus:outline-none"
                />
                <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#06262B] bg-[#FAF9F5] hover:bg-[#EAE6DF] px-3 py-1.5 rounded-lg cursor-pointer transition border border-[#EAE6DF]">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, "image")}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#06262B] uppercase">Header Banner (Wide)</label>
            <div className="flex items-center gap-3">
              {bannerImage && (
                <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-[#FAF9F5] border border-[#EAE6DF] flex-shrink-0">
                  <Image src={bannerImage} alt="Banner Preview" fill className="object-cover" />
                </div>
              )}
              <div className="flex-1">
                <input
                  type="text"
                  value={bannerImage}
                  onChange={(e) => setBannerImage(e.target.value)}
                  placeholder="/products/image-002.jpg"
                  className="w-full px-3 py-2 rounded-xl border border-[#EAE6DF] text-xs font-mono mb-2 focus:outline-none"
                />
                <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#06262B] bg-[#FAF9F5] hover:bg-[#EAE6DF] px-3 py-1.5 rounded-lg cursor-pointer transition border border-[#EAE6DF]">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Banner</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, "banner")}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Display Settings */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#EAE6DF]">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#06262B] uppercase">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] text-sm focus:outline-none bg-white"
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

          <div className="flex items-center pt-6">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#06262B]">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-[#FF312C] focus:ring-[#FF312C]"
              />
              <span>Featured on Homepage</span>
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}
