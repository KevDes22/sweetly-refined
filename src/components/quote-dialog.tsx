import { useState, type FormEvent } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { enquiryLink, quoteMessage } from "@/lib/enquiry";
import { siteConfig } from "@/lib/config";

const field = "mt-2 w-full border-0 border-b border-input bg-transparent px-0 py-2 text-sm outline-none focus:border-gold";

export function QuoteDialog({ open, onOpenChange, product, application }: { open: boolean; onOpenChange: (o: boolean) => void; product: string; application: string }) {
  const [error, setError] = useState("");
  const [opened, setOpened] = useState<"whatsapp" | "email" | null>(null);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const g = (k: string) => String(d.get(k) ?? "").trim();
    if (!g("name") || !g("phone")) return setError("Please enter your full name and phone number.");
    setError("");
    const msg = quoteMessage({ name: g("name"), phone: g("phone"), email: g("email"), product, application, quantity: g("quantity"), unit: g("unit"), finish: g("finish"), location: g("location"), installation: g("installation"), details: g("details") });
    const link = enquiryLink(msg, `Quotation request: ${product} — ${application}`);
    setOpened(link.channel);
    window.open(link.href, "_blank", "noopener");
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { onOpenChange(o); if (!o) setOpened(null); }}>
      <DialogContent className="max-h-[92vh] max-w-2xl overflow-y-auto rounded-none border-border bg-background p-8 md:p-12">
        <DialogHeader>
          <p className="eyebrow text-stone">Request Quotation</p>
          <DialogTitle className="font-display text-4xl font-normal">{product}</DialogTitle>
          <DialogDescription>For: {application}. Your details go straight into a message to CIBI — nothing is stored on this website.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} noValidate className="mt-4 grid gap-6 sm:grid-cols-2">
          <L label="Full Name *"><input name="name" required className={field} autoComplete="name" /></L>
          <L label="Phone Number *"><input name="phone" required type="tel" className={field} autoComplete="tel" /></L>
          <L label="Email Address"><input name="email" type="email" className={field} autoComplete="email" /></L>
          <L label="Project Location"><input name="location" className={field} placeholder="e.g. Abuja" /></L>
          <L label="Selected Product"><input value={product} readOnly className={`${field} text-stone`} /></L>
          <L label="Selected Application"><input value={application} readOnly className={`${field} text-stone`} /></L>
          <L label="Estimated Quantity"><input name="quantity" inputMode="decimal" className={field} /></L>
          <L label="Measurement Unit">
            <select name="unit" className={field} defaultValue="square metres">
              <option>square metres</option><option>slabs</option><option>pieces</option>
            </select>
          </L>
          <L label="Preferred Finish"><input name="finish" className={field} placeholder="e.g. Polished" /></L>
          <L label="Do You Require Installation?">
            <select name="installation" className={field} defaultValue="Not Sure">
              <option>Yes</option><option>No</option><option>Not Sure</option>
            </select>
          </L>
          <L label="Additional Project Details" wide><textarea name="details" rows={3} className={field} /></L>
          {error && <p role="alert" className="text-sm text-destructive sm:col-span-2">{error}</p>}
          {opened && (
            <p className="text-sm text-muted-foreground sm:col-span-2">
              {opened === "whatsapp" ? "WhatsApp should now be open with your request. Press send there to reach CIBI." : `Your email app should now be open with your request. Press send there, or write to ${siteConfig.email}.`}
            </p>
          )}
          <button type="submit" className="eyebrow bg-charcoal px-8 py-4 text-ivory hover:bg-charcoal/90 sm:col-span-2">
            {siteConfig.whatsappNumber ? "Continue on WhatsApp" : "Continue by Email"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function L({ label, children, wide }: { label: string; children: React.ReactNode; wide?: boolean }) {
  return <label className={`block ${wide ? "sm:col-span-2" : ""}`}><span className="eyebrow text-stone">{label}</span>{children}</label>;
}
