import { DigitalExperience } from "@/features/hero-3d/DigitalExperience";
import { ServicesSection } from "@/features/services/components/ServicesSection";
import { AboutSection } from "@/features/about/components/AboutSection";
import { MethodSection } from "@/features/method/components/MethodSection";
import { ProjectsSection } from "@/features/projects/components/ProjectsSection";
import { ContactTeaser } from "@/features/booking/components/ContactTeaser";
export default function Home() {
  return (
    <main id="contenido">
      <DigitalExperience />
      <ServicesSection />
      <ProjectsSection />
      <MethodSection />
      <AboutSection />
      <ContactTeaser />
    </main>
  );
}
