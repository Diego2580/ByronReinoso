import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/features/home/components/Hero";
import { Introduction } from "@/features/home/components/Introduction";
import { ProjectsSection } from "@/features/projects/components/ProjectsSection";
import { ContactTeaser } from "@/features/booking/components/ContactTeaser";
import { site } from "@/content/site";
export default function Home() {
  return (
    <main id="contenido">
      <Hero />
      <Introduction />
      <section className="explore-section wrap section">
        <p className="eyebrow">{site.explore.label}</p>
        <h2>{site.explore.title}</h2>
        <div className="explore-grid">
          {site.explore.links.map((item, i) => (
            <Link className="explore-card" href={item.href} key={item.href}>
              <span className="micro">
                0{i + 1}
                <ArrowUpRight size={20} aria-hidden="true" />
              </span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </Link>
          ))}
        </div>
      </section>
      <ProjectsSection />
      <div className="wrap projects-index-link">
        <Link className="text-link" href="/proyectos">
          {site.allProjects}
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </div>
      <ContactTeaser />
    </main>
  );
}
