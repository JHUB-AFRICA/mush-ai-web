export const filterTabs = [
  "All Products",
  "Grow Kits & Structures",
  "Strains & Spawn",
  "Fresh Mushrooms",
  "By-products & Compost",
] as const;

export type FilterTab = (typeof filterTabs)[number];

// "Training" has no tab of its own, so it only appears under "All Products"
export type Category = Exclude<FilterTab, "All Products"> | "Training";

export type Product = {
  id: string;
  name: string;
  category: Category;
  badge: string;
  badgeTone: "forest" | "ember";
  rating: number;
  reviews: string;
  meta: string;
  tag: string;
  description: string;
  features: string[];
  unit: string;
  price: number;
  cta: "Order Unit" | "Add to Cart" | "Book Seat";
  image: string;
  imageAlt: string;
};

/* Add matching photos in /public/images/shop/ */
export const products: Product[] = [
  {
    id: "modular-pumice-unit",
    name: "Modular Pumice Smart Grow Unit",
    category: "Grow Kits & Structures",
    badge: "Turnkey Infrastructure",
    badgeTone: "forest",
    rating: 4.9,
    reviews: "28",
    meta: "30FT X 20FT ARCHITECTURE",
    tag: "Masonry + Tech",
    description:
      "Engineered volcanic pumice walls delivering passive 18°C–22°C ambient thermal buffering for year-round pinning.",
    features: [
      "Built in 21 calendar days",
      "Capacity: 1,200 Button substrate bags",
    ],
    unit: "Farm Gate / Turnkey",
    price: 480000,
    cta: "Order Unit",
    image: "/images/shop/modular-pumice-unit.jpg",
    imageAlt: "Completed pumice grow unit with a corrugated roof on a farm",
  },
  {
    id: "commercial-button-spawn",
    name: "Commercial Button Mushroom Spawn (5kg)",
    category: "Strains & Spawn",
    badge: "Bestseller + JKUAT Pure Strain",
    badgeTone: "ember",
    rating: 4.8,
    reviews: "84",
    meta: "AGARICUS BISPORUS",
    tag: "Cold Batch #942",
    description:
      "High-vigor first-generation sorghum grain spawn. Rapid pinhead initiation, strong rhizomorphic run and low contamination risk.",
    features: ["Store at 4°C", "21-Day Incubation"],
    unit: "5kg Inoculated Bag",
    price: 2500,
    cta: "Add to Cart",
    image: "/images/shop/spawn-bag.jpg",
    imageAlt: "Bag of white mushroom spawn colonized grain",
  },
  {
    id: "iot-sensor-kit",
    name: "Farm Starter IoT Microclimate Sensor Kit",
    category: "Grow Kits & Structures",
    badge: "JHUB Africa Certified",
    badgeTone: "forest",
    rating: 5.0,
    reviews: "42",
    meta: "HARDWARE TELEMETRY",
    tag: "Safaricom IoT SIM",
    description:
      "Plug-and-play agricultural monitoring hub. Includes 3 wireless substrate soil pins and a solar-ready edge unit.",
    features: [
      "Cellular 4G & SMS alert engine",
      "14-day lithium backup reserve",
    ],
    unit: "Complete Hub + 3 Nodes",
    price: 42000,
    cta: "Add to Cart",
    image: "/images/shop/iot-sensor-kit.jpg",
    imageAlt: "Solar-powered IoT hub mounted above mushroom racks",
  },
  {
    id: "fresh-white-button",
    name: "Fresh Grade-A White Button Mushrooms (1kg)",
    category: "Fresh Mushrooms",
    badge: "Daily Harvest (06:00 AM)",
    badgeTone: "forest",
    rating: 4.9,
    reviews: "150+",
    meta: "CULINARY FRESH",
    tag: "Closed-Cap Grade-A",
    description:
      "Harvested at dawn inside Juja automated pumice rooms. Plump, dense, unblemished white caps ready for the kitchen.",
    features: ["100% Picked Today", "100% Organic certified"],
    unit: "1kg Aerated Punnet",
    price: 600,
    cta: "Add to Cart",
    image: "/images/shop/fresh-mushrooms.jpg",
    imageAlt: "Punnet of fresh white button mushrooms",
  },
  {
    id: "pasteurized-substrate",
    name: "Pasteurized Enriched Substrate Blocks (20kg)",
    category: "By-products & Compost",
    badge: "Ready For Spawning",
    badgeTone: "forest",
    rating: 4.7,
    reviews: "65",
    meta: "PHASE II COMPOST",
    tag: "Moisture 68%",
    description:
      "Steam-conditioned wheat straw and poultry-enriched organic compost. Balanced pH (7.2) for even colonization.",
    features: [
      "High nitrogen formulation",
      "Pre-formed in 20kg breathable polyethylene block",
    ],
    unit: "Per 20kg Block",
    price: 1200,
    cta: "Add to Cart",
    image: "/images/shop/substrate-blocks.jpg",
    imageAlt: "Stacked pasteurized substrate blocks in a warehouse",
  },
  {
    id: "button-masterclass",
    name: "Hands-on Masterclass: Commercial Button Farming",
    category: "Training",
    badge: "JKUAT Juja Campus",
    badgeTone: "forest",
    rating: 5.0,
    reviews: "110",
    meta: "CERTIFICATION PROGRAM",
    tag: "Next Cohort: 15–16th",
    description:
      "Two full days of intensive practical instruction covering compost formulation, casing soil and harvest handling.",
    features: [
      "Certificate endorsed by JHUB Africa",
      "Includes starter spawn kit (2kg)",
    ],
    unit: "Tuition + Lab Materials",
    price: 12500,
    cta: "Book Seat",
    image: "/images/shop/masterclass.jpg",
    imageAlt: "Trainees and an instructor inside a mushroom grow room",
  },
];

export const featuredProductId = "commercial-button-spawn";
