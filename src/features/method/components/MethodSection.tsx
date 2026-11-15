import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
export function MethodSection() {
  return (
    <section className="method section wrap" id="metodo">
      <p className="eyebrow">{site.method.label}</p>
      <div className="section-heading">
        <h2>{site.method.title}</h2>
        <p>{site.method.body}</p>
      </div>
      <div className="method-list">
        {site.method.steps.map((step, i) => (
          <article className="method-step" key={step.title}>
            <span className="step-number">0{i + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
            <ArrowUpRight size={18} aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  );
}
