# Byron Reinoso — primera versión local

Web en español con Next.js 16 (App Router), React 19, TypeScript estricto, Tailwind CSS 4, GSAP, Lucide y una demo aislada con React Three Fiber 9, Drei 10 y Three.js. Las versiones exactas están fijadas en `package-lock.json`. Node.js 22.9 o superior; desarrollada con Node 24.

## Instalar y ejecutar

```sh
npm ci
npm run dev
```

Abrir http://localhost:3000. Para revisar producción: `npm run build` y `npm start`.

## Verificaciones

```sh
npm run typecheck
npm run lint
npm run build
npm audit --omit=dev
```

Con el servidor en ejecución, `npm run check:routes` comprueba las ocho páginas del sitio, los destinos de enlaces y anclas, metadatos básicos, los CTA de diagnóstico, el aviso de agenda en Contacto, la ausencia de contactos vacíos, la alternativa estática en Soluciones y la respuesta 404. Acepta otra URL con `npm run check:routes -- http://localhost:3001`.

`npm run format` da formato al código. El build genera el inicio, Soluciones, Proyectos, Método, Sobre mí, Contacto, los dos detalles conceptuales y la página 404. La adaptación visual pasó compilación con TypeScript y lint. La auditoría de producción actual no encontró vulnerabilidades. La auditoría completa detecta avisos moderados en dependencias transitivas de las herramientas de lint. Revisar sus actualizaciones antes de publicar; no se aplicaron reemplazos de versiones mayores a la fuerza.

La revisión visual por navegador fue interrumpida por el usuario al detener Computer Use con Escape. Queda pendiente comprobar visualmente escritorio, 360 px y tablet, consola del navegador, foco del menú (Tab, Shift+Tab, Escape y retorno al botón), CTA, FAQ y demo en un dispositivo con WebGL y con movimiento reducido. No se han simulado reservas ni enviado mensajes.

## Editar contenido

- `src/content/site.ts`: textos generales, navegación, SEO y contacto. Todo el contenido inicial es español; se puede agregar otra estructura del mismo tipo para inglés sin cambiar los componentes.
- `src/content/projects.ts`: conceptos Trama y Origen, objetivos, alcance y textos de las interfaces. Sus rutas se generan desde los slugs.
- `src/content/services.ts`: soluciones, sin precios.
- `src/content/faq.ts`: preguntas y respuestas.
- `src/styles/globals.css`: estructura y adaptación responsive. `src/styles/refinements.css`: tipografía editorial, botones y navegación en píldora, vidrio y microinteracciones. Las fuentes se sirven localmente, sin peticiones del navegador a Google.
- `src/features/projects/components/ProjectMockup.tsx`: vistas propias hechas en HTML/CSS; no contienen capturas de terceros.

## Configurar contacto

Editar `contact` en `src/content/site.ts`:

- `calendarUrl`: URL HTTPS de la agenda confirmada. Vacía, todos los enlaces de diagnóstico apuntan a `/contacto#diagnostico`, que explica la llamada de 15 a 20 minutos y muestra el aviso de agenda próximamente disponible.
- `whatsappNumber`: número internacional, solo dígitos. Vacío, no se muestra WhatsApp. El mensaje solicitado está en `whatsappMessage`.
- `email`: correo profesional real. Vacío, no se muestra el enlace.
- `domain`: reservado para el dominio aprobado; por ahora no genera enlaces ni canonical. Al publicar, configurar también `metadataBase` y las URL de SEO correspondientes en `src/app/layout.tsx`.

Estos datos son públicos; no guardar credenciales en este archivo.

## Demo 3D

`Experience.tsx` observa la proximidad al viewport y recién entonces monta el módulo dinámico. El contenedor reserva altura. `ExperienceFallback.tsx` es la composición estática del servidor, durante la carga y si falta WebGL, hay un error o se solicita movimiento reducido. Se usa geometría sencilla, sin modelos, texturas ni fuentes externas; DPR máximo 1.5 (1 en móvil), dos paneles en móvil y tres en escritorio. Se detiene el bucle fuera de pantalla o con la pestaña oculta; incluye pausa manual. En movimiento reducido se mantiene la alternativa estática. El hero no utiliza WebGL.

## Pendiente antes de publicar

- Confirmar nombre, descriptor y logotipo tipográfico provisional; no constituyen una identidad aprobada.
- Configurar calendario, WhatsApp, correo y dominio.
- Incorporar fotografía profesional solo cuando esté disponible y autorizada. Actualmente la sección personal usa tipografía.
- Obtener materiales y permisos para Agucho’s Motos y, si corresponde, Mariscos El Submarino. No están presentados como casos realizados; los dos trabajos visibles son conceptuales y no atribuyen resultados comerciales.
- Validar contenido, alcance de servicios y condiciones comerciales con Byron; acordar tiempos, dominio, hosting y mantenimiento en cada propuesta.
- Completar revisión visual, accesibilidad manual y rendimiento en dispositivos reales. Revisar las necesidades legales del sitio antes de su publicación.

