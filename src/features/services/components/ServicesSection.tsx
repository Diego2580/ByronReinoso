import { ArrowDownRight } from "lucide-react";
import { services } from "@/content/services";
import { BookingLink } from "@/components/ui/BookingLink";
import { site } from "@/content/site";
export function ServicesSection() {
  return (
    <section id="soluciones" className="services-section">
      <div className="wrap section">
        <p className="eyebrow">{site.services.label}</p>
        <div className="section-heading">
          <h2>{site.services.title}</h2>
          <p>{site.services.body}</p>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <article className="service" key={service.number}>
              <div className="service-top">
                <span>{service.number}</span>
                <ArrowDownRight size={23} aria-hidden="true" />
              </div>
              <p className="micro">{service.kind}</p>
              <h3>{service.title}</h3>
              <p className="service-body">{service.body}</p>
              <p className="service-detail">{service.detail}</p>
              <div className="service-tags">
                {service.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <BookingLink className="service-link" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
