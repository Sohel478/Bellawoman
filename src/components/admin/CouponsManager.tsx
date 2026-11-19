"use client";

import { useState } from "react";
import {
  TicketPercent,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  X,
  Tag,
  Calendar,
  Layers,
  Shirt,
  Sparkles,
} from "lucide-react";

interface CouponItem {
  id: string;
  code: string;
  description: string | null;
  discountType: string;
  discountValue: number;
  minOrderAmount: number | null;
  maxDiscount: number | null;
  appliesTo: string;
  targetIds: string | null;
  startDate: string | null;
  endDate: string | null;
  isActive: boolean;
  createdAt: string;
}

interface CategoryOption {
  id: string;
  name: string;
}

interface ProductOption {
  id: string;
  name: string;
  sku: string | null;
  displayPrice: number | null;
}

interface CouponsManagerProps {
  initialCoupons: CouponItem[];
  categories: CategoryOption[];
  products: ProductOption[];
}

export function CouponsManager({
  initialCoupons,
  categories,
  products,
}: CouponsManagerProps) {
  const [coupons, setCoupons] = useState<CouponItem[]>(initialCoupons);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form states
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [minOrderAmount, setMinOrderAmount] = useState("");
  const [maxDiscount, setMaxDiscount] = useState("");
  const [appliesTo, setAppliesTo] = useState<"all" | "category" | "product">("all");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [endDate, setEndDate] = useState("");
  const [productSearch, setProductSearch] = useState("");

  const resetForm = () => {
    setCode("");
    setDescription("");
    setDiscountType("percentage");
    setDiscountValue("");
    setMinOrderAmount("");
    setMaxDiscount("");
    setAppliesTo("all");
    setSelectedCategoryIds([]);
    setSelectedProductIds([]);
    setEndDate("");
    setProductSearch("");
    setError("");
  };

  const handleToggleActive = async (coupon: CouponItem) => {
    try {
      const res = await fetch(`/api/admin/coupons/${coupon.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !coupon.isActive }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      const updated = await res.json();
      setCoupons((prev) => prev.map((c) => (c.id === coupon.id ? updated : c)));
      setSuccess(`Coupon ${coupon.code} is now ${!coupon.isActive ? "Active" : "Inactive"}`);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update coupon status");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleDelete = async (id: string, couponCode: string) => {
    if (!confirm(`Are you sure you want to permanently delete coupon "${couponCode}"?`)) return;

    try {
      const res = await fetch(`/api/admin/coupons/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete coupon");
      setCoupons((prev) => prev.filter((c) => c.id !== id));
      setSuccess(`Coupon "${couponCode}" deleted successfully.`);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to delete coupon");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const cleanCode = code.trim().toUpperCase();
      if (!cleanCode) throw new Error("Coupon code is required");
      const numValue = Number(discountValue);
      if (isNaN(numValue) || numValue <= 0) throw new Error("Please enter a valid discount value");

      let targetIds: string[] | null = null;
      if (appliesTo === "category") {
        if (selectedCategoryIds.length === 0) {
          throw new Error("Please select at least one category for this coupon.");
        }
        targetIds = selectedCategoryIds;
      } else if (appliesTo === "product") {
        if (selectedProductIds.length === 0) {
          throw new Error("Please select at least one product for this coupon.");
        }
        targetIds = selectedProductIds;
      }

      const payload = {
        code: cleanCode,
        description: description.trim() || null,
        discountType,
        discountValue: numValue,
        minOrderAmount: minOrderAmount ? Number(minOrderAmount) : null,
        maxDiscount: maxDiscount ? Number(maxDiscount) : null,
        appliesTo,
        targetIds,
        endDate: endDate ? new Date(endDate).toISOString() : null,
        isActive: true,
      };

      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create coupon");

      setCoupons((prev) => [data, ...prev]);
      setSuccess(`🎉 Coupon "${cleanCode}" created successfully!`);
      setTimeout(() => setSuccess(""), 4000);
      setIsModalOpen(false);
      resetForm();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const getScopeDescription = (c: CouponItem) => {
    if (c.appliesTo === "all") return "All Products (Site-wide)";
    let ids: string[] = [];
    try {
      ids = JSON.parse(c.targetIds || "[]");
    } catch {
      ids = [];
    }

    if (c.appliesTo === "category") {
      const names = categories
        .filter((cat) => ids.includes(cat.id))
        .map((cat) => cat.name);
      return names.length > 0
        ? `Category: ${names.join(", ")}`
        : `Category (${ids.length} selected)`;
    }

    if (c.appliesTo === "product") {
      const prods = products.filter((p) => ids.includes(p.id));
      if (prods.length === 1) {
        return `Piece: ${prods[0].sku || prods[0].name}`;
      }
      return `${ids.length} Specific Products`;
    }

    return "All Products";
  };

  const filteredProducts = products.filter((p) => {
    const q = productSearch.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      (p.sku && p.sku.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Banner Alert Feedback */}
      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs sm:text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{success}</span>
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-2xl text-xs sm:text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Header & Create CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#EAE6DF] shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF312C]">
            Promotions & Conversions
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#06262B] mt-0.5">
            Discount Coupons
          </h1>
          <p className="text-xs sm:text-sm text-[#71717A] mt-1 max-w-2xl">
            Create percentage or flat discount codes. Set them site-wide, or restrict them to particular categories (e.g. Activewear) or specific pieces. Verified discounts carry directly into WhatsApp orders!
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 bg-[#FF312C] hover:bg-[#E02621] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-2xl shadow-sm hover:shadow-md transition self-start sm:self-auto flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create Coupon</span>
        </button>
      </div>

      {/* Coupons Table */}
      <div className="bg-white rounded-3xl border border-[#EAE6DF] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9F5] text-[#71717A] uppercase text-[10px] font-bold border-b border-[#EAE6DF]">
              <tr>
                <th className="py-4 px-6">Coupon Code</th>
                <th className="py-4 px-4">Discount</th>
                <th className="py-4 px-4">Applicability Scope</th>
                <th className="py-4 px-4">Conditions</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE6DF]">
              {coupons.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#71717A]">
                    <TicketPercent className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                    <p className="font-semibold text-sm text-[#06262B]">No discount coupons created yet.</p>
                    <p className="text-xs mt-1">Click &quot;Create Coupon&quot; to offer your first promo code.</p>
                  </td>
                </tr>
              ) : (
                coupons.map((c) => (
                  <tr key={c.id} className="hover:bg-[#FAF9F5]/60 transition">
                    {/* Code & Description */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-extrabold text-sm text-[#06262B] bg-[#FAF9F5] px-2.5 py-1 rounded-lg border border-[#EAE6DF]">
                          {c.code}
                        </span>
                      </div>
                      {c.description && (
                        <p className="text-[11px] text-[#71717A] mt-1">{c.description}</p>
                      )}
                    </td>

                    {/* Discount */}
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 font-bold text-xs text-[#06262B] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full">
                        {c.discountType === "percentage" ? `${c.discountValue}% OFF` : `₹${c.discountValue} FLAT OFF`}
                      </span>
                    </td>

                    {/* Scope */}
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#06262B]">
                        {c.appliesTo === "all" ? (
                          <Sparkles className="w-3.5 h-3.5 text-[#FF312C]" />
                        ) : c.appliesTo === "category" ? (
                          <Layers className="w-3.5 h-3.5 text-blue-600" />
                        ) : (
                          <Shirt className="w-3.5 h-3.5 text-purple-600" />
                        )}
                        <span>{getScopeDescription(c)}</span>
                      </span>
                    </td>

                    {/* Conditions */}
                    <td className="py-4 px-4 text-[11px] text-[#71717A] space-y-0.5">
                      {c.minOrderAmount ? (
                        <p>Min order: <strong>₹{c.minOrderAmount}</strong></p>
                      ) : (
                        <p>No min order</p>
                      )}
                      {c.maxDiscount && c.discountType === "percentage" && (
                        <p>Max cap: <strong>₹{c.maxDiscount}</strong></p>
                      )}
                      {c.endDate && (
                        <p className="text-[10px] text-[#FF312C]">
                          Expires: {new Date(c.endDate).toLocaleDateString("en-IN")}
                        </p>
                      )}
                    </td>

                    {/* Status Toggle */}
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleToggleActive(c)}
                        className={`text-[11px] font-bold px-3 py-1 rounded-full border transition ${
                          c.isActive
                            ? "bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100"
                            : "bg-stone-100 border-stone-300 text-stone-500 hover:bg-stone-200"
                        }`}
                      >
                        {c.isActive ? "Active" : "Disabled"}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleDelete(c.id, c.code)}
                        className="p-1.5 rounded-lg text-[#71717A] hover:text-red-600 hover:bg-red-50 transition"
                        title="Delete coupon"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Coupon Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-[#EAE6DF] space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#EAE6DF] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#06262B]">Create Discount Coupon</h3>
                <p className="text-xs text-[#71717A]">Configure coupon code, value, and product applicability.</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-[#FAF9F5] text-[#71717A] hover:text-[#06262B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleCreateCoupon} className="space-y-5 text-xs">
              {/* Code & Description */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#06262B] uppercase">Coupon Code *</label>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="e.g. BELLA20, FIRST10"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] font-mono text-sm uppercase focus:outline-none focus:ring-1 focus:ring-[#FF312C]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#06262B] uppercase">Description (Optional)</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. 20% off exclusively on Activewear and Sports Bras"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* Discount Type & Value */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#06262B] uppercase">Discount Type</label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as "percentage" | "fixed")}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] bg-white font-medium focus:outline-none"
                  >
                    <option value="percentage">Percentage Discount (%)</option>
                    <option value="fixed">Flat Amount (₹)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#06262B] uppercase">
                    {discountType === "percentage" ? "Percentage Value (%) *" : "Flat Amount (₹) *"}
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max={discountType === "percentage" ? "99" : "10000"}
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    placeholder={discountType === "percentage" ? "20" : "200"}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] font-bold text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Minimum Order & Max Discount */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#06262B] uppercase">Min Order Price (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={minOrderAmount}
                    onChange={(e) => setMinOrderAmount(e.target.value)}
                    placeholder="e.g. 999 (optional)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#06262B] uppercase">Max Discount Cap (₹)</label>
                  <input
                    type="number"
                    min="0"
                    disabled={discountType === "fixed"}
                    value={maxDiscount}
                    onChange={(e) => setMaxDiscount(e.target.value)}
                    placeholder="e.g. 500 (optional)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] focus:outline-none disabled:bg-stone-50"
                  />
                </div>
              </div>

              {/* Applicability Scope */}
              <div className="space-y-2 pt-2 border-t border-[#EAE6DF]">
                <label className="font-bold text-[#06262B] uppercase tracking-wider block">
                  Applicability: Where can this coupon be used?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setAppliesTo("all")}
                    className={`p-3 rounded-xl border text-center transition ${
                      appliesTo === "all"
                        ? "border-[#FF312C] bg-[#FFF2F1] text-[#FF312C] font-bold"
                        : "border-[#EAE6DF] text-[#71717A] hover:border-[#06262B]/30"
                    }`}
                  >
                    <Sparkles className="w-4 h-4 mx-auto mb-1" />
                    <span>All Products</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAppliesTo("category")}
                    className={`p-3 rounded-xl border text-center transition ${
                      appliesTo === "category"
                        ? "border-[#FF312C] bg-[#FFF2F1] text-[#FF312C] font-bold"
                        : "border-[#EAE6DF] text-[#71717A] hover:border-[#06262B]/30"
                    }`}
                  >
                    <Layers className="w-4 h-4 mx-auto mb-1" />
                    <span>Categories</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAppliesTo("product")}
                    className={`p-3 rounded-xl border text-center transition ${
                      appliesTo === "product"
                        ? "border-[#FF312C] bg-[#FFF2F1] text-[#FF312C] font-bold"
                        : "border-[#EAE6DF] text-[#71717A] hover:border-[#06262B]/30"
                    }`}
                  >
                    <Shirt className="w-4 h-4 mx-auto mb-1" />
                    <span>Particular Items</span>
                  </button>
                </div>
              </div>

              {/* Specific Category Selector */}
              {appliesTo === "category" && (
                <div className="p-3.5 bg-[#FAF9F5] rounded-2xl border border-[#EAE6DF] space-y-2">
                  <span className="font-bold text-[#06262B] block">Select Applicable Categories:</span>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((cat) => (
                      <label
                        key={cat.id}
                        className="flex items-center gap-2 p-2 bg-white rounded-xl border border-[#EAE6DF] cursor-pointer hover:border-[#06262B]/40"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategoryIds.includes(cat.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCategoryIds((prev) => [...prev, cat.id]);
                            } else {
                              setSelectedCategoryIds((prev) => prev.filter((id) => id !== cat.id));
                            }
                          }}
                          className="rounded text-[#FF312C] focus:ring-[#FF312C]"
                        />
                        <span className="font-medium text-[#18181B] truncate">{cat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Specific Product Selector */}
              {appliesTo === "product" && (
                <div className="p-3.5 bg-[#FAF9F5] rounded-2xl border border-[#EAE6DF] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#06262B]">Select Applicable Products:</span>
                    <span className="text-[10px] text-[#71717A]">
                      {selectedProductIds.length} selected
                    </span>
                  </div>
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search by SKU (e.g. BR-1012) or name..."
                    className="w-full px-3 py-1.5 rounded-lg border border-[#EAE6DF] bg-white text-xs"
                  />
                  <div className="max-h-40 overflow-y-auto space-y-1.5 divide-y divide-[#EAE6DF]/60">
                    {filteredProducts.slice(0, 15).map((p) => (
                      <label
                        key={p.id}
                        className="flex items-center gap-2 pt-1.5 first:pt-0 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedProductIds.includes(p.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedProductIds((prev) => [...prev, p.id]);
                            } else {
                              setSelectedProductIds((prev) => prev.filter((id) => id !== p.id));
                            }
                          }}
                          className="rounded text-[#FF312C] focus:ring-[#FF312C]"
                        />
                        <div className="truncate flex-1">
                          <span className="font-mono font-bold text-[#06262B] mr-1.5">
                            {p.sku || "N/A"}
                          </span>
                          <span className="text-[#71717A] truncate">{p.name}</span>
                        </div>
                        {p.displayPrice && (
                          <span className="font-bold text-[#06262B] flex-shrink-0">
                            ₹{p.displayPrice}
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Expiry Date */}
              <div className="space-y-1 pt-2 border-t border-[#EAE6DF]">
                <label className="font-semibold text-[#06262B] uppercase">Expiry Date (Optional)</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE6DF] focus:outline-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#EAE6DF] font-semibold text-[#71717A] hover:bg-[#FAF9F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-[#FF312C] hover:bg-[#E02621] text-white font-bold transition disabled:opacity-50"
                >
                  {saving ? "Creating..." : "Save & Activate Coupon"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
