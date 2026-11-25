"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Trash2,
  Upload,
  Plus,
  Star,
  ArrowUp,
  ArrowDown,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { ProductItem, CategoryItem } from "@/types";

interface ProductFormProps {
  categories: CategoryItem[];
  initialData?: ProductItem | null;
}

export function ProductForm({ categories, initialData }: ProductFormProps) {
  const router = useRouter();
  const isEditing = Boolean(initialData);

  // Form State
  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [sku, setSku] = useState(initialData?.sku || "");
  const [primaryCategoryId, setPrimaryCategoryId] = useState(
    initialData?.primaryCategoryId || categories[0]?.id || ""
  );
  const [displayPrice, setDisplayPrice] = useState(
    initialData?.displayPrice?.toString() || ""
  );
  const [originalPrice, setOriginalPrice] = useState(
    initialData?.originalPrice?.toString() || ""
  );
  const [status, setStatus] = useState(initialData?.status || "published");
  const [badgeText, setBadgeText] = useState(initialData?.badgeText || "");
  const [isFeatured, setIsFeatured] = useState(Boolean(initialData?.isFeatured));
  const [isNewArrival, setIsNewArrival] = useState(Boolean(initialData?.isNewArrival));
  const [isTrending, setIsTrending] = useState(Boolean(initialData?.isTrending));
  const [isBestSeller, setIsBestSeller] = useState(Boolean(initialData?.isBestSeller));
  const [shortDescription, setShortDescription] = useState(
    initialData?.shortDescription || ""
  );
  const [description, setDescription] = useState(initialData?.description || "");
  const [whatsappMessageOverride, setWhatsappMessageOverride] = useState(
    initialData?.whatsappMessageOverride || ""
  );
  const [seoTitle, setSeoTitle] = useState(initialData?.seoTitle || "");
  const [seoDescription, setSeoDescription] = useState(
    initialData?.seoDescription || ""
  );

  // Images state
  const [images, setImages] = useState<
    Array<{ imagePath: string; altText: string; isPrimary: boolean; sortOrder: number }>
  >(
    initialData?.images?.map((img, i) => ({
      imagePath: img.imagePath,
      altText: img.altText || "",
      isPrimary: Boolean(img.isPrimary || i === 0),
      sortOrder: img.sortOrder ?? i,
    })) || []
  );

  // Marketplace links state
  const [marketplaceLinks, setMarketplaceLinks] = useState<
    Array<{ marketplaceName: string; marketplaceUrl: string; isEnabled: boolean; sortOrder: number }>
  >(
    initialData?.marketplaceLinks?.map((l, i) => ({
      marketplaceName: l.marketplaceName,
      marketplaceUrl: l.marketplaceUrl,
      isEnabled: l.isEnabled,
      sortOrder: l.sortOrder ?? i,
    })) || [
      { marketplaceName: "Meesho", marketplaceUrl: "", isEnabled: true, sortOrder: 0 },
      { marketplaceName: "Amazon", marketplaceUrl: "", isEnabled: true, sortOrder: 1 },
    ]
  );

  // Variants state (Sizes & Colours)
  const defaultSizes = ["XS", "S", "M", "L", "XL"];
  const defaultColours = ["Poppy Red", "Mineral Teal", "Charcoal Black", "Blush Rose"];

  const [selectedSizes, setSelectedSizes] = useState<string[]>(
    Array.from(
      new Set(
        initialData?.variants?.map((v) => v.size).filter(Boolean) as string[]
      )
    ).length > 0
      ? Array.from(
          new Set(
            initialData?.variants?.map((v) => v.size).filter(Boolean) as string[]
          )
        )
      : defaultSizes
  );

  const [selectedColours, setSelectedColours] = useState<string[]>(
    Array.from(
      new Set(
        initialData?.variants?.map((v) => v.colour).filter(Boolean) as string[]
      )
    ).length > 0
      ? Array.from(
          new Set(
            initialData?.variants?.map((v) => v.colour).filter(Boolean) as string[]
          )
        )
      : defaultColours
  );

  const [customColourInput, setCustomColourInput] = useState("");

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

  // Image helpers
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError("");

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");

        setImages((prev) => [
          ...prev,
          {
            imagePath: data.url,
            altText: `${name || "Product"} view`,
            isPrimary: prev.length === 0,
            sortOrder: prev.length,
          },
        ]);
      }
    } catch (err: any) {
      setError(err.message || "Upload error");
    } finally {
      setUploading(false);
    }
  };

  const setPrimaryImage = (index: number) => {
    setImages((prev) =>
      prev.map((img, i) => ({
        ...img,
        isPrimary: i === index,
      }))
    );
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      if (updated.length > 0 && !updated.some((img) => img.isPrimary)) {
        updated[0].isPrimary = true;
      }
      return updated;
    });
  };

  const moveImage = (index: number, direction: "up" | "down") => {
    setImages((prev) => {
      const target = direction === "up" ? index - 1 : index + 1;
      if (target < 0 || target >= prev.length) return prev;
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[target];
      copy[target] = temp;
      return copy.map((img, i) => ({ ...img, sortOrder: i }));
    });
  };

  // Variant helpers
  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColour = (colour: string) => {
    setSelectedColours((prev) =>
      prev.includes(colour) ? prev.filter((c) => c !== colour) : [...prev, colour]
    );
  };

  const addCustomColour = () => {
    if (!customColourInput.trim()) return;
    if (!selectedColours.includes(customColourInput.trim())) {
      setSelectedColours((prev) => [...prev, customColourInput.trim()]);
    }
    setCustomColourInput("");
  };

  // Marketplace helpers
  const updateMarketplaceLink = (index: number, field: string, value: any) => {
    setMarketplaceLinks((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const addMarketplaceLink = () => {
    setMarketplaceLinks((prev) => [
      ...prev,
      {
        marketplaceName: "Flipkart",
        marketplaceUrl: "",
        isEnabled: true,
        sortOrder: prev.length,
      },
    ]);
  };

  const removeMarketplaceLink = (index: number) => {
    setMarketplaceLinks((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      // Build variants combinations
      const variantsPayload: Array<{ size: string; colour: string; sortOrder: number }> = [];
      let vIdx = 0;
      if (selectedSizes.length > 0 && selectedColours.length > 0) {
        for (const s of selectedSizes) {
          for (const c of selectedColours) {
            variantsPayload.push({ size: s, colour: c, sortOrder: vIdx++ });
          }
        }
      } else if (selectedSizes.length > 0) {
        for (const s of selectedSizes) {
          variantsPayload.push({ size: s, colour: "", sortOrder: vIdx++ });
        }
      } else if (selectedColours.length > 0) {
        for (const c of selectedColours) {
          variantsPayload.push({ size: "", colour: c, sortOrder: vIdx++ });
        }
      }

      // Filter valid marketplace links
      const validLinks = marketplaceLinks.filter((l) => l.marketplaceUrl.trim().length > 0);

      const payload = {
        name,
        slug,
        sku,
        primaryCategoryId,
        displayPrice: displayPrice ? parseFloat(displayPrice) : null,
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        status,
        badgeText: badgeText.trim() || null,
        isFeatured,
        isNewArrival,
        isTrending,
        isBestSeller,
        shortDescription,
        description,
        whatsappMessageOverride: whatsappMessageOverride.trim() || null,
        seoTitle,
        seoDescription,
        images,
        marketplaceLinks: validLinks,
        variants: variantsPayload,
      };

      const url = isEditing
        ? `/api/admin/products/${initialData?.id}`
        : "/api/admin/products";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Failed to save product");

      setSuccessMessage("Product saved successfully!");
      setTimeout(() => {
        router.push("/admin/products");
        router.refresh();
      }, 600);
    } catch (err: any) {
      setError(err.message || "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData) return;
    if (!confirm(`Are you sure you want to permanently delete "${initialData.name}"?`)) {
      return;
    }

    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/products/${initialData.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");

      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Delete error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      {/* Top Header Actions */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#71717A] hover:text-[#06262B] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
        <div className="flex items-center gap-3">
          {isEditing && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={saving}
              className="px-4 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition"
            >
              Delete Product
            </button>
          )}
          <button
            type="submit"
            disabled={saving || uploading}
            className="inline-flex items-center gap-2 bg-[#FF312C] hover:bg-[#E02621] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md transition disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving..." : isEditing ? "Save Changes" : "Publish Product"}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs flex items-center gap-2 font-medium">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs flex items-center gap-2 font-semibold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>✓ {successMessage}</span>
        </div>
      )}

      {/* 1. Basic Details */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE6DF] shadow-xs space-y-6">
        <h2 className="text-base font-bold text-[#06262B] uppercase tracking-wider">
          1. Basic Product Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-[#06262B] uppercase">Product Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Seamless Ribbed Sculpt Bra"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] focus:border-[#FF312C] text-sm focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#06262B] uppercase">SKU / Code</label>
            <input
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value.toUpperCase())}
              placeholder="e.g. BR-1013"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] focus:border-[#FF312C] font-mono text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#06262B] uppercase">URL Slug *</label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. seamless-ribbed-sculpt-bra"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] focus:border-[#FF312C] font-mono text-sm focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#06262B] uppercase">Category *</label>
            <select
              value={primaryCategoryId}
              onChange={(e) => setPrimaryCategoryId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] text-sm focus:outline-none bg-white"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#06262B] uppercase">Short Description</label>
          <input
            type="text"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="High-performance activewear bra featuring 4-way stretch and breathability."
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] focus:border-[#FF312C] text-sm focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#06262B] uppercase">Full Description & Fit Details</label>
          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detailed features, fabric composition, support level, and care instructions..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] focus:border-[#FF312C] text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* 2. Image Gallery & Uploads */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE6DF] shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#06262B] uppercase tracking-wider">
              2. Product Image Gallery
            </h2>
            <p className="text-xs text-[#71717A] mt-0.5">
              Upload multiple angles. Star icon marks the primary card thumbnail.
            </p>
          </div>
          <label className="inline-flex items-center gap-2 bg-[#FAF9F5] hover:bg-[#EAE6DF] text-[#06262B] font-semibold text-xs px-4 py-2 rounded-xl cursor-pointer border border-[#EAE6DF] transition">
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Images</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        {uploading && (
          <div className="py-4 text-center text-xs text-[#FF312C] font-medium">
            Uploading and optimizing images...
          </div>
        )}

        {images.length === 0 ? (
          <div className="p-8 border-2 border-dashed border-[#EAE6DF] rounded-2xl text-center text-xs text-[#71717A]">
            No images added yet. Click &quot;Upload Images&quot; or enter image paths.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {images.map((img, i) => (
              <div
                key={i}
                className={`relative aspect-[3/4] rounded-xl overflow-hidden border-2 bg-[#FAF9F5] group ${
                  img.isPrimary ? "border-[#FF312C] shadow-sm" : "border-[#EAE6DF]"
                }`}
              >
                <Image src={img.imagePath} alt={img.altText} fill className="object-cover" sizes="120px" />
                
                {/* Primary star badge */}
                <button
                  type="button"
                  onClick={() => setPrimaryImage(i)}
                  className={`absolute top-1.5 left-1.5 p-1 rounded-full transition ${
                    img.isPrimary
                      ? "bg-[#FF312C] text-white"
                      : "bg-black/50 text-white/70 hover:text-white"
                  }`}
                  title="Make Primary Image"
                >
                  <Star className="w-3 h-3 fill-current" />
                </button>

                {/* Move & Remove Controls Overlay */}
                <div className="absolute bottom-1.5 inset-x-1.5 flex items-center justify-between bg-black/60 backdrop-blur-xs p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity text-white">
                  <div className="flex items-center">
                    <button
                      type="button"
                      disabled={i === 0}
                      onClick={() => moveImage(i, "up")}
                      className="p-1 hover:text-[#FF312C] disabled:opacity-30"
                      title="Move earlier"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      disabled={i === images.length - 1}
                      onClick={() => moveImage(i, "down")}
                      className="p-1 hover:text-[#FF312C] disabled:opacity-30"
                      title="Move later"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="p-1 hover:text-rose-400"
                    title="Remove Image"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Pricing & Merchandising */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE6DF] shadow-xs space-y-6">
        <h2 className="text-base font-bold text-[#06262B] uppercase tracking-wider">
          3. Pricing & Merchandising
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#06262B] uppercase">Display Price (₹)</label>
            <input
              type="number"
              step="1"
              value={displayPrice}
              onChange={(e) => setDisplayPrice(e.target.value)}
              placeholder="e.g. 799"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] text-sm focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#06262B] uppercase">Original Price / MRP (₹)</label>
            <input
              type="number"
              step="1"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="e.g. 1399"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] text-sm focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#06262B] uppercase">Custom Badge Text</label>
            <input
              type="text"
              value={badgeText}
              onChange={(e) => setBadgeText(e.target.value)}
              placeholder="e.g. Best Seller, High Support"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Feature Toggles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#EAE6DF]">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#06262B]">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-4 h-4 rounded text-[#FF312C] focus:ring-[#FF312C]"
            />
            <span>Featured Product</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#06262B]">
            <input
              type="checkbox"
              checked={isNewArrival}
              onChange={(e) => setIsNewArrival(e.target.checked)}
              className="w-4 h-4 rounded text-[#FF312C] focus:ring-[#FF312C]"
            />
            <span>New Arrival Drop</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#06262B]">
            <input
              type="checkbox"
              checked={isTrending}
              onChange={(e) => setIsTrending(e.target.checked)}
              className="w-4 h-4 rounded text-[#FF312C] focus:ring-[#FF312C]"
            />
            <span>Trending Fit</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#06262B]">
            <input
              type="checkbox"
              checked={isBestSeller}
              onChange={(e) => setIsBestSeller(e.target.checked)}
              className="w-4 h-4 rounded text-[#FF312C] focus:ring-[#FF312C]"
            />
            <span>Best Seller</span>
          </label>
        </div>
      </div>

      {/* 4. Sizes & Colours Configuration */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE6DF] shadow-xs space-y-6">
        <h2 className="text-base font-bold text-[#06262B] uppercase tracking-wider">
          4. Variants (Sizes & Colours)
        </h2>

        {/* Sizes */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[#06262B] uppercase">Available Sizes</label>
          <div className="flex flex-wrap gap-2">
            {["XS", "S", "M", "L", "XL", "XXL"].map((s) => {
              const active = selectedSizes.includes(s);
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleSize(s)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                    active
                      ? "bg-[#06262B] text-white border-[#06262B]"
                      : "bg-[#FAF9F5] text-[#71717A] border-[#EAE6DF] hover:border-[#06262B]"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        {/* Colours */}
        <div className="space-y-2 pt-2 border-t border-[#EAE6DF]">
          <label className="text-xs font-semibold text-[#06262B] uppercase">Available Colours</label>
          <div className="flex flex-wrap gap-2">
            {defaultColours.map((c) => {
              const active = selectedColours.includes(c);
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => toggleColour(c)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition border ${
                    active
                      ? "bg-[#FF312C] text-white border-[#FF312C]"
                      : "bg-[#FAF9F5] text-[#71717A] border-[#EAE6DF] hover:border-[#06262B]"
                  }`}
                >
                  {c}
                </button>
              );
            })}
            {selectedColours
              .filter((c) => !defaultColours.includes(c))
              .map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => toggleColour(c)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#FF312C] text-white border border-[#FF312C]"
                >
                  {c} ✕
                </button>
              ))}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="text"
              value={customColourInput}
              onChange={(e) => setCustomColourInput(e.target.value)}
              placeholder="Add custom colour name..."
              className="px-3 py-1.5 text-xs rounded-lg border border-[#EAE6DF] focus:outline-none"
            />
            <button
              type="button"
              onClick={addCustomColour}
              className="text-xs bg-[#FAF9F5] hover:bg-[#EAE6DF] px-3 py-1.5 rounded-lg font-semibold border border-[#EAE6DF]"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* 5. Marketplace Links Management */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE6DF] shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#06262B] uppercase tracking-wider">
              5. Outbound Marketplace Links
            </h2>
            <p className="text-xs text-[#71717A] mt-0.5">
              Enter the exact product listing URLs on Meesho and Amazon. Buttons auto-hide if disabled or empty.
            </p>
          </div>
          <button
            type="button"
            onClick={addMarketplaceLink}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#06262B] bg-[#FAF9F5] hover:bg-[#EAE6DF] px-3 py-1.5 rounded-lg border border-[#EAE6DF]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Channel</span>
          </button>
        </div>

        <div className="space-y-3">
          {marketplaceLinks.map((link, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3.5 rounded-2xl border border-[#EAE6DF] bg-[#FAF9F5]"
            >
              <div className="w-full sm:w-36">
                <input
                  type="text"
                  value={link.marketplaceName}
                  onChange={(e) =>
                    updateMarketplaceLink(i, "marketplaceName", e.target.value)
                  }
                  placeholder="Marketplace Name"
                  className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-[#EAE6DF] bg-white"
                />
              </div>

              <div className="flex-1 w-full">
                <input
                  type="url"
                  value={link.marketplaceUrl}
                  onChange={(e) =>
                    updateMarketplaceLink(i, "marketplaceUrl", e.target.value)
                  }
                  placeholder="https://www.meesho.com/... or https://www.amazon.in/..."
                  className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-[#EAE6DF] bg-white focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <label className="flex items-center gap-1.5 text-xs font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={link.isEnabled}
                    onChange={(e) =>
                      updateMarketplaceLink(i, "isEnabled", e.target.checked)
                    }
                    className="w-4 h-4 text-[#FF312C] rounded"
                  />
                  <span>Active</span>
                </label>

                {link.marketplaceUrl && (
                  <a
                    href={link.marketplaceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-[#71717A] hover:text-[#06262B]"
                    title="Test Link"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => removeMarketplaceLink(i)}
                  className="p-1.5 text-[#71717A] hover:text-rose-600"
                  title="Remove Link"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. WhatsApp Override & SEO */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE6DF] shadow-xs space-y-6">
        <h2 className="text-base font-bold text-[#06262B] uppercase tracking-wider">
          6. WhatsApp Message & SEO Metadata
        </h2>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#06262B] uppercase">
            Product WhatsApp Message Override (Optional)
          </label>
          <textarea
            rows={3}
            value={whatsappMessageOverride}
            onChange={(e) => setWhatsappMessageOverride(e.target.value)}
            placeholder="Leave empty to use global default. Available tokens: {product}, {sku}, {size}, {colour}, {url}"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] text-xs font-mono focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#EAE6DF]">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#06262B] uppercase">SEO Meta Title</label>
            <input
              type="text"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              placeholder="e.g. Sculpt Sports Bra | BellaWoman"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] text-sm focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#06262B] uppercase">SEO Meta Description</label>
            <input
              type="text"
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              placeholder="Short description for Google and WhatsApp preview links"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-[#EAE6DF]">
          <div className="space-y-1.5 max-w-xs">
            <label className="text-xs font-semibold text-[#06262B] uppercase">Publication Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] text-sm focus:outline-none bg-white font-bold"
            >
              <option value="published">Published (Visible in Store)</option>
              <option value="draft">Draft (Hidden)</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Floating / Sticky Bottom Actions Bar */}
      <div className="sticky bottom-4 z-30 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-[#EAE6DF] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#71717A] hover:text-[#06262B] px-3 py-2 rounded-xl transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Cancel</span>
          </Link>
          {successMessage && (
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              ✓ {successMessage}
            </span>
          )}
          {error && (
            <span className="text-xs font-medium text-rose-600 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200 line-clamp-1 max-w-xs">
              {error}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 ml-auto">
          {isEditing && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={saving}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition"
            >
              Delete Product
            </button>
          )}
          <button
            type="submit"
            disabled={saving || uploading}
            className="inline-flex items-center gap-2 bg-[#FF312C] hover:bg-[#E02621] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md transition disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving..." : isEditing ? "Save Changes" : "Publish Product"}</span>
          </button>
        </div>
      </div>
    </form>
  );
}
