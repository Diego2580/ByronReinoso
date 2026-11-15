import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { ServicesSection } from "@/features/services/components/ServicesSection";
import { ExperienceSection } from "@/features/services/components/ExperienceSection";
import { ContactTeaser } from "@/features/booking/components/ContactTeaser";
import { site } from "@/content/site";
export const metadata: Metadata = {
  title: "Soluciones de diseño web",
  description: site.pages.solutions.description,
};
export default function SolutionsPage() {
  return (
    <main id="contenido">
      <PageIntro content={site.pages.solutions} />
      <ServicesSection />
      <ExperienceSection />
      <ContactTeaser />
    </main>
  );
}
