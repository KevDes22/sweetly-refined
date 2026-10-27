import { createFileRoute, Link } from "@tanstack/react-router";
import factory from "@/assets/factory.jpg";
import kitchen from "@/assets/kitchen.jpg";
import { PageIntro } from "@/components/site";

export const Route = createFileRoute("/manufacturing")({
  head: () => ({
    meta: [
      { title: "Manufacturing in Kaduna — CIBI Marble & Granite" },
      { name: "description", content: "How CIBI sources, cuts, polishes and fabricates natural stone in Kaduna using Italian technology." },
      { property: "og:title", content: "Manufacturing in Kaduna — CIBI Marble & Granite" },
      { property: "og:description", content: "From Nigerian quarry to finished surface: CIBI's stone process." },
    ],
  }),
  component: Manufacturing,
});

const steps = [
  ["Sourcing", "Natural stone is sourced from Nigerian dimension-stone quarries and selected for colour and consistency."],
  ["Cutting", "Blocks are cut into slabs in our Kaduna facility using Italian cutting technology."],
  ["Polishing", "Slabs are polished to bring out depth, character and the natural movement of each stone."],
  ["Fabrication", "Surfaces are shaped to measure for countertops, stairs, floors, walls and vanities."],
  ["Quality checks", "Each piece is inspected before it leaves the facility."],
  ["Installation", "Our team supports installation so every surface is finished as designed."],
];

function Manufacturing() {
  return (
    <>
      <PageIntro eyebrow="Proudly Manufactured in Nigeria" title="Precision in Every Cut.">
        In Kaduna, Nigerian stone becomes architectural surface — through careful selection, Italian technology and skilled hands.
      </PageIntro>
      <img src={factory} alt="Industrial saw cutting a granite block in the Kaduna facility" width={1280} height={960} className="aspect-[21/9] w-full object-cover" />
      <section className="mx-auto max-w-[1440px] px-6 py-28 md:px-12 md:py-36">
        {steps.map(([t, d], i) => (
          <div key={t} className="grid gap-6 border-t border-border py-12 md:grid-cols-12">
            <p className="font-display text-2xl text-gold md:col-span-2">0{i + 1}</p>
            <h2 className="text-4xl md:col-span-4 md:text-5xl">{t}</h2>
            <p className="max-w-md leading-relaxed text-muted-foreground md:col-span-5 md:col-start-8">{d}</p>
          </div>
        ))}
        <p className="mt-6 text-xs text-stone">Facility photography shown is illustrative until CIBI's own images are supplied.</p>
      </section>
      <section className="bg-charcoal text-ivory">
        <div className="mx-auto grid max-w-[1440px] items-center gap-16 px-6 py-28 md:grid-cols-2 md:px-12">
          <img src={kitchen} alt="Finished granite kitchen countertop" loading="lazy" className="aspect-[4/3] w-full object-cover" />
          <div>
            <h2 className="text-5xl">From our floor to yours.</h2>
            <Link to="/contact" className="eyebrow mt-10 inline-block bg-ivory px-8 py-4 text-charcoal">Request a Quote</Link>
          </div>
        </div>
      </section>
    </>
  );
}
