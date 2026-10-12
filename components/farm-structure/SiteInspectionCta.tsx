import Link from "next/link";
import { CalendarCheck } from "lucide-react";

export default function SiteInspectionCta() {
  return (
    <section className="bg-card/50 pb-12">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-start justify-between gap-4 rounded-2xl border border-line bg-white/70 p-5 sm:flex-row sm:items-center sm:mx-auto">
        <div>
          <h2 className="text-sm font-bold">Need a customized floor plan?</h2>
          <p className="mt-1 text-xs text-muted">
            We build custom layouts from 600 sq ft smallholder hubs to 10,000 sq
            ft commercial estates.
          </p>
        </div>
        <Link
          href="/contact?subject=site-inspection"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-forest px-5 py-2.5 text-xs font-semibold text-white hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
        >
          Book Site Inspection
          <CalendarCheck size={14} />
        </Link>
      </div>
    </section>
  );
}
