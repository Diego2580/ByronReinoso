import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/content/site";
import { fontVariables } from "@/lib/fonts";
import { PageMotion } from "@/components/ui/PageMotion";
import "@/styles/globals.css";
import "@/styles/refinements.css";
import "@/styles/tokens.css";
export const metadata: Metadata = {
  title: { default: site.title, template: "%s | Byron Reinoso" },
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    locale: "es_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={fontVariables}>
      <body id="top">
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <Header />
        {children}
        <Footer />
        <PageMotion />
      </body>
    </html>
  );
}
