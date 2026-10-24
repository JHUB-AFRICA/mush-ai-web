import type { Metadata } from "next";
import Image from "next/image";
import FaqAccordion, { type FaqItemData } from "@/components/core/FaqAccordion";

export const metadata: Metadata = {
  title: "About",
  description:
    "SmartMushroom brings together agricultural know-how, sensor technology and hands-on training to make mushroom farming more consistent, accessible and sustainable.",
};

const approach = [
  {
    icon: "domain",
    iconStyle: "bg-primary-container text-on-primary-container",
    title: "Purpose-Built Structure",
    text: "A well-designed physical farm built for stable growing conditions.",
  },
  {
    icon: "sensors",
    iconStyle: "bg-secondary-fixed text-on-secondary-fixed",
    title: "Continuous Monitoring",
    text: "Sensors that catch problems before they affect yield.",
  },
  {
    icon: "support_agent",
    iconStyle: "bg-tertiary-fixed text-on-tertiary-fixed",
    title: "Training & Support",
    text: "Hands-on training and support, so farmers aren't left to interpret data alone.",
  },
];

// TODO: replace the remaining placeholders with real team members.
// Add a photo with `image: "/images/team/<file>.jpg"`; without one, an icon shows.
const team: { name: string; role: string; image?: string }[] = [
  {
    name: "Faith Mukami",
    role: "Frontend Developer",
    image: "/images/team/faith-mukami.jpg",
  },
  { name: "[Name]", role: "[Role]" },
  { name: "[Name]", role: "[Role]" },
  { name: "[Name]", role: "[Role]" },
];

const partners = [
  {
    icon: "school",
    iconStyle: "bg-primary text-on-primary",
    name: "JKUAT",
    tag: "Research & Incubation Ecosystem",
    text: "Collaborating on mycology laboratory validation, mother culture spawn trials, and agricultural science curriculum alignment.",
  },
  {
    icon: "hub",
    iconStyle: "bg-primary-container text-on-primary-container",
    name: "JHUB Africa",
    tag: "Tech Commercialization & IoT Innovation Hub",
    text: "Accelerating low-power hardware prototyping, microcontroller field validation, and climate-tech commercialization scaling.",
  },
  {
    icon: "groups",
    iconStyle: "bg-secondary text-on-secondary",
    name: "Regional Outgrowers & Agri-Cooperatives",
    tag: "Community Production Hubs",
    text: "Partnering with local farmer clusters and cooperatives across Kenya for field adoption, localized training, and bulk off-take supply coordination.",
  },
];

const testimonials = [
  {
    quote:
      "The hands-on support and purpose-built room design eliminated the guesswork from our daily mushroom yields.",
    name: "Musee Maluki",
    role: "Commercial Grower, Machakos",
    avatarStyle: "bg-primary-container text-on-primary-container",
  },
  {
    quote:
      "Having real sensor guidance combined with practical farming advice made all the difference for our farm.",
    name: "Karambu Muchina",
    role: "Outgrower Lead, Nakuru",
    avatarStyle: "bg-secondary-fixed text-on-secondary-fixed",
  },
];

const faqs: FaqItemData[] = [
  {
    question:
      "Is SmartMushroom affiliated with a university or research institution?",
    answer:
      "Yes — SmartMushroom has worked with institutional partners including JKUAT during its development.",
  },
  {
    question: "Do you work with organizations or only individual customers?",
    answer:
      "Both. We sell directly to individual growers and customers, and welcome partnerships with organizations, cooperatives and suppliers.",
  },
  {
    question: "How can I become a partner or supplier?",
    answer:
      "Reach out through the contact form or email, and let us know what kind of partnership you're interested in.",
  },
];

