import { createFileRoute, Link } from "@tanstack/react-router";
import { products, materialCategories } from "@/lib/catalogue";
import { PageIntro, ProductCard } from "@/components/site";

type Search = { tone?: string; application?: string };

export const Route = createFileRoute("/collections/")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    tone: typeof s.tone === "string" ? s.tone : undefined,
    application: typeof s.application === "string" ? s.application : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Stone Collections — CIBI Marble & Granite Nigeria" },
      { name: "description", content: "Browse CIBI's natural stone library: African Multicolor, Kamazo Grey, Champagne Gold, Zaria Red and more." },
      { property: "og:title", content: "Stone Collections — CIBI Marble & Granite" },
      { property: "og:description", content: "A curated library of Nigerian natural stone surfaces." },
    ],
  }),
  component: Collections,
});

const tones = Array.from(new Set(products.map((p) => p.tone)));

function Collections() {
  const { tone, application } = Route.useSearch();
  const list = tone ? products.filter((p) => p.tone === tone) : products;
  return (
    <>
      <PageIntro eyebrow="The Stone Library" title="Explore Our Stone Collections.">
        Discover distinctive textures, colours and finishes — each selected for spaces built to last.
      </PageIntro>
      <section className="mx-auto max-w-[1440px] px-6 pb-32 md:px-12">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-border py-5">
          <span className="eyebrow text-stone">Tone</span>
          <Link to="/collections" search={{ application }} className={`eyebrow ${!tone ? "text-foreground" : "text-stone hover:text-foreground"}`}>All</Link>
          {tones.map((t) => (
            <Link key={t} to="/collections" search={{ tone: t, application }} className={`eyebrow ${tone === t ? "text-foreground underline decoration-gold underline-offset-8" : "text-stone hover:text-foreground"}`}>{t}</Link>
          ))}
          <span className="ml-auto text-xs text-stone">{list.length} stones</span>
        </div>
        {application && (
          <p className="mt-6 text-sm text-muted-foreground">
            Showing stones for <span className="text-foreground">{application}</span> enquiries — select a stone to preview it in context.
          </p>
        )}
        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
        <div className="mt-28 grid gap-8 border-t border-border pt-12 md:grid-cols-12">
          <p className="eyebrow text-stone md:col-span-3">Also available</p>
          <div className="md:col-span-9">
            <p className="font-display text-3xl leading-snug md:text-4xl">{materialCategories.join(" · ")}</p>
            <p className="mt-4 max-w-xl text-sm text-muted-foreground">Ask our team about current availability across quartz, porcelain and tile ranges.</p>
          </div>
        </div>
      </section>
    </>
  );
}
