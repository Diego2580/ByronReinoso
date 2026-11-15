import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { BookingLink } from "@/components/ui/BookingLink";
import { ProjectMockup } from "@/features/projects/components/ProjectMockup";
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
  return {
    title: project
      ? `${project.name} — Proyecto conceptual`
      : "Proyecto no encontrado",
    description: project?.summary,
  };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return (
    <main id="contenido" className="project-detail wrap">
      <Link href="/proyectos" className="text-link">
        <ArrowLeft size={17} />
        {site.projects.label}
      </Link>
      <div className="detail-heading">
        <p className="eyebrow">
          {site.projects.concept} / {project.sector}
        </p>
        <h1>
          {project.name}
          <span className="champagne">.</span>
        </h1>
        <p>{project.descriptor}</p>
      </div>
      <ProjectMockup project={project} large />
      <div className="detail-grid section">
        <p className="eyebrow">{site.projects.detailLabel}</p>
        <div>
          <h2>{site.projects.objective}</h2>
          <p>{project.objective}</p>
        </div>
        <div>
          <h2>{site.projects.scope}</h2>
          <ul>
            {project.scope.map((item) => (
              <li key={item}>
                <ArrowUpRight size={16} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="detail-disclaimer">{site.projects.note}</p>
      <div className="detail-cta">
        <h2>{site.projects.next}</h2>
        <BookingLink />
      </div>
    </main>
  );
}
