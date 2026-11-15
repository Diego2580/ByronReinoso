export const projects = [
  {
    slug: "trama-construccion",
    name: "Trama",
    sector: "Construcción & arquitectura",
    theme: "architecture",
    descriptor: "Construir confianza. Desde el primer plano.",
    summary:
      "Una presencia sobria para una constructora que quiere comunicar precisión y hacer visible su forma de trabajar.",
    objective:
      "Traducir el rigor de la construcción en una web clara: jerarquías firmes, proyectos protagonistas y una ruta directa a una consulta.",
    scope: [
      "Dirección visual y estructura de contenidos",
      "Presentación de servicios y proyectos",
      "Diseño adaptable y contacto guiado",
    ],
    mock: {
      logo: "TRAMA",
      nav: "ESPACIOS CON INTENCIÓN",
      title: "Lo que imaginas.\nBien construido.",
      body: "Arquitectura que encuentra su lugar.",
      cta: "Explorar espacios",
      caption: "MATERIA / LUZ / FORMA",
    },
  },
  {
    slug: "origen-cafe",
    name: "Origen",
    sector: "Café de especialidad",
    theme: "coffee",
    descriptor: "Un buen café empieza con una buena historia.",
    summary:
      "Una experiencia cálida y editorial que acerca el ritual del café a la pantalla.",
    objective:
      "Expresar el carácter de un café de especialidad con una composición pausada, una carta fácil de explorar y espacio para contar su origen.",
    scope: [
      "Concepto de marca y dirección visual",
      "Carta, historia y estructura de visita",
      "Diseño adaptable y acceso a contacto",
    ],
    mock: {
      logo: "origen.",
      nav: "CAFÉ DE ESPECIALIDAD",
      title: "Una pausa.\nUn buen origen.",
      body: "El ritual de volver a lo simple.",
      cta: "Descubrir el café",
      caption: "CAFÉ / TIEMPO / ENCUENTRO",
    },
  },
] as const;
export type Project = (typeof projects)[number];
