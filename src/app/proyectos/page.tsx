import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { ProjectsSection } from "@/features/projects/components/ProjectsSection";
import { ContactTeaser } from "@/features/booking/components/ContactTeaser";
import { site } from "@/content/site";
export const metadata: Metadata = {
  title: "Proyectos conceptuales",
  description: site.pages.projects.description,
};
export default function ProjectsPage() {
  return (
    <main id="contenido">
      <PageIntro content={site.pages.projects} />
      <ProjectsSection />
      <ContactTeaser />
    </main>
  );
}
