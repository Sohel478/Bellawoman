export interface MarketplaceInfo {
  name: string;
  badgeBg: string;
  badgeText: string;
  iconName?: string;
}

export function getMarketplaceMeta(name: string): MarketplaceInfo {
  const normalized = name.toLowerCase().trim();

  if (normalized.includes("meesho")) {
    return {
      name: "Meesho",
      badgeBg: "bg-[#7B1E54] hover:bg-[#621643] text-white",
      badgeText: "Buy on Meesho",
    };
  }

  if (normalized.includes("amazon")) {
    return {
      name: "Amazon",
      badgeBg: "bg-[#FF9900] hover:bg-[#E08600] text-black font-semibold",
      badgeText: "Buy on Amazon",
    };
  }

  if (normalized.includes("flipkart")) {
    return {
      name: "Flipkart",
      badgeBg: "bg-[#2874F0] hover:bg-[#1C5BC7] text-white",
      badgeText: "Buy on Flipkart",
    };
  }

  return {
    name,
    badgeBg: "bg-[#06262B] hover:bg-[#0B3B42] text-white",
    badgeText: `Buy on ${name}`,
  };
}
