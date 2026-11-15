import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
export function ProjectMockup({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  return (
    <div
      className={`project-art ${project.theme} ${large ? "large-art" : ""}`}
      aria-label={`Vista de interfaz conceptual de ${project.name}`}
      role="img"
    >
      <div className="mock-window">
        <div className="mock-browser">
          <i />
          <i />
          <i />
          <span>{project.name.toLowerCase()} / concepto</span>
        </div>
        <div className="mock-content">
          <div className="mock-nav">
            <b>{project.mock.logo}</b>
            <small>{project.mock.nav}</small>
            <span>↗</span>
          </div>
          <div className="mock-body">
            <div className="mock-copy">
              <small>01 / {project.mock.caption}</small>
              <strong>{project.mock.title}</strong>
              <p>{project.mock.body}</p>
              <span className="mock-cta">
                {project.mock.cta}
                <ArrowUpRight size={10} />
              </span>
            </div>
            <div className="mock-object" aria-hidden="true">
              {project.theme === "architecture" ? (
                <div className="building">
                  <div className="building-slab slab-one" />
                  <div className="building-slab slab-two" />
                  <div className="building-glass" />
                  <div className="building-pillar" />
                </div>
              ) : (
                <div className="coffee-still">
                  <div className="coffee-orbit" />
                  <div className="coffee-saucer" />
                  <div className="coffee-handle" />
                  <div className="coffee-cup">
                    <div className="coffee-liquid">
                      <span />
                    </div>
                  </div>
                  <div className="coffee-bean bean-one" />
                  <div className="coffee-bean bean-two" />
                </div>
              )}
            </div>
          </div>
          <div className="mock-foot">
            <span>{project.mock.caption}</span>
            <span>— 01</span>
          </div>
        </div>
      </div>
    </div>
  );
}
