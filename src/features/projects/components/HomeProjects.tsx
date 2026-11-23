"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { demos } from "./homeProjectsData";
import s from "./homeProjects.module.css";

export function HomeProjects() {
  const [index, setIndex] = useState(0);
  const start = useRef<number | null>(null);
  const dragged = useRef(false);
  const move = (step: number) => setIndex((value) => Math.max(0, Math.min(demos.length - 1, value + step)));
  return (
    <section className={s.section} id="proyectos" aria-labelledby="projects-title">
      <div className="wrap">
        <div className={s.heading}>
          <div><p className={s.label}>04 / PROYECTOS SELECCIONADOS</p><h2 id="projects-title">Ideas claras.<br /><span>Presencias distintas.</span></h2></div>
          <p>Dos conceptos propios para explorar cómo una estrategia de marca puede tomar forma en la web.</p>
        </div>
        <p className={s.notice}>Ejemplos visuales de demostración · no representan clientes reales.</p>
        <div className={s.viewport} onPointerDown={(event) => { start.current = event.clientX; dragged.current = false; event.currentTarget.setPointerCapture(event.pointerId); }} onPointerUp={(event) => { if (start.current !== null) { const distance = event.clientX - start.current; if (Math.abs(distance) > 40) { dragged.current = true; move(distance < 0 ? 1 : -1); } } start.current = null; }} onPointerCancel={() => { start.current = null; }}>
          <div className={s.track}>
            {demos.map((project, i) => (
              <article className={s.slide} key={project.id} data-position={Math.max(-3, Math.min(3, i - index))} aria-hidden={i !== index}>
                {project.href ? <Link href={project.href} tabIndex={i === index ? 0 : -1} onClick={(event) => { if (dragged.current) event.preventDefault(); }}><Image src={project.image} alt={`Ejemplo visual: ${project.category}`} width={1200} height={760} draggable={false} /></Link> : <Image src={project.image} alt={`Ejemplo visual: ${project.category}`} width={1200} height={760} draggable={false} />}
              </article>
            ))}
          </div>
        </div>
        <div className={s.meta} aria-live="polite"><h3>{demos[index].title}</h3><p>{demos[index].category}</p></div>
        <div className={s.controls}>
          <button type="button" onClick={() => move(-1)} disabled={index === 0} aria-label="Proyecto anterior">←</button>
          <span aria-live="polite">{String(index + 1).padStart(2, "0")} / {String(demos.length).padStart(2, "0")}</span>
          <button type="button" onClick={() => move(1)} disabled={index === demos.length - 1} aria-label="Proyecto siguiente">→</button>
        </div>
        <Link href="/proyectos" className={s.all}>Ver todos los proyectos ↗</Link>
      </div>
    </section>
  );
}