const sectionPad = "px-5 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20";

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero */}
      <section
        className={`w-full bg-surface-container-low px-5 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-24`}
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-5 sm:gap-6">
          <h1 className="font-headline font-bold text-3xl sm:text-5xl text-primary tracking-tight leading-tight max-w-3xl text-balance">
            Growing better mushrooms, and a better way to farm.
          </h1>
          <p className="font-body text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            SmartMushroom brings together agricultural know-how, sensor
            technology and hands-on training to make mushroom farming more
            consistent, more accessible, and more sustainable.
          </p>
          <a
            href="#partner-with-us"
            className="inline-flex items-center justify-center bg-secondary-container hover:bg-secondary text-on-secondary font-semibold text-base px-8 py-3.5 rounded-full shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* 2. Our Mission */}
      <section className={`w-full bg-surface ${sectionPad}`}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-headline font-semibold text-2xl sm:text-4xl text-primary mb-5 sm:mb-6">
            Our Mission
          </h2>
          <div className="p-6 sm:p-8 rounded-2xl bg-surface-container-low shadow-sm border border-surface-container-high">
            <p className="font-body text-base sm:text-lg text-on-surface leading-relaxed">
              To help farmers — from first-time growers to established
              operations — produce healthier mushroom harvests with fewer
              surprises, using tools that are simple to understand and easy to
              act on.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Our Approach */}
      <section className={`w-full bg-surface-container-low ${sectionPad}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 lg:mb-16">
            <h2 className="font-headline font-semibold text-2xl sm:text-4xl text-primary mb-3">
              Our Approach
            </h2>
            <p className="font-body text-on-surface-variant">
              We combine three things most mushroom farms treat separately:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {approach.map((item) => (
              <div
                key={item.title}
                className="flex flex-col p-6 lg:p-8 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 sm:mb-6 ${item.iconStyle}`}
                >
                  <span
                    aria-hidden="true"
                    className="material-symbols-outlined text-[28px]"
                  >
                    {item.icon}
                  </span>
                </div>
                <h3 className="font-headline font-semibold text-xl text-primary mb-2 sm:mb-3">
                  {item.title}
                </h3>
                <p className="font-body text-on-surface-variant leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Our Team */}
      <section id="our-team" className={`w-full bg-surface ${sectionPad}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 lg:mb-16">
            <h2 className="font-headline font-semibold text-2xl sm:text-4xl text-primary">
              Our Team
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {team.map((member, i) => (
              <div
                key={`${member.name}-${i}`}
                className="flex flex-col items-center text-center p-6 lg:p-8 rounded-2xl bg-surface-container-low shadow-sm"
              >
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-surface-container-high flex items-center justify-center mb-5 sm:mb-6 text-on-surface-variant">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={`${member.name}, ${member.role}`}
                      fill
                      sizes="96px"
                      className="object-cover object-top"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="material-symbols-outlined text-[40px] sm:text-[48px]"
                    >
                      person
                    </span>
                  )}
                </div>
                <h3 className="font-headline font-semibold text-xl text-primary mb-1">
                  {member.name}
                </h3>
                <p className="font-body text-[13px] text-secondary font-semibold uppercase tracking-wider">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Our Partners */}
      <section className={`w-full bg-surface-container-low ${sectionPad}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-16">
            <h2 className="font-headline font-semibold text-2xl sm:text-4xl text-primary mb-3">
              Our Partners
            </h2>
            <p className="font-body text-on-surface-variant leading-relaxed">
              SmartMushroom has grown alongside institutional partners who&apos;ve
              supported research, farm infrastructure and technical
              development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="p-6 lg:p-8 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 sm:mb-6 ${partner.iconStyle}`}
                >
                  <span
                    aria-hidden="true"
                    className="material-symbols-outlined text-[24px]"
                  >
                    {partner.icon}
                  </span>
                </div>
                <h3 className="font-headline font-semibold text-xl text-primary mb-2">
                  {partner.name}
                </h3>
                <span className="font-body text-[11px] text-secondary uppercase font-bold mb-4 tracking-wider">
                  {partner.tag}
                </span>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed flex-grow">
                  {partner.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className={`w-full bg-surface ${sectionPad}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 lg:mb-16">
            <h2 className="font-headline font-semibold text-2xl sm:text-4xl text-primary mb-3">
              What Our Customers Say
            </h2>
            <p className="font-body text-on-surface-variant">
              Real feedback from growers across Kenya
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 max-w-4xl mx-auto">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="p-6 lg:p-8 rounded-2xl bg-surface-container-low shadow-sm flex flex-col justify-between m-0"
              >
                <blockquote className="font-body text-base sm:text-lg text-on-surface italic mb-6 leading-relaxed m-0">
                  “{t.quote}”
                </blockquote>
                <figcaption className="flex items-center gap-3 pt-4 border-t border-surface-container-high">
                  <div
                    className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center ${t.avatarStyle}`}
                  >
                    <span
                      aria-hidden="true"
                      className="material-symbols-outlined text-[20px]"
                    >
                      person
                    </span>
                  </div>
                  <div>
                    <p className="font-headline font-semibold text-base text-primary">
                      {t.name}
                    </p>
                    <span className="font-body text-sm text-on-surface-variant">
                      {t.role}
                    </span>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Partner With Us */}
      <section
        id="partner-with-us"
        className={`w-full bg-surface-container-low scroll-mt-24 ${sectionPad}`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-surface-container-lowest p-6 sm:p-8 lg:p-12 shadow-md text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center mb-5 sm:mb-6">
              <span
                aria-hidden="true"
                className="material-symbols-outlined text-[32px]"
              >
                handshake
              </span>
            </div>
            <h2 className="font-headline font-semibold text-2xl sm:text-4xl text-primary mb-4">
              Partner With Us
            </h2>
            <p className="font-body text-base sm:text-lg text-on-surface-variant max-w-xl mb-8 leading-relaxed">
              Interested in collaborating, supplying, distributing, or
              supporting SmartMushroom&apos;s growth? We&apos;d like to hear from
              you.
            </p>
            <a
              href="mailto:info@smartmushroom.africa"
              className="inline-flex items-center justify-center w-full sm:w-auto bg-secondary-container hover:bg-secondary text-on-secondary font-semibold text-base px-8 py-3.5 rounded-full shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* 8. FAQs */}
      <section className={`w-full bg-surface ${sectionPad}`}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-headline font-semibold text-2xl sm:text-4xl text-primary mb-2">
              FAQs
            </h2>
            <p className="font-body text-on-surface-variant">
              Common questions about our partnerships and organization
            </p>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>
    </>
  );
}