No incluye backend, CMS, formularios que envíen información, analítica ni autenticación del sitio.

## Estructura multipágina

- `/`: inicio con presentación, accesos a las páginas y selección de conceptos.
- `/soluciones`: Presencia, Clientes, Experiencia y demo 3D.
- `/proyectos`: índice de proyectos conceptuales, con sus dos páginas de detalle.
- `/metodo`: proceso de trabajo de cuatro pasos.
- `/sobre-mi`: trayectoria y presentación de Byron.
- `/contacto`: diagnóstico, estado de la agenda y preguntas frecuentes.

Cada página tiene título, descripción SEO y un encabezado principal propios. La navegación indica la página actual, también al visitar el detalle de un proyecto. Todos los CTA de diagnóstico llevan al calendario configurado o a `/contacto#diagnostico`. Los componentes de contenido se encuentran en `src/features/`; los textos de las cabeceras interiores están en `site.pages`.

## Tipografía y animación

Marcellus en titulares (peso 400 estático), Montserrat variable en h3 y botones, Cormorant Garamond variable en entradillas, Geist variable en texto base y Geist Mono variable en etiquetas. Se usan archivos WOFF2 latinos locales mediante next/font/local con font-display swap; solo Marcellus y Geist se precargan. Configuración en `src/lib/fonts.ts`; licencias en `public/fonts/licenses/`.

GSAP reemplaza Motion. `PageMotion.tsx` carga dinámicamente `src/lib/animate-page.ts` y limpia cada contexto al cambiar de ruta. Registra ScrollTrigger, Observer y MorphSVGPlugin. Incluye entradas visibles por bloques, scrub corto en los conceptos, quickTo para la luz y el parallax del hero, un pequeño morph SVG decorativo y botones magnéticos en punteros precisos (20 % horizontal, 30 % vertical). Los efectos no se activan con movimiento reducido; parallax de puntero y magnetismo no se activan en pantallas táctiles. El contenido queda visible aunque no cargue el módulo.

La navegación multipágina sigue usando Next.js y desplazamiento nativo. No se añadieron pin, snap, sonido ni shaders de imagen a esta adaptación. Las cantidades de llamadas GSAP del análisis de referencia no se usan como objetivos de implementación. La única escena WebGL sigue siendo la demo en Soluciones.

La conexión directa al navegador no estuvo disponible durante esta adaptación; siguen pendientes la revisión visual y la ejecución interactiva de los nuevos efectos, también en 360 px y con movimiento reducido.

## Despliegue en Vercel

Publicado el 14 de noviembre de 2026 en https://byron-reinoso.vercel.app.

Proyecto: `byron-reinoso`, en `diegosalamea42-5397s-projects`. La compilación remota terminó correctamente y la comprobación HTTP pasó sobre las ocho páginas públicas, sus enlaces, el contacto y la respuesta 404, sin autenticación de visitantes.

Repositorio: https://github.com/Diego2580/ByronReinoso. El proyecto está conectado a GitHub desde el 15 de noviembre de 2026. La rama de trabajo es `main`; los cambios se envían con:

```sh
git add <archivos-del-cambio>
git commit -m "Descripción del cambio"
git push origin main
```

Vercel construye el sitio desde el repositorio conectado. Revisar el estado del despliegue antes de dar una actualización por publicada. Consultar `CONTEXTO_PROYECTO.md` al retomar el trabajo.

Como alternativa manual, con una sesión válida de Vercel:

```sh
npx vercel@latest deploy --prod --yes --project byron-reinoso --scope diegosalamea42-5397s-projects
```

Si Node muestra `UNABLE_TO_VERIFY_LEAF_SIGNATURE` en este equipo, activar el uso del almacén de certificados del sistema en esa terminal PowerShell antes del comando: `$env:NODE_USE_SYSTEM_CA='1'`. No desactivar la validación TLS.

`.vercelignore` excluye dependencias, cachés, metadatos Git, la junction local de skills y archivos de entorno del envío. La agenda y los datos de contacto siguen pendientes de confirmación.

## Estado vigente · restauración y fase 2 · 16 de noviembre de 2026

El usuario autorizó reconstruir el diseño después de que desaparecieran los cambios locales anteriores. Se restauró el recorrido Hero 3D → Filosofía en `src/features/hero-3d/DigitalExperience.tsx`, con escena diferida en `HeroScene.tsx`. Siete láminas metálicas se separan y giran según el scroll. La escena acompaña la transición en una capa fija (z-index 1) detrás del texto (z-index 2), sin columna reservada ni captura de eventos. Desaparece al finalizar el bloque. SVG durante carga, ante error de React o falta de WebGL; geometría móvil simplificada y DPR limitado. La renderización ambiental se detiene fuera del bloque/pestaña. El usuario pidió retirar la activación voluntaria: el 3D se inicia automáticamente y no existe botón “Activar experiencia”. Se mantiene pausa del movimiento ambiental; con movimiento reducido esa rotación empieza pausada, mientras el scroll controla el desarme. Esto sustituye las decisiones históricas de no usar WebGL en hero.

