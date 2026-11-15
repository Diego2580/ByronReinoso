"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { BookingLink } from "@/components/ui/BookingLink";
export function Header() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    const triggerElement = trigger.current;
    element?.showModal();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const query = window.matchMedia("(min-width: 960px)");
    const closeOnDesktop = () => {
      if (query.matches) setOpen(false);
    };
    query.addEventListener("change", closeOnDesktop);
    return () => {
      element?.close();
      document.body.style.overflow = oldOverflow;
      query.removeEventListener("change", closeOnDesktop);
      triggerElement?.focus();
    };
  }, [open]);
  return (
    <header className="header wrap">
      <Link href="/" className="wordmark" aria-label={`${site.name}, inicio`}>
        byron
        <span>
          reinoso<span className="logo-dot">.</span>
        </span>
      </Link>
      <nav className="desktop-nav" aria-label="Navegación principal">
        {site.nav.map((item) => (
          <Link
            href={item.href}
            key={item.label}
            aria-current={isActive(item.href) ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="header-action">
        <BookingLink compact />
      </div>
      <button
        ref={trigger}
        type="button"
        className="menu-trigger"
        aria-label={site.menu.open}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(true)}
      >
        <Menu />
      </button>
      <dialog
        ref={dialog}
        id="mobile-nav"
        className="mobile-dialog"
        onCancel={(event) => {
          event.preventDefault();
          setOpen(false);
        }}
        aria-label="Navegación móvil"
      >
        <div className="mobile-top">
          <span>{site.name}</span>
          <button
            type="button"
            className="icon-button"
            onClick={() => setOpen(false)}
            aria-label={site.menu.close}
          >
            <X />
          </button>
        </div>
        <nav
          aria-label="Navegación principal móvil"
          onClick={(event) => {
            if ((event.target as HTMLElement).closest("a")) setOpen(false);
          }}
        >
          {site.nav.map((item, i) => (
            <Link
              href={item.href}
              key={item.label}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              <small>0{i + 1}</small>
              {item.label}
            </Link>
          ))}
          <BookingLink />
        </nav>
      </dialog>
      <noscript>
        <style>{`.menu-trigger{display:none!important}.header{height:auto;min-height:90px;flex-wrap:wrap;padding-block:20px}.no-js-nav{width:100%}`}</style>
        <nav className="no-js-nav" aria-label="Navegación principal">
          {site.nav.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </noscript>
    </header>
  );
}
