"use client";
import dynamic from "next/dynamic";
import { Component, type ReactNode, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { site } from "@/content/site";
import { ExperienceFallback } from "@/three/ExperienceFallback";
const Scene = dynamic(() => import("@/three/ExperienceScene"), {
  ssr: false,
  loading: () => <ExperienceFallback />,
});
class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <ExperienceFallback /> : this.props.children;
  }
}
export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false),
    [visible, setVisible] = useState(false);
  const [capable, setCapable] = useState(false),
    [reduced, setReduced] = useState(true);
  const [mobile, setMobile] = useState(false),
    [paused, setPaused] = useState(false),
    [tabVisible, setTabVisible] = useState(true);
  useEffect(() => {
    const reducedQuery = matchMedia("(prefers-reduced-motion: reduce)"),
      mobileQuery = matchMedia("(max-width: 640px)");
    const update = () => {
      setReduced(reducedQuery.matches);
      setMobile(mobileQuery.matches);
    };
    update();
    reducedQuery.addEventListener("change", update);
    mobileQuery.addEventListener("change", update);
    const element = ref.current;
    const preload = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setNear(true);
          preload.disconnect();
        }
      },
      { rootMargin: "250px" },
    );
    const observer = new IntersectionObserver((entries) =>
      setVisible(entries[0].isIntersecting),
    );
    if (element) {
      preload.observe(element);
      observer.observe(element);
    }
    const visibility = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      preload.disconnect();
      observer.disconnect();
      reducedQuery.removeEventListener("change", update);
      mobileQuery.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  useEffect(() => {
    if (!near || reduced) return;
    const frame = requestAnimationFrame(() => {
      try {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl2");
        if (gl) {
          setCapable(true);
          gl.getExtension("WEBGL_lose_context")?.loseContext();
        }
      } catch {
        setCapable(false);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [near, reduced]);
  return (
    <div className="experience-visual" ref={ref}>
      <span className="experience-mode micro">{site.experience.mode}</span>
      <div
        className="experience-stage"
        role="img"
        aria-label={site.experience.canvas}
      >
        {near && capable && !reduced ? (
          <SceneBoundary>
            <Scene
              active={visible && tabVisible}
              moving={!paused}
              mobile={mobile}
              onFailure={() => setCapable(false)}
            />
          </SceneBoundary>
        ) : (
          <ExperienceFallback />
        )}
      </div>
      <span className="scene-cross cross-one" aria-hidden="true">
        +
      </span>
      <span className="scene-cross cross-two" aria-hidden="true">
        +
      </span>
      {capable && !reduced && (
        <button
          className="scene-control"
          aria-label={paused ? site.experience.play : site.experience.pause}
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
        >
          {paused ? <Play size={16} /> : <Pause size={16} />}
        </button>
      )}
    </div>
  );
}
