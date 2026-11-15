"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// El contenido y la navegación no dependen del módulo de animación.
export function PageMotion() {
  const pathname = usePathname();
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    import("@/lib/animate-page")
      .then(({ animatePage }) => {
        if (!disposed) cleanup = animatePage();
      })
      .catch(() => {
        /* La página mantiene su presentación estática. */
      });
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [pathname]);
  return null;
}
