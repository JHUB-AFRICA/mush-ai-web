import { Bell } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div className="bg-forest text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-2 text-[11px] sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="flex items-center gap-2">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ember">
            <Bell size={11} />
          </span>
          <span>
            <strong className="font-semibold">Next Batch Release:</strong> Fresh
            sterile spawn and pasteurized substrate available for pickup
            tomorrow at JKUAT Hub.
          </span>
        </p>
        <p className="flex shrink-0 items-center gap-3 text-white/75">
          <span>Cold-chain storage</span>
          <span aria-hidden="true">•</span>
          <span>99.4% Spawn Purity Rate</span>
        </p>
      </div>
    </div>
  );
}
