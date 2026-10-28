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
      "Pre-cut volcanic pumice blocks with micro-cellular air voids",
      "Includes timber framing and corrugated roofing",
      "Misting lines and humidity regulation built-in",
    ],
    specs: [
      { label: "Dimensions", value: "6m × 3m × 2.8m (L×W×H)" },
      { label: "Capacity", value: "1,200 substrate bags" },
      { label: "Thermal Range", value: "18°C - 22°C passive" },
      { label: "Material", value: "Volcanic pumice + timber" },
      { label: "Warranty", value: "2-year structural" },
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
    badgeTone: "forest",
    rating: 4.9,
    reviews: "37 reviews",
    description:
      "Quality JHUB & JKUAT certified Pleurotus ostreatus grain spawn for successful cultivation.",
    longDescription:
      "Jambo101 is our premium oyster mushroom grain spawn, produced in the JKUAT cleanroom under HEPA-filtered laminar flow and certified by JHUB Africa. Each 5kg bag is packed with fully colonized grain inoculated with vigorous Pleurotus ostreatus mycelium, selected for rapid colonization, dense pinning and heavy flushes. The culture is clean, pure and naturally disease resistant, making it an excellent choice for both first-time growers and commercial oyster farms scaling up production.",
    features: [
      "High-yield Pleurotus ostreatus strain",
      "Disease resistant, clean & pure culture",
      "JHUB Africa & JKUAT cleanroom certified",
      "Rapid colonization with dense pinning",
      "Inoculates up to 100 kg of substrate",
    ],
    specs: [
      { label: "Species", value: "Pleurotus ostreatus (Oyster)" },
      { label: "Weight", value: "5 kg per bag" },
      { label: "Colonization", value: "12-16 days" },
      { label: "Coverage", value: "100 kg substrate per bag" },
      { label: "Storage", value: "4°C refrigerated, 30-day viability" },
    ],
    unit: "5kg Spawn Bag",
    price: 1200,
    cta: "Add to Cart",
    image: "/images/shop/jambo.jpeg",
    imageAlt: "Bag of Jambo101 oyster mushroom spawn beside fresh oyster mushrooms",
  },
  {
    id: "mambo101-oyster-spawn",
    name: "Mambo101 Oyster Mushroom Spawn",
    category: "Strains & Spawn",
    badge: "Disease Resistant Strain",
    badgeTone: "forest",
    rating: 4.7,
    reviews: "24 reviews",
    description:
      "Certified Pleurotus ostreatus grain spawn engineered for sustainable mushroom farming.",
    longDescription:
      "Mambo101 is the oyster spawn we recommend for sustainable, low-input mushroom farming. Grown and packed in the JKUAT cleanroom under HEPA-filtered laminar flow and certified by JHUB Africa, each 5kg bag contains fully colonized grain carrying aggressive Pleurotus ostreatus mycelium. The strain colonizes fast, tolerates a wide temperature range, and fruits heavily on a broad choice of substrates - straw, sawdust or pasteurized compost - so it suits smallholder growers and commercial houses alike.",
    features: [
      "High-yield Pleurotus ostreatus strain",
      "Disease resistant, clean & pure culture",
      "JHUB Africa & JKUAT cleanroom certified",
      "Wide substrate and temperature tolerance",
      "Inoculates up to 100 kg of substrate",
    ],
    specs: [
      { label: "Species", value: "Pleurotus ostreatus (Oyster)" },
      { label: "Weight", value: "5 kg per bag" },
      { label: "Colonization", value: "12-16 days" },
      { label: "Coverage", value: "100 kg substrate per bag" },
      { label: "Storage", value: "4°C refrigerated, 30-day viability" },
    ],
    unit: "5kg Spawn Bag",
    price: 1200,
    cta: "Add to Cart",
    image: "/images/shop/mambo.jpeg",
    imageAlt: "Bag of Mambo101 oyster mushroom spawn beside fresh oyster mushrooms",
  },
  {
    id: "fresh-gourmet-button",
    name: "Fresh Gourmet Button Mushrooms",
    category: "Fresh Mushrooms",
    badge: "Daily Harvest",
    badgeTone: "forest",
    rating: 4.9,
    reviews: "150+ reviews",
    description:
      "Freshly harvested from our climate-controlled room within 6 hours of pickup.",
    longDescription:
      "Our Grade-A closed-cap button mushrooms are hand-harvested at dawn from SmartMushroom's climate-controlled growing rooms in Juja. Each 500g punnet is packed within 6 hours of harvest and maintained at 4°C through our cold-chain process. These mushrooms are grown without pesticides on pasteurized organic substrates, delivering restaurant-quality flavour and firm texture. Available for daily pickup at our Juja Hub and Westlands collection points.",
    features: [
      "Refrigerated transportation / 4°C cold-chain",
      "Harvested at peak pin-selection",
      "Zero pesticide, organic substrate grown",
      "Available for same-day pickup",
      "Restaurant-quality Grade-A selection",
    ],
    specs: [
      { label: "Weight", value: "500g per punnet" },
      { label: "Grade", value: "A - Closed Cap" },
      { label: "Shelf Life", value: "5-7 days at 4°C" },
      { label: "Harvest", value: "Daily, pre-dawn" },
      { label: "Pickup", value: "Juja Hub & Westlands" },
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
    description:
      "Nutrient-dense post-condition soil bio-fertilizer recycled directly from past harvest cycles.",
    longDescription:
      "Our spent mushroom compost is the nutrient-rich byproduct of completed growing cycles, packed with nitrogen, phosphorus, potassium, and beneficial humic acids. Each 15kg bag is composted for an additional 2 weeks after mushroom harvest to ensure pathogen-free, garden-ready amendment. Perfect for vegetable gardens, flower beds, and tree nurseries. This circular economy product helps reduce agricultural waste while enriching your soil naturally.",
    features: [
      "Rich nitrogen, humic matter & peat moss lines",
      "15kg sealed woven sack",
      "2-week post-harvest composting for safety",
      "Garden-ready, no further treatment needed",
      "Circular economy waste-to-value product",
    ],
    specs: [
      { label: "Weight", value: "15 kg per bag" },
      { label: "NPK Ratio", value: "2.0 - 1.5 - 1.8" },
      { label: "pH", value: "6.8 - 7.2" },
      { label: "Moisture", value: "≤ 40%" },
      { label: "Application", value: "Gardens, nurseries, farms" },
    ],
    unit: "Per Bag",
    price: 550,
    cta: "Add to Cart",
    image: "/images/shop/substrate-blocks.jpg",
    imageAlt: "Bags of organic spent mushroom compost ready for field use",
  },
  {
    id: "iot-sensor-kit",
    name: "Farm Starter IoT Microclimate Sensor Kit",
    category: "Grow Kits & Structures",
    badge: "JHUB Certified",
    badgeTone: "forest",
    rating: 5.0,
    reviews: "42 reviews",
    description:
      "Real-time substrate telemetry, ambient humidity & temp sensor hub with Safaricom IoT SIM.",
    longDescription:
      "Monitor your grow room conditions 24/7 with our JHUB-certified IoT sensor kit. The hub measures ambient temperature, humidity, CO₂ concentration, and substrate moisture in real-time, sending data to your phone via Safaricom's IoT SIM network. SMS alerts fire automatically when readings breach your configured thresholds - so you catch problems before they damage your crop. Powered by a solar panel with 14-day lithium battery backup for uninterrupted monitoring during outages.",
    features: [
      "Cellular 4G & SMS alert engine",
      "14-day lithium backup reserve",
      "Solar-powered with panel included",
      "Temperature, humidity, CO₂, moisture sensors",
      "Mobile dashboard via Safaricom IoT SIM",
    ],
    specs: [
      { label: "Connectivity", value: "Safaricom 4G IoT SIM" },
      { label: "Sensors", value: "Temp, humidity, CO₂, moisture" },
      { label: "Battery", value: "14-day lithium reserve" },
      { label: "Power", value: "Solar panel included" },
      { label: "Alerts", value: "SMS + push notifications" },
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
    description:
      "Steam-conditioned wheat straw and poultry-enriched organic compost. Balanced pH (7.2) for even colonization.",
    longDescription:
      "Our Phase II pasteurized substrate blocks are the foundation of a successful mushroom harvest. Each 20kg block is prepared from a precise blend of wheat straw and poultry manure, steam-conditioned at 60°C for 8 hours to eliminate competing organisms while preserving beneficial thermophilic bacteria. The result is a nutrient-rich, pathogen-free growing medium with optimal moisture (68%) and pH (7.2) for rapid and even Agaricus colonization.",
    features: [
      "High nitrogen formulation",
      "Pre-formed in 20kg breathable polyethylene block",
      "Steam-pasteurized at 60°C for 8 hours",
      "Optimal 68% moisture content",
      "pH-balanced at 7.2 for Agaricus",
    ],
    specs: [
      { label: "Weight", value: "20 kg per block" },
      { label: "Composition", value: "Wheat straw + poultry manure" },
      { label: "Moisture", value: "68%" },
      { label: "pH", value: "7.2" },
      { label: "Pasteurization", value: "60°C / 8 hours" },
    ],
    unit: "Per 20kg Block",
    price: 1200,
    cta: "Add to Cart",
    image: "/images/shop/substrate-blocks.jpg",
    imageAlt: "Stacked pasteurized substrate blocks in a warehouse",
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
];

export const featuredProductId = "button-grain-spawn";


/** Look up a product by its ID */
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/** Get related products (same category, excluding current) */
export function getRelatedProducts(product: Product, limit = 3): Product[] {
  const sameCategory = products.filter(
    (p) => p.category === product.category && p.id !== product.id,
  );
  // Fill remaining slots with other products if not enough in same category
  const others = products.filter(
    (p) => p.category !== product.category && p.id !== product.id,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

/* ── Reviews data (keyed by product ID) ── */
export const reviewsData: Record<string, ReviewItem[]> = {
  "smart-pumice-grow-kit": [
    {
      id: "r1",
      author: "James M.",
      location: "Kiambu County",
      rating: 5,
      date: "2026-09-15",
      title: "Best investment for my farm",
      body: "The pumice unit arrived fully assembled. Temperature stays at 20°C even during the hottest afternoons. My first flush yielded 180kg - far beyond expectations. The SmartMushroom team guided me through the entire setup process.",
      verified: true,
    },
    {
      id: "r2",
      author: "Grace W.",
      location: "Murang'a",
      rating: 5,
      date: "2026-08-22",
      title: "Revolutionary growing structure",
      body: "I was using a converted shipping container before - electricity bills were insane. This pumice unit cut my cooling costs by almost 70%. The volcanic stone blocks truly work. Highly recommend for serious growers.",
      verified: true,
    },
    {
      id: "r3",
      author: "Peter K.",
      location: "Nakuru",
      rating: 4,
      date: "2026-07-30",
      title: "Solid build quality",
      body: "Very well constructed. The only reason I give 4 stars is because delivery took slightly longer than promised due to road conditions. But the unit itself is fantastic - 3 flushes in and no issues.",
      verified: true,
    },
  ],
  "button-grain-spawn": [
    {
      id: "r4",
      author: "Mary N.",
      location: "Juja",
      rating: 5,
      date: "2026-10-01",
      title: "Fastest colonization I've seen",
      body: "Full colonization in just 15 days! The mycelium was thick, vigorous, and pure white. Zero contamination across 20 bags. This is the best spawn available in Kenya, hands down.",
      verified: true,
    },
    {
      id: "r5",
      author: "David O.",
      location: "Thika",
      rating: 5,
      date: "2026-09-18",
      title: "Consistent quality every order",
      body: "I've been ordering monthly for 6 months now. Every single bag has been perfectly colonized with zero contamination. The JKUAT certification really shows in the quality. My yields have increased by 40% since switching.",
      verified: true,
    },
    {
      id: "r6",
      author: "Sarah A.",
      location: "Nairobi",
      rating: 4,
      date: "2026-09-05",
      title: "Great spawn, reliable results",
      body: "Good colonization rate and clean mycelium. Would love to see larger bag options (maybe 10kg) for commercial-scale operations. But for the price, this is unbeatable in the market.",
      verified: true,
    },
    {
      id: "r7",
      author: "John K.",
      location: "Limuru",
      rating: 5,
      date: "2026-08-12",
      title: "Perfect for beginners too",
      body: "First time growing mushrooms and this spawn made it easy. Clear instructions came with the bag, and the SmartMushroom WhatsApp support helped me through my first inoculation. Got beautiful pins within 3 weeks!",
      verified: true,
    },
  ],
  "fresh-gourmet-button": [
    {
      id: "r8",
      author: "Chef Amina",
      location: "Westlands, Nairobi",
      rating: 5,
      date: "2026-10-10",
      title: "Restaurant-quality, every time",
      body: "I order 10 punnets weekly for my restaurant. The freshness is unmatched - firm caps, clean gills, and they last almost a week in our walk-in cooler. My mushroom risotto has never been better. These are the real deal.",
      verified: true,
    },
    {
      id: "r9",
      author: "Lucy W.",
      location: "Karen",
      rating: 5,
      date: "2026-09-28",
      title: "So much better than supermarket",
      body: "Night and day difference compared to what you get at the supermarket. These mushrooms are firm, white, and taste incredible. The cold-chain delivery keeps them perfect. My family is now hooked on mushroom stir-fry!",
      verified: true,
    },
    {
      id: "r10",
      author: "Tom M.",
      location: "Kileleshwa",
      rating: 4,
      date: "2026-09-15",
      title: "Fresh and delicious",
      body: "Great quality mushrooms. Picked up at the Juja hub and they were perfectly chilled. Only wish there were more pickup points closer to the CBD. But quality-wise, absolutely top-notch.",
      verified: true,
    },
  ],
  "organic-spent-compost": [
    {
      id: "r11",
      author: "Florence M.",
      location: "Ngong",
      rating: 5,
      date: "2026-09-20",
      title: "My tomatoes have never been better",
      body: "Used this as a soil amendment for my vegetable garden and the results are incredible. My tomatoes are twice the size and the soil retains moisture much better. Will definitely be ordering more bags.",
      verified: true,
    },
    {
      id: "r12",
      author: "Robert K.",
      location: "Athi River",
      rating: 5,
      date: "2026-08-15",
      title: "Excellent soil amendment",
      body: "Rich, dark, and well-composted. Mixed it into my flower beds and the improvement was visible within 2 weeks. Great that SmartMushroom is recycling their growing media into useful products.",
      verified: true,
    },
  ],
  "iot-sensor-kit": [
    {
      id: "r16",
      author: "Anthony M.",
      location: "Naivasha",
      rating: 5,
      date: "2026-10-08",
      title: "Saved my entire crop",
      body: "Got an SMS alert at 2am that humidity had dropped below 80%. Rushed to the farm and found a misting line had failed. Without this sensor kit, I would have lost an entire flush worth KSh 50,000. Pays for itself instantly.",
      verified: true,
    },
    {
      id: "r17",
      author: "Caroline K.",
      location: "Kitale",
      rating: 5,
      date: "2026-09-25",
      title: "Peace of mind for remote farming",
      body: "My grow room is 40km from my home. This kit lets me monitor everything from my phone. The Safaricom SIM works perfectly even in rural areas. Solar panel keeps it running during power outages. Absolutely essential.",
      verified: true,
    },
    {
      id: "r18",
      author: "Joseph L.",
      location: "Nyeri",
      rating: 5,
      date: "2026-09-12",
      title: "Professional-grade monitoring",
      body: "The dashboard is clean and easy to understand. Love being able to see historical trends - helped me optimize my ventilation schedule. Battery backup lasted through a 3-day power cut without issues.",
      verified: true,
    },
  ],
  "pasteurized-substrate": [
    {
      id: "r19",
      author: "Wilson M.",
      location: "Thika",
      rating: 5,
      date: "2026-10-03",
      title: "Perfect substrate, zero contamination",
      body: "Tried making my own substrate before and kept getting green mould. These blocks are perfectly pasteurized - 30 blocks, zero contamination. The moisture content is spot-on and colonization was fast and even.",
      verified: true,
    },
    {
      id: "r20",
      author: "Elizabeth N.",
      location: "Ruiru",
      rating: 4,
      date: "2026-09-18",
      title: "Reliable and consistent",
      body: "Good quality substrate that consistently produces healthy mycelium growth. Saves me hours of substrate preparation. Would appreciate bulk pricing for orders above 50 blocks.",
      verified: true,
    },
    {
      id: "r21",
      author: "Stephen O.",
      location: "Machakos",
      rating: 5,
      date: "2026-08-28",
      title: "Commercial-grade quality",
      body: "Running 200 blocks per cycle now and the consistency is remarkable. Every block has the same moisture, same pH, same results. This is what commercial mushroom farming needs - reliable inputs.",
      verified: true,
    },
  ],
};
