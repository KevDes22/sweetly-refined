import kitchen from "@/assets/kitchen.jpg";
import bathroom from "@/assets/bathroom.jpg";
import staircase from "@/assets/staircase.jpg";
import hero from "@/assets/hero.jpg";
import lobby from "@/assets/lobby.jpg";

export const company = {
  name: "CIBI Marble & Granite Ltd",
  email: "sales@cibimarbles.com",
  phones: ["0805 938 8382", "0803 476 6930", "0803 554 5068"],
  abuja: "Suite B10/11, 1st Floor, Patsy Plaza, Ebittu Ukiwe, Jabi, Abuja",
  kaduna: "Kaduna, Nigeria",
};

export type Product = { slug: string; name: string; category: string | null; tone: string };

// Category left null until verified by CIBI.
export const products: Product[] = [
  { slug: "african-multicolor", name: "African Multicolor (AMC)", category: null, tone: "Warm multicolour" },
  { slug: "kamazo-grey", name: "Kamazo Grey", category: null, tone: "Grey" },
  { slug: "champagne-light", name: "Champagne Light", category: null, tone: "Light" },
  { slug: "champagne-gold", name: "Champagne Gold", category: null, tone: "Warm" },
  { slug: "kujama-black-white", name: "Kujama Black & White", category: null, tone: "Contrast" },
  { slug: "zaria-red", name: "Zaria Red", category: null, tone: "Warm" },
  { slug: "kamazo-wavy", name: "Kamazo Wavy", category: null, tone: "Grey" },
  { slug: "malali-dark-grey", name: "Malali Dark Grey", category: null, tone: "Dark" },
];

export const materialCategories = ["Granite", "Marble", "Quartz", "Porcelain", "Tiles"];

export const applications = [
  { id: "kitchen", label: "Kitchen", image: kitchen },
  { id: "flooring", label: "Flooring", image: hero },
  { id: "walls", label: "Walls", image: lobby },
  { id: "bathroom", label: "Bathroom", image: bathroom },
  { id: "staircase", label: "Staircase", image: staircase },
] as const;

export type ApplicationId = (typeof applications)[number]["id"];

/** Product-specific application images. Empty until genuine CIBI installation photography is supplied. */
export const productApplicationImages: Partial<Record<string, Partial<Record<ApplicationId, string>>>> = {};

export function enquiryMessage(productName?: string, application?: string) {
  if (!productName) return "";
  return `Hello CIBI, I am interested in ${productName}${
    application ? ` for my ${application.toLowerCase()}` : ""
  }. I would like to enquire about availability, finishing and pricing.`;
}
