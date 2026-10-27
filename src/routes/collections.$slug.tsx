import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { products, uses, type UseId } from "@/lib/catalogue";
import { contactMessage, enquiryLink } from "@/lib/enquiry";
import { siteConfig } from "@/lib/config";
import { ProductCard } from "@/components/site";
import { QuoteDialog } from "@/components/quote-dialog";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} Granite — CIBI Marble & Granite` },
          { name: "description", content: `${loaderData.product.name}: ${loaderData.product.description} See it in a kitchen, floor or wall and request a quotation.` },
          { property: "og:title", content: `${loaderData.product.name} Granite — CIBI` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:type", content: "product" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Stone not found — CIBI" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-6 py-48 text-center">
      <h1 className="text-5xl">Stone not found</h1>
      <Link to="/collections" className="eyebrow mt-8 inline-block">Back to collections</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [use, setUse] = useState<UseId>("kitchen");
  const [shot, setShot] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [quote, setQuote] = useState(false);
  const current = uses.find((u) => u.id === use)!;
  const appImg = product.applications[use];
  const related = product.related.map((s) => products.find((p) => p.slug === s)!).filter(Boolean);
  const contact = enquiryLink(contactMessage(product.name, current.label), `Enquiry: ${product.name}`);
  const g = product.gallery[shot]!;

  return (
    <>
      {/* A — Hero */}
      <section className="mx-auto grid max-w-[1440px] gap-14 px-6 pb-20 pt-32 md:grid-cols-12 md:px-12 md:pt-40">
        <div className="md:col-span-7">
          <button onClick={() => setZoom(true)} className="group relative block aspect-[4/3] w-full overflow-hidden bg-charcoal md:aspect-[5/4]" aria-label="Zoom image">
            <img src={g.src} alt={`${product.name} — ${g.label}`} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700"
              style={g.position ? { objectPosition: g.position, transform: "scale(2.2)" } : undefined} />
            <span className="eyebrow absolute bottom-4 right-4 bg-charcoal/80 px-3 py-2 text-ivory/80">Zoom</span>
          </button>
          {/* B — Gallery */}
          <div className="mt-4 grid grid-cols-3 gap-4">
            {product.gallery.map((im, i) => (
              <button key={im.label} onClick={() => setShot(i)} aria-label={im.label}
                className={`relative aspect-[4/3] overflow-hidden border ${i === shot ? "border-gold" : "border-transparent opacity-70 hover:opacity-100"}`}>
                <img src={im.src} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover"
                  style={im.position ? { objectPosition: im.position, transform: "scale(2.2)" } : undefined} />
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-stone">{g.label} — enhanced from CIBI's brochure sample.</p>
        </div>
        <div className="flex flex-col md:col-span-4 md:col-start-9">
          <nav className="eyebrow text-stone" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/collections" className="hover:text-foreground">Collections</Link> / <span className="text-foreground">{product.name}</span>
          </nav>
          <p className="eyebrow mt-10 text-gold">{product.category}</p>
          <h1 className="mt-4 text-5xl leading-[1.02] md:text-7xl">{product.name}</h1>
          <span className="rule-gold mt-8" />
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground">{product.description}</p>
          {/* C — Information */}
          <dl className="mt-10 divide-y divide-border border-y border-border text-sm">
            {product.specs.map((s) => (
              <div key={s.label} className="flex justify-between gap-6 py-4">
                <dt className="shrink-0 text-stone">{s.label}</dt>
                <dd className="text-right">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* See how you can use this stone */}
      <section className="bg-charcoal text-ivory">
        <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-12 md:py-32">
          <p className="eyebrow text-gold">{product.name}</p>
          <h2 className="mt-6 text-5xl md:text-6xl">See How You Can Use This Stone</h2>
          <p className="mt-6 max-w-xl text-ivory/70">Discover how your selected natural stone can transform different areas of your home.</p>
          <div role="tablist" className="mt-12 grid grid-cols-3 border-b border-ivory/15">
            {uses.map((u) => (
              <button key={u.id} role="tab" aria-selected={use === u.id} onClick={() => setUse(u.id)}
                className={`eyebrow -mb-px border-b-2 py-5 text-sm transition-colors md:text-base ${use === u.id ? "border-gold text-ivory" : "border-transparent text-ivory/45 hover:text-ivory"}`}>
                {u.label}
              </button>
            ))}
          </div>
          <div className="relative mt-10 aspect-[4/3] overflow-hidden md:aspect-[16/9]">
            {uses.map((u) => (
              <img key={u.id} src={product.applications[u.id].src} alt={`${product.name} — ${u.label}`} loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${u.id === use ? "opacity-100" : "opacity-0"}`} />
            ))}
            <span className="eyebrow absolute left-4 top-4 bg-charcoal/80 px-3 py-2 text-ivory/80">
              {appImg.specific ? `Visualisation — ${product.name}` : "General inspiration — not this exact stone"}
            </span>
          </div>
          <div key={use} className="animate-rise mt-10 grid gap-6 md:grid-cols-12">
            <h3 className="text-3xl md:col-span-5 md:text-4xl">{current.title}</h3>
            <p className="text-ivory/70 md:col-span-6 md:col-start-7">{current.description}</p>
          </div>

          {/* Quotation */}
          <div className="mt-20 grid gap-10 border-t border-ivory/10 pt-14 md:grid-cols-12">
            <div className="md:col-span-7">
              <h3 className="text-4xl md:text-5xl">Love This Stone? Let's Bring Your Vision to Life.</h3>
              <p className="mt-5 max-w-lg text-ivory/70">Speak with CIBI about availability, dimensions, finishing, fabrication, installation, and pricing for your project.</p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row md:col-span-5 md:flex-col md:items-stretch lg:flex-row lg:items-start lg:justify-end">
              <button onClick={() => setQuote(true)} className="eyebrow bg-ivory px-8 py-5 text-charcoal hover:bg-paper">Request Quotation</button>
              <a href={contact.href} target="_blank" rel="noopener noreferrer" className="eyebrow border border-ivory/40 px-8 py-5 text-center hover:bg-ivory/10">Get in Contact</a>
            </div>
            {!siteConfig.whatsappNumber && <p className="text-xs text-ivory/40 md:col-span-12">WhatsApp coming soon — enquiries currently open in your email app.</p>}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-28 md:px-12">
        <h2 className="text-4xl md:text-5xl">Related CIBI Stones</h2>
        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      <QuoteDialog open={quote} onOpenChange={setQuote} product={product.name} application={current.label} />
      <Dialog open={zoom} onOpenChange={setZoom}>
        <DialogContent className="max-w-5xl rounded-none border-0 bg-charcoal p-0">
          <DialogTitle className="sr-only">{product.name}</DialogTitle>
          <img src={product.image} alt={`${product.name} polished sample`} className="max-h-[88vh] w-full object-contain" />
        </DialogContent>
      </Dialog>
    </>
  );
}
