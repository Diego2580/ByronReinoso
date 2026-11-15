import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { site } from "@/content/site";
export default function NotFound() {
  return (
    <main id="contenido" className="not-found wrap">
      <p className="eyebrow">{site.notFound.label}</p>
      <h1>{site.notFound.title}</h1>
      <p>{site.notFound.body}</p>
      <Link className="button" href="/">
        <ArrowLeft size={17} />
        {site.back}
      </Link>
    </main>
  );
}
