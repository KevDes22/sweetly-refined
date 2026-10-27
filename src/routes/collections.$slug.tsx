import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { applications, enquiryMessage, productApplicationImages, products, company, type ApplicationId } from "@/lib/catalogue";
import { ProductCard, StoneSwatch } from "@/components/site";

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — CIBI Marble & Granite` },
          { name: "description", content: `${loaderData.product.name} natural stone by CIBI, crafted in Kaduna, Nigeria. Enquire about availability and finishing.` },
          { property: "og:title", content: `${loaderData.product.name} — CIBI Marble & Granite` },
          { property: "og:description", content: `Explore ${loaderData.product.name} and see it in kitchens, floors, walls and more.` },
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
  const [app, setApp] = useState<ApplicationId>("kitchen");
  const current = applications.find((a) => a.id === app)!;
  const specific = productApplicationImages[product.slug]?.[app];
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);
  const msg = enquiryMessage(product.name, current.label);

  return (
    <>
      <section className="mx-auto grid max-w-[1440px] gap-14 px-6 pb-24 pt-32 md:grid-cols-12 md:px-12 md:pt-40">
        <div className="md:col-span-7">
          <StoneSwatch product={product} className="aspect-[4/3] md:aspect-[5/4]" />
        </div>
        <div className="flex flex-col md:col-span-4 md:col-start-9">
          <Link to="/collections" className="eyebrow text-stone hover:text-foreground">← Collections</Link>
          <h1 className="mt-10 text-5xl leading-[1.02] md:text-7xl">{product.name}</h1>
          <span className="rule-gold mt-8" />
          <dl className="mt-8 divide-y divide-border border-y border-border text-sm">
            {[
              ["Material", product.category ?? "To be confirmed"],
              ["Tone", product.tone],
              ["Finishes", "Available on enquiry"],
              ["Origin", "Processed in Kaduna, Nigeria"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-4">
                <dt className="text-stone">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <Link to="/contact" search={{ product: product.name }} className="eyebrow mt-10 bg-charcoal px-8 py-4 text-center text-ivory hover:bg-charcoal/90">Enquire about this stone</Link>
        </div>
      </section>

      {/* Application viewer */}
      <section className="bg-charcoal text-ivory">
        <div className="mx-auto max-w-[1440px] px-6 py-28 md:px-12 md:py-36">
          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-gold">See It in Your Space</p>
              <h2 className="mt-6 text-5xl md:text-6xl">See the Possibilities.</h2>
              <p className="mt-6 max-w-md text-ivory/70">Explore how this remarkable surface can transform the spaces around you.</p>
            </div>
            <div role="tablist" className="flex flex-wrap gap-x-8 gap-y-3 border-b border-ivory/15">
              {applications.map((a) => (
                <button key={a.id} role="tab" aria-selected={app === a.id} onClick={() => setApp(a.id)}
                  className={`eyebrow -mb-px border-b pb-4 transition-colors ${app === a.id ? "border-gold text-ivory" : "border-transparent text-ivory/50 hover:text-ivory"}`}>
                  {a.label}
                </button>
              ))}
            </div>
          </div>
          <div className="relative mt-14 aspect-[16/9] overflow-hidden">
            {applications.map((a) => (
              <img key={a.id} src={specific && a.id === app ? specific : a.image} alt={`${a.label} inspiration`} loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${a.id === app ? "opacity-100" : "opacity-0"}`} />
            ))}
            <span className="eyebrow absolute left-5 top-5 bg-charcoal/80 px-3 py-2 text-ivory/80">
              {specific ? `${product.name} — ${current.label}` : "General inspiration — not this exact stone"}
            </span>
          </div>
          <div className="mt-20 grid gap-10 border-t border-ivory/10 pt-14 md:grid-cols-12">
            <div className="md:col-span-6">
              <h3 className="text-4xl">Inspired by This Stone?</h3>
              <p className="mt-4 text-ivory/70">Let our team help you bring your vision to life.</p>
            </div>
            <div className="flex flex-wrap items-start gap-4 md:col-span-6 md:justify-end">
              <Link to="/contact" search={{ product: product.name, application: current.label }} className="eyebrow bg-ivory px-7 py-4 text-charcoal hover:bg-paper">Request a Quote</Link>
              <a href={`mailto:${company.email}?subject=${encodeURIComponent(`Enquiry: ${product.name}`)}&body=${encodeURIComponent(msg)}`} className="eyebrow border border-ivory/40 px-7 py-4 hover:bg-ivory/10">Get in Contact</a>
              <span className="eyebrow border border-ivory/15 px-7 py-4 text-ivory/40" title="WhatsApp number awaiting confirmation">WhatsApp — coming soon</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-28 md:px-12">
        <h2 className="text-4xl md:text-5xl">You may also consider</h2>
        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>
    </>
  );
}
