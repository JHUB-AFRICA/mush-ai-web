import Image from "next/image";

const SOCIALS = [
  { name: "Instagram", icon: "/images/social/instagram.png", href: "#" },
  { name: "TikTok", icon: "/images/social/tiktok.png", href: "#" },
  { name: "LinkedIn", icon: "/images/social/linkedin.png", href: "#" },
];

export default function ContactSocials() {
  return (
    <section className="border-t border-white/15 px-6 py-14 text-center md:py-16">
      <h2 className="text-2xl font-bold md:text-3xl">Get Featured and Tag Us On...</h2>

      <p className="mt-2 text-sm font-semibold text-primary-fixed-dim md:text-base">
        See how our community brings it to life..
      </p>

      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/80 md:text-base">
        Share your farm stories, mushroom trends and news with us. Tag us in your posts and we may feature
        you on our live feeds.
      </p>

      <ul className="mt-8 flex flex-wrap items-center justify-center gap-4">
        {SOCIALS.map((s) => (
          <li key={s.name}>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Follow us on ${s.name}`}
              className="group flex items-center gap-3 rounded-full border border-white/25 bg-white/10 py-2 pl-2 pr-5 transition hover:border-primary-fixed-dim hover:bg-white/20"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white">
                <Image src={s.icon} alt="" width={26} height={26} className="h-[26px] w-[26px]" />
              </span>
              <span className="text-sm font-semibold text-white transition group-hover:text-primary-fixed-dim">
                {s.name}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

