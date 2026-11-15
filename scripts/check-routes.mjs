// Comprobación HTTP del HTML de servidor; no sustituye una prueba visual de navegador.
import assert from "node:assert/strict";
const base = process.argv[2] || "http://localhost:3000";
const cache = new Map();
async function page(path) {
  if (cache.has(path)) return cache.get(path);
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 200, `Estado HTTP de ${path}`);
  const html = await response.text();
  cache.set(path, html);
  return html;
}
const paths = ["/", "/soluciones", "/proyectos", "/metodo", "/sobre-mi", "/contacto", "/proyectos/trama-construccion", "/proyectos/origen-cafe"];
for (const path of paths) {
  const html = await page(path);
  assert.match(html, /<html[^>]*lang="es"/, "Idioma español");
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `Un h1 en ${path}`);
  assert.match(html, /name="description"/, "Descripción SEO");
  for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]*)"/g)) {
    const href = match[1].replaceAll("&amp;", "&");
    assert.ok(href && href !== "#", `Destino real en ${path}`);
    const target = new URL(href, new URL(path, base));
    if (target.origin !== new URL(base).origin) continue;
    const targetHtml = await page(target.pathname);
    if (target.hash) {
      const id = decodeURIComponent(target.hash.slice(1));
      assert.ok(
        targetHtml.includes(`id="${id}"`),
        `Ancla ${href} desde ${path}`,
      );
    }
  }
  console.log(`OK ${path}: HTML, SEO y destinos locales`);
}
const home = await page("/");
const contact = await page('/contacto');
const solutions = await page('/soluciones');
assert.match(
  contact,
  /Agenda próximamente disponible/,
  "Aviso de agenda pendiente",
);
assert.ok(!contact.includes('href="https://wa.me/'), "WhatsApp oculto sin número");
assert.ok(!contact.includes('href="mailto:'), "Correo oculto sin dirección");
assert.match(solutions, /experience-fallback/, "Alternativa 3D en Soluciones");
assert.ok(!home.includes('experience-stage'), 'El inicio no monta la demo');
assert.ok(!home.includes('faq-list'), 'Las preguntas frecuentes están en Contacto');
for (const path of paths) {
  assert.match(await page(path), /href="\/contacto#diagnostico"/, `CTA de diagnóstico en ${path}`);
  assert.ok(!(await page(path)).includes('href="/#'), `Sin enlaces antiguos a la landing en ${path}`);
}
const missing = await fetch(new URL("/pagina-que-no-existe", base));
assert.equal(missing.status, 404, "Página inexistente devuelve 404");
console.log("OK contacto sin configurar, alternativa estática y 404");
