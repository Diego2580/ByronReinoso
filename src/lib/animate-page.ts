import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(ScrollTrigger, Observer, MorphSVGPlugin);
const ease = "expo.out";

export function animatePage() {
  const media = gsap.matchMedia();
  media.add("(prefers-reduced-motion: no-preference)", () => {
    const heading = document.querySelector(
      ".hero-title, .page-intro h1, .detail-heading h1",
    );
    if (heading) {
      const lines = heading.querySelectorAll(":scope > span");
      gsap.from(lines.length > 1 ? lines : heading, {
        y: 24,
        duration: 0.85,
        stagger: 0.09,
        ease,
        // Texto siempre visible, incluso antes de inicializar GSAP.
      });
    }
    gsap.utils
      .toArray<HTMLElement>(
        "main .section-heading, main .intro-grid, main .explore-card, main .service, main .method-step, main .about-copy, main .faq-list, main .project-card",
      )
      .forEach((element) => {
        gsap.from(element, {
          y: 25,
          duration: 0.7,
          ease,
          scrollTrigger: { trigger: element, start: "top 92%", once: true },
        });
      });
    // Parallax corto: no fija secciones ni altera el desplazamiento nativo.
    gsap.utils
      .toArray<HTMLElement>(".project-image-link .mock-window")
      .forEach((element) => {
        gsap.fromTo(
          element,
          { y: 12 },
          {
            y: -12,
            ease: "none",
            scrollTrigger: {
              trigger: element.closest(".project-card"),
              start: "top bottom",
              end: "bottom top",
              scrub: 0.7,
            },
          },
        );
      });
    const refresh = () => ScrollTrigger.refresh();
    let alive = true;
    void document.fonts.ready.then(() => {
      if (alive) refresh();
    });
    return () => {
      alive = false;
    };
  });

  media.add(
    "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)",
    () => {
      const removers: (() => void)[] = [];
      gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((button) => {
        const xTo = gsap.quickTo(button, "x", { duration: 0.55, ease });
        const yTo = gsap.quickTo(button, "y", { duration: 0.55, ease });
        // offsetLeft/Top no cambian cuando el propio botón se transforma.
        let rect: DOMRect;
        const enter = () => {
          rect = button.getBoundingClientRect();
        };
        const move = (event: PointerEvent) => {
          if (!rect || event.pointerType !== "mouse") return;
          xTo((event.clientX - rect.left - rect.width / 2) * 0.2);
          yTo((event.clientY - rect.top - rect.height / 2) * 0.3);
        };
        const reset = () => {
          xTo(0);
          yTo(0);
        };
        button.addEventListener("pointerenter", enter);
        button.addEventListener("pointermove", move);
        button.addEventListener("pointerleave", reset);
        button.addEventListener("focus", reset);
        button.addEventListener("blur", reset);
        removers.push(() => {
          button.removeEventListener("pointerenter", enter);
          button.removeEventListener("pointermove", move);
          button.removeEventListener("pointerleave", reset);
          button.removeEventListener("focus", reset);
          button.removeEventListener("blur", reset);
        });
      });
      const hero = document.querySelector<HTMLElement>(".hero");
      let observer: Observer | undefined;
      if (hero) {
        const light = hero.querySelector(".hero-light");
        const graphic = hero.querySelector(".brand-diagram");
        const glyph = hero.querySelector<SVGPathElement>("[data-brand-glyph]");
        const lightX = light
          ? gsap.quickTo(light, "left", { duration: 0.7, ease })
          : null;
        const lightY = light
          ? gsap.quickTo(light, "top", { duration: 0.7, ease })
          : null;
        const graphicX = graphic
          ? gsap.quickTo(graphic, "x", { duration: 0.7, ease })
          : null;
        const graphicY = graphic
          ? gsap.quickTo(graphic, "y", { duration: 0.7, ease })
          : null;
        const glyphMotion = glyph
          ? gsap
              .timeline({ paused: true })
              .to(glyph, {
                morphSVG:
                  "M16 3 C24 3 29 8 29 16 C29 24 24 29 16 29 C8 29 3 24 3 16 C3 8 8 3 16 3 Z",
                duration: 0.7,
                ease,
              })
          : null;
        observer = Observer.create({
          target: hero,
          type: "pointer",
          preventDefault: false,
          onMove: (self) => {
            const event = self.event as PointerEvent;
            if (event.pointerType !== "mouse") return;
            const rect = hero.getBoundingClientRect();
            const x = event.clientX - rect.left,
              y = event.clientY - rect.top;
            lightX?.(x);
            lightY?.(y);
            graphicX?.((x / rect.width - 0.5) * 16);
            graphicY?.((y / rect.height - 0.5) * 12);
          },
          onHover: () => {
            glyphMotion?.play();
          },
          onHoverEnd: () => {
            graphicX?.(0);
            graphicY?.(0);
            glyphMotion?.reverse();
          },
        });
      }
      return () => {
        observer?.kill();
        removers.forEach((remove) => remove());
      };
    },
  );
  return () => media.revert();
}
