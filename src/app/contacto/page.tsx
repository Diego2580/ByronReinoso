import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { Diagnostic } from "@/features/booking/components/Diagnostic";
import { FAQSection } from "@/features/booking/components/FAQSection";
import { site } from "@/content/site";
export const metadata: Metadata = {
  title: "Contacto y diagnóstico",
  description: site.pages.contact.description,
};
export default function ContactPage() {
  return (
    <main id="contenido">
      <PageIntro content={site.pages.contact} />
      <Diagnostic />
      <FAQSection />
    </main>
  );
}
