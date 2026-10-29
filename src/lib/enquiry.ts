import { siteConfig } from "./config";

export type QuoteDetails = {
  name: string;
  phone: string;
  email?: string;
  product: string;
  application: string;
  quantity?: string;
  unit?: string;
  finish?: string;
  location?: string;
  installation?: string;
  details?: string;
};

export function quoteMessage(q: QuoteDetails) {
  const line = (k: string, v?: string) => (v && v.trim() ? `${k}: ${v.trim()}\n\n` : "");
  const qty = q.quantity?.trim() ? `${q.quantity.trim()}${q.unit ? ` ${q.unit}` : ""}` : "";
  return (
    "Hello CIBI Marbles & Granite,\n\nI would like to request a quotation for one of your products.\n\n" +
    line("Product", q.product) +
    line("Application", q.application) +
    line("Estimated Quantity", qty) +
    line("Preferred Finish", q.finish) +
    line("Project Location", q.location) +
    line("Installation Required", q.installation) +
    line("Customer Name", q.name) +
    line("Phone Number", q.phone) +
    line("Email", q.email) +
    line("Additional Details", q.details) +
    "Kindly provide information about pricing, availability, fabrication, installation, and delivery.\n\nThank you."
  );
}

export function contactMessage(product: string, application: string) {
  return `Hello CIBI, I am interested in ${product} granite for my ${application.toLowerCase()}. I would like to speak with your team about this product.`;
}

/** WhatsApp link when a number is configured, otherwise an email fallback. */
export function enquiryLink(message: string, subject: string, whatsapp = siteConfig.whatsappNumber) {
  const digits = whatsapp.replace(/\D/g, "");
  if (digits) return { channel: "whatsapp" as const, href: `https://wa.me/${digits}?text=${encodeURIComponent(message)}` };
  return {
    channel: "email" as const,
    href: `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`,
  };
}
