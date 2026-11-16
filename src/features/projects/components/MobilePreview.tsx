import type { Project } from "@/content/projects";
import s from "./projects.module.css";
export function MobilePreview({ project }: { project: Project }) {
  return (
    <div
      className={`${s.mobileStage} ${project.theme === "coffee" ? s.coffee : s.architecture}`}
      role="img"
      aria-label={`Estudio de interfaz móvil conceptual de ${project.name}`}
    >
      <div className={s.device} aria-hidden="true">
        <div className={s.deviceSpeaker} />
        <div className={s.mobileNav}>
          <b>{project.mock.logo}</b>
          <span>☰</span>
        </div>
        <span className={s.mobileEyebrow}>{project.mock.nav}</span>
        <strong className={s.mobileTitle}>{project.mock.title}</strong>
        <div className={s.mobileObject}>
          {project.theme === "coffee" ? (
            <span className={s.cup} />
          ) : (
            <span className={s.house} />
          )}
        </div>
        <p>{project.mock.body}</p>
        <span className={s.mobileButton}>{project.mock.cta} ↗</span>
        <div className={s.mobileFoot}>{project.mock.caption}</div>
      </div>
    </div>
  );
}
