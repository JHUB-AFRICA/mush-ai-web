import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-outfit", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-jakarta", display: "swap" });

export const metadata: Metadata = {
  title: "SmartMushroom — Smarter mushroom farming, powered by data",
  description:
    "Sensor-monitored button mushroom farming in Kenya. Shop fresh mushrooms, grow kits and spawn.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${jakarta.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
        />
      </head>
      <body className="bg-background font-body-md text-body-md text-on-surface antialiased">
        <Header />
        <main className="w-full pt-20 bg-background">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
