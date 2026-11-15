import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
export function AboutSection() {
  return (
    <section className="about-section" id="sobre-mi">
      <div className="wrap about-grid section">
        <div className="about-graphic" aria-hidden="true">
          <span className="micro">BR / UNA FORMA DE VER LAS COSAS</span>
          <div className="monogram">
            br<span>.</span>
          </div>
          <div className="about-years">
            <strong>10</strong>
            <span>{site.about.years}</span>
          </div>
          <span className="micro">{site.about.mark}</span>
        </div>
        <div className="about-copy">
          <p className="eyebrow">{site.about.label}</p>
          <h2>{site.about.title}</h2>
          <p className="lead">{site.about.body}</p>
          <p>{site.about.detail}</p>
          <span className="about-sign">
            {site.about.sign}
            <ArrowUpRight size={20} aria-hidden="true" />
          </span>
        </div>
      </div>
    </section>
  );
}
