import { createFileRoute, Link } from "@tanstack/react-router";
import staircase from "@/assets/staircase.jpg";
import bathroom from "@/assets/bathroom.jpg";
import { PageIntro } from "@/components/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About CIBI — Indigenous Nigerian Stone Manufacturer" },
      { name: "description", content: "CIBI Marble & Granite is an indigenous Nigerian manufacturer of granite and marble surfaces, based in Kaduna with showrooms in Kaduna and Abuja." },
      { property: "og:title", content: "About CIBI Marble & Granite" },
      { property: "og:description", content: "Crafted in Nigeria. Designed to Last." },
    ],
  }),
  component: About,
});

const pillars = [
  ["Indigenous manufacturing", "CIBI is a Nigerian company, manufacturing natural stone surfaces from our facility in Kaduna."],
  ["Craftsmanship & technology", "Italian cutting and polishing technology, guided by skilled hands."],
  ["Commitment to quality", "From stone selection to installation, every stage is handled with care."],
  ["For those who build", "We serve architects, contractors, developers, interior designers, businesses and homeowners."],
];

function About() {
  return (
    <>
      <PageIntro eyebrow="About CIBI" title="Crafted in Nigeria. Designed to Last." />
      <section className="mx-auto grid max-w-[1440px] gap-16 px-6 pb-28 md:grid-cols-12 md:px-12">
        <img src={staircase} alt="Natural stone staircase" width={960} height={1280} className="aspect-[3/4] w-full object-cover md:col-span-5" />
        <div className="md:col-span-6 md:col-start-7 md:pt-24">
          <p className="font-display text-3xl leading-snug md:text-4xl">
            We manufacture, supply, cut, polish, fabricate and install natural stone — bringing Nigerian materials to spaces made to endure.
          </p>
          <div className="mt-16 divide-y divide-border border-y border-border">
            {pillars.map(([t, d]) => (
              <div key={t} className="grid gap-3 py-8 sm:grid-cols-2">
                <h2 className="text-2xl">{t}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="relative bg-charcoal text-ivory">
        <img src={bathroom} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="relative mx-auto max-w-[1440px] px-6 py-36 md:px-12">
          <p className="eyebrow text-gold">Kaduna · Abuja</p>
          <h2 className="mt-6 max-w-2xl text-5xl md:text-6xl">Visit a showroom and meet the stone.</h2>
          <Link to="/contact" hash="showrooms" className="eyebrow mt-10 inline-block bg-ivory px-8 py-4 text-charcoal">Our Showrooms</Link>
        </div>
      </section>
    </>
  );
}
