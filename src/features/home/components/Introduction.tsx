import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
export function Introduction() {
  return (
    <section className="intro section wrap" id="enfoque">
      <p className="eyebrow">{site.intro.label}</p>
      <div className="intro-grid">
        <h2>{site.intro.title}</h2>
        <div>
          <p className="lead">{site.intro.body}</p>
          <p className="body-copy">{site.intro.detail}</p>
        </div>
      </div>
      <div className="sector-strip">
        {site.intro.sectors.map((sector, i) => (
          <span key={sector}>
            <small>0{i + 1}</small>
            {sector}
            <ArrowUpRight size={16} aria-hidden="true" />
          </span>
        ))}
      </div>
    </section>
  );
}
