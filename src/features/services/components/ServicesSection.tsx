import Link from "next/link";
import { ArrowUpRight, Check, MoveUpRight } from "lucide-react";
import { services } from "@/content/services";
import { BookingLink } from "@/components/ui/BookingLink";
import s from "./services.module.css";
function ServiceVisual({ index }: { index: number }) {
  return (
    <div className={`${s.visual} ${s[`visual${index}`]}`} aria-hidden="true">
      {index === 0 ? (
        <div className={s.phone}>
          <div className={s.speaker} />
          <span className={s.mockLabel}>TU NEGOCIO, A UN TOQUE</span>
          <div className={s.mockTitle}>
            Aquí empieza
            <br />
            tu presencia.
          </div>
          <div className={s.mockLines} />
          <div className={s.mockAction}>
            Hablemos <ArrowUpRight size={14} />
          </div>
        </div>
      ) : index === 1 ? (
        <div className={s.browser}>
          <div className={s.browserBar}>
            <i />
            <i />
            <i />
            <span>Una web con dirección</span>
          </div>
          <div className={s.browserBody}>
            <span className={s.mockLabel}>UNA PROPUESTA CLARA</span>
            <div className={s.mockTitle}>
              De conocerte
              <br />a elegirte.
            </div>
            <div className={s.mockLines} />
            <div className={s.flow}>
              <span>Descubrir</span>
              <ArrowUpRight size={14} />
              <span>Conectar</span>
            </div>
          </div>
          <div className={s.inquiry}>
            <Check size={17} />
            <span>Un camino claro al contacto</span>
          </div>
        </div>
      ) : (
        <>
          <div className={s.orbits}>
            <span />
            <span />
            <span />
          </div>
          <span className={s.orbitLabel}>
            ESTRATEGIA → IDENTIDAD → EXPERIENCIA
          </span>
        </>
      )}
    </div>
  );
}
export function ServicesSection({ home = false }: { home?: boolean }) {
  return (
    <section
      id="soluciones"
      className={`${s.section} ${home ? s.home : ""}`}
      aria-labelledby="services-title"
    >
      <div className="wrap">
        <div className={s.heading}>
          <div>
            <p className={s.eyebrow}>{home ? "03" : "04"} / SOLUCIONES</p>
            <h2 id="services-title">
              Tres formas de crecer.
              <br />
              <span>Un punto de partida: tu marca.</span>
            </h2>
          </div>
          <p>
            Desde una presencia esencial hasta una experiencia inmersiva.
            Definimos el alcance después de entender tu negocio.
          </p>
        </div>
        <div className={s.grid}>
          {services.map((service, i) => (
            <article
              key={service.number}
              id={home ? undefined : ["presencia", "clientes", "experiencia"][i]}
              className={`${s.card} ${i === 2 ? s.immersive : ""}`}
            >
              <div className={s.cardCopy}>
                <div className={s.cardTop}>
                  <span>
                    0{i + 1} /{" "}
                    {i === 0
                      ? "CONECTAR"
                      : i === 1
                        ? "CONVENCER"
                        : "DIFERENCIAR"}
                  </span>
                  <MoveUpRight size={22} aria-hidden="true" />
                </div>
                <p className={s.kind}>{home ? ["Micro-landing", "Web corporativa", "Web inmersiva"][i] : service.kind}</p>
                <h3>{service.title}</h3>
                <p className={s.body}>{service.body}</p>
                {!home && <p className={s.detail}>{service.detail}</p>}
                {!home && <ul className={s.tags}>
                  {service.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>}
                {home ? (
                  <Link className={s.serviceLink} href={`/soluciones#${["presencia", "clientes", "experiencia"][i]}`}>Conocer {service.title} <ArrowUpRight size={16} aria-hidden="true" /></Link>
                ) : <BookingLink className={s.cta} />}
              </div>
              <ServiceVisual index={i} />
            </article>
          ))}
        </div>
        <div className={s.note}>
          <p>
            El diagnóstico define qué necesita tu negocio. Cada propuesta se
            cotiza a medida.
          </p>
          {home ? <BookingLink className={s.cta} /> : (
            <Link href="/soluciones">Explorar las soluciones <ArrowUpRight size={18} aria-hidden="true" /></Link>
          )}
        </div>
      </div>
    </section>
  );
}
