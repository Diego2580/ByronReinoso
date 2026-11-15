import localFont from "next/font/local";

const display = localFont({
  src: "../../node_modules/@fontsource/marcellus/files/marcellus-latin-400-normal.woff2",
  variable: "--font-display",
  weight: "400",
  display: "swap",
  preload: true,
});
const sans = localFont({
  src: "../../node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2",
  variable: "--font-sans",
  weight: "100 900",
  display: "swap",
  preload: true,
});
const heading = localFont({
  src: "../../node_modules/@fontsource-variable/montserrat/files/montserrat-latin-wght-normal.woff2",
  variable: "--font-heading",
  weight: "100 900",
  display: "swap",
  preload: false,
});
const editorial = localFont({
  src: "../../node_modules/@fontsource-variable/cormorant-garamond/files/cormorant-garamond-latin-wght-normal.woff2",
  variable: "--font-editorial",
  weight: "300 700",
  display: "swap",
  preload: false,
});
const mono = localFont({
  src: "../../node_modules/@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2",
  variable: "--font-mono",
  weight: "100 900",
  display: "swap",
  preload: false,
});
export const fontVariables = [
  display.variable,
  sans.variable,
  heading.variable,
  editorial.variable,
  mono.variable,
].join(" ");
