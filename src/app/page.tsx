import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DigitalExperience } from "@/features/hero-3d/DigitalExperience";
import { ServicesSection } from "@/features/services/components/ServicesSection";
import { AboutSection } from "@/features/about/components/AboutSection";
import { ProjectsSection } from "@/features/projects/components/ProjectsSection";
import { ContactTeaser } from "@/features/booking/components/ContactTeaser";
import { site } from "@/content/site";
export default function Home() {
  return (
    <main id="contenido">
      <DigitalExperience />
      <ServicesSection />
      <ProjectsSection />
      <div className="wrap projects-index-link">
        <Link className="text-link" href="/proyectos">
          {site.allProjects}
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </div>
      <AboutSection />
      <ContactTeaser />
    </main>
  );
}
