# Contexto del proyecto — Byron Reinoso

Última actualización: 15 de noviembre de 2026 (America/Guayaquil).

## Objetivo y negocio

Sitio profesional de marca personal para Byron Reinoso, quien ofrece estrategia de marca y desarrollo web para negocios de Nueva York y Nueva Jersey. Públicos: restaurantes y gastronomía, construcción/arquitectura/contratistas y servicios locales. Es un profesional independiente, no una agencia con equipo.

- Descriptor: **Estrategia de marca y web**.
- Tagline: **Marcas con una web que vende.**
- Diferencial: diseñar la web desde la estrategia para explicar por qué elegir al negocio y facilitar el contacto.
- Conversión principal: diagnóstico de 15 a 20 minutos.
- Idioma actual: español. Textos centralizados para permitir inglés más adelante.
- Tono: directo, profesional y cercano, sin promesas garantizadas.

## Decisiones e instrucciones del usuario

1. Implementar el sitio en los archivos locales; no quedarse en un plan.
2. Se creó inicialmente una landing extensa. El usuario pidió convertirla en un **sitio multipágina**; esa es la arquitectura vigente.
3. Se adaptó una referencia de tipografía editorial, navegación y botones en píldora y animaciones GSAP. Las cantidades de llamadas, efectos y librerías del análisis de referencia no son requisitos numéricos.
4. No añadir backend, base de datos, autenticación ni CMS sin necesidad.
5. No inventar contactos, resultados, testimonios, autorizaciones o clientes.
6. No representar a Byron con fotos de otra persona ni presentar el logo provisional como identidad aprobada.
7. El usuario autorizó el despliegue en Vercel y posteriormente subir el proyecto a **https://github.com/Diego2580/ByronReinoso.git** y conectar ese repositorio a Vercel.
8. La auditoría de Web Design Master fue de solo lectura. Sus propuestas **todavía no se han implementado**; no confundir recomendaciones con cambios aprobados.
9. Consultar `AGENTS.md` y las guías de la versión instalada de Next.js en `node_modules/next/dist/docs/` antes de modificar código.

## Arquitectura actual

Stack: Next.js 16 App Router, React 19, TypeScript estricto, Tailwind CSS 4, Lucide, GSAP, Three.js, React Three Fiber y Drei. Las versiones exactas están en `package-lock.json`.

Componentes de servidor por defecto. Componentes de cliente para navegación móvil, controlador de animación y demo 3D. Contenido separado de los componentes. No hay envío de formularios ni reservas simuladas.

### Rutas

- `/`: hero, presentación, accesos a páginas, selección de conceptos y CTA.
- `/soluciones`: Presencia, Clientes, Experiencia y demo 3D.
- `/proyectos`: índice de conceptos.
- `/proyectos/trama-construccion`: detalle del concepto de constructora.
- `/proyectos/origen-cafe`: detalle del concepto de café.
- `/metodo`: cuatro pasos de trabajo.
- `/sobre-mi`: trayectoria y presentación de Byron.
- `/contacto`: diagnóstico, estado de agenda y preguntas frecuentes.
- Página 404 propia.

### Ubicaciones para editar

- `src/app/`: rutas, layout y metadatos.
- `src/content/site.ts`: textos generales, navegación, cabeceras interiores y contacto.
- `src/content/projects.ts`: conceptos, slugs, objetivos y alcance.
- `src/content/services.ts`: soluciones, sin precios.
- `src/content/faq.ts`: preguntas y respuestas.
- `src/components/layout/`: encabezado, menú móvil y footer.
- `src/components/ui/`: enlaces de diagnóstico, cabeceras y controlador de animaciones.
- `src/features/`: secciones por funcionalidad.
- `src/styles/globals.css`: base, componentes y responsive.
- `src/styles/refinements.css`: adaptación editorial y microinteracciones.
- `src/lib/fonts.ts`: fuentes locales con `next/font/local`.
- `src/lib/animate-page.ts`: GSAP y limpieza de efectos por ruta.
- `src/three/`: escena y alternativa estática.
- `scripts/check-routes.mjs`: comprobación HTTP de páginas, enlaces, anclas y estados.

