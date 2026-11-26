import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { TERMS } from "@/lib/legal/terms";

export const metadata: Metadata = {
  title: "Terms and Conditions | SmartMushroom",
  description: "The terms that govern your use of the SmartMushroom platform.",
};

export default function TermsPage() {
  return <LegalDocument doc={TERMS} />;
}
