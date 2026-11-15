type Intro = { label: string; title: string; description: string };
export function PageIntro({ content }: { content: Intro }) {
  return (
    <header className="page-intro wrap">
      <p className="eyebrow">{content.label}</p>
      <h1>{content.title}</h1>
      <p className="page-description">{content.description}</p>
    </header>
  );
}
