import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import kitchen from "@/assets/kitchen.jpg";
import factory from "@/assets/factory.jpg";
import staircase from "@/assets/staircase.jpg";
import bathroom from "@/assets/bathroom.jpg";
import lobby from "@/assets/lobby.jpg";
import { products } from "@/lib/catalogue";
import { ProductCard, SectionHeading, TextLink } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CIBI Marble & Granite — Natural Stone Crafted in Nigeria" },
      { name: "description", content: "Granite, marble and architectural stone surfaces manufactured in Kaduna, Nigeria. Showrooms in Kaduna and Abuja." },
      { property: "og:title", content: "CIBI Marble & Granite — Natural Stone Crafted in Nigeria" },
      { property: "og:description", content: "Granite, marble and architectural stone surfaces manufactured in Kaduna, with showrooms in Kaduna and Abuja." },
    ],
  }),
  component: Home,
});

const spaces = [
  { label: "Kitchens", app: "kitchen", img: kitchen, cls: "md:col-span-7 aspect-[4/3]" },
  { label: "Staircases", app: "staircase", img: staircase, cls: "md:col-span-5 aspect-[3/4]" },
  { label: "Bathrooms", app: "bathroom", img: bathroom, cls: "md:col-span-5 aspect-[3/4]" },
  { label: "Feature Walls", app: "walls", img: lobby, cls: "md:col-span-7 aspect-[4/3]" },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[100svh] min-h-[640px] overflow-hidden bg-charcoal text-ivory">
        <img src={hero} alt="Living room with natural stone feature wall and polished stone floor" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-end px-6 pb-24 md:px-12 md:pb-32">
          <p className="eyebrow animate-rise text-gold">CIBI Marble &amp; Granite — Kaduna · Abuja</p>
          <h1 className="animate-rise mt-6 max-w-4xl text-5xl leading-[1.02] [animation-delay:150ms] md:text-[5.5rem]">
            Nature's Finest. <em className="text-ivory/80">Crafted for Extraordinary Spaces.</em>
          </h1>
          <p className="animate-rise mt-8 max-w-lg text-base leading-relaxed text-ivory/75 [animation-delay:300ms]">
            Discover beautifully manufactured marble, granite and architectural stone surfaces, crafted in Nigeria for spaces that inspire.
          </p>
          <div className="animate-rise mt-10 flex flex-wrap gap-4 [animation-delay:450ms]">
            <Link to="/collections" className="eyebrow bg-ivory px-8 py-4 text-charcoal transition-colors hover:bg-paper">Explore Collections</Link>
            <Link to="/about" className="eyebrow border border-ivory/50 px-8 py-4 transition-colors hover:bg-ivory/10">Discover CIBI</Link>
          </div>
        </div>
        <div className="absolute bottom-8 right-6 hidden items-center gap-4 md:right-12 md:flex">
          <span className="eyebrow text-ivory/60">Scroll</span>
          <span className="h-12 w-px bg-ivory/40" />
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto grid max-w-[1440px] items-center gap-16 px-6 py-28 md:grid-cols-12 md:px-12 md:py-40">
        <div className="md:col-span-5">
          <SectionHeading eyebrow="The Art of Natural Stone" title="Where Nature Meets Craftsmanship.">
            <p>
              CIBI is an indigenous Nigerian manufacturer. In Kaduna, natural stone from Nigerian dimension-stone quarries is cut and polished
              using Italian technology, then fabricated and installed with precision for architects, developers and homeowners.
            </p>
          </SectionHeading>
          <div className="mt-10"><TextLink to="/about">Learn about CIBI</TextLink></div>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <img src={kitchen} alt="Kitchen with polished granite island countertop" loading="lazy" width={1280} height={960} className="aspect-[4/5] w-full object-cover" />
        </div>
      </section>

      {/* Collections */}
      <section className="border-t border-border bg-paper">
        <div className="mx-auto max-w-[1440px] px-6 py-28 md:px-12 md:py-36">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading eyebrow="The Collection" title="A Collection Shaped by Nature." />
            <TextLink to="/collections">View full catalogue</TextLink>
          </div>
          <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>

      {/* Spaces */}
      <section className="mx-auto max-w-[1440px] px-6 py-28 md:px-12 md:py-40">
        <SectionHeading eyebrow="Stone in Living Spaces" title="Imagine the Possibilities." />
        <div className="mt-16 grid gap-8 md:grid-cols-12">
          {spaces.map((s) => (
            <Link key={s.label} to="/collections" search={{ application: s.app }} className={`group relative overflow-hidden ${s.cls}`}>
              <img src={s.img} alt={`${s.label} in natural stone — inspiration`} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-[1.03]" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-charcoal/70 to-transparent p-8 text-ivory">
                <h3 className="text-3xl md:text-4xl">{s.label}</h3>
                <span className="eyebrow opacity-70">Inspiration</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Manufacturing */}
      <section className="bg-charcoal text-ivory">
        <div className="mx-auto grid max-w-[1440px] items-center gap-16 px-6 py-28 md:grid-cols-12 md:px-12 md:py-40">
          <img src={factory} alt="Granite slab being cut by an industrial bridge saw" loading="lazy" width={1280} height={960} className="aspect-[4/3] w-full object-cover md:col-span-7" />
          <div className="md:col-span-4 md:col-start-9">
            <SectionHeading light eyebrow="Proudly Manufactured in Nigeria" title="Precision in Every Cut. Excellence in Every Finish." />
            <ul className="mt-10 divide-y divide-ivory/10 border-y border-ivory/10 text-sm text-ivory/75">
              {["Manufacturing operations in Kaduna", "Italian cutting & polishing technology", "Locally sourced natural stone", "Skilled craftsmanship", "Fabrication & installation"].map((t) => (
                <li key={t} className="py-4">{t}</li>
              ))}
            </ul>
            <div className="mt-10 text-gold"><TextLink to="/manufacturing">Our manufacturing</TextLink></div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="mx-auto max-w-[1440px] px-6 py-28 md:px-12 md:py-40">
        <SectionHeading eyebrow="The CIBI Experience" title="From Selection to Installation." />
        <div className="mt-16 grid border-t border-border md:grid-cols-3">
          {[
            ["01", "Discover Your Stone", "Visit our Kaduna or Abuja showroom and select from our natural stone collections with guidance from our team."],
            ["02", "Precision Fabrication", "Your chosen stone is cut, polished and fabricated to your project's measurements in our Kaduna facility."],
            ["03", "Professional Installation", "Our installation team fits every surface with care, so the finished space looks as intended."],
          ].map(([n, t, d]) => (
            <div key={n} className="border-b border-border py-10 md:border-b-0 md:border-r md:px-10 md:first:pl-0 md:last:border-r-0">
              <p className="font-display text-xl text-gold">{n}</p>
              <h3 className="mt-6 text-3xl">{t}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-charcoal text-ivory">
        <img src={lobby} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="relative mx-auto max-w-[1440px] px-6 py-36 text-center md:px-12 md:py-48">
          <h2 className="mx-auto max-w-3xl text-5xl leading-[1.05] md:text-7xl">Your Vision Deserves Exceptional Stone.</h2>
          <p className="mx-auto mt-8 max-w-lg text-ivory/75">Discover natural stone solutions crafted to bring character, elegance, and lasting beauty to your space.</p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="eyebrow bg-ivory px-8 py-4 text-charcoal hover:bg-paper">Request a Quote</Link>
            <Link to="/contact" hash="showrooms" className="eyebrow border border-ivory/50 px-8 py-4 hover:bg-ivory/10">Visit Our Showrooms</Link>
          </div>
        </div>
      </section>
    </>
  );
}
