import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { applications, company, enquiryMessage, products } from "@/lib/catalogue";
import { PageIntro } from "@/components/site";

type Search = { product?: string | undefined; application?: string | undefined };

export const Route = createFileRoute("/contact")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    product: typeof s["product"] === "string" ? s["product"] : undefined,
    application: typeof s["application"] === "string" ? s["application"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Request a Quote & Showrooms — CIBI Marbles & Granite" },
      { name: "description", content: "Request a quote or visit CIBI's showrooms in Kaduna and Jabi, Abuja for granite and marble surfaces." },
      { property: "og:title", content: "Request a Quote — CIBI Marbles & Granite" },
      { property: "og:description", content: "Speak with CIBI about granite and marble for your project. Showrooms in Kaduna and Abuja." },
    ],
  }),
  component: Contact,
});

const field = "w-full border-0 border-b border-input bg-transparent px-0 py-3 text-base outline-none transition-colors focus:border-gold";
const label = "eyebrow text-stone";

function Contact() {
  const { product, application } = Route.useSearch();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    if (d.get("company_site")) return; // honeypot
    const name = String(d.get("name") || "").trim();
    const email = String(d.get("email") || "").trim();
    if (!name || !/^\S+@\S+\.\S+$/.test(email)) return setError("Please enter your name and a valid email address.");
    setError("");
    const body = ["name", "email", "phone", "type", "product", "application", "quantity", "location", "message"]
      .map((k) => `${k.charAt(0).toUpperCase() + k.slice(1)}: ${d.get(k) || "—"}`)
      .join("\n");
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(`Quote request from ${name}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <>
      <PageIntro eyebrow="Enquiries" title="Begin Your Project.">
        Tell us about your space. Our team will respond with guidance on stone, finishing and pricing.
      </PageIntro>

      <section className="mx-auto grid max-w-[1440px] gap-20 px-6 pb-32 md:grid-cols-12 md:px-12">
        <form onSubmit={submit} className="grid gap-8 sm:grid-cols-2 md:col-span-7" noValidate>
          <input type="text" name="company_site" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
          <label className="space-y-1"><span className={label}>Full name *</span><input name="name" required className={field} /></label>
          <label className="space-y-1"><span className={label}>Email *</span><input name="email" type="email" required className={field} /></label>
          <label className="space-y-1"><span className={label}>Phone</span><input name="phone" type="tel" className={field} /></label>
          <label className="space-y-1"><span className={label}>I am a</span>
            <select name="type" className={field} defaultValue="">
              <option value="">Select</option>
              {["Homeowner", "Architect", "Contractor", "Developer", "Interior Designer", "Other"].map((o) => <option key={o}>{o}</option>)}
            </select>
          </label>
          <label className="space-y-1"><span className={label}>Product of interest</span>
            <select name="product" className={field} defaultValue={product ?? ""}>
              <option value="">Not sure yet</option>
              {products.map((p) => <option key={p.slug}>{p.name}</option>)}
            </select>
          </label>
          <label className="space-y-1"><span className={label}>Intended application</span>
            <select name="application" className={field} defaultValue={application ?? ""}>
              <option value="">Select</option>
              {applications.map((a) => <option key={a.id}>{a.label}</option>)}
            </select>
          </label>
          <label className="space-y-1"><span className={label}>Quantity or dimensions</span><input name="quantity" className={field} /></label>
          <label className="space-y-1"><span className={label}>Project location</span><input name="location" className={field} /></label>
          <label className="space-y-1 sm:col-span-2"><span className={label}>Message</span>
            <textarea name="message" rows={4} className={field} defaultValue={enquiryMessage(product, application)} />
          </label>
          {error && <p className="text-sm text-destructive sm:col-span-2">{error}</p>}
          {sent && <p className="text-sm text-muted-foreground sm:col-span-2">Your email app should now be open with the enquiry ready to send. If it didn't open, write to {company.email}.</p>}
          <div className="sm:col-span-2">
            <button type="submit" className="eyebrow bg-charcoal px-10 py-4 text-ivory transition-colors hover:bg-charcoal/90">Send Enquiry</button>
          </div>
        </form>

        <aside id="showrooms" className="space-y-12 md:col-span-4 md:col-start-9">
          {[
            ["Kaduna", "Manufacturing Facility & Showroom", company.kaduna],
            ["Abuja", "Showroom", company.abuja],
          ].map(([city, kind, addr]) => (
            <div key={city} className="border-t border-foreground pt-6">
              <p className="eyebrow text-gold">{kind}</p>
              <h3 className="mt-4 text-4xl">{city}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{addr}</p>
            </div>
          ))}
          <div className="border-t border-border pt-6 text-sm">
            <p className="eyebrow mb-4 text-stone">Call or write</p>
            {company.phones.map((p) => <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="block py-1 hover:text-gold">{p}</a>)}
            <a href={`mailto:${company.email}`} className="block py-1 hover:text-gold">{company.email}</a>
            <p className="mt-6 text-muted-foreground">To book a showroom visit, send an enquiry and mention your preferred day.</p>
          </div>
        </aside>
      </section>
    </>
  );
}
