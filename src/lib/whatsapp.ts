export interface WhatsAppMessageOptions {
  phone: string;
  productName?: string;
  sku?: string | null;
  productUrl?: string;
  selectedSize?: string | null;
  selectedColour?: string | null;
  price?: number | null;
  currency?: string;
  customTemplate?: string | null;
}

/**
 * Normalizes phone numbers to pure digits without '+', spaces, dashes, or brackets.
 * Defaults to country code 91 if a 10-digit Indian mobile number is provided.
 */
export function cleanPhoneNumber(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, "");
  if (digits.length === 10) {
    return `91${digits}`;
  }
  return digits;
}

/**
 * Builds a dynamic, URL-encoded WhatsApp link.
 */
export function buildWhatsAppLink(options: WhatsAppMessageOptions): string {
  const {
    phone,
    productName,
    sku,
    productUrl,
    selectedSize,
    selectedColour,
    price,
    currency = "INR",
    customTemplate,
  } = options;

  const cleanedPhone = cleanPhoneNumber(phone);

  let message: string;

  if (customTemplate && productName) {
    message = customTemplate
      .replace(/{product}/g, productName)
      .replace(/{sku}/g, sku || "N/A")
      .replace(/{size}/g, selectedSize || "Any")
      .replace(/{colour}/g, selectedColour || "Any")
      .replace(/{url}/g, productUrl || "");
  } else if (productName) {
    const details: string[] = [];
    if (sku) details.push(`SKU: ${sku}`);
    if (selectedSize) details.push(`Size: ${selectedSize}`);
    if (selectedColour) details.push(`Colour: ${selectedColour}`);
    if (price) details.push(`Price: ₹${price.toLocaleString("en-IN")}`);

    const detailsStr = details.length > 0 ? `\nOptions: ${details.join(" | ")}` : "";
    const urlStr = productUrl ? `\nProduct Link: ${productUrl}` : "";

    message = `Hi BellaWoman! 🌸\nI am interested in ordering: *${productName}*${detailsStr}${urlStr}\n\nPlease share availability, delivery details, and order confirmation. Thank you!`;
  } else {
    message = `Hi BellaWoman! 🌸\nI am browsing your collection and would love more details about your latest drops and ordering options.`;
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanedPhone}?text=${encodedMessage}`;
}
