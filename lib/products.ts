export const filterTabs = [
  "All Products",
  "Grow Kits & Structures",
  "Strains & Spawn",
  "Fresh Mushrooms",
  "By-products & Compost",
  "Training",
] as const;

export type FilterTab = (typeof filterTabs)[number];

export type Category = Exclude<FilterTab, "All Products">;

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

export const products: Product[] = [
  {
    id: "smart-pumice-grow-kit",
    name: "Smart Pumice Grow Kit (Tier 1)",
    category: "Grow Kits & Structures",
    badge: "Turnkey Infrastructure",
    badgeTone: "forest",
    rating: 4.9,
    reviews: "28 reviews",
    meta: "MODULAR ARCHITECTURE",
    tag: "Masonry + Tech",
    description:
      "Complete pumice kit - modular structure for adult mushroom yield, ultra-sterile casing soil.",
    features: [
      "Scaled for starting yield / 1,200 substrate bags",
      "Passive 18°C–22°C ambient thermal buffering",
    ],
    unit: "Farm Gate Price",
    price: 360000,
    cta: "Add to Cart",
    image: "/images/shop/modular-pumice-unit.jpg",
    imageAlt: "Completed pumice grow unit with a corrugated roof on a farm",
  },
  {
    id: "button-grain-spawn",
    name: "Button Mushroom Grain Spawn",
    category: "Strains & Spawn",
    badge: "Bestseller Strain",
    badgeTone: "ember",
    rating: 4.8,
    reviews: "84 reviews",
    meta: "AGARICUS BISPORUS",
    tag: "Lab Pure Strain",
    description:
      "Certified laboratory-grade White Agaricus grain spawn - high colonizer.",
    features: [
      "Solid harvest in 14-18 days of spawn",
      "Inoculates up to 100 kg of mushroom compost",
    ],
    unit: "5kg Spawn Bag",
    price: 1200,
    cta: "Add to Cart",
    image: "/images/shop/spawn-bag.jpg",
    imageAlt: "Bag of colonized white mushroom grain spawn",
  },
  {
    id: "fresh-gourmet-button",
    name: "Fresh Gourmet Button Mushrooms",
    category: "Fresh Mushrooms",
    badge: "Daily Harvest",
    badgeTone: "forest",
    rating: 4.9,
    reviews: "150+ reviews",
    meta: "CULINARY FRESH",
    tag: "Grade-A Closed-Cap",
    description:
      "Freshly harvested from our climate-controlled room within 6 hours of pickup.",
    features: [
      "Refrigerated transportation / 4°C cold-chain",
      "Harvested at peak pin-selection",
    ],
    unit: "500g Punnet",
    price: 450,
    cta: "Add to Cart",
    image: "/images/shop/fresh-mushrooms.jpg",
    imageAlt: "Punnet of fresh white gourmet button mushrooms",
  },
  {
    id: "organic-spent-compost",
    name: "Organic Spent Mushroom Compost",
    category: "By-products & Compost",
    badge: "Eco-Repurposed",
    badgeTone: "forest",
    rating: 4.8,
    reviews: "21 reviews",
    meta: "SOIL AMENDMENT",
    tag: "NPK Rich",
    description:
      "Nutrient-dense post-condition soil bio-fertilizer recycled directly from past harvest cycles.",
    features: [
      "Rich nitrogen, humic matter & peat moss lines",
      "15kg sealed woven sack",
    ],
    unit: "Per Bag",
    price: 550,
    cta: "Add to Cart",
    image: "/images/shop/substrate-blocks.jpg",
    imageAlt: "Bags of organic spent mushroom compost ready for field use",
  },
  {
    id: "hands-on-agronomy-workshop",
    name: "Hands-On Agronomy Workshop",
    category: "Training",
    badge: "In-person Training",
    badgeTone: "forest",
    rating: 4.9,
    reviews: "48 reviews",
    meta: "JKUAT CAMPUS",
    tag: "Next Cohort",
    description:
      "2-day guided training on JKUAT. Includes substrate preparation, sensor monitoring and spawn inoculation.",
    features: [
      "Access to instructor + attendance log systems",
      "Course certificate following completion",
    ],
    unit: "Per Seat/2 Days",
    price: 20000,
    cta: "Book Seat",
    image: "/images/shop/masterclass.jpg",
    imageAlt: "Trainees and an instructor inside a mushroom grow room",
  },
  {
    id: "iot-sensor-kit",
    name: "Farm Starter IoT Microclimate Sensor Kit",
    category: "Grow Kits & Structures",
    badge: "JHUB Certified",
    badgeTone: "forest",
    rating: 5.0,
    reviews: "42 reviews",
    meta: "HARDWARE TELEMETRY",
    tag: "Safaricom IoT SIM",
    description:
      "Real-time substrate telemetry, ambient humidity & temp sensor hub with Safaricom IoT SIM.",
    features: [
      "Cellular 4G & SMS alert engine",
      "14-day lithium backup reserve",
    ],
    unit: "Complete Kit",
    price: 42000,
    cta: "Add to Cart",
    image: "/images/shop/iot-sensor-kit.jpg",
    imageAlt: "Solar-powered IoT hub mounted above mushroom racks",
  },
  {
    id: "pasteurized-substrate",
    name: "Pasteurized Enriched Substrate Blocks (20kg)",
    category: "By-products & Compost",
    badge: "Ready For Spawning",
    badgeTone: "forest",
    rating: 4.7,
    reviews: "65 reviews",
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
];

export const featuredProductId = "button-grain-spawn";
