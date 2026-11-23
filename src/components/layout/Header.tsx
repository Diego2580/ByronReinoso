"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import s from "./header.module.css";
import { site } from "@/content/site";
import { BookingLink } from "@/components/ui/BookingLink";
export function Header() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const bar = useRef<HTMLDivElement>(null);
  const brand = useRef<HTMLAnchorElement>(null);
  const navigation = useRef<HTMLElement>(null);
  const action = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const scroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setCompact(previous => window.scrollY > (previous ? 32 : 64)));
    };
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", scroll); };
  }, []);
  useEffect(() => {
    const measure = () => {
      if (!bar.current || !brand.current || !navigation.current || !action.current) return;
      const styles = getComputedStyle(bar.current);
      const needed = brand.current.getBoundingClientRect().width + navigation.current.scrollWidth + action.current.scrollWidth + 48 + parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
      const hide = window.innerWidth < 768 || bar.current.clientWidth < needed;
      setCollapsed(hide);
      if (!hide) setOpen(false);
    };
    const observer = new ResizeObserver(measure);
    [bar.current, brand.current, navigation.current, action.current].forEach(node => { if (node) observer.observe(node); });
    const frame = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("resize", measure); };
  }, []);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    const triggerElement = trigger.current;
    const brandElement = brand.current;
    element?.showModal();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = oldOverflow;
      if (triggerElement?.getClientRects().length) triggerElement.focus();
      else brandElement?.focus();
    };
  }, [open]);
  return (
    <div className={s.reserve}>
    <header className={s.shell} data-compact={compact}>
    <div ref={bar} className={s.bar} data-collapsed={collapsed}>
      <Link ref={brand} href="/" className={s.brand} aria-label={`${site.name}, inicio`}>
        <strong>{site.name}</strong><span>{site.descriptor}</span>
      </Link>
      <nav ref={navigation} className={s.navigation} aria-label="Navegación principal" inert={collapsed}>
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
      <div ref={action} className={s.action} inert={collapsed}>
        <BookingLink compact className={s.cta} />
      </div>
      <button
        ref={trigger}
        type="button"
        className={s.menu}
        aria-label={site.menu.open}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(true)}
      >
        <Menu />
      </button>
    </div>
      <dialog
        ref={dialog}
        id="mobile-nav"
        className={s.dialog}
        onCancel={(event) => {
          event.preventDefault();
          setOpen(false);
        }}
        aria-label="Navegación móvil"
      >
        <div className={s.mobileTop}>
          <span>{site.name}</span>
          <button
            type="button"
            className={s.close}
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
          <BookingLink className={s.cta} />
        </nav>
      </dialog>
      <noscript>
        <style>{`.${s.menu}{display:none!important}.${s.shell}{position:relative}.${s.reserve}{height:auto}`}</style>
        <nav className={s.noJs} aria-label="Navegación principal">
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
    </div>
  );
}
