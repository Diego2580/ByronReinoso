import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { caseStudies } from "@/content/case-studies";
import { site } from "@/content/site";
import { BookingLink } from "@/components/ui/BookingLink";
import { ProjectMockup } from "@/features/projects/components/ProjectMockup";
import { MobilePreview } from "@/features/projects/components/MobilePreview";
import s from "@/features/projects/components/projects.module.css";
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: "Proyecto no encontrado" };
  return {
    title: `${project.name} — Proyecto conceptual`,
    description: project.summary,
    openGraph: {
      title: `${project.name} — Estudio conceptual de Byron Reinoso`,
      description: project.summary,
    },
  };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  const project = projects[index];
  if (!project) notFound();
  const study = caseStudies[project.slug],
    next = projects[(index + 1) % projects.length];
  return (
    <main id="contenido" className={`${s.case} wrap`}>
      <Link href="/proyectos" className={s.back}>
        <ArrowLeft size={17} aria-hidden="true" />
        Todos los proyectos
      </Link>
      <header className={s.caseHeader}>
        <p className={s.label}>PROYECTO CONCEPTUAL / {project.sector}</p>
        <h1>
          {project.name}
          <span>.</span>
        </h1>
        <p>{project.descriptor}</p>
      </header>
      <div className={s.caseHero} data-project-reveal>
        <ProjectMockup project={project} large />
      </div>
      <div className={s.brief}>
        <section aria-labelledby="premise-title">
          <p className={s.label}>01 / EL PUNTO DE PARTIDA</p>
          <h2 id="premise-title">Una idea con dirección.</h2>
          <p>{study.premise}</p>
          <p>{project.objective}</p>
        </section>
        <section aria-labelledby="scope-title">
          <p className={s.label}>EL ALCANCE DEL CONCEPTO</p>
          <h2 id="scope-title">Qué explora.</h2>
          <ul className={s.scope}>
            {project.scope.map((item) => (
              <li key={item}>
                <ArrowUpRight size={17} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
      <section className={s.decisions} aria-labelledby="decisions-title">
        <p className={s.label}>02 / DECISIONES DE DISEÑO</p>
        <h2 id="decisions-title">Cada elección tiene un porqué.</h2>
        <div className={s.decisionGrid}>
          {study.decisions.map((decision, i) => (
            <article key={decision.title}>
              <small>0{i + 1}</small>
              <h3>{decision.title}</h3>
              <p>{decision.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className={s.responsive} aria-labelledby="mobile-title">
        <div className={s.responsiveCopy}>
          <p className={s.label}>03 / DE ESCRITORIO A MÓVIL</p>
          <h2 id="mobile-title">
            La misma intención.
            <br />
            Otra escala.
          </h2>
          <p>{study.mobile}</p>
          <div className={s.palette} aria-label="Paleta del concepto">
            {study.palette.map((swatch) => (
              <div className={s.swatch} key={swatch.color}>
                <i
                  style={{ backgroundColor: swatch.color }}
                  aria-hidden="true"
                />
                <span>{swatch.name}</span>
                <code>{swatch.color}</code>
              </div>
            ))}
          </div>
        </div>
        <MobilePreview project={project} />
      </section>
      <section className={s.journey} aria-labelledby="journey-title">
        <p className={s.label} id="journey-title">
          04 / RECORRIDO PROPUESTO
        </p>
        <ol>
          {study.journey.map((step, i) => (
            <li key={step}>
              <span>0{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </section>
      <p className={s.disclaimer}>
        {site.projects.note} Las vistas muestran una propuesta de interfaz; no
        son una demostración de integraciones ni de resultados comerciales.
      </p>
      <nav className={s.next} aria-label="Siguiente proyecto">
        <div>
          <p className={s.label}>SIGUIENTE EXPLORACIÓN</p>
          <h2>{next.name}</h2>
        </div>
        <Link href={`/proyectos/${next.slug}`}>
          Descubrir {next.name}
          <ArrowUpRight size={24} aria-hidden="true" />
        </Link>
      </nav>
      <section className={s.contact} aria-label="Conversar sobre tu proyecto">
        <h2>¿Una dirección así para tu negocio?</h2>
        <BookingLink />
      </section>
    </main>
  );
}
