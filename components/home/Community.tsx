import Image from "next/image";
import Icon from "../Icon";
import { SOCIAL } from "@/lib/site";

const POSTS = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKBImE4UIY9o_4CRNW3mIsd-t8p6Ju4u__RukYAxsS3VqmULmKALJiT_TF3VaSvG03uGPaMXhWh_aPyf7VYg-5ByuiLTiMld5Bts_F0dMGGuaFCwuVKX7TtYQN_UsbKQ3SlgjylDiPe2FERCDNsiuGI1QM1_JdV85Jjw0r9eDawOzgkQqED6xUJlIASEyoj4lSfALV6MUErhoJxywhJqwYN14MdGMB_c7AIXLKBgpeSjKRjTipPgpP",
    alt: "Fresh button pins popping", platform: "TikTok Reel", platformIcon: "play_circle", statIcon: "visibility", stat: "24.8K",
    caption: "Morning mist cycle & pinhead burst", tag: "#UrbanFarming", tagTone: "text-secondary",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDInYVLTqvam_3-W2LFoxH4hvLrCBsYYx_3pBMegTKfZ7IR3PQv4BDf4njgpjvV8geV06j7qmCd1YPi-roYhZ2H7uj0wtZELDGGmaLMkW_MwHzp4Q9Tijp-klfPoom2o6OmxT2KTpPX2Q6VdHkxlkjsZ75SpJfi1GIGZBoZ90GfrhsTfDlkOsJGMo754BI-zRol5FT_Pfxu4Dn662Qs5Rm6473v-psHYYFcvHKBatluZRorj4ntljsZ",
    alt: "Harvest moment at Mama Sarah farm", platform: "Instagram", platformIcon: "photo_camera", statIcon: "favorite", stat: "1.4K",
    caption: "Day 14 first flush collection", tag: "#GrowWithData", tagTone: "text-primary",
  },
  {
    src: "https://lh3.googleusercontent.com/aida/AEtjO1V_f4buqLZ0aGaldaUf1sZok_GjVxx6T4AI0hMDmgyj7TFZ2mXq8onjGbXk6SkP8ht3l0TNJVYdwVBdL31DG5Vg1O6wQBMs1NBeftU6wHxaK4vIAiGbNGGsj-JqYX1P_orkkG4UQloR0aTD2uKJA90K6Sg6yPwfrAE_7KmKIT7vuJURhsfNOpeCSSphGg6OtJ9nfDXtohEI5xvSAgpucpNIZUQM9lerhJE3K5LrOZGdGPLHkUesuAvJNow",
    alt: "Grow room automation check", platform: "TikTok Reel", platformIcon: "play_circle", statIcon: "visibility", stat: "41.2K",
    caption: "Behind the scenes: IoT sensor node check", tag: "#AgTechKenya", tagTone: "text-secondary",
  },
];

export default function Community() {
  return (
    <section className="w-full bg-surface-container-low py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-surface-container-highest px-3 py-1 font-label-sm text-label-sm font-bold uppercase text-secondary">
              Live Social Feed
            </div>
            <h2 className="mb-2 font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-primary md:font-headline-lg md:text-headline-lg">From Our Community</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">See what&apos;s growing, right now.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-outline-variant/40 bg-surface-container-lowest px-5 py-2.5 font-label-md text-label-md text-on-surface shadow-sm transition-all hover:bg-surface-container">
              <Icon name="photo_camera" className="text-[18px] text-secondary" /> Follow us on Instagram
            </a>
            <a href={SOCIAL.tiktok} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-label-md text-label-md text-on-primary shadow-sm transition-all hover:bg-primary-container">
              <Icon name="play_circle" className="text-[18px] text-secondary-fixed" /> Follow us on TikTok
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p) => (
            <article key={p.caption} className="group overflow-hidden rounded-3xl bg-surface-container-lowest shadow-sm transition-all hover:shadow-md">
              <div className="relative h-72 overflow-hidden bg-primary">
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-surface-container-lowest/90 px-3 py-1 font-label-sm text-label-sm font-bold text-on-surface backdrop-blur-md">
                  <Icon name={p.platformIcon} className="text-[14px] text-secondary" /> {p.platform}
                </span>
                <span className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-primary/80 px-2.5 py-1 font-label-sm text-label-sm text-on-primary">
                  <Icon name={p.statIcon} className="text-[14px]" /> {p.stat}
                </span>
                <div className="absolute bottom-4 left-4 right-20 font-label-md text-label-md text-on-primary">{p.caption}</div>
              </div>
              <div className="flex items-center justify-between p-4 font-label-sm text-label-sm text-on-surface-variant">
                <span>@smartmushroom_ke</span>
                <span className={`font-semibold ${p.tagTone}`}>{p.tag}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
