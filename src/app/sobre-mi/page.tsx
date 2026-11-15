import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { AboutSection } from "@/features/about/components/AboutSection";
import { ContactTeaser } from "@/features/booking/components/ContactTeaser";
import { site } from "@/content/site";
export const metadata: Metadata = {
  title: "Sobre Byron",
  description: site.pages.about.description,
};
export default function AboutPage() {
  return (
    <main id="contenido">
      <PageIntro content={site.pages.about} />
      <AboutSection />
      <ContactTeaser />
    </main>
  );
}
