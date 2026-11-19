export interface MarketplaceInfo {
  name: string;
  badgeBg: string;
  badgeText: string;
  brandColor: string;
  brandAccent: string;
}

export function getMarketplaceMeta(name: string): MarketplaceInfo {
  const normalized = name.toLowerCase().trim();

  if (normalized.includes("meesho")) {
    return {
      name: "Meesho",
      badgeBg:
        "bg-white hover:bg-[#FAF9F5] text-[#06262B] border border-[#EAE6DF] hover:border-[#7B1E54] hover:shadow-xs",
      badgeText: "Buy on Meesho",
      brandColor: "#7B1E54",
      brandAccent: "bg-[#7B1E54]",
    };
  }

  if (normalized.includes("amazon")) {
    return {
      name: "Amazon",
      badgeBg:
        "bg-white hover:bg-[#FAF9F5] text-[#06262B] border border-[#EAE6DF] hover:border-[#18181B] hover:shadow-xs",
      badgeText: "Buy on Amazon",
      brandColor: "#FF9900",
      brandAccent: "bg-[#FF9900]",
    };
  }

  if (normalized.includes("flipkart")) {
    return {
      name: "Flipkart",
      badgeBg:
        "bg-white hover:bg-[#FAF9F5] text-[#06262B] border border-[#EAE6DF] hover:border-[#2874F0] hover:shadow-xs",
      badgeText: "Buy on Flipkart",
      brandColor: "#2874F0",
      brandAccent: "bg-[#2874F0]",
    };
  }

  return {
    name,
    badgeBg:
      "bg-white hover:bg-[#FAF9F5] text-[#06262B] border border-[#EAE6DF] hover:border-[#06262B] hover:shadow-xs",
    badgeText: `Buy on ${name}`,
    brandColor: "#06262B",
    brandAccent: "bg-[#06262B]",
  };
}
