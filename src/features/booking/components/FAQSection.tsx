import { Plus } from "lucide-react";
import { faq } from "@/content/faq";
import { site } from "@/content/site";
export function FAQSection() {
  return (
    <section className="faq-section wrap section">
      <div>
        <p className="eyebrow">{site.faq.label}</p>
        <h2>{site.faq.title}</h2>
      </div>
      <div className="faq-list">
        {faq.map((item) => (
          <details key={item.question}>
            <summary>
              {item.question}
              <Plus size={18} aria-hidden="true" />
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
