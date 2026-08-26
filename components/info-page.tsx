"use client";

import { ShareHeaderWithLang } from "./share-header";
import { useI18n } from "../lib/i18n";

function SectionLabel({ children }: { children: React.ReactNode }) { return <p className="eyebrow">{children}</p>; }

export function InfoPage() {
  const { t, ta } = useI18n();
  const svc = ta("svc") as unknown as { title: string; text: string }[];
  const process = ta("info.process") as unknown as [string, string, string][];
  const specs = ta("info.specs") as unknown as [string, string][];
  const plans = ta("info.plans") as unknown as { name: string; volume: string; price: string; perVideo: string; features: string }[];

  return <main className="site-shell grain pb-16 pt-10 sm:pb-24 sm:pt-14">
    <ShareHeaderWithLang />

    <section className="px-5 sm:px-8">
      <SectionLabel>{t("info.label")}</SectionLabel>
      <h1 className="mt-8 max-w-[760px] text-[clamp(44px,7.5vw,96px)] font-light leading-[.86] tracking-[-.08em] text-white">{t("info.titleA")}<br /><span className="display-serif">{t("info.titleB")}</span></h1>
      <p className="mt-8 max-w-[460px] text-[14px] leading-[1.6] text-[#aaa7a3]">{t("info.intro")}</p>
    </section>

    <section className="mt-20 border-t border-white/[.07] px-5 py-12 sm:mt-28 sm:px-8">
      <SectionLabel>{t("info.whatLabel")}</SectionLabel>
      <div className="mt-10 grid gap-px bg-white/[.07] sm:grid-cols-2 lg:grid-cols-3">
        {svc.map((s, i) => <div key={s.title} className="bg-[#111] p-6"><p className="service-index">{String(i + 1).padStart(2, "0")}</p><h3 className="mt-5 text-[16px] leading-[1.1] tracking-[-.03em] text-white">{s.title}</h3><p className="mt-3 text-[12px] leading-[1.55] text-[#8b8986]">{s.text}</p></div>)}
      </div>
    </section>

    <section className="border-t border-white/[.07] px-5 py-12 sm:px-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3"><SectionLabel>{t("info.howLabel")}</SectionLabel><p className="max-w-[320px] text-[12px] leading-[1.5] text-[#8a8986]">{t("info.howIntro")}</p></div>
      <ol className="mt-10 space-y-0">
        {process.map(([time, title, text], i) => <li key={i} className="grid gap-2 border-b border-white/[.07] py-6 md:grid-cols-[140px_240px_1fr] md:items-baseline md:gap-10"><span className="font-mono text-[11px] uppercase tracking-[.14em] text-[#d34667]">{time}</span><h4 className="text-[17px] font-medium tracking-[-.02em] text-white">{title}</h4><p className="max-w-[460px] text-[12px] leading-[1.55] text-[#8a8986]">{text}</p></li>)}
      </ol>
    </section>

    <section className="border-t border-white/[.07] px-5 py-12 sm:px-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <SectionLabel>{t("info.priceLabel")}</SectionLabel>
        <p className="font-mono text-[9px] uppercase tracking-[.12em] text-[#8a8986]">{t("info.priceNote")}</p>
      </div>
      <div className="mt-10 space-y-px bg-white/[.07]">
        {plans.map((p) => <div key={p.name} className="grid gap-4 bg-[#111] p-6 sm:grid-cols-[1fr_auto] sm:items-start sm:py-8"><div><div className="flex items-center gap-3"><h4 className="text-[18px] tracking-[-.02em] text-white">{p.name}</h4><span className="eyebrow text-[#8a8986]">{p.volume}</span></div><p className="mt-3 max-w-[62ch] text-[12px] leading-[1.55] text-[#8a8986]">{p.features}</p></div><div className="sm:text-right sm:pl-8"><p className="font-mono text-xl leading-none text-white">{p.price}</p><p className="mt-2 font-mono text-[10px] uppercase tracking-[.08em] text-[#d34667]">{p.perVideo}</p><a href={`mailto:hello@vantads.studio?subject=${encodeURIComponent(String(t("pricing.mail.subject")).replace("{plan}", p.name))}&body=${encodeURIComponent(String(t("pricing.mail.body")).replace("{plan}", p.name).replace("{volume}", p.volume))}`} className="mt-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[.1em] text-white underline underline-offset-4 hover:text-[#d34667]">{t("info.start")} →</a></div></div>)}
      </div>
    </section>

    <section className="border-t border-white/[.07] px-5 py-12 sm:px-8">
      <SectionLabel>{t("info.specsLabel")}</SectionLabel>
      <dl className="mt-10">
        {specs.map(([k, v]) => <div key={k} className="grid border-b border-white/[.07] py-4 md:grid-cols-[220px_1fr]"><dt className="eyebrow pt-0.5 text-[#8a8986]">{k}</dt><dd className="text-[14px] leading-[1.5] text-white">{v}</dd></div>)}
      </dl>
    </section>

    <section className="hero-glow relative border-t border-white/[.07] px-5 py-24 sm:px-8">
      <SectionLabel>{t("info.contactLabel")}</SectionLabel>
      <p className="mt-6 max-w-[380px] text-[14px] leading-[1.6] text-[#aaa7a3]">{t("info.contactIntro")}</p>
      <a href="mailto:hello@vantads.studio" className="mt-10 inline-flex items-center gap-4 border-b border-white/30 pb-3 text-[12px] uppercase tracking-[.1em] transition-colors hover:border-[#d34667] hover:text-[#d34667]">hello@vantads.studio <span>→</span></a>
    </section>

    <footer className="border-t border-white/[.07] px-5 py-7 sm:px-8"><p className="eyebrow">© {new Date().getFullYear()} {t("brand")} · {t("footer.addresses")}</p></footer>
  </main>;
}