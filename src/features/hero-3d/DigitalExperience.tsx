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
        <g transform="translate(240 250) rotate(-18)">
          {Array.from({ length: 7 }, (_, i) => (
            <path
              key={i}
              transform={`rotate(${(i * 360) / 7})`}
              d="M-20-170 C160-120 140 70 20 170 C65 60 45-65-20-170Z"
              fill="url(#br-metal)"
            />
          ))}
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
    philosophy = useRef<HTMLElement>(null);
  const state = useRef<SceneState>({ progress: 0, invalidate: () => {} });
  const [ready, setReady] = useState(false),
    [mobile, setMobile] = useState(false),
    [active, setActive] = useState(true),
    [paused, setPaused] = useState(false);
  useEffect(() => {
    const media = matchMedia("(max-width:767px)"),
      motion = matchMedia("(prefers-reduced-motion: reduce)");
    const resize = () => setMobile(media.matches);
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
    document.addEventListener("visibilitychange", visibility);
    return () => {
      cancelAnimationFrame(initialization);
      observer.disconnect();
      media.removeEventListener("change", resize);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    gsap.registerPlugin(ScrollTrigger);
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
            },
            onUpdate: function () {
              if (philosophy.current) {
                const p = this.progress();
                const channels = [17 + 230 * p, 17 + 228 * p, 17 + 223 * p].map(
                  (value) => {
                    const c = value / 255;
                    return c <= 0.04045
                      ? c / 12.92
                      : Math.pow((c + 0.055) / 1.055, 2.4);
                  },
                );
                const luminance =
                  channels[0] * 0.2126 +
                  channels[1] * 0.7152 +
                  channels[2] * 0.0722;
                philosophy.current.style.color =
                  luminance > 0.179 ? "#000000" : "#ffffff";
              }
            },
          },
        );
    }, element);
    let alive = true;
    void document.fonts.ready.then(() => {
      if (alive) ScrollTrigger.refresh();
    });
    return () => {
      alive = false;
      context.revert();
    };
  }, []);
  return (
    <div ref={root} className={s.experience} data-progress="0">
      <section className={s.hero} aria-labelledby="hero-title">
        <div className={s.top}>
          <span>{site.hero.eyebrow}</span>
          <span>{site.location}</span>
        </div>
        <div className={s.layout}>
          <div className={s.copy}>
            <h1 id="hero-title" aria-label={site.hero.title}>
              <span>{site.hero.first}</span>
              <span className={s.muted}>{site.hero.second}</span>
              <span>
                Es tu mejor <em>vendedor.</em>
              </span>
            </h1>
            <p>{site.hero.body}</p>
            <div className={s.actions}>
              <BookingLink />
              <Link href="/proyectos">Ver proyectos ↗</Link>
            </div>
          </div>
          <div className={s.visual}>
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
              {ready && (
                <button
                  type="button"
                  aria-pressed={paused}
                  onClick={() => {
                    setPaused((v) => !v);
                    state.current.invalidate();
                  }}
                >
                  {paused ? "Reanudar movimiento" : "Pausar movimiento"}
                </button>
              )}
            </div>
          </div>
        </div>
        <div className={s.bottom}>
          <span>Diseño & desarrollo independiente</span>
          <a href="#enfoque">Explora lo que podemos crear ↓</a>
        </div>
      </section>
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
