"use client";

import type { ReactNode } from "react";
import { ProjectCard } from "./project-card";
import { ScrollIndicator } from "./scroll-indicator";
import { ArrowIcon, ReelIcon, GemIcon, MotionIcon, BoltIcon, LayersIcon, TagIcon } from "./icons";
import { projects } from "../app/content";
import { useI18n } from "../lib/i18n";

function SectionLabel({ children }: { children: ReactNode }) { return <p className="eyebrow">{children}</p>; }

const serviceIcons = [ReelIcon, GemIcon, MotionIcon, BoltIcon, LayersIcon, TagIcon];

function ServiceRow({ index, title, text, icon: Icon }: { index: number; title: string; text: string; icon: (p: { className?: string }) => ReactNode }) {
  return <article className="service-row group relative isolate flex items-center gap-5 px-2 py-7 sm:gap-8 sm:px-4 sm:py-8">
    <span className="service-fill pointer-events-none absolute inset-0 -z-10 origin-left scale-x-0 bg-gradient-to-r from-[#1a1113] to-transparent" aria-hidden="true" />
    <span className="w-7 shrink-0 font-mono text-[11px] tracking-[.12em] text-[#5c5a57] transition-colors duration-300 group-hover:text-[#d34667]">{String(index + 1).padStart(2, "0")}</span>
    <div className="service-body flex flex-1 flex-col gap-2.5 transition-transform duration-500 sm:flex-row sm:items-center sm:gap-8">
      <h3 className="w-full text-[clamp(22px,2.4vw,30px)] leading-[1.02] tracking-[-.05em] text-white sm:w-[46%]">{title}</h3>
      <p className="max-w-[360px] text-[12px] leading-[1.55] text-[#8a8783] sm:flex-1">{text}</p>
    </div>
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 text-[#6f6d6a] transition-all duration-500 group-hover:border-[#d34667]/50 group-hover:text-[#d34667]"><Icon className="h-[22px] w-[22px]" /></span>
  </article>;
}

export function HomePage({ children }: { children: ReactNode }) {
  const { t, ta } = useI18n();
  const services = ta("svc") as unknown as { title: string; text: string }[];
  const steps = ta("steps") as unknown as [string, string][];
  const plans = ["essential", "growth", "scale"] as const;

  return <main className="site-shell grain">
    <section id="studio" className="hero-glow isolate section-fullbleed relative flex min-h-[680px] flex-col justify-between overflow-hidden px-5 pb-10 pt-28 sm:min-h-[780px] sm:px-8 sm:pb-14 sm:pt-36"><video className="hero-video" autoPlay playsInline muted loop preload="auto" aria-hidden="true"><source src="/herovideo.mp4" type="video/mp4" /></video>{children}<div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_4fr_1.35fr] md:items-start"><div className="eyebrow max-w-[80px] whitespace-pre-line">{t("hero.eyebrow")}</div><h1 className="text-[clamp(52px,9.1vw,116px)] font-light leading-[.79] tracking-[-.085em] text-white">{t("hero.h1a")}<br />{t("hero.h1b")}<br /><span className="display-serif tracking-[-.06em]">{t("hero.h1c")}</span></h1><p className="max-w-[220px] self-end text-[12px] leading-[1.45] text-[#aaa7a3] md:pb-2">{t("hero.sub")}</p></div><div className="flex items-end justify-between border-t border-white/[.07] pt-6"><p className="eyebrow max-w-[170px] whitespace-pre-line">{t("hero.tagline")}</p><ScrollIndicator /></div></section>

<section id="services" className="border-t border-white/[.07] px-5 py-20 sm:px-8 sm:py-28"><div className="grid gap-12 md:grid-cols-[1.1fr_2.9fr]"><div className="flex flex-col justify-between"><div><SectionLabel>{t("services.label")}</SectionLabel><h2 className="mt-6 text-[clamp(48px,7vw,88px)] font-light leading-[.85] tracking-[-.08em] text-white">{t("services.titleA")}<br />{t("services.titleB")}</h2></div><p className="eyebrow mt-12 max-w-[110px] whitespace-pre-line text-[#e2dfda]">{t("services.tagline")}</p></div><div className="flex flex-col divide-y divide-white/[.08] border-y border-white/[.08]">{services.map((s, i) => <ServiceRow key={s.title} index={i} title={s.title} text={s.text} icon={serviceIcons[i % serviceIcons.length]} />)}</div></div></section>

    <section id="work" className="border-t border-white/[.07] px-5 py-20 sm:px-8 sm:py-28"><div className="mb-12 flex items-end justify-between"><div><SectionLabel>{t("work.label")}</SectionLabel><h2 className="mt-5 text-[clamp(48px,7vw,88px)] font-light leading-[.86] tracking-[-.08em] text-white">SELECTED<br /><span className="display-serif">WORK</span></h2></div><p className="eyebrow hidden max-w-[150px] whitespace-pre-line text-right sm:block">{t("work.eyebrow")}</p></div><div className="grid gap-4"><ProjectCard project={projects[0]} className="aspect-[1.85/1]" /><div className="grid gap-4 md:grid-cols-2"><ProjectCard project={projects[1]} className="aspect-[1.08/1]" /><ProjectCard project={projects[2]} className="aspect-[1.08/1]" /></div><div className="grid gap-4 md:grid-cols-2"><ProjectCard project={projects[3]} className="aspect-[1.08/1]" /><ProjectCard project={projects[4]} className="aspect-[1.08/1]" /></div></div></section>

    <section id="process" className="border-t border-white/[.07] px-5 py-20 sm:px-8 sm:py-28"><div className="grid gap-12 md:grid-cols-[1.1fr_2.9fr]"><div><SectionLabel>{t("process.label")}</SectionLabel><h2 className="mt-6 text-[clamp(48px,7vw,82px)] font-light leading-[.84] tracking-[-.08em] text-white">{t("process.titleA")}<br />{t("process.titleB")}<br /><span className="display-serif">{t("process.titleC")}</span></h2></div><ol className="flex flex-col">{steps.map(([title, text], i) => <li key={i} className="process-step group relative grid grid-cols-[auto_1fr] gap-6 pb-11 last:pb-0 sm:gap-9"><div className="relative flex flex-col items-center"><span className="display-serif relative z-10 flex h-[62px] w-[62px] items-center justify-center rounded-full border border-white/[.12] bg-[#0b0b0b] text-[30px] leading-none text-[#d34667] transition-colors duration-500 group-hover:border-[#d34667]/50">0{i + 1}</span>{i < steps.length - 1 && <span className="mt-1 w-px flex-1 bg-gradient-to-b from-white/25 to-white/[.04]" aria-hidden="true" />}</div><div className="pt-3.5"><h3 className="text-[21px] tracking-[-.045em] text-white transition-transform duration-500 group-hover:translate-x-1">{title}</h3><p className="mt-3 max-w-[340px] text-[12px] leading-[1.6] text-[#8a8783]">{text}</p></div></li>)}</ol></div></section>

    <section id="pricing" className="border-t border-white/[.07] px-5 py-20 sm:px-8 sm:py-28"><div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><SectionLabel>{t("pricing.label")}</SectionLabel><h2 className="mt-6 max-w-[700px] text-[clamp(48px,7vw,86px)] font-light leading-[.84] tracking-[-.08em] text-white">{t("pricing.titleA")}<br /><span className="display-serif">{t("pricing.titleB")}</span></h2></div><p className="max-w-[230px] text-[12px] leading-[1.45] text-[#aaa7a3]">{t("pricing.sub")}</p></div><div className="mb-8 flex items-start gap-4 border border-white/[.1] bg-[#171215] p-5"><span className="mt-0.5 inline-flex shrink-0 items-center gap-2 rounded-full border border-[#d34667]/40 bg-[#d34667]/10 px-2.5 py-1 font-mono text-[9px] uppercase leading-none tracking-[.08em] text-[#df6b85]">{t("pricing.badge")}</span><div><p className="text-sm tracking-[-.02em] text-white">{t("pricing.badgeTitle")}</p><p className="mt-1 text-[12px] leading-[1.45] text-[#aaa7a3]">{t("pricing.badgeText")}</p></div></div><div className="grid gap-3 lg:grid-cols-3">{plans.map((name) => <PlanCard key={name} plan={name} />)}</div><p className="mt-8 text-[11px] text-[#85827f]">{t("pricing.custom")} <a href="#contact" className="text-white underline underline-offset-4">{t("pricing.customLink")}</a> {t("pricing.customTail")}</p></section>

    <section className="border-t border-white/[.07] px-5 py-20 sm:px-8 sm:py-24"><div className="grid gap-12 md:grid-cols-[1.1fr_2.9fr]"><div><SectionLabel>{t("signal.label")}</SectionLabel><h2 className="mt-6 text-[clamp(48px,7vw,78px)] font-light leading-[.84] tracking-[-.08em] text-white">{t("signal.titleA")}<br />{t("signal.titleB")} <span className="display-serif">{t("signal.titleC")}</span></h2></div><div className="grid gap-px bg-white/[.1] sm:grid-cols-2"><div className="bg-[#111] p-6"><p className="eyebrow text-[#d34667]">{t("signal.adv")}</p><p className="mt-12 text-2xl whitespace-pre-line leading-[1.05] tracking-[-.06em] text-white">{t("signal.advText")}</p></div><div className="bg-[#111] p-6"><blockquote className="mt-5 text-[17px] leading-[1.2] tracking-[-.04em] text-white">{t("signal.q1")}</blockquote><p className="eyebrow mt-10">— {t("signal.q1by")}</p></div><div className="bg-[#111] p-6 sm:col-span-2"><blockquote className="max-w-[570px] text-[17px] leading-[1.2] tracking-[-.04em] text-white">{t("signal.q2")}</blockquote><p className="eyebrow mt-8">— {t("signal.q2by")}</p></div></div></div></section>

    <section id="contact" className="hero-glow border-t border-white/[.07] px-5 py-24 sm:px-8 sm:py-36"><div className="flex flex-col justify-between gap-14 md:flex-row"><div><SectionLabel>{t("contact.label")}</SectionLabel><h2 className="mt-7 text-[clamp(54px,8.5vw,105px)] font-light leading-[.8] tracking-[-.09em] text-white">{t("contact.titleA")}<br />{t("contact.titleB")}<br /><span className="display-serif">{t("contact.titleC")}<br />{t("contact.titleD")}</span></h2></div><div className="flex max-w-[225px] flex-col justify-end"><p className="text-[13px] leading-[1.45] text-[#aaa7a3]">{t("contact.sub")}</p><a href="mailto:hello@vantads.studio" className="mt-8 inline-flex w-fit items-center gap-4 border-b border-white/30 pb-3 text-[12px] uppercase tracking-[.1em] transition-colors hover:border-[#d34667] hover:text-[#d34667]">{t("contact.cta")} <ArrowIcon className="h-4 w-4" /></a><a href="#work" className="mt-5 text-[11px] text-[#85827f] underline underline-offset-4">{t("contact.view")}</a><p className="mt-16 font-mono text-[11px] text-white">hello@vantads.studio</p></div></div></section>

    <footer className="border-t border-white/[.07] px-5 py-7 sm:px-8"><div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"><div><p className="font-mono text-[12px] tracking-[.16em] text-white">{t("brand")}</p><p className="eyebrow mt-3">{t("footer.addresses")}</p></div><div className="flex flex-wrap gap-x-5 gap-y-3 text-[10px] uppercase tracking-[.08em] text-[#85827f]"><a href="https://www.instagram.com/vanta.ia" target="_blank" rel="noopener noreferrer" className="hover:text-white">{t("footer.instagram")}</a></div><p className="eyebrow sm:text-right">© {new Date().getFullYear()} {t("brand")}</p></div></footer>
  </main>;
}

function PlanCard({ plan }: { plan: "essential" | "growth" | "scale" }) {
  const { t, ta } = useI18n();
  const featured = plan === "growth";
  const p = {
    name: t(`plans.${plan}.name`),
    volume: t(`plans.${plan}.volume`),
    description: t(`plans.${plan}.description`),
    price: t(`plans.${plan}.price`),
    perVideo: t(`plans.${plan}.perVideo`),
    discount: t(`plans.${plan}.discount`),
    cta: t(`plans.${plan}.cta`),
    features: ta(`plans.${plan}.features`) as unknown as string[],
  };
  const isStandard = p.discount === t("plans.essential.discount");
  return <article className={`price-card relative flex flex-col border p-6 ${featured ? "border-[#b6442a] bg-[#171215]" : "border-white/[.1] bg-[#111]"}`}>{featured && <span className="absolute right-5 top-5 eyebrow text-[#df6b83]">{t("pricing.popular")}</span>}<div className="flex items-center gap-3"><p className="eyebrow">{p.name}</p><span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[.08em] ${isStandard ? "border-white/15 bg-white/5 text-[#85827f]" : "border-[#d34667]/40 bg-[#d34667]/10 text-[#df6b83]"}`}>{p.discount}</span></div><h3 className="mt-8 text-3xl tracking-[-.07em] text-white">{p.volume}</h3><p className="mt-4 min-h-[38px] text-[12px] leading-[1.45] text-[#aaa7a3]">{p.description}</p><div className="mt-7 border-t border-white/[.1] pt-5"><p className="font-mono text-xl text-white">{p.price}</p><p className="mt-2 font-mono text-[10px] uppercase tracking-[.06em] text-[#d34667]">{p.perVideo}</p></div><ul className="mt-7 space-y-3 border-t border-white/[.1] pt-6">{p.features.map((feature) => <li key={feature} className="flex gap-3 text-[11px] text-[#b1aeaa]"><span className="text-[#d34667]">+</span>{feature}</li>)}</ul><a href="#contact" className="mt-8 flex items-center justify-between border border-white/20 px-4 py-3 text-[11px] uppercase tracking-[.08em] transition-colors hover:border-[#d34667] hover:bg-[#d34667] hover:text-white">{p.cta}<ArrowIcon className="h-4 w-4" /></a></article>;
}