Fase 2: tokens en `src/styles/tokens.css` y servicios bento reutilizados en Inicio y Soluciones. Presencia y Clientes ocupan tarjetas de distinto ancho con ilustraciones HTML/CSS propias; Experiencia ocupa una tarjeta horizontal oscura con órbitas. Alcances y CTA reales conservados, sin precios ni resultados inventados. Efecto de profundidad suave en hover/foco, con transición desactivada para movimiento reducido. La presentación de Byron se reutiliza en el inicio. Contactos siguen vacíos.

Las ocho skills de Web Design Master se copiaron como archivos locales en `.agents/skills` y se habilitaron en Git; siguen excluidas del despliegue. No existe ahora una junction externa. Consultadas UI/UX, sistema de diseño, React, motion, responsive, accesibilidad y QA visual.

Comprobación: lint y build correctos. En Chrome se verificó canvas WebGL automático y ausencia de botón de activación; revisión visual de bento en escritorio. Vista móvil con ancho CSS observado de 417 px sin overflow horizontal; las capturas móviles agotaron el tiempo, por lo que su revisión visual completa queda pendiente. Consola sin errores en la sesión revisada. No se midieron FPS, Lighthouse ni Core Web Vitals ni se declara auditoría WCAG. Vista previa: `npm run dev -- --port 3002`.

Pendiente del plan completo: galería inmersiva, timeline de proceso, FAQ dentro del inicio, refinamiento de interiores, contenido real y contacto. Esta fase no completa las ocho secciones. Cambios locales sin push ni despliegue.

## Fase 3 · galería y casos conceptuales · 16 de noviembre de 2026

Se rediseñó `ProjectsSection` con composiciones grandes, segundo concepto desplazado y enlaces claros a los detalles. Se reutilizan las ilustraciones HTML/CSS propias de Trama y Origen, sin imágenes de terceros. El índice `/proyectos` evita repetir la introducción y el inicio conserva su enlace al índice. Los casos ahora incluyen premisa, alcance, tres decisiones de diseño, paleta, estudio móvil propio, recorrido propuesto, navegación al siguiente concepto y CTA de diagnóstico. Contenido en `src/content/case-studies.ts`; estilos aislados en `projects.module.css`.

GSAP aplica una máscara corta a `[data-project-reveal]` al entrar en pantalla; el contenido permanece visible sin JS y el efecto solo se registra sin movimiento reducido. No se añadieron librerías ni integraciones. No se atribuyen clientes, encargos ni resultados a estos conceptos. Los estudios móviles son composiciones de propuesta, no webs publicadas.

Validación: lint y build correctos; comprobación de las ocho rutas y sus enlaces, anclas y 404. En Chrome se inspeccionaron galería y detalle de Trama en escritorio y se verificó navegación real a Origen. Sin errores de consola en la sesión revisada. En Trama se comprobó ausencia de overflow horizontal a anchos CSS de 375, 768, 1024 y 1440 px. Las capturas móviles agotaron el tiempo y su revisión visual completa sigue pendiente, igual que una comprobación completa de las máscaras con movimiento normal y de accesibilidad por teclado. No se midió Lighthouse. Cambios locales sin push ni despliegue; la fase anterior permanece en el commit 2b86565.

## Fase 4 · proceso de trabajo · 16 de noviembre de 2026

Se integró el timeline de cuatro etapas en el inicio, entre Proyectos y Sobre Byron, y se reutiliza en `/metodo`. Conserva diagnóstico y estrategia, diseño y prototipo, desarrollo e integración, y entrega y acompañamiento. Cada etapa incluye descripción, entregable orientativo y punto de revisión; plazos, herramientas y acompañamiento quedan sujetos a la propuesta. Contenido de etapas en `site.method.steps`, estilos aislados en `method.module.css`.

La línea SVG avanza con ScrollTrigger sin pin ni secuestro de scroll y se revierte al subir. Es decorativa y está oculta a tecnologías de asistencia; las etapas son una lista ordenada de contenido de servidor siempre visible. Sin JS o con movimiento reducido la línea queda completa. Se corrigió un efecto de trazos discontinuos producido por vector-effect en el SVG normalizado. No se agregaron dependencias ni integraciones. CTA al diagnóstico conserva su destino configurado y no simula reservas.

Validación: lint y build correctos; revisión visual en Chrome del proceso estático en escritorio y móvil; cuatro etapas presentes, consola sin errores y sin overflow horizontal a 375, 768, 1024 y 1440 px CSS. El navegador tenía movimiento reducido activo, por lo que queda pendiente ejecutar visualmente la animación con preferencia normal. No se declara auditoría integral WCAG ni medición de rendimiento. La carpeta de trabajo del chat cambió a OneDrive, pero allí no está el código; se continuó sobre `C:/Users/diego/Desktop/ByronReinoso`, que conserva las fases 3 y 4 locales. No hubo push ni despliegue en esta fase.
