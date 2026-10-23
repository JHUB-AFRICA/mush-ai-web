import { Bell } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div className="bg-primary text-on-primary border-b border-primary-container">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-1.5 px-4 py-2.5 text-[11px] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-12">
        <p className="flex items-center gap-2">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary-container text-on-secondary">
            <Bell size={11} />
          </span>
          <span>
            <strong className="font-semibold text-secondary-fixed">Next Batch Ready:</strong> Fresh
            button spawn and pasteurized substrate available for pickup tomorrow at Juja Hub.
          </span>
        </p>
        <p className="flex shrink-0 items-center gap-3 text-on-primary/80">
          <span>Cold-chain storage (4°C)</span>
          <span aria-hidden="true">&bull;</span>
          <span>99.8% Bio-Viability Rate</span>
        </p>
      </div>
    </div>
  );
}
