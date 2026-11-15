// Editar aquí la versión española. Una futura versión inglesa puede usar la misma estructura.
export const contact = {
  calendarUrl: "", // URL https de la agenda real
  whatsappNumber: "", // Formato internacional, solo dígitos
  email: "",
  domain: "",
  whatsappMessage: "Hola Byron, quiero cotizar una web para mi negocio",
};
export const bookingHref = contact.calendarUrl || "/contacto#diagnostico";
export const site = {
  name: "Byron Reinoso",
  descriptor: "Estrategia de marca y web",
  tagline: "Marcas con una web que vende.",
  location: "Nueva York y Nueva Jersey",
  title: "Byron Reinoso — Estrategia de marca y web",
  description:
    "Estrategia de marca y diseño web para restaurantes, constructoras y negocios locales en Nueva York y Nueva Jersey.",
  nav: [
    { label: "Soluciones", href: "/soluciones" },
    { label: "Proyectos", href: "/proyectos" },
    { label: "Método", href: "/metodo" },
    { label: "Sobre mí", href: "/sobre-mi" },
    { label: "Contacto", href: "/contacto" },
  ],
  booking: "Agendar diagnóstico",
  back: "Volver al inicio",
  pages: {
    solutions: {
      label: "SOLUCIONES",
      title: "Una web a la medida\nde tu siguiente paso.",
      description:
        "Tres formas de construir tu presencia digital, desde la estrategia de marca hasta la experiencia que necesita tu visitante.",
    },
    projects: {
      label: "PROYECTOS",
      title: "Ideas que toman\nforma en la web.",
      description:
        "Explora dos conceptos propios: sus decisiones de diseño, el objetivo de cada propuesta y el alcance planteado.",
    },
    method: {
      label: "MÉTODO",
      title: "De entender tu marca\na construir su web.",
      description:
        "Un proceso compartido, con decisiones claras y momentos de revisión para avanzar con dirección.",
    },
    about: {
      label: "SOBRE MÍ",
      title: "Detrás de tu web,\nuna mirada de marca.",
      description:
        "Marketing, gestión de marca y diseño web conectados para expresar lo que hace diferente a tu negocio.",
    },
    contact: {
      label: "CONTACTO",
      title: "Una conversación\npara empezar con claridad.",
      description:
        "Cuéntame qué hace tu negocio y qué necesitas de su presencia digital. El primer paso es entender dónde estás y hacia dónde quieres avanzar.",
    },
  },
  explore: {
    label: "EXPLORA EL SITIO",
    title: "Conoce cómo puedo\naportar a tu marca.",
    links: [
      {
        href: "/soluciones",
        title: "Soluciones",
        body: "Encuentra el alcance adecuado: Presencia, Clientes o Experiencia.",
      },
      {
        href: "/metodo",
        title: "Método",
        body: "Conoce el camino desde el diagnóstico hasta la entrega.",
      },
      {
        href: "/sobre-mi",
        title: "Sobre mí",
        body: "La experiencia en marketing y marca detrás de cada decisión.",
      },
    ],
  },
  contactTeaser: {
    title: "Tu siguiente paso empieza\ncon una conversación.",
    body: "Conozcamos tu negocio y definamos qué necesita comunicar tu web.",
  },
  allProjects: "Ver todos los proyectos",
  hero: {
    eyebrow: "ESTRATEGIA PRIMERO. DISEÑO CON INTENCIÓN.",
    title: "Tu web no es una tarjeta digital. Es tu mejor vendedor.",
    first: "Tu web no es una",
    second: "tarjeta digital.",
    third: "Es tu mejor vendedor.",
    body: "Diseño tu página desde la estrategia de tu marca, para que quien te visite entienda por qué elegirte y te escriba.",
    secondary: "Ver proyectos",
    foot: "Una buena web empieza mucho antes del primer píxel.",
    availability: "Diseño & desarrollo independiente",
    scroll: "Explora lo que podemos crear",
    graphic: ["ESTRATEGIA", "IDENTIDAD", "EXPERIENCIA"],
    graphicLabel: "DE LA MARCA A LA WEB",
    graphicNote: "Una idea clara. Cada punto conectado.",
  },
  intro: {
    label: "01 / UNA WEB CON DIRECCIÓN",
    title: "Primero, el porqué.\nDespués, cada píxel.",
    body: "Una web bonita llama la atención. Una web con estrategia explica lo que te hace diferente y ayuda a dar el siguiente paso.",
    detail:
      "Conecto tu propuesta de valor, tu identidad y tu presencia digital. Trabajo contigo de principio a fin, para que el diseño y el desarrollo respondan a lo que tu negocio necesita.",
    sectors: [
      "Restaurantes & gastronomía",
      "Construcción & arquitectura",
      "Negocios locales & servicios",
    ],
  },
  projects: {
    label: "02 / PROYECTOS SELECCIONADOS",
    title: "De una idea clara,\na una presencia distinta.",
    intro:
      "Dos exploraciones propias de cómo una estrategia puede tomar forma en la web.",
    concept: "Proyecto conceptual",
    link: "Explorar concepto",
    note: "Diseños de exploración creados para este portafolio. No representan encargos ni resultados de clientes.",
    detailLabel: "DIRECCIÓN DEL CONCEPTO",
    objective: "El objetivo",
    scope: "Alcance propuesto",
    next: "¿Una dirección así para tu negocio?",
  },
  services: {
    label: "03 / SOLUCIONES",
    title: "El punto de partida\nes tu negocio.",
    body: "Una presencia concreta o una experiencia más ambiciosa. Elegimos el alcance que tenga sentido para ti.",
  },
  experience: {
    label: "EXPERIENCIA / LABORATORIO VISUAL",
    title: "Una web también\npuede sentirse.",
    body: "Profundidad, ritmo y movimiento al servicio de una idea. Una muestra de lo que podemos explorar cuando la marca pide algo distinto.",
    note: "Demo propia del servicio Experiencia. Sin modelos externos ni trabajo de clientes.",
    canvas: "Demostración 3D de paneles de una interfaz web",
    static: "Composición estática de paneles de interfaz",
    mode: "ESTUDIO DE INTERFAZ · 001",
    play: "Activar movimiento",
    pause: "Pausar movimiento",
  },
  method: {
    label: "04 / MÉTODO",
    title: "Claridad en cada paso.",
    body: "Sin cajas negras. Sabes qué estamos haciendo, por qué y qué sigue.",
    steps: [
      {
        title: "Diagnóstico y estrategia de marca",
        body: "Entiendo tu negocio, tu público y tu diferencia. Definimos el objetivo y la dirección de la web.",
      },
      {
        title: "Diseño y prototipo",
        body: "Ordeno el contenido y doy forma a la experiencia. Revisamos juntos un prototipo antes de desarrollar.",
      },
      {
        title: "Desarrollo e integración",
        body: "Convierto el diseño en una web adaptable y conecto las herramientas acordadas en la propuesta.",
      },
      {
        title: "Entrega y acompañamiento",
        body: "Revisamos el sitio y su uso. La entrega y el acompañamiento se definen según el alcance acordado.",
      },
    ],
  },
  about: {
    label: "05 / DETRÁS DE CADA PROYECTO",
    title: "Soy Byron.\nEstrategia en la cabeza.\nDiseño en las manos.",
    body: "Llevo 10 años trabajando en marketing y gestión de marca. Mi forma de diseñar una web empieza por entender el negocio que hay detrás.",
    detail:
      "Soy ingeniero en marketing y máster en Gestión de Marca por UNIR. He dirigido mi propia consultora en Ecuador. Hoy reúno esa experiencia para construir marcas con una presencia digital clara y coherente.",
    sign: "Tu marca, de persona a persona.",
    years: "años en marketing\ny gestión de marca",
    mark: "ESTRATEGIA / DISEÑO / DESARROLLO",
  },
  faq: { label: "06 / PREGUNTAS FRECUENTES", title: "Antes de empezar." },
  diagnostic: {
    label: "EL SIGUIENTE PASO",
    title: "Hablemos de lo que\ntu negocio puede ser.",
    body: "Un diagnóstico de 15 a 20 minutos para conocer tu negocio, revisar tu presencia digital y entender qué tipo de web necesitas.",
    pending: "Agenda próximamente disponible",
    pendingBody:
      "Estoy preparando el canal de reservas. Cuando esté disponible, podrás elegir aquí un horario para conversar. Por ahora no se realizan reservas desde esta web.",
    ready: "Elige un horario en mi agenda para conversar sobre tu proyecto.",
    whatsapp: "Conversar por WhatsApp",
    email: "Escribir por correo",
    duration: "15–20 MIN / TU NEGOCIO COMO PUNTO DE PARTIDA",
  },
  footer: {
    top: "Volver arriba",
    copyright: "Todos los derechos reservados.",
    credit: "Hecha con estrategia. Diseñada con intención.",
  },
  menu: { open: "Abrir menú", close: "Cerrar menú" },
  notFound: {
    label: "404 / FUERA DE LA RETÍCULA",
    title: "Esta página no está aquí.",
    body: "Volvamos a encontrar el camino a una buena idea.",
  },
};
