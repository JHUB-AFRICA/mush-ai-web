export const filterTabs = [
  "All Products",
  "Fresh Mushrooms",
  "Strains & Spawn",
  "Grow Kits & Structures",
  "By-products & Compost",
] as const;

export type FilterTab = (typeof filterTabs)[number];

export type Category = Exclude<FilterTab, "All Products">;


/* ── Review type ── */
export type ReviewItem = {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
};

export type Product = {
  id: string;
  name: string;
  category: Category;
  badge: string;
  badgeTone: "forest" | "ember";
  rating: number;
  reviews: string;
  description: string;
  longDescription?: string;
  features: string[];
  specs?: { label: string; value: string }[];
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
    description:
      "Complete pumice kit - modular structure for adult mushroom yield, ultra-sterile casing soil.",
    longDescription:
      "Our flagship Tier 1 Grow Kit delivers a fully assembled volcanic pumice growing structure, engineered to maintain passive thermal buffering between 18°C and 22°C without active HVAC. Each unit arrives with pre-cut pumice blocks, timber framing, corrugated roofing, misting lines, and sterile casing soil - everything you need to begin commercial mushroom production from day one. Designed by JKUAT agricultural engineers and tested across 14 outgrower farms in Kiambu and Murang'a counties.",
    features: [
      "Scaled for starting yield / 1,200 substrate bags",
      "Passive 18°C-22°C ambient thermal buffering",
      "Pre-cut volcanic pumice blocks + frame",
      "Integrated misting rails ready",
      "Sterile casing soil included on delivery",
    ],
    specs: [
      { label: "Footprint", value: "4m x 6m (modular)" },
      { label: "Capacity", value: "1,200 substrate bags" },
      { label: "Thermal Range", value: "18°C - 22°C passive" },
      { label: "Build Time", value: "Same-day setup by team" },
      { label: "Lifespan", value: "10+ years with care" },
    ],
    unit: "Turnkey Unit",
    price: 85000,
    cta: "Order Unit",
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
    description:
      "Certified laboratory-grade White Agaricus grain spawn - high colonizer.",
    longDescription:
      "Our grain spawn is produced in a JKUAT-certified cleanroom laboratory under HEPA-filtered laminar flow conditions. Each 5kg bag contains fully colonized wheat grain inoculated with high-vigor Agaricus bisporus mycelium. The strain has been selected for rapid colonization (14-18 days), strong pinning, and resistance to common contaminants. Ideal for both first-time growers and commercial operations scaling up production.",
    features: [
      "Solid harvest in 14-18 days of spawn",
      "Inoculates up to 100 kg of mushroom compost",
      "JKUAT cleanroom laboratory certified",
      "HEPA-filtered laminar flow production",
      "High contamination resistance strain",
    ],
    specs: [
      { label: "Species", value: "Agaricus bisporus (White Button)" },
      { label: "Weight", value: "5 kg per bag" },
      { label: "Colonization", value: "14-18 days" },
      { label: "Coverage", value: "100 kg compost per bag" },
      { label: "Storage", value: "4°C refrigerated, 30-day viability" },
    ],
    unit: "5kg Spawn Bag",
    price: 1200,
    cta: "Add to Cart",
    image: "/images/shop/spawn-bag.jpg",
    imageAlt: "Bag of colonized white mushroom grain spawn",
  },
  {
    id: "jambo101-oyster-spawn",
    name: "Jambo101 Oyster Mushroom Spawn",
    category: "Strains & Spawn",
    badge: "High Yield Oyster Strain",
    badgeTone: "ember",
    rating: 4.9,
    reviews: "67 reviews",
    description:
      "Premium JKUAT-developed Jambo101 oyster mushroom grain spawn for fast colonization and heavy yields.",
    longDescription:
      "Jambo101 is our premium oyster mushroom grain spawn, produced in the JKUAT cleanroom under HEPA-filtered laminar flow and certified by JHUB Africa. Each 5kg bag is packed with fully colonized grain inoculated with vigorous Pleurotus ostreatus mycelium, selected for rapid colonization, dense pinning and heavy flushes. The culture is clean, pure and naturally disease resistant, making it an excellent choice for both first-time growers and commercial oyster farms scaling up production.",
    features: [
      "Fast colonization in 10-14 days",
      "Inoculates up to 100 kg of substrate",
      "JKUAT-developed Jambo101 strain",
      "Cleanroom produced under HEPA filtration",
      "Excellent for straw, sawdust or bagasse",
    ],
    specs: [
      { label: "Species", value: "Pleurotus ostreatus (Oyster)" },
      { label: "Strain", value: "Jambo101 (JKUAT)" },
      { label: "Weight", value: "5 kg per bag" },
      { label: "Colonization", value: "10-14 days" },
      { label: "Coverage", value: "100 kg substrate per bag" },
    ],
    unit: "5kg Spawn Bag",
    price: 1100,
    cta: "Add to Cart",
    image: "/images/shop/jambo.jpeg",
    imageAlt: "Bag of Jambo101 oyster mushroom spawn beside fresh oyster mushrooms",
  },
  {
    id: "mambo101-oyster-spawn",
    name: "Mambo101 Oyster Mushroom Spawn",
    category: "Strains & Spawn",
    badge: "Climate Resilient Strain",
    badgeTone: "forest",
    rating: 4.9,
    reviews: "61 reviews",
    description:
      "JKUAT-developed Mambo101 oyster strain - aggressive colonizer with wide temperature tolerance.",
    longDescription:
      "Mambo101 is the oyster spawn we recommend for sustainable, low-input mushroom farming. Grown and packed in the JKUAT cleanroom under HEPA-filtered laminar flow and certified by JHUB Africa, each 5kg bag contains fully colonized grain carrying aggressive Pleurotus ostreatus mycelium. The strain colonizes fast, tolerates a wide temperature range, and fruits heavily on a broad choice of substrates - straw, sawdust or pasteurized compost - so it suits smallholder growers and commercial houses alike.",
    features: [
      "Wide temperature tolerance (15°C-30°C)",
      "Aggressive colonization in 10-12 days",
      "Inoculates up to 100 kg of substrate",
      "JKUAT-developed Mambo101 strain",
      "Ideal for low-input systems",
    ],
    specs: [
      { label: "Species", value: "Pleurotus ostreatus (Oyster)" },
      { label: "Strain", value: "Mambo101 (JKUAT)" },
      { label: "Weight", value: "5 kg per bag" },
      { label: "Colonization", value: "10-12 days" },
      { label: "Coverage", value: "100 kg substrate per bag" },
    ],
    unit: "5kg Spawn Bag",
    price: 1100,
    cta: "Add to Cart",
    image: "/images/shop/mambo.jpeg",
    imageAlt: "Bag of Mambo101 oyster mushroom spawn beside fresh oyster mushrooms",
  },
  {
    id: "fresh-gourmet-button",
    name: "Fresh Gourmet Button Mushrooms",
    category: "Fresh Mushrooms",
    badge: "Farm Fresh",
    badgeTone: "forest",
    rating: 4.9,
    reviews: "150+ reviews",
    description:
      "Freshly harvested from our climate-controlled room within 6 hours of pickup.",
    longDescription:
      "Grown in our climate-controlled SmartMushroom grow rooms using our proprietary substrate blend, these premium white button mushrooms (Agaricus bisporus) are harvested at peak maturity and delivered to our pickup stations within hours. Firm, clean, and perfectly closed caps with a mild, nutty flavor. Ideal for grilling, sautéing, soups, stews, and gourmet dishes. Maintained in a cold chain from harvest to pickup.",
    features: [
      "Harvested same day as pickup",
      "Grade-A closed cap selection",
      "Climate-controlled cultivation",
      "Cold-chain maintained at 4°C",
      "No pesticides or chemical preservatives",
    ],
    specs: [
      { label: "Species", value: "Agaricus bisporus" },
      { label: "Grade", value: "A - Closed Cap" },
      { label: "Shelf Life", value: "5-7 days at 4°C" },
      { label: "Packaging", value: "Breathable crate/punnet" },
      { label: "Harvest", value: "Daily, pre-dawn" },
    ],
    unit: "Per KG",
    price: 650,
    cta: "Add to Cart",
    image: "/images/shop/fresh-mushrooms.jpg",
    imageAlt: "Freshly harvested white button mushrooms on a wooden tray",
  },
  {
    id: "fresh-punnets",
    name: "Fresh Mushroom Punnets",
    category: "Fresh Mushrooms",
    badge: "Pre-Packed",
    badgeTone: "forest",
    rating: 4.9,
    reviews: "34 reviews",
    description:
      "Pre-packed 250g punnets of fresh button mushrooms, ready for immediate use.",
    longDescription:
      "Convenient pre-packed punnets of our Grade-A closed-cap button mushrooms. Each 250g punnet is harvested at dawn, packed within hours, and maintained at 4°C through our cold-chain process. Perfect for restaurants, meal prep, or households that want consistent quality without the hassle of weighing loose mushrooms.",
    features: [
      "250g pre-packed punnet",
      "Grade-A closed-cap button mushrooms",
      "Harvested at dawn, packed same-day",
      "4°C cold-chain maintained",
      "Ready to cook, no weighing needed",
    ],
    specs: [
      { label: "Weight", value: "250 g per punnet" },
      { label: "Grade", value: "A - Closed Cap" },
      { label: "Shelf Life", value: "5-7 days at 4°C" },
      { label: "Harvest", value: "Daily, pre-dawn" },
      { label: "Pickup", value: "Juja Hub & Westlands" },
    ],
    unit: "250g Punnet",
    price: 350,
    cta: "Add to Cart",
    image: "/images/shop/punnets.jpeg",
    imageAlt: "Pre-packed punnet of fresh button mushrooms",
  },
  {
    id: "dried-oyster-mushrooms",
    name: "Dried Oyster Mushrooms",
    category: "Fresh Mushrooms",
    badge: "Long Shelf Life",
    badgeTone: "forest",
    rating: 4.8,
    reviews: "23 reviews",
    description:
      "Premium air-dried oyster mushrooms with extended shelf life up to 12 months.",
    longDescription:
      "Our dried oyster mushrooms are carefully selected from fresh harvests, then gently air-dried to preserve their natural umami flavor and nutritional value. With a shelf life of up to 12 months when stored properly, they are perfect for soups, stews, stir-fries, and rehydrated dishes. Just soak in warm water for 10-15 minutes to restore their texture and flavor. Triple the value compared to fresh mushrooms as highlighted in our agro-processing model.",
    features: [
      "Shelf life up to 12 months",
      "Preserves natural umami flavor",
      "Lightweight and easy to store",
      "Rich in protein and nutrients",
      "Perfect for year-round use",
    ],
    specs: [
      { label: "Species", value: "Pleurotus ostreatus (Oyster)" },
      { label: "Weight", value: "100 g pack" },
      { label: "Shelf Life", value: "12 months sealed" },
      { label: "Moisture", value: "< 10%" },
      { label: "Storage", value: "Cool dry place" },
    ],
    unit: "100g Pack",
    price: 850,
    cta: "Add to Cart",
    image: "/images/shop/fresh-mushrooms.jpg",
    imageAlt: "Dried oyster mushrooms in a sealed pack",
  },
  {
    id: "mushroom-crisp-umami",
    name: "Mushroom Crisp / Umami Crisps",
    category: "By-products & Compost",
    badge: "Value-Added Snack",
    badgeTone: "ember",
    rating: 4.9,
    reviews: "41 reviews",
    description:
      "Crispy, savory mushroom snacks packed with umami flavor. Triple revenue per kg.",
    longDescription:
      "Our Mushroom Crisps are made from premium fresh mushrooms, sliced thin and crisped to perfection using our proprietary process. These healthy, protein-rich snacks deliver an intense umami punch without artificial additives. Perfect as a gourmet snack, salad topper, or accompaniment to your favorite dishes. Part of our value-addition strategy to combat spoilage and maximize farmer income.",
    features: [
      "Crispy and flavorful umami snack",
      "Made from fresh oyster/button mushrooms",
      "No artificial preservatives",
      "High protein, low carb",
      "Gourmet hotel-quality product",
    ],
    specs: [
      { label: "Weight", value: "50 g pack" },
      { label: "Type", value: "Crisped mushroom snack" },
      { label: "Shelf Life", value: "6 months sealed" },
      { label: "Storage", value: "Cool dry place" },
      { label: "Flavor", value: "Natural Umami" },
    ],
    unit: "50g Pack",
    price: 550,
    cta: "Add to Cart",
    image: "/images/shop/mushroom-bg.jpg",
    imageAlt: "Crispy mushroom crisps in a gourmet pack",
  },
  {
    id: "organic-spent-compost",
    name: "Organic Spent Mushroom Compost",
    category: "By-products & Compost",
    badge: "Soil Booster",
    badgeTone: "forest",
    rating: 4.7,
    reviews: "21 reviews",
    description:
      "Nutrient-dense post-condition soil bio-fertilizer recycled directly from past harvest cycles.",
    longDescription:
      "Spent mushroom substrate is an excellent organic soil amendment rich in nutrients, organic matter, and beneficial microorganisms. After harvesting, our substrate is carefully processed and aged to create a premium compost that improves soil structure, water retention, and fertility. Perfect for vegetable gardens, flower beds, and crop production. This closes our loop in line with our zero-waste philosophy.",
    features: [
      "Rich in organic matter and nutrients",
      "Improves soil structure and water retention",
      "Contains beneficial microbes",
      "100% organic, no chemicals added",
      "Sustainably recycled from our farm",
    ],
    specs: [
      { label: "Type", value: "Aged spent mushroom compost" },
      { label: "Weight", value: "25 kg bag" },
      { label: "NPK Ratio", value: "2.0 - 1.5 - 1.8" },
      { label: "pH", value: "6.8 - 7.2" },
      { label: "Use", value: "Soil amendment/top dressing" },
    ],
    unit: "25kg Bag",
    price: 450,
    cta: "Add to Cart",
    image: "/images/shop/substrate-blocks.jpg",
    imageAlt: "Bag of organic spent mushroom compost",
  },
  {
    id: "iot-sensor-kit",
    name: "Farm Starter IoT Microclimate Sensor Kit",
    category: "Grow Kits & Structures",
    badge: "Smart Farming",
    badgeTone: "ember",
    rating: 4.8,
    reviews: "42 reviews",
    description:
      "Real-time substrate telemetry, ambient humidity & temp sensor hub with Safaricom IoT SIM.",
    longDescription:
      "Monitor your grow room conditions 24/7 with our JHUB-certified IoT sensor kit. The hub measures ambient temperature, relative humidity, CO₂ levels, and substrate temperature with high accuracy. Data syncs to the Bridge-AI dashboard via Safaricom IoT network, sending predictive alerts to your phone when conditions drift out of range. Includes sensors, gateway hub, SIM card, mounting accessories, and setup guide.",
    features: [
      "Real-time temp, humidity & CO₂ tracking",
      "Safaricom IoT connectivity included",
      "Bridge-AI dashboard compatible",
      "Predictive alerts via SMS/app",
      "Battery backup for 24 hours",
      "JHUB certified hardware",
    ],
    specs: [
      { label: "Sensors", value: "Temp, RH, CO₂, Substrate temp" },
      { label: "Connectivity", value: "Safaricom NB-IoT/2G" },
      { label: "Power", value: "AC mains + battery backup" },
      { label: "Range", value: "Covers up to 50m2" },
      { label: "Dashboard", value: "Bridge-AI compatible" },
    ],
    unit: "Complete Kit",
    price: 15000,
    cta: "Add to Cart",
    image: "/images/shop/iot-sensor-kit.jpg",
    imageAlt: "IoT sensor kit with hub and probes for mushroom grow room",
  },
  {
    id: "substrate-blocks",
    name: "Pasteurized Enriched Substrate Blocks",
    category: "Grow Kits & Structures",
    badge: "Ready-to-Inoculate",
    badgeTone: "forest",
    rating: 4.8,
    reviews: "65 reviews",
    description:
      "Steam-conditioned wheat straw and poultry-enriched organic compost. Balanced pH (7.2) for even colonization.",
    longDescription:
      "Our pasteurized substrate blocks are prepared in controlled conditions using a blend of wheat straw, poultry manure compost, and gypsum. Each block is steam-pasteurized to eliminate competitors while preserving beneficial microbes. Ready to inoculate with your spawn - just open, mix, and incubate. Consistent moisture content and pH ensure even colonization across all blocks.",
    features: [
      "Steam-pasteurized for contamination control",
      "Balanced blend for optimal yields",
      "Ready-to-inoculate, saves preparation time",
      "Consistent moisture and pH",
      "Works with all our spawn strains",
    ],
    specs: [
      { label: "Weight", value: "5 kg per block" },
      { label: "Composition", value: "Wheat straw + compost + gypsum" },
      { label: "pH", value: "6.8 - 7.2" },
      { label: "Moisture", value: "65-68%" },
      { label: "Pasteurization", value: "Steam treated" },
    ],
    unit: "5kg Block",
    price: 250,
    cta: "Add to Cart",
    image: "/images/shop/substrate-blocks.jpg",
    imageAlt: "Stack of pasteurized mushroom substrate blocks wrapped in plastic",
  },
  {
    id: "mushroom-wine",
    name: "MushWine Mushroom Infused Wine",
    category: "By-products & Compost",
    badge: "Fermented Beverage",
    badgeTone: "ember",
    rating: 4.7,
    reviews: "12 reviews",
    description:
      "Handcrafted wine infused with gourmet mushroom essence, aged for depth and complexity.",
    longDescription:
      "Our signature MushWine is a unique fermented beverage that blends the earthy notes of gourmet mushrooms with traditional winemaking. Each 750ml bottle captures the terroir of our Juja farm, delivering a smooth, complex drink perfect for pairing with mushroom-based dishes or enjoying on its own. Naturally fermented, unfiltered, and bottled at source.",
    features: [
      "750ml glass bottle",
      "Naturally fermented mushroom infusion",
      "Earthy complex flavor profile",
      "Pairs well with mushroom dishes",
      "Bottled at SmartMushroom Juja farm",
    ],
    specs: [
      { label: "Volume", value: "750 ml per bottle" },
      { label: "Alcohol", value: "11.5% ABV" },
      { label: "Variety", value: "Mushroom-infused table wine" },
      { label: "Serving", value: "Chilled, 8-10°C" },
      { label: "Shelf Life", value: "2 years unopened" },
    ],
    unit: "750ml Bottle",
    price: 1800,
    cta: "Add to Cart",
    image: "/images/shop/mushwine.jpeg",
    imageAlt: "Bottle of MushWine mushroom infused wine",
  },
  {
    id: "substrate-making-workshop",
    name: "Mushroom Substrate Making Workshop",
    category: "Grow Kits & Structures",
    badge: "Training",
    badgeTone: "ember",
    rating: 5.0,
    reviews: "15 reviews",
    description:
      "3-day hands-on workshop on substrate preparation using coffee husks, wheat straw or bagasse.",
    longDescription:
      "Learn the art and science of mushroom substrate preparation in this comprehensive 3-day hands-on workshop at our JKUAT training facility. You'll learn how to prepare substrates using locally available materials like coffee husks, wheat straw, or sugarcane bagasse. Topics include pasteurization techniques, contamination prevention, substrate formulation, and quality control. Includes all materials, lunch, training manual, and certificate of completion.",
    features: [
      "3 days of hands-on training",
      "Learn substrate making from scratch",
      "Use coffee husks, wheat straw or bagasse",
      "Pasteurization and sterilization techniques",
      "Certificate of completion",
      "All materials and lunch included",
    ],
    specs: [
      { label: "Duration", value: "3 Days" },
      { label: "Location", value: "JKUAT/SmartMushroom Training Center" },
      { label: "Class Size", value: "Max 15 participants" },
      { label: "Materials", value: "All provided" },
      { label: "Certificate", value: "Issued on completion" },
    ],
    unit: "3-Day Workshop",
    price: 10000,
    cta: "Book Seat",
    image: "/images/shop/masterclass.jpg",
    imageAlt: "Mushroom cultivation training workshop at SmartMushroom",
  },
];

export const featuredProductId = "button-grain-spawn";

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  const sameCategory = products.filter(
    (p) => p.category === product.category && p.id !== product.id,
  );
  const others = products.filter(
    (p) => p.category !== product.category && p.id !== product.id,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export const reviewsData: Record<string, ReviewItem[]> = {};
