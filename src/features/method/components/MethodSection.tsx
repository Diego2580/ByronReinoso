import {
  Compass,
  Layers3,
  Code2,
  CheckCheck,
  ArrowUpRight,
} from "lucide-react";
import { site } from "@/content/site";
import { BookingLink } from "@/components/ui/BookingLink";
import s from "./method.module.css";
const icons = [Compass, Layers3, Code2, CheckCheck];
export function MethodSection() {
  return (
    <section id="metodo" className={s.section} aria-labelledby="method-title">
      <div className="wrap">
        <div className={s.heading}>
          <div>
            <p className={s.label}>{site.method.label}</p>
            <h2 id="method-title">
              Cuatro pasos.
              <br />
              <span>Una dirección clara.</span>
            </h2>
          </div>
          <div className={s.headingCopy}>
            <p>
              De entender tu marca a lanzar una web con intención. Un proceso
              compartido, con decisiones y momentos de revisión en cada etapa.
            </p>
            <span>ESTRATEGIA → DISEÑO → DESARROLLO → ENTREGA</span>
          </div>
        </div>
        <div className={s.timeline} data-method-timeline>
          <svg
            className={s.track}
            viewBox="0 0 2 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M1 0 V100" />
            <path d="M1 0 V100" pathLength="1" data-method-progress />
          </svg>
          <ol className={s.steps}>
            {site.method.steps.map((step, i) => {
              const Icon = icons[i];
              return (
                <li key={step.title} className={s.step} data-method-step>
                  <span className={s.number} aria-hidden="true">
                    0{i + 1}
                  </span>
                  <div className={s.stepCopy}>
                    <span className={s.icon} aria-hidden="true">
                      <Icon size={23} />
                    </span>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                  <div className={s.outcome}>
                    <span className={s.label}>LO QUE DEFINIMOS</span>
                    <p>{step.output}</p>
                    <div className={s.review}>
                      <ArrowUpRight size={17} aria-hidden="true" />
                      <span>{step.review}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
        <div className={s.start}>
          <div>
            <p className={s.label}>EL PRIMER PASO ES CONVERSAR</p>
            <h3>Empecemos por entender tu negocio.</h3>
            <p>
              Un diagnóstico de 15 a 20 minutos para conocer tu punto de
              partida.
            </p>
          </div>
          <BookingLink />
        </div>
        <p className={s.note}>
          El alcance, los plazos, las herramientas y el acompañamiento se
          acuerdan en cada propuesta.
        </p>
      </div>
    </section>
  );
}
