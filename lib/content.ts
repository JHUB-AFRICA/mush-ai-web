/**
 * All homepage copy lives here so branding/text can change in one place.
 * NOTE: copy is carried over from the Stitch template (brand "SmartMushroom").
 * Rename `brand.name` to "MUSH AI" when you're ready.
 */

export const brand = {
  name: "SmartMushroom",
  copyright: "© 2025 SmartMushroom Ltd. All rights reserved.",
};

// TODO: point these at real routes as pages get built.
export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Farm Structure", href: "#" },
  { label: "The Process", href: "#" },
  { label: "Shop", href: "#" },
  { label: "About", href: "#" },
];

export const partners = [
  { icon: "hub", name: "JHUB Africa" },
  { icon: "school", name: "JKUAT Research" },
  { icon: "psychiatry", name: "KALRO" },
  { icon: "public", name: "MoA • Kilimo Kenya" },
];

export const steps = [
  { icon: "sensors", title: "Sense", text: "Sensors continuously watch the grow room, capturing microclimate data in real time." },
  { icon: "analytics", title: "Understand", text: "The system flags anything unusual, analyzing subtle changes before stress symptoms occur." },
  { icon: "notifications_active", title: "Advise", text: "Farmers get clear, simple guidance directly via SMS, WhatsApp, and actionable alerts." },
  { icon: "tune", title: "Act", text: "Conditions get adjusted before a problem affects the crop, safeguarding high flush yields." },
];

export const metrics = [
  { emoji: "🌡️", tone: "secondary", title: "Temperature", text: "Maintained between 18°C–22°C to ensure steady mycelial vegetative colonization." },
  { emoji: "💧", tone: "primary", title: "Humidity", text: "85%–92% RH micro-misting prevents pinhead cap drying without blotch." },
  { emoji: "🫧", tone: "secondary", title: "CO₂ levels", text: "Automated damper control keeping carbon dioxide under 1,200 ppm for thick caps." },
  { emoji: "💡", tone: "primary", title: "Light", text: "Safeguards against light exposure to preserve pure white button pigmentation." },
  { emoji: "🌱", tone: "secondary", title: "Moisture", text: "Substrate capacitive monitoring ensuring balanced 65%–70% casing hydration." },
] as const;

export const pumiceFeatures = [
  { title: "Passive Climate Buffering", text: "Absorbs daytime scorching heat and releases it gently through cold East African nights." },
  { title: "Zero Chemical Mold Growth", text: "Inorganic mineral composition stops Trichoderma green mold from colonizing wall joints." },
  { title: "Turnkey Turnaround in 14 Days", text: "Prefabricated modular panels erected on your parcel with complete solar-ready sensor wiring." },
];

// Placeholder social cards — view/like counts are sample values, not live data.
const IMG_A = "https://lh3.googleusercontent.com/aida-public/AB6AXuAKBImE4UIY9o_4CRNW3mIsd-t8p6Ju4u__RukYAxsS3VqmULmKALJiT_TF3VaSvG03uGPaMXhWh_aPyf7VYg-5ByuiLTiMld5Bts_F0dMGGuaFCwuVKX7TtYQN_UsbKQ3SlgjylDiPe2FERCDNsiuGI1QM1_JdV85Jjw0r9eDawOzgkQqED6xUJlIASEyoj4lSfALV6MUErhoJxywhJqwYN14MdGMB_c7AIXLKBgpeSjKRjTipPgpP";
const IMG_B = "https://lh3.googleusercontent.com/aida-public/AB6AXuDInYVLTqvam_3-W2LFoxH4hvLrCBsYYx_3pBMegTKfZ7IR3PQv4BDf4njgpjvV8geV06j7qmCd1YPi-roYhZ2H7uj0wtZELDGGmaLMkW_MwHzp4Q9Tijp-klfPoom2o6OmxT2KTpPX2Q6VdHkxlkjsZ75SpJfi1GIGZBoZ90GfrhsTfDlkOsJGMo754BI-zRol5FT_Pfxu4Dn662Qs5Rm6473v-psHYYFcvHKBatluZRorj4ntljsZ";
const IMG_C = "https://lh3.googleusercontent.com/aida/AEtjO1V_f4buqLZ0aGaldaUf1sZok_GjVxx6T4AI0hMDmgyj7TFZ2mXq8onjGbXk6SkP8ht3l0TNJVYdwVBdL31DG5Vg1O6wQBMs1NBeftU6wHxaK4vIAiGbNGGsj-JqYX1P_orkkG4UQloR0aTD2uKJA90K6Sg6yPwfrAE_7KmKIT7vuJURhsfNOpeCSSphGg6OtJ9nfDXtohEI5xvSAgpucpNIZUQM9lerhJE3K5LrOZGdGPLHkUesuAvJNow";