## Dirección visual y movimiento

Paleta: hueso `#F7F5F0`, carbón `#111111`, champaña `#B08D57`. Composición editorial, espacios amplios y detalles discretos. Conservar legibilidad y personalidad sin imponer más efectos.

Tipografías: Marcellus (peso 400 estático) en titulares; Montserrat variable en h3 y botones; Cormorant Garamond variable en entradillas; Geist variable en texto; Geist Mono variable en etiquetas. WOFF2 locales; solo Marcellus y Geist se precargan. Licencias en `public/fonts/licenses/`.

GSAP sustituyó a Motion, que se retiró. Registra ScrollTrigger, Observer y MorphSVGPlugin. Incluye entradas por bloques sin ocultar el contenido, scrub corto en conceptos, `quickTo` para hero y botones magnéticos, y un morph SVG decorativo. Limpieza al cambiar de ruta. Sin secuestro de scroll, pin, snap, audio ni shaders de imagen propios.

El hero no usa WebGL. La única demo 3D está en Soluciones: código diferido y montaje por proximidad, espacio reservado, alternativa estática, DPR limitado, menos paneles en móvil, pausa manual y detención fuera de viewport/pestaña. Con movimiento reducido se mantiene la composición estática.

## Contenido real y conceptos

Datos proporcionados de Byron: 10 años de experiencia en marketing y gestión de marca; ingeniero en marketing; máster en Gestión de Marca por UNIR; ha dirigido su propia consultora en Ecuador.

Trama y Origen son **proyectos conceptuales**, realizados con HTML/CSS propio. No son trabajos de clientes ni atribuyen resultados comerciales. Agucho’s Motos y Mariscos El Submarino no se publicaron como casos: faltan materiales autorizados; el segundo también depende de permiso y resultados disponibles.

## Contacto pendiente

En `contact` de `src/content/site.ts` permanecen vacíos calendario, WhatsApp, correo y dominio. No inventarlos.

- Sin calendario, `bookingHref` apunta a `/contacto#diagnostico` y muestra “Agenda próximamente disponible”.
- WhatsApp y correo solo aparecen si están configurados.
- Mensaje de WhatsApp: “Hola Byron, quiero cotizar una web para mi negocio”.
- Dominio profesional, hosting, mantenimiento, tiempos y condiciones se deben confirmar; no prometer prestaciones gratuitas.

La URL real de Vercel no sustituye por sí sola la confirmación de un dominio profesional ni la configuración de metadatos definitivos.

## Desarrollo y verificación

```sh
npm ci
npm run dev
npm run typecheck
npm run lint
npm run build
npm audit --omit=dev
```

Con servidor local activo o indicando una URL publicada:

```sh
npm run check:routes
npm run check:routes -- https://byron-reinoso.vercel.app
```

`npm run format` modifica el formato; usarlo únicamente en tareas con autorización para editar.

## Vercel y repositorio

- Repositorio solicitado: https://github.com/Diego2580/ByronReinoso.git
- Proyecto Vercel existente: `byron-reinoso`.
- Scope: `diegosalamea42-5397s-projects`.
- URL pública verificada: https://byron-reinoso.vercel.app
- Primer despliegue CLI: 14 de noviembre de 2026; compilación remota correcta y ocho rutas verificadas sin sesión de visitante.
- Hasta la solicitud actual, Vercel se actualizaba desde CLI, sin conexión Git.
- La raíz Git anterior era `C:/Users/diego`, ajena al proyecto. El 15 de noviembre se creó una raíz propia en esta carpeta, con rama `main` y remoto `origin` apuntando al repositorio solicitado. No se modificó ni subió el repositorio del perfil.
- `.agents/skills` es una junction local a Web Design Master fuera de esta carpeta. `.agents/` se excluye de Git y del despliegue porque no es portable; para usar esas skills en otro equipo hay que disponer de ellas por separado.
- No subir `.env*`, `.vercel`, `.next`, `node_modules`, cachés ni credenciales. Revisar `.gitignore` y `.vercelignore`.
- No guardar tokens, códigos de autenticación ni credenciales en este contexto.

