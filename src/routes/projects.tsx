import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import kitchen from "@/assets/kitchen.jpg";
import staircase from "@/assets/staircase.jpg";
import bathroom from "@/assets/bathroom.jpg";
import hero from "@/assets/hero.jpg";
import lobby from "@/assets/lobby.jpg";
import { PageIntro } from "@/components/site";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — CIBI Marbles & Granite Installations" },
      { name: "description", content: "Granite and marble countertops, staircases, flooring and vanities — natural stone in finished spaces." },
      { property: "og:title", content: "Projects — CIBI Marbles & Granite" },
      { property: "og:description", content: "Spaces that tell our story." },
    ],
  }),
  component: Projects,
});

const items = [
  { img: kitchen, label: "Kitchen countertops", cls: "md:col-span-7 aspect-[4/3]" },
  { img: staircase, label: "Natural stone staircases", cls: "md:col-span-5 aspect-[3/4]" },
  { img: bathroom, label: "Bathroom vanities", cls: "md:col-span-5 aspect-[3/4]" },
  { img: hero, label: "Flooring", cls: "md:col-span-7 aspect-[4/3]" },
  { img: lobby, label: "Interior surfaces", cls: "md:col-span-12 aspect-[21/9]" },
];

function Projects() {
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => ((o ?? 0) + 1) % items.length);
      if (e.key === "ArrowLeft") setOpen((o) => ((o ?? 0) - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  return (
    <>
      <PageIntro eyebrow="Projects" title="Spaces That Tell Our Story.">
        A selection of applications. CIBI installation photography will appear here as projects are documented.
      </PageIntro>
      <section className="mx-auto grid max-w-[1440px] gap-8 px-6 pb-32 md:grid-cols-12 md:px-12">
        {items.map((it, i) => (
          <button key={it.label} onClick={() => setOpen(i)} className={`group relative overflow-hidden text-left ${it.cls}`}>
            <img src={it.img} alt={`${it.label} — inspiration`} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-[1.03]" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/70 to-transparent p-8 text-ivory">
              <p className="eyebrow text-ivory/70">Inspiration</p>
              <h2 className="mt-2 text-3xl">{it.label}</h2>
            </div>
          </button>
        ))}
        <div className="pt-10 md:col-span-12"><Link to="/contact" className="eyebrow border border-foreground px-8 py-4 hover:bg-foreground hover:text-background">Discuss your project</Link></div>
      </section>
      {open !== null && items[open] && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/95 p-6" onClick={() => setOpen(null)} role="dialog" aria-modal>
          <img src={items[open]!.img} alt={items[open]!.label} className="max-h-[85vh] max-w-full object-contain" onClick={(e) => e.stopPropagation()} />
          <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-10 text-ivory">
            <button className="eyebrow" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + items.length) % items.length); }}>← Prev</button>
            <span className="eyebrow text-ivory/60">{items[open]!.label}</span>
            <button className="eyebrow" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % items.length); }}>Next →</button>
          </div>
          <button className="eyebrow absolute right-6 top-6 text-ivory" onClick={() => setOpen(null)}>Close</button>
        </div>
      )}
    </>
  );
}
