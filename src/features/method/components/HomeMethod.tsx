"use client";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { BookingLink } from "@/components/ui/BookingLink";
import s from "./homeMethod.module.css";
const names = ["Descubrir", "Definir", "Diseñar", "Lanzar"];
export function HomeMethod() {
  const journey = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0), [sticky, setSticky] = useState(false);
  const lastScroll = useRef(0);
  const [direction, setDirection] = useState("down");
  useEffect(() => {
    const query = matchMedia("(min-width: 280px) and (min-height: 480px)");
    let frame = 0, fitFrame = 0;
    const update = () => {
      frame = 0;
      const element = journey.current, panel = element?.firstElementChild as HTMLElement | null;
      if (!element || !panel || !query.matches) return;
      const distance = element.offsetHeight - panel.offsetHeight;
      const top = parseFloat(getComputedStyle(panel).top) || 0;
      const progress = Math.max(0, Math.min(1, (top - element.getBoundingClientRect().top) / Math.max(distance, 1)));
      if (window.scrollY !== lastScroll.current) setDirection(window.scrollY > lastScroll.current ? "down" : "up");
      lastScroll.current = window.scrollY;
      setActive(Math.min(3, Math.floor(progress * 4)));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const mode = () => {
      setSticky(query.matches);
      cancelAnimationFrame(fitFrame);
      fitFrame = requestAnimationFrame(() => {
        const panel = journey.current?.firstElementChild as HTMLElement | null;
        if (query.matches && panel && Array.from(panel.querySelectorAll("li")).some((step) => step.scrollHeight > panel.clientHeight + 1)) setSticky(false);
        schedule();
      });
    };
    mode(); window.addEventListener("scroll", schedule, { passive: true }); window.addEventListener("resize", mode); window.visualViewport?.addEventListener("resize", mode); query.addEventListener("change", mode);
    return () => { window.removeEventListener("scroll", schedule); window.removeEventListener("resize", mode); window.visualViewport?.removeEventListener("resize", mode); query.removeEventListener("change", mode); cancelAnimationFrame(frame); cancelAnimationFrame(fitFrame); };
  }, []);
  return (
    <section id="metodo" className={s.section} aria-labelledby="home-method-title">
      <header className={s.intro}><p className={s.label}>{site.method.label}</p><h2 id="home-method-title">Cuatro pasos.<br />Una dirección clara.</h2><p>De entender tu marca a lanzar una web con intención. Un proceso compartido, con decisiones y momentos de revisión en cada etapa.</p></header>
      <div className={s.journey} ref={journey} data-sticky={sticky} data-direction={direction}>
        <div className={s.panel}><ol className={s.steps}>
          {site.method.steps.map((step, index) => (
            <li key={step.title} className={s.step} data-active={!sticky || active === index} aria-hidden={sticky && active !== index}>
              <div className={s.content}><div><p className={s.label}>0{index + 1} / {names[index]}</p><h3>{names[index]}</h3></div><div className={s.copy}><p className={s.subtitle}>{step.title}</p><p>{step.body}</p><p className={s.output}>{step.output}</p><p className={s.review}>{step.review}</p></div></div>
              <div className={s.progress}><span>0{index + 1} / 04</span><span aria-hidden="true" className={s.line}><i style={{ width: `${(index + 1) * 25}%` }} /></span></div>
            </li>
          ))}
        </ol></div>
      </div>
      <div className={s.end}><div><p className={s.label}>EL PRIMER PASO ES CONVERSAR</p><h3>Empecemos por entender tu negocio.</h3><p>Un diagnóstico de 15 a 20 minutos para conocer tu punto de partida.</p><p>El alcance, los plazos, las herramientas y el acompañamiento se acuerdan en cada propuesta.</p></div><BookingLink /></div>
    </section>
  );
}