export const images = {
  logoHeader: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXPvkK108X46B880piDauNu7ixFJyMsJZMLCfU7tWxwfjQVAp0ottUgTgp5Z5mSxXUZ6Agtl9S2jffQuvU-e9VpVOiCFMaBYqrhPvRGaMgWIE9i8C-CYVQlEN4BEv54bx4hBKEDhskP40okJItEEL2lSYlEHLDZsPeeEINd1RZjqUWjWu0nFhxi9VvCSfq3uPj3N1n0d4BJ1k3yyiCJv0HKR2N88kxDatZPpjHntD8xnncSEEtgKr-ESRnmdYUDEJh9g",
  logoFooter: "https://lh3.googleusercontent.com/aida-public/AB6AXuArBVpYOJQXBUOZB6oV2vG5nwsKtLWQ-61pXqxAd2o9xe0-EBvM5jZA9WHrFg3fMgNfg_kc7V_mf6PSTz_P-s34Dcmo414m-WpKpxzUx_iorfw86wXyq4tB5orxPtqzvJ4TIusImTidk4zHpY5iRXLMF_WIJbxEIy4f5wFzNG36p7bivFllBbA2hk7lIpOJBHLfAD9tux-vIi6CBYGZIGJXsJIvbtk-btUh6qsFfVwtpZcXpCJC97FX_bZ1E6j-oixlig",
  hero: IMG_C,
  pumice: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWY5BHZoWLvPARQuqFizq0dt7nMUr2JBQtbfXiF3WEb_VM4Vk5lppKluR9hPhKj0T_hAfoOy9fJ-0VvwUpuWhkDG4fTd6XESUxPw4sLWpKw4laekNbCfdSSSKXrQMcGa9CNg5cyNGRhbpKwJeR7jP19Ks5ptSc2cG5AuNk4WsF45cF750-lK6z4oCTC9OW1yT9TJPTbdC4JrbE7LoamkQ0s4Qosra0vFHRmbFeKAetExLU8LtRDr_9",
};

export const posts = [
  { image: IMG_A, alt: "Fresh button pins popping", platform: "TikTok Reel", platformIcon: "play_circle", platformIconClass: "text-secondary", statIcon: "visibility", stat: "24.8K", caption: "Morning mist cycle & pinhead burst", tag: "#UrbanFarming", tagClass: "text-secondary" },
  { image: IMG_B, alt: "Harvest moment at Mama Sarah farm", platform: "Instagram", platformIcon: "photo_camera", platformIconClass: "text-secondary-container", statIcon: "favorite", stat: "1.4K", caption: "Day 14 first flush collection", tag: "#GrowWithData", tagClass: "text-primary" },
  { image: IMG_C, alt: "Grow room automation check", platform: "TikTok Reel", platformIcon: "play_circle", platformIconClass: "text-secondary", statIcon: "visibility", stat: "41.2K", caption: "Behind the scenes: IoT sensor node check", tag: "#AgTechKenya", tagClass: "text-secondary" },
];

export const faqs = [
  { q: "What does SmartMushroom actually do?", a: "We grow button mushrooms using a sensor-monitored smart farm, and sell grow kits, spawn, fresh mushrooms and mushroom by-products directly to customers." },
  { q: "Do I need any technical knowledge to buy from you?", a: "Not at all. Our shop, training and products are designed for anyone — from first-time growers to experienced farmers." },
  { q: "Where are you based?", a: "We're based in Kenya, and currently offer local pickup for all orders." },
  { q: "How do I contact you?", a: "Use the contact form, WhatsApp, or email in the footer of any page — whichever is easiest for you." },
];

export const footer = {
  blurb: "Smarter mushroom farming, powered by data. Precision climate-controlled pumice architecture and high-yield IoT substrates across East Africa.",
  badges: [
    { icon: "verified", label: "Made in Kenya" },
    { icon: "school", label: "JKUAT Innovators" },
    { icon: "nest_eco_leaf", label: "JHUB Africa Partner" },
  ],
  quickLinks: ["Home Overview", "Pumice Structures", "The IoT Process", "Fresh Spawn & Yields", "Farmer Training"],
  contact: ["Nairobi / Juja, Kenya", "JHUB Innovation Ecosystem", "Phone: +254 700 000 000", "Email: info@smartmushroom.africa", "JKUAT Collaboration Wing"],
  legal: ["Privacy Policy", "Terms of Service", "Outgrower Agreement"],
};
