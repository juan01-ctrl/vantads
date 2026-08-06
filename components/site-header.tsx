"use client";

import { useState } from "react";
import { CloseIcon, MenuIcon } from "./icons";

const links = [{ label: "Studio", href: "#studio" }, { label: "Services", href: "#services" }, { label: "Work", href: "#work" }, { label: "Pricing", href: "#pricing" }, { label: "Contact", href: "#contact" }];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="absolute inset-x-0 top-0 z-20 px-5 py-6 sm:px-8 sm:py-7">
    <nav className="mx-auto flex max-w-[1038px] items-center justify-between" aria-label="Main navigation">
      <div className="hidden items-center gap-5 md:flex">{links.slice(0, 2).map((link) => <a key={link.label} href={link.href} className="eyebrow transition-colors hover:text-white">{link.label}</a>)}</div>
      <a href="#studio" className="font-mono text-[12px] font-medium tracking-[.18em] text-white">VANTA AI STUDIO</a>
      <div className="hidden items-center gap-5 md:flex">{links.slice(2).map((link) => <a key={link.label} href={link.href} className="eyebrow transition-colors hover:text-white">{link.label}</a>)}</div>
      <button className="text-white md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <CloseIcon /> : <MenuIcon />}</button>
    </nav>
    {open && <div className="absolute inset-x-4 top-[68px] border border-white/15 bg-[#111] p-6 md:hidden"><div className="flex flex-col gap-5">{links.map((link) => <a key={link.label} href={link.href} className="text-sm" onClick={() => setOpen(false)}>{link.label}</a>)}</div></div>}
  </header>;
}
