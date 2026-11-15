import { Experience } from "@/features/home/components/Experience";
import { site } from "@/content/site";
export function ExperienceSection() {
  return (
    <section
      className="experience-section wrap section"
      aria-labelledby="experience-title"
    >
      <div className="experience-copy">
        <p className="eyebrow">{site.experience.label}</p>
        <h2 id="experience-title">{site.experience.title}</h2>
        <p>{site.experience.body}</p>
        <p className="experience-note">{site.experience.note}</p>
      </div>
      <Experience />
    </section>
  );
}
