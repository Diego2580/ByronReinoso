import { DigitalExperience } from "@/features/hero-3d/DigitalExperience";
import { ServicesSection } from "@/features/services/components/ServicesSection";
import { AboutSection } from "@/features/about/components/AboutSection";
import { HomeMethod } from "@/features/method/components/HomeMethod";
import { HomeProjects } from "@/features/projects/components/HomeProjects";
import { ContactTeaser } from "@/features/booking/components/ContactTeaser";
export default function Home() {
  return (
    <main id="contenido">
      <DigitalExperience />
      <ServicesSection home />
      <HomeProjects />
      <HomeMethod />
      <AboutSection />
      <ContactTeaser />
    </main>
  );
}
