import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { ProjectMockup } from "./ProjectMockup";
import { site } from "@/content/site";
export function ProjectsSection() {
  return (
    <section className="projects section wrap" id="proyectos">
      <p className="eyebrow">{site.projects.label}</p>
      <div className="section-heading">
        <h2>{site.projects.title}</h2>
        <p>{site.projects.intro}</p>
      </div>
      <div className="project-grid">
        {projects.map((project, i) => (
          <article className="project-card" key={project.slug}>
            <Link
              href={`/proyectos/${project.slug}`}
              className="project-image-link"
              aria-label={`${site.projects.link}: ${project.name}`}
            >
              <ProjectMockup project={project} />
              <span className="project-concept">{site.projects.concept}</span>
              <span className="project-open">
                <ArrowUpRight size={21} />
              </span>
            </Link>
            <div className="project-meta">
              <div>
                <p className="micro">
                  0{i + 1} / {project.sector}
                </p>
                <h3>
                  <Link href={`/proyectos/${project.slug}`}>
                    {project.name}
                    <ArrowUpRight size={21} aria-hidden="true" />
                  </Link>
                </h3>
              </div>
              <p>{project.summary}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="project-note">{site.projects.note}</p>
    </section>
  );
}
