import { ArrowUpRight, MessageCircle, Mail } from "lucide-react";
import { site, contact } from "@/content/site";
import { BookingLink } from "@/components/ui/BookingLink";
export function Diagnostic() {
  const whatsapp = contact.whatsappNumber.replace(/\D/g, "");
  return (
    <section id="diagnostico" className="diagnostic">
      <div className="wrap diagnostic-grid">
        <div>
          <p className="eyebrow">
            {site.diagnostic.label}
            <ArrowUpRight size={17} aria-hidden="true" />
          </p>
          <h2>{site.diagnostic.title}</h2>
          <p className="diagnostic-body">{site.diagnostic.body}</p>
          <p className="micro">{site.diagnostic.duration}</p>
        </div>
        <div className="booking-panel">
          {contact.calendarUrl ? (
            <>
              <p>{site.diagnostic.ready}</p>
              <BookingLink className="light-button" />
            </>
          ) : (
            <>
              <span className="status-dot" />
              <h3>{site.diagnostic.pending}</h3>
              <p>{site.diagnostic.pendingBody}</p>
            </>
          )}
          {whatsapp && (
            <a
              className="contact-link"
              href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`}
            >
              <MessageCircle size={18} />
              {site.diagnostic.whatsapp}
              <ArrowUpRight size={16} />
            </a>
          )}
          {contact.email && (
            <a className="contact-link" href={`mailto:${contact.email}`}>
              <Mail size={18} />
              {site.diagnostic.email}
              <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