Despliegue manual de respaldo, si se necesita y está autorizado:

```sh
npx vercel@latest deploy --prod --yes --project byron-reinoso --scope diegosalamea42-5397s-projects
```

En este equipo Node necesitó el almacén de certificados del sistema: `$env:NODE_USE_SYSTEM_CA='1'` en la terminal PowerShell. Nunca desactivar la verificación TLS. La autorización Vercel se renovó mediante el flujo oficial; no asumir que seguirá válida en futuras sesiones.

## Última auditoría: 15 de noviembre de 2026

Skills consultadas: frontend-react, ui-ux-design, responsive-design, accessibility, performance-seo, motion-3d y visual-qa. No se modificaron archivos durante esa auditoría.

Comprobado: lint y TypeScript (`--noEmit --incremental false`) pasaron; ocho rutas públicas y enlaces/anclas/CTA/404 pasaron; auditoría npm sin vulnerabilidades de producción y con siete avisos moderados en herramientas de desarrollo.

Limitaciones: conexión de navegador inaccesible. No se verificaron visualmente escritorio/móvil, teclado, lector de pantalla, interacción GSAP ni rendimiento 3D real. PageSpeed respondió HTTP 429; no hay métricas Lighthouse ni evidencia suficiente para afirmar conformidad WCAG AA o buenos Core Web Vitals.

### Hallazgos y prioridades pendientes

1. **P0:** habilitar un canal de contacto real. El CTA actual termina en un aviso honesto, pero no permite captar una consulta.
2. **P1:** mejorar legibilidad. Hay etiquetas móviles de 6–8 px y texto de botón a 9 px en un breakpoint.
3. **P1:** corregir contrastes pequeños: `#77776B` sobre hueso da 4,16:1; `#75756B`, 4,27:1. Ambos quedan bajo 4,5:1 para texto normal.
4. **P1:** comprobar responsive a 375, 768, 1024 y 1440 px, zoom, foco, teclado y menú.
5. **P1:** aislar Git del perfil (solicitado ahora).
6. **P1:** enriquecer detalles de proyectos con decisiones de diseño, estructura y vistas móviles propias, sin inventar resultados.
7. **P2:** consolidar CSS: globals tenía 2.475 líneas y refinements 513, con sobrescrituras repetidas.
8. **P2:** desarrollar contenido específico por página y facilitar comparación de soluciones. Dirección recomendada: editorial estratégica antes que ampliar efectos experimentales.
9. **P2:** medir rendimiento; evaluar reducir cinco familias a tres y cargar plugins exclusivos del hero solo donde se usan. La luz anima left/top; evaluar transformaciones.
10. **P2:** completar SEO: faltan canonical, imagen Open Graph y favicon; robots.txt y sitemap.xml devolvieron 404. Los títulos Open Graph interiores heredan el general. Definir antes la URL pública definitiva y la intención de indexación.

Mediciones de recursos de la auditoría (no son métricas de experiencia): siete scripts iniciales sumaban aproximadamente 576 KiB sin comprimir / 179 KiB con gzip calculado localmente; CSS 47 KiB; cinco fuentes WOFF2 139 KiB. No representan transferencia real ni incluyen necesariamente descargas diferidas.

## Cómo continuar sin perder contexto

Leer primero `AGENTS.md`, este archivo y `README.md`. Inspeccionar el estado Git y el despliegue real antes de asumir que coinciden con esta descripción. Distinguir implementación existente, solicitudes autorizadas y recomendaciones pendientes. Actualizar este contexto después de cambios relevantes, sin incluir secretos ni afirmar verificaciones no realizadas.
