import { BookingLink } from "@/components/ui/BookingLink";
import { site } from "@/content/site";
export function ContactTeaser() {
  return (
    <section className="contact-teaser">
      <div className="wrap">
        <div>
          <h2>{site.contactTeaser.title}</h2>
          <p>{site.contactTeaser.body}</p>
        </div>
        <BookingLink className="light-button" />
      </div>
    </section>
  );
}
