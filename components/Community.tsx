import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { posts } from "@/lib/content";

export function Community() {
  return (
    <section className="w-full py-20 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <Pill tone="secondary" className="mb-3">Live Social Feed</Pill>
            <SectionHeading className="mb-2">From Our Community</SectionHeading>
            <p className="text-body-md text-on-surface-variant">See what&apos;s growing, right now.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-surface-container-lowest hover:bg-surface-container text-on-surface text-label-md px-5 py-2.5 rounded-full shadow-xs transition-all border border-outline-variant/40"
            >
              <Icon name="photo_camera" className="text-[18px] text-secondary" />
              <span>Follow us on Instagram</span>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-on-primary hover:bg-primary-container text-label-md px-5 py-2.5 rounded-full shadow-xs transition-all"
            >
              <Icon name="play_circle" className="text-[18px] text-secondary-fixed" />
              <span>Follow us on TikTok</span>
            </a>
          </div>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <li
              key={p.caption}
              className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all group"
            >
              <div className="relative h-72 overflow-hidden bg-primary">
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface text-label-sm font-bold flex items-center gap-1.5">
                  <Icon name={p.platformIcon} className={`text-[14px] ${p.platformIconClass}`} />
                  {p.platform}
                </span>
                <span className="absolute bottom-4 right-4 px-2.5 py-1 rounded-full bg-primary/80 text-on-primary text-label-sm flex items-center gap-1">
                  <Icon name={p.statIcon} className="text-[14px]" /> {p.stat}
                </span>
                <div className="absolute bottom-4 left-4 text-on-primary text-label-md">
                  {p.caption}
                </div>
              </div>
              <div className="p-4 flex items-center justify-between text-on-surface-variant text-label-sm">
                <span>@smartmushroom_ke</span>
                <span className={`${p.tagClass} font-semibold`}>{p.tag}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
