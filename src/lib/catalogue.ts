import kitchen from "@/assets/kitchen.jpg";
import bathroom from "@/assets/bathroom.jpg";
import staircase from "@/assets/staircase.jpg";
import hero from "@/assets/hero.jpg";
import lobby from "@/assets/lobby.jpg";
import s_african_multicolor from "@/assets/stones/african-multicolor.jpg";
import s_kamazo_grey from "@/assets/stones/kamazo-grey.jpg";
import s_champagne_light from "@/assets/stones/champagne-light.jpg";
import s_champagne_gold from "@/assets/stones/champagne-gold.jpg";
import s_kujama_black_white from "@/assets/stones/kujama-black-white.jpg";
import s_zaria_red from "@/assets/stones/zaria-red.jpg";
import s_kamazo_wavy from "@/assets/stones/kamazo-wavy.jpg";
import s_malali_dark_grey from "@/assets/stones/malali-dark-grey.jpg";

export const company = {
  name: "CIBI Marble & Granite Ltd",
  email: "sales@cibimarbles.com",
  phones: ["0805 938 8382", "0803 476 6930", "0803 554 5068"],
  abuja: "Suite B10/11, 1st Floor, Patsy Plaza, Ebittu Ukiwe, Jabi, Abuja",
  kaduna: "Kaduna, Nigeria",
};

export type Product = { slug: string; name: string; category: string | null; tone: string; image: string };

// Category from CIBI brochure ("finest collection of well polished granites"). Images are enhanced from the brochure sample sheet.
export const products: Product[] = [
  { slug: "african-multicolor", name: "African Multicolor (AMC)", category: "Granite", tone: "Warm multicolour", image: s_african_multicolor },
  { slug: "kamazo-grey", name: "Kamazo Grey", category: "Granite", tone: "Grey", image: s_kamazo_grey },
  { slug: "champagne-light", name: "Champagne Light", category: "Granite", tone: "Light", image: s_champagne_light },
  { slug: "champagne-gold", name: "Champagne Gold", category: "Granite", tone: "Warm", image: s_champagne_gold },
  { slug: "kujama-black-white", name: "Kujama Black & White", category: "Granite", tone: "Contrast", image: s_kujama_black_white },
  { slug: "zaria-red", name: "Zaria Red", category: "Granite", tone: "Warm", image: s_zaria_red },
  { slug: "kamazo-wavy", name: "Kamazo Wavy", category: "Granite", tone: "Grey", image: s_kamazo_wavy },
  { slug: "malali-dark-grey", name: "Malali Dark Grey", category: "Granite", tone: "Dark", image: s_malali_dark_grey },
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
