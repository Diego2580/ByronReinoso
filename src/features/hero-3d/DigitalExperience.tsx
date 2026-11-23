"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/content/site";
import { BookingLink } from "@/components/ui/BookingLink";
import type { SceneState } from "./HeroScene";
import s from "./experience.module.css";
function Fallback() {
  return (
    <div className={s.fallback} aria-hidden="true">
      <svg viewBox="0 0 480 500">
        <defs>
          <linearGradient id="br-metal">
            <stop stopColor="#b08d57" />
            <stop offset=".4" stopColor="#f7f5f0" />
            <stop offset=".7" stopColor="#777189" />
            <stop offset="1" stopColor="#c8c2d9" />
          </linearGradient>
        </defs>
        <g transform="translate(240 250) rotate(-12)" fill="none">
          <ellipse
            cx="0"
            cy="0"
            rx="154"
            ry="74"
            stroke="url(#br-metal)"
            strokeWidth="16"
            transform="rotate(18)"
          />
          <ellipse
            cx="0"
            cy="0"
            rx="142"
            ry="68"
            stroke="#272727"
            strokeWidth="14"
            transform="rotate(76)"
          />
          <ellipse
            cx="0"
            cy="0"
            rx="166"
            ry="82"
            stroke="url(#br-metal)"
            strokeWidth="13"
            transform="rotate(132)"
          />
          <ellipse
            cx="0"
            cy="0"
            rx="124"
            ry="60"
            stroke="#4a443b"
            strokeWidth="12"
            transform="rotate(-38)"
          />
        </g>
      </svg>
    </div>
  );
}
const Scene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <Fallback />,
});
class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <Fallback /> : this.props.children;
  }
}
export function DigitalExperience() {
  const root = useRef<HTMLDivElement>(null),
    philosophy = useRef<HTMLElement>(null),
    visual = useRef<HTMLDivElement>(null);
  const state = useRef<SceneState>({
    progress: 0,
    anchorX: 0,
    anchorY: 0,
    visualWidth: 0,
    visualHeight: 0,
    invalidate: () => {},
  });
  const [ready, setReady] = useState(false),
    [mobile, setMobile] = useState(false),
    [tablet, setTablet] = useState(false),
    [active, setActive] = useState(true),
    [paused, setPaused] = useState(false);
  useEffect(() => {
    const media = matchMedia("(max-width:767px)"),
      tabletMedia = matchMedia("(min-width:768px) and (max-width:1023px)"),
      motion = matchMedia("(prefers-reduced-motion: reduce)");
    const resize = () => {
      setMobile(media.matches);
      setTablet(tabletMedia.matches);
    };
    const initialization = requestAnimationFrame(() => {
      resize();
      setPaused(motion.matches);
      try {
        const canvas = document.createElement("canvas"),
          gl = canvas.getContext("webgl2");
        setReady(Boolean(gl));
        gl?.getExtension("WEBGL_lose_context")?.loseContext();
      } catch {
        setReady(false);
      }
    });
    let visible = true;
    const visibility = () => setActive(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      visibility();
    });
    if (root.current) observer.observe(root.current);
    media.addEventListener("change", resize);
    tabletMedia.addEventListener("change", resize);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      cancelAnimationFrame(initialization);
      observer.disconnect();
      media.removeEventListener("change", resize);
      tabletMedia.removeEventListener("change", resize);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    gsap.registerPlugin(ScrollTrigger);
    const motionMedia = gsap.matchMedia();
    motionMedia.add("(prefers-reduced-motion: no-preference)", () => {
      const entrance = gsap.context(() => {
        gsap.from(element.querySelectorAll("h1 > span"), {
          y: 28,
          stagger: 0.09,
          duration: 1,
          ease: "power3.out",
        });
      }, element);
      return () => entrance.revert();
    });
    const context = gsap.context(() => {
      gsap.to(state.current, {
        progress: 1,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top top",
          end: "bottom 65%",
          scrub: true,
          invalidateOnRefresh: true,
        },
        onUpdate: () => {
          const p = state.current.progress;
          element.style.setProperty("--progress", String(p));
          element.dataset.progress = p.toFixed(4);
          state.current.invalidate();
        },
      });
      if (philosophy.current)
        gsap.fromTo(
          philosophy.current,
          { backgroundColor: "#111111" },
          {
            backgroundColor: "#f7f5f0",
            ease: "none",
            scrollTrigger: {
              trigger: philosophy.current,
              start: "top 30%",
              end: "center 35%",
              scrub: true,
              onUpdate: ({ progress: p }) => {
                if (philosophy.current) {
                  const channels = [
                    17 + 230 * p,
                    17 + 228 * p,
                    17 + 223 * p,
                  ].map((value) => {
                    const c = value / 255;
                    return c <= 0.04045
                      ? c / 12.92
                      : Math.pow((c + 0.055) / 1.055, 2.4);
                  });
                  const luminance =
                    channels[0] * 0.2126 +
                    channels[1] * 0.7152 +
                    channels[2] * 0.0722;
                  philosophy.current.style.color =
                    luminance > 0.179 ? "#000000" : "#ffffff";
                }
              },
            },
          },
        );
    }, element);
    let alive = true;
    let refreshFrame = 0;
    const measure = () => {
      if (!visual.current) return;
      const bounds = visual.current.getBoundingClientRect(),
        centerX = bounds.left + bounds.width / 2,
        centerY = bounds.top + scrollY + bounds.height / 2;
      state.current.anchorX = (centerX / innerWidth) * 2 - 1;
      state.current.anchorY = 1 - (centerY / innerHeight) * 2;
      state.current.visualWidth = bounds.width;
      state.current.visualHeight = bounds.height;
      state.current.invalidate();
    };
    measure();
    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => {
        measure();
        ScrollTrigger.refresh();
      });
    });
    resizeObserver.observe(element);
    void document.fonts.ready.then(() => {
      if (alive) ScrollTrigger.refresh();
    });
    return () => {
      alive = false;
      cancelAnimationFrame(refreshFrame);
      resizeObserver.disconnect();
      motionMedia.revert();
      context.revert();
    };
  }, []);
  return (
    <div ref={root} className={s.experience} data-progress="0">
      <section className={s.hero} aria-labelledby="hero-title">
        <div className={s.top}>
          <span>BYRON REINOSO / DISEÑO INDEPENDIENTE</span>
          <span>{site.location}</span>
        </div>
        <div className={s.layout}>
          <div className={s.copy}>
            <h1 id="hero-title">
              <span>Estrategia.</span>
              <span className={s.muted}>Diseño.</span>
              <span>
                Intención<span className={s.period}>.</span>
              </span>
            </h1>
            <p>{site.hero.body}</p>
            <div className={s.actions}>
              <BookingLink />
              <Link href="/proyectos">Ver proyectos ↗</Link>
            </div>
          </div>
          <div ref={visual} className={s.visual}>
            <div
              className={ready ? s.scene : s.staticScene}
              role="img"
              aria-label="Escultura metálica que se desarma detrás del contenido al bajar"
            >
              {ready ? (
                <Boundary>
                  <Scene
                    state={state}
                    mobile={mobile}
                    tablet={tablet}
                    active={active}
                    paused={paused}
                    onReady={(invalidate) => {
                      state.current.invalidate = invalidate;
                      invalidate();
                    }}
                  />
                </Boundary>
              ) : (
                <Fallback />
              )}
            </div>
            <div className={s.caption}>
              <span>BR / DE LA MARCA A LA WEB</span>
            </div>
          </div>
        </div>
        <div className={s.bottom}>
          <span>Diseño & desarrollo independiente</span>
          <a href="#enfoque">Explora lo que podemos crear ↓</a>
        </div>
      </section>
      <div className={s.tape} aria-hidden="true">
        <span>
          ESTRATEGIA DE MARCA <i>↗</i> DISEÑO WEB <i>↗</i> EXPERIENCIAS
          DIGITALES <i>↗</i> ESTRATEGIA DE MARCA
        </span>
      </div>
      <section
        ref={philosophy}
        id="enfoque"
        className={s.philosophy}
        aria-labelledby="philosophy-title"
      >
        <div className={s.content}>
          <p className={s.label}>02 / FILOSOFÍA · PRIMERO, EL PORQUÉ.</p>
          <h2 id="philosophy-title">
            Una web con intención empieza mucho antes del primer píxel.
          </h2>
          <div className={s.philosophyBottom}>
            <p>{site.intro.detail}</p>
            <Link href="/metodo">Descubre el método ↗</Link>
          </div>
          <ul>
            {site.intro.sectors.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
