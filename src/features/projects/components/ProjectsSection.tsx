import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { ProjectMockup } from "./ProjectMockup";
import { site } from "@/content/site";
import s from "./projects.module.css";
export function ProjectsSection({ showIntro = true }: { showIntro?: boolean }) {
  return (
    <section
      className={`${s.gallery} ${showIntro ? "" : s.compact}`}
      id="proyectos"
      aria-labelledby="projects-title"
    >
      <div className="wrap">
        {showIntro ? (
          <div className={s.intro}>
            <div>
              <p className={s.label}>{site.projects.label}</p>
              <h2 id="projects-title">
                Ideas claras.
                <br />
                <span>Presencias distintas.</span>
              </h2>
            </div>
            <p>
              Dos conceptos propios para explorar cómo una estrategia de marca
              puede tomar forma en la web.
            </p>
          </div>
        ) : (
          <h2 id="projects-title" className={s.visuallyHidden}>
            Proyectos seleccionados
          </h2>
        )}
        <div className={s.collection}>
          {projects.map((project, i) => (
            <article className={s.project} key={project.slug}>
              <div className={s.projectTop}>
                <span>
                  0{i + 1} / {project.sector}
                </span>
                <span>Estudio conceptual</span>
              </div>
              <Link
                href={`/proyectos/${project.slug}`}
                className={s.artLink}
                aria-label={`Explorar concepto: ${project.name}`}
              >
                <div className={s.reveal} data-project-reveal>
                  <ProjectMockup project={project} large />
                </div>
                <span className={s.open} aria-hidden="true">
                  <ArrowUpRight size={26} />
                </span>
              </Link>
              <div className={s.meta}>
                <h3>
                  <Link href={`/proyectos/${project.slug}`}>
                    {project.name}
                    <ArrowUpRight size={28} aria-hidden="true" />
                  </Link>
                </h3>
                <div>
                  <p>{project.descriptor}</p>
                  <span>{project.summary}</span>
                  <Link
                    href={`/proyectos/${project.slug}`}
                    className={s.caseLink}
                  >
                    Explorar las decisiones{" "}
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className={s.galleryFoot}>
          <p className={s.disclaimer}>{site.projects.note}</p>
          {showIntro && (
            <Link href="/proyectos" className={s.caseLink}>
              Ver todos los proyectos{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
