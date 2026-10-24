export type NavLink = {
  label: string;
  href: string;
};

// Single source of truth for every main page.
// Add a new page here and it shows up in the navbar and footer.
export const mainLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Shop & Services", href: "/shop" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy Notice", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Outgrower Terms", href: "/farmer-portal-access" },
];
