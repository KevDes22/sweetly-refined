import kitchen from "@/assets/kitchen.jpg";
import bathroom from "@/assets/bathroom.jpg";
import staircase from "@/assets/staircase.jpg";
import hero from "@/assets/hero.jpg";
import lobby from "@/assets/lobby.jpg";
import { siteConfig } from "./config";

export const company = {
  name: siteConfig.companyName,
  email: siteConfig.email,
  phones: siteConfig.phones,
  abuja: siteConfig.abuja,
  kaduna: siteConfig.kaduna,
};

// Images are picked up by file name — drop a new file in the folder and rebuild to replace one.
//   src/assets/stones/<slug>.jpg           main sample photo (from CIBI brochure)
//   src/assets/apps/<slug>-kitchen.jpg     kitchen visualisation
//   src/assets/apps/<slug>-floor.jpg       house floor visualisation
//   src/assets/apps/<slug>-wall.jpg        wall visualisation
const stoneImages = import.meta.glob<string>("/src/assets/stones/*.jpg", { eager: true, import: "default" });
const appImages = import.meta.glob<string>("/src/assets/apps/*.jpg", { eager: true, import: "default" });

export type UseId = "kitchen" | "floor" | "wall";

export const uses: { id: UseId; label: string; title: string; description: string; fallback: string }[] = [
  { id: "kitchen", label: "Kitchen", title: "Kitchen Countertops & Islands", description: "Countertops, islands and backsplashes — a polished granite surface that anchors the kitchen and is made for daily use.", fallback: kitchen },
  { id: "floor", label: "House Floor", title: "Residential Flooring", description: "Living rooms, hallways and entrance halls — large polished slabs that carry light through an open-plan home.", fallback: hero },
  { id: "wall", label: "Wall", title: "Feature Walls & Cladding", description: "Feature walls and interior cladding — continuous stone that gives a room its quiet, architectural centrepiece.", fallback: lobby },
];

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string | null;
  tone: string;
  colour: string;
  description: string;
  image: string;
  gallery: { src: string; label: string; position?: string }[];
  applications: Record<UseId, { src: string; specific: boolean }>;
  specs: { label: string; value: string }[];
  related: string[];
};

type Seed = Pick<Product, "slug" | "name" | "tone" | "colour" | "description"> & { related: string[] };

// Category from CIBI brochure ("finest collection of well polished granites"). Descriptions describe the visible sample only.
const seeds: Seed[] = [
  { slug: "african-multicolor", name: "African Multicolor (AMC)", tone: "Warm multicolour", colour: "Multicolour — warm reds, greys and black", description: "A lively, multi-toned granite with warm mineral flecks that brings depth and character to generous surfaces.", related: ["zaria-red", "champagne-gold", "kujama-black-white"] },
  { slug: "kamazo-grey", name: "Kamazo Grey", tone: "Grey", colour: "Grey with dark mineral flecks", description: "A composed grey granite with an even, fine-grained pattern — understated and endlessly versatile.", related: ["kamazo-wavy", "malali-dark-grey", "champagne-light"] },
  { slug: "champagne-light", name: "Champagne Light", tone: "Light", colour: "Light champagne", description: "A soft, light granite in pale champagne tones that keeps interiors bright and calm.", related: ["champagne-gold", "kamazo-grey", "african-multicolor"] },
  { slug: "champagne-gold", name: "Champagne Gold", tone: "Warm", colour: "Warm champagne gold with dark flecks", description: "A warm, golden granite with a gentle flowing grain — a signature surface for kitchens, floors and feature walls.", related: ["champagne-light", "african-multicolor", "zaria-red"] },
  { slug: "kujama-black-white", name: "Kujama Black & White", tone: "Contrast", colour: "Black and white", description: "A striking contrast of black and white minerals, made for confident, graphic spaces.", related: ["malali-dark-grey", "kamazo-grey", "kamazo-wavy"] },
  { slug: "zaria-red", name: "Zaria Red", tone: "Warm", colour: "Deep red with black", description: "A rich red granite with bold mineral clusters — warm, dramatic and unmistakably distinctive.", related: ["african-multicolor", "champagne-gold", "kujama-black-white"] },
  { slug: "kamazo-wavy", name: "Kamazo Wavy", tone: "Grey", colour: "Grey with flowing movement", description: "A grey granite with natural wave-like movement that gives large surfaces a sense of flow.", related: ["kamazo-grey", "malali-dark-grey", "kujama-black-white"] },
  { slug: "malali-dark-grey", name: "Malali Dark Grey", tone: "Dark", colour: "Dark grey", description: "A deep, dark grey granite with a refined, quiet presence for elegant modern interiors.", related: ["kujama-black-white", "kamazo-grey", "kamazo-wavy"] },
];

export const products: Product[] = seeds.map((s) => {
  const image = stoneImages[`/src/assets/stones/${s.slug}.jpg`] ?? hero;
  const applications = Object.fromEntries(
    uses.map((u) => {
      const src = appImages[`/src/assets/apps/${s.slug}-${u.id}.jpg`];
      return [u.id, { src: src ?? u.fallback, specific: !!src }];
    }),
  ) as Product["applications"];
  return {
    id: s.slug,
    ...s,
    category: "Granite",
    image,
    gallery: [
      { src: image, label: "Polished sample" },
      { src: image, label: "Texture detail", position: "30% 30%" },
      { src: image, label: "Grain close-up", position: "75% 70%" },
    ],
    applications,
    specs: [
      { label: "Material", value: "Granite" },
      { label: "Colour", value: s.colour },
      { label: "Finish", value: "Polished (per CIBI brochure). Other finishes — contact CIBI" },
      { label: "Dimensions & thickness", value: "Contact CIBI" },
      { label: "Recommended applications", value: "Kitchen, flooring, walls" },
      { label: "Processed in", value: "Kaduna, Nigeria" },
    ],
  };
});

export const materialCategories = ["Granite", "Marble", "Quartz", "Porcelain", "Tiles"];

/** Used by the contact page dropdown. */
export const applications = [
  { id: "kitchen", label: "Kitchen", image: kitchen },
  { id: "flooring", label: "House Floor", image: hero },
  { id: "walls", label: "Wall", image: lobby },
  { id: "bathroom", label: "Bathroom", image: bathroom },
  { id: "staircase", label: "Staircase", image: staircase },
] as const;

export function enquiryMessage(productName?: string, application?: string) {
  if (!productName) return "";
  return `Hello CIBI, I am interested in ${productName}${
    application ? ` for my ${application.toLowerCase()}` : ""
  }. I would like to enquire about availability, finishing and pricing.`;
}
