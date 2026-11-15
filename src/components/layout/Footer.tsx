import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { site } from "@/content/site";
export function Footer() {
  return (
    <footer className="footer wrap">
      <div className="footer-main">
        <Link href="/" className="footer-name">
          {site.name}
          <span>{site.descriptor}</span>
        </Link>
        <nav aria-label="Navegación del pie">
          {site.nav.map((item) => (
            <Link href={item.href} key={item.label}>
              {item.label}
            </Link>
          ))}
        </nav>
        <a href="#top" className="back-top" aria-label={site.footer.top}>
          <ArrowUp size={20} />
        </a>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>{site.location}</span>
        <span>{site.footer.credit}</span>
      </div>
    </footer>
  );
}
