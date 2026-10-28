import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import NewsletterForm from "./NewsletterForm";
import { FOOTER_QUICK_LINKS, LEGAL_LINKS, LOGO_FOOTER } from "@/lib/site";

const BADGES = [
  { icon: "verified", label: "Made in Kenya" },
  { icon: "school", label: "JKUAT Innovators" },
  { icon: "nest_eco_leaf", label: "JHUB Africa Partner" },
];
const CONTACT = ["Nairobi / Juja, Kenya", "JHUB Innovation Ecosystem", "Phone: +254 700 000 000", "Email: info@smartmushroom.africa", "JKUAT Collaboration Wing"];

export default function Footer() {
  return (
    <footer className="mt-auto w-full bg-surface-container-low text-on-surface">
      <div className="mx-auto max-w-7xl px-6 pb-space-lg pt-space-xl lg:px-12">
        <div className="mb-space-xl grid grid-cols-1 gap-space-xl md:grid-cols-2 lg:grid-cols-5">
          <div className="flex flex-col gap-space-md lg:col-span-2">
            <div className="flex items-center gap-space-sm">
              <Image src={LOGO_FOOTER} alt="SmartMushroom logo" width={48} height={48} className="h-12 w-auto object-contain" />
              <span className="font-headline-sm text-headline-sm text-primary">SmartMushroom</span>
            </div>
            <p className="max-w-sm font-body-md text-body-md text-on-surface-variant">
              Smarter mushroom farming, powered by data. Precision climate-controlled pumice architecture and high-yield IoT substrates across East Africa.
            </p>
            <div className="flex flex-wrap gap-space-xs pt-space-xs">
              {BADGES.map((b) => (
                <span key={b.label} className="inline-flex items-center gap-1.5 rounded-full bg-surface-container px-space-sm py-1 font-label-sm text-label-sm text-primary">
                  <Icon name={b.icon} className="text-[14px]" />
                  {b.label}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-space-sm">
            <h4 className="mb-space-xs font-headline-sm text-headline-sm text-primary">Quick Links</h4>
            <ul className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
              {FOOTER_QUICK_LINKS.map((l) => (
                <li key={l.label}><Link href={l.href} className="transition-colors hover:text-on-surface">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-space-sm">
            <h4 className="mb-space-xs font-headline-sm text-headline-sm text-primary">Contact &amp; Hub</h4>
            <ul className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
              {CONTACT.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>

          <div className="flex flex-col gap-space-sm">
            <h4 className="mb-space-xs font-headline-sm text-headline-sm text-primary">Harvest Dispatch</h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Weekly humidity telemetry, spawn releases, and outgrower agronomy reports.</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-space-md pt-space-lg font-label-md text-label-md text-on-surface-variant sm:flex-row">
          <p>© {new Date().getFullYear()} SmartMushroom Ltd. All rights reserved.</p>
          <div className="flex items-center gap-space-lg">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-on-surface">{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
