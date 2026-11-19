/**
 * BellaWoman Product Colorway & Swatch Helper
 * Maps authentic product colors, stripe accents, and two-tone combinations to visual hex styles.
 */

export interface ColourSwatchMeta {
  isTwoTone: boolean;
  primaryColor: string;
  secondaryColor?: string;
  label: string;
}

export function getColourSwatch(colourName: string): ColourSwatchMeta {
  const lower = (colourName || "").toLowerCase().trim();

  // Two-tone / Stripe patterns
  if (lower.includes("neon") || (lower.includes("black") && (lower.includes("lime") || lower.includes("yellow")))) {
    return {
      isTwoTone: true,
      primaryColor: "#18181B",
      secondaryColor: "#D4FF00", // Vibrant Neon Lime / Yellow
      label: colourName,
    };
  }

  if (lower.includes("white stripe") || (lower.includes("black") && lower.includes("white"))) {
    return {
      isTwoTone: true,
      primaryColor: "#18181B",
      secondaryColor: "#FFFFFF",
      label: colourName,
    };
  }

  if (lower.includes("heather") || (lower.includes("black") && lower.includes("grey"))) {
    return {
      isTwoTone: true,
      primaryColor: "#18181B",
      secondaryColor: "#9CA3AF",
      label: colourName,
    };
  }

  if (lower.includes("sage") && lower.includes("black")) {
    return {
      isTwoTone: true,
      primaryColor: "#18181B",
      secondaryColor: "#84A98C",
      label: colourName,
    };
  }

  // Solid color mappings
  if (lower.includes("plum") || lower.includes("wine") || lower.includes("burgundy") || lower.includes("cabernet") || lower.includes("berry")) {
    return {
      isTwoTone: false,
      primaryColor: "#581C87",
      label: colourName,
    };
  }

  if (lower.includes("coral") || lower.includes("peach")) {
    return {
      isTwoTone: false,
      primaryColor: "#FB7185", // Fresh Coral Peach
      label: colourName,
    };
  }

  if (lower.includes("teal") || lower.includes("mineral") || lower.includes("petrol")) {
    return {
      isTwoTone: false,
      primaryColor: "#0E7490",
      label: colourName,
    };
  }

  if (lower.includes("olive") || lower.includes("khaki") || lower.includes("green")) {
    return {
      isTwoTone: false,
      primaryColor: "#4D7C0F",
      label: colourName,
    };
  }

  if (lower.includes("vanilla") || lower.includes("cream") || lower.includes("sand") || lower.includes("almond") || lower.includes("nude") || lower.includes("beige")) {
    return {
      isTwoTone: false,
      primaryColor: "#FDE68A", // Cream / Almond
      label: colourName,
    };
  }

  if (lower.includes("white")) {
    return {
      isTwoTone: false,
      primaryColor: "#FFFFFF",
      label: colourName,
    };
  }

  if (lower.includes("rose") || lower.includes("pink")) {
    return {
      isTwoTone: false,
      primaryColor: "#F472B6",
      label: colourName,
    };
  }

  if (lower.includes("poppy") || lower.includes("red")) {
    return {
      isTwoTone: false,
      primaryColor: "#FF312C",
      label: colourName,
    };
  }

  // Default to sleek dark / black
  return {
    isTwoTone: false,
    primaryColor: "#18181B",
    label: colourName,
  };
}
