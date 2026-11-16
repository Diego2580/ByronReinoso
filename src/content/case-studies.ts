import type { Project } from "./projects";
type CaseStudy = {
  premise: string;
  decisions: { title: string; body: string }[];
  journey: string[];
  palette: { name: string; color: string }[];
  mobile: string;
};
export const caseStudies: Record<Project["slug"], CaseStudy> = {
  "trama-construccion": {
    premise:
      "La confianza se construye con claridad. Este concepto propone que una constructora muestre cómo piensa y cómo trabaja antes de pedir una consulta.",
    decisions: [
      {
        title: "Una retícula que sostiene",
        body: "Alineaciones firmes, márgenes amplios y bloques bien definidos trasladan la precisión del oficio a la interfaz.",
      },
      {
        title: "El espacio como protagonista",
        body: "La composición arquitectónica propia funciona como exploración visual de materia, luz y volumen, sin atribuir obras a una empresa real.",
      },
      {
        title: "Un recorrido hacia la consulta",
        body: "La estructura propuesta conecta presentación, servicios y proyectos para que el visitante llegue al contacto con contexto.",
      },
    ],
    journey: [
      "Presentar el enfoque",
      "Explorar servicios",
      "Conocer los proyectos",
      "Iniciar una consulta",
    ],
    palette: [
      { name: "Cal", color: "#f3f2ec" },
      { name: "Oliva", color: "#bfc4b5" },
      { name: "Bosque", color: "#27332a" },
    ],
    mobile:
      "En móvil, la propuesta prioriza el mensaje, apila los contenidos y mantiene el acceso a consulta después de explicar el servicio. Esta vista es un estudio de composición, no una web de cliente publicada.",
  },
  "origen-cafe": {
    premise:
      "Una pausa también puede tener una identidad digital. Este concepto explora cómo traducir el ritual de un café de especialidad en una experiencia cálida y fácil de recorrer.",
    decisions: [
      {
        title: "Un ritmo más pausado",
        body: "Titulares editoriales y espacios generosos dan lugar a la historia del café sin competir con la información práctica de la visita.",
      },
      {
        title: "Color que acerca",
        body: "Crema, terracota y café forman una paleta cálida. La taza es una ilustración propia construida con código para este concepto.",
      },
      {
        title: "De la historia al encuentro",
        body: "La estructura propuesta permite descubrir el carácter del lugar, explorar la carta y encontrar la información necesaria para una visita.",
      },
    ],
    journey: [
      "Descubrir el concepto",
      "Explorar la carta",
      "Conocer el origen",
      "Planear la visita",
    ],
    palette: [
      { name: "Crema", color: "#f7ecd7" },
      { name: "Arcilla", color: "#c18b68" },
      { name: "Café", color: "#573c2b" },
    ],
    mobile:
      "El estudio móvil coloca el mensaje y el acceso a la carta antes que los detalles decorativos. El recorrido se resuelve en una sola columna y con acciones fáciles de localizar.",
  },
};
