"use client";

import { useState } from "react";
import { CloseIcon, MenuIcon } from "./icons";
import { LangSwitcher } from "./lang-switcher";
import { useI18n } from "../lib/i18n";

const linkKeys = [{ label: "studio", href: "#studio" }, { label: "services", href: "#services" }, { label: "work", href: "#work" }, { label: "pricing", href: "#pricing" }, { label: "contact", href: "#contact" }];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { t, lang } = useI18n();
  const links = linkKeys.map((l) => ({ ...l, label: t(`nav.${l.label}`) }));
  return <header className="absolute inset-x-0 top-0 z-20 px-5 py-6 sm:px-8 sm:py-7">
    <nav className="mx-auto flex max-w-[1038px] items-center justify-between" aria-label="Main navigation">
      <div className="hidden items-center gap-5 md:flex">{links.slice(0, 2).map((link) => <a key={link.label} href={link.href} className="eyebrow !text-white !font-semibold transition-colors hover:!text-white">{link.label}</a>)}</div>
      <a href="#studio" className="font-mono text-[12px] font-medium tracking-[.18em] text-white">{t("brand")}</a>
      <div className="hidden items-center gap-5 md:flex">{links.slice(2).map((link) => <a key={link.label} href={link.href} className="eyebrow !text-white !font-semibold transition-colors hover:!text-white">{link.label}</a>)}</div>
      <div className="flex items-center gap-4"><LangSwitcher /><button className="text-white md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <CloseIcon /> : <MenuIcon />}</button></div>
    </nav>
    {open && <div className="absolute inset-x-4 top-[68px] border border-white/15 bg-[#111] p-6 md:hidden"><div className="flex flex-col gap-5">{links.map((link) => <a key={link.label} href={link.href} className="text-[#df6b83]" onClick={() => setOpen(false)}>{link.label}</a>)}</div></div>}
  </header>;
}