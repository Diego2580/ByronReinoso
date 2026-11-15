import { site } from "@/content/site";
export function ExperienceFallback() {
  return (
    <div
      className="experience-fallback"
      role="img"
      aria-label={site.experience.static}
    >
      <div className="fallback-panel back-panel" />
      <div className="fallback-panel main-panel">
        <div className="panel-dot" />
        <div className="panel-line" />
        <div className="panel-line short" />
        <div className="panel-blocks">
          <i />
          <i />
          <i />
        </div>
        <div className="panel-button" />
      </div>
      <div className="fallback-panel small-panel">
        <div className="panel-dot" />
        <div className="panel-line" />
        <div className="panel-line short" />
      </div>
    </div>
  );
}
