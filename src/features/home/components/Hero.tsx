import Link from "next/link";
import { ArrowDown, ArrowDownRight, MapPin } from "lucide-react";
import { site } from "@/content/site";
import { BookingLink } from "@/components/ui/BookingLink";
export function Hero() {
  return (
    <section className="hero wrap">
      <div className="hero-light" aria-hidden="true" />
      <div className="hero-top">
        <p className="eyebrow">
          <span className="tiny-line" />
          {site.hero.eyebrow}
        </p>
        <p className="location">
          <MapPin size={13} aria-hidden="true" />
          {site.location}
        </p>
      </div>
      <h1 aria-label={site.hero.title} className="hero-title">
        <span>{site.hero.first}</span>
        <span className="muted-title">{site.hero.second}</span>
        <span className="seller-line">
          {site.hero.third}
          <span className="title-period" aria-hidden="true" />
        </span>
      </h1>
      <div className="hero-bottom">
        <div className="hero-copy">
          <p>{site.hero.body}</p>
          <div className="hero-actions">
            <BookingLink />
            <Link href="/proyectos" className="text-link">
              {site.hero.secondary}
              <ArrowDownRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="brand-diagram" aria-hidden="true">
          <div className="diagram-label">
            <svg viewBox="0 0 32 32" className="brand-glyph" aria-hidden="true">
              <path
                data-brand-glyph
                d="M16 2 C20 6 26 12 30 16 C26 20 20 26 16 30 C12 26 6 20 2 16 C6 12 12 6 16 2 Z"
              />
            </svg>
            BR / {site.hero.graphicLabel}
          </div>
          <div className="diagram-track">
            {site.hero.graphic.map((label, i) => (
              <div className="diagram-node" key={label}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <small>{label}</small>
              </div>
            ))}
          </div>
          <p>{site.hero.graphicNote}</p>
        </div>
      </div>
      <div className="hero-end">
        <span>{site.hero.availability}</span>
        <a href="#enfoque">
          {site.hero.scroll}
          <ArrowDown size={14} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
