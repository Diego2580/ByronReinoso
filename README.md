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
