import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { MethodSection } from "@/features/method/components/MethodSection";
import { ContactTeaser } from "@/features/booking/components/ContactTeaser";
import { site } from "@/content/site";
export const metadata: Metadata = {
  title: "Método de trabajo",
  description: site.pages.method.description,
};
export default function MethodPage() {
  return (
    <main id="contenido">
      <PageIntro content={site.pages.method} />
      <MethodSection />
      <ContactTeaser />
    </main>
  );
}
