import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { company, products, type Product } from "@/lib/catalogue";

const nav = [
  { to: "/collections", label: "Collections" },
  { to: "/manufacturing", label: "Manufacturing" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Showrooms" },
] as const;

export function SiteHeader() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const overHero = path === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);
  const solid = !overHero || scrolled || open;
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? "border-b border-border bg-background text-foreground" : "bg-transparent text-ivory"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 md:px-12">
        <Link to="/" className="flex items-baseline gap-3">
          <span className="font-display text-3xl tracking-[0.12em]">CIBI</span>
          <span className="eyebrow hidden opacity-70 sm:inline">Marble &amp; Granite</span>
        </Link>
        <nav className="hidden items-center gap-10 lg:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="eyebrow opacity-80 transition-opacity hover:opacity-100" activeProps={{ className: "eyebrow text-gold" }}>
              {n.label}
            </Link>
          ))}
          <Link to="/contact" className={`eyebrow border px-5 py-3 transition-colors ${solid ? "border-foreground hover:bg-foreground hover:text-background" : "border-ivory/60 hover:bg-ivory hover:text-charcoal"}`}>
            Request a Quote
          </Link>
        </nav>
        <button className="eyebrow lg:hidden" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="Menu">
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-6 pb-10 pt-6 lg:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="block border-b border-border py-4 font-display text-3xl">
              {n.label}
            </Link>
          ))}
          <Link to="/contact" className="eyebrow mt-8 inline-block bg-charcoal px-6 py-4 text-ivory">Request a Quote</Link>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-ivory">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-6 py-24 md:grid-cols-12 md:px-12">
        <div className="md:col-span-4">
          <p className="font-display text-5xl tracking-[0.12em]">CIBI</p>
          <p className="eyebrow mt-2 text-ivory/60">Marble &amp; Granite Ltd</p>
          <p className="mt-8 max-w-xs font-display text-2xl italic text-ivory/85">Crafted in Nigeria. Designed to Last.</p>
        </div>
        <FooterCol title="Explore">
          {nav.map((n) => <Link key={n.to} to={n.to} className="block hover:text-gold">{n.label}</Link>)}
        </FooterCol>
        <FooterCol title="Collections">
          {products.slice(0, 6).map((p) => (
            <Link key={p.slug} to="/collections/$slug" params={{ slug: p.slug }} className="block hover:text-gold">{p.name}</Link>
          ))}
        </FooterCol>
        <FooterCol title="Contact" wide>
          <p>Kaduna — Manufacturing &amp; Showroom</p>
          <p className="text-ivory/60">{company.abuja}</p>
          {company.phones.map((p) => <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="block hover:text-gold">{p}</a>)}
          <a href={`mailto:${company.email}`} className="block hover:text-gold">{company.email}</a>
        </FooterCol>
      </div>
      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-2 px-6 py-6 text-xs text-ivory/50 md:flex-row md:px-12">
          <span>© {new Date().getFullYear()} {company.name}. All rights reserved.</span>
          <span>Exceptional Stone. Extraordinary Spaces.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children, wide }: { title: string; children: ReactNode; wide?: boolean }) {
  return (
    <div className={`space-y-3 text-sm text-ivory/80 ${wide ? "md:col-span-3" : "md:col-span-2"} ${title === "Explore" ? "md:col-start-6" : ""}`}>
      <p className="eyebrow mb-5 text-gold">{title}</p>
      {children}
    </div>
  );
}

export function SectionHeading({ eyebrow, title, children, light }: { eyebrow?: string; title: string; children?: ReactNode; light?: boolean }) {
  return (
    <div className="max-w-2xl">
      {eyebrow && <p className={`eyebrow mb-6 ${light ? "text-gold" : "text-stone"}`}>{eyebrow}</p>}
      <h2 className="text-4xl leading-[1.05] md:text-6xl">{title}</h2>
      {children && <div className={`mt-6 text-base leading-relaxed ${light ? "text-ivory/70" : "text-muted-foreground"}`}>{children}</div>}
    </div>
  );
}

export function TextLink({ children, ...props }: React.ComponentProps<typeof Link>) {
  return (
    <Link {...props} className="eyebrow group inline-flex items-center gap-4">
      <>{children}</>
      <span className="h-px w-10 bg-gold transition-all duration-500 group-hover:w-16" />
    </Link>
  );
}

/** Polished sample photo, enhanced from CIBI's brochure sample sheet. */
export function StoneSwatch({ product, className = "" }: { product: Product; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-charcoal ${className}`}>
      <img src={product.image} alt={`${product.name} polished granite sample`} loading="lazy" width={928} height={1152}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-charcoal/25 via-transparent to-paper/10" />
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to="/collections/$slug" params={{ slug: product.slug }} className="group flex h-full flex-col">
      <StoneSwatch product={product} className="aspect-[4/5]" />
      <div className="mt-5 flex flex-1 flex-col border-t border-border pt-4">
        <p className="eyebrow text-stone">{product.category}</p>
        <h3 className="mt-2 text-2xl">{product.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
        <span className="eyebrow mt-5 inline-block self-start border border-foreground px-5 py-3 transition-colors group-hover:bg-foreground group-hover:text-background">View Product</span>
      </div>
    </Link>
  );
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="mx-auto max-w-[1440px] px-6 pb-16 pt-40 md:px-12 md:pb-24 md:pt-52">
      <p className="eyebrow animate-rise text-stone">{eyebrow}</p>
      <h1 className="animate-rise mt-6 max-w-4xl text-5xl leading-[1.02] md:text-8xl">{title}</h1>
      {children && <p className="animate-rise mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">{children}</p>}
    </section>
  );
}
