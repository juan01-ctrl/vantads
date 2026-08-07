"use client";

import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "./icons";
import { LangSwitcher } from "./lang-switcher";
import { useI18n } from "../lib/i18n";

const linkKeys = [{ label: "studio", href: "#studio" }, { label: "services", href: "#services" }, { label: "work", href: "#work" }, { label: "pricing", href: "#pricing" }, { label: "contact", href: "#contact" }];
const infoKeys = [{ label: "info", href: "/info", noIndex: true }];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [atRoot, setAtRoot] = useState(true);
  const { t, lang } = useI18n();
  useEffect(() => { setAtRoot(window.location.pathname === "/" || window.location.pathname === ""); }, []);
  const root = atRoot ? "" : "/";
  const links = [...linkKeys.map((l) => ({ ...l, href: `${root}${l.href}`, label: t(`nav.${l.label}`) })), ...infoKeys.map((l) => ({ ...l, label: t(`nav.${l.label}`) }))];
  useEffect(() => { const lock = open ? "hidden" : ""; document.body.style.overflow = lock; document.documentElement.style.overflow = lock; return () => { document.body.style.overflow = ""; document.documentElement.style.overflow = ""; }; }, [open]);
  const close = () => { setLeaving(true); window.setTimeout(() => { setOpen(false); setLeaving(false); }, 450); };
  return <header className="absolute inset-x-0 top-0 z-20 px-5 py-6 sm:px-8 sm:py-7">
    <nav className="mx-auto flex max-w-[1038px] items-center justify-between" aria-label="Main navigation">
      <div className="hidden items-center gap-5 md:flex">{links.slice(0, 2).map((link) => <a key={link.label} href={link.href} className="eyebrow !text-white !font-semibold transition-colors hover:!text-white">{link.label}</a>)}</div>
      <a href={atRoot ? "#studio" : "/"} className="flex h-7 shrink-0 items-center"><span className="hidden font-mono text-[12px] font-medium tracking-[.18em] text-white md:inline">{t("brand")}</span><img src="https://assets.vantads.studio/vantadslogo.png" alt={t("brand")} className="h-full w-auto object-contain md:hidden" /></a>
      <div className="hidden items-center gap-5 md:flex">{links.slice(2).map((link) => <a key={link.label} href={link.href} className="eyebrow !text-white !font-semibold transition-colors hover:!text-white">{link.label}</a>)}<div className="ml-2"><LangSwitcher /></div></div>
      <div className="flex items-center gap-4 md:hidden"><LangSwitcher /><button className="relative z-30 flex h-9 w-9 items-center justify-center text-white" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => open ? close() : setOpen(true)}>{open ? <span className={`menu-close ${leaving ? "menu-close--leave" : ""}`}><CloseIcon /></span> : <MenuIcon />}</button></div>
    </nav>
    {open && <div className={`menu-overlay ${leaving ? "menu-overlay--leave" : ""}`} aria-hidden={leaving}><div className="px-5 pt-28 pb-10 sm:px-8"><nav className="menu-links" aria-label="Mobile menu">{links.map((link, i) => <a key={link.label} href={link.href} className="menu-link" style={{ "--i": i } as React.CSSProperties} onClick={close}><span className="menu-link-index">{String(i + 1).padStart(2, "0")}</span><span className="menu-link-text">{link.label}</span><span className="menu-link-arrow">↗</span></a>)}</nav><div className="menu-foot"><p className="eyebrow !text-white/50">{t("footer.addresses")}</p><a href="mailto:hello@vantads.studio" className="mt-3 font-mono text-[11px] text-white">hello@vantads.studio</a></div></div></div>}
  </header>;
}