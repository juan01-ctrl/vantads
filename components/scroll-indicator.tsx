"use client";

import { useI18n } from "../lib/i18n";

export function ScrollIndicator() {
  const { t } = useI18n();
  const label = t("hero.scroll");
  return <div className="relative h-24 w-24 text-[#9d9a96]" aria-label={t("hero.scrollAria")}><svg className="scroll-ring absolute inset-0 h-full w-full" viewBox="0 0 100 100"><defs><path id="circle-path" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" /></defs><text><textPath href="#circle-path">{label}</textPath></text></svg><span className="scroll-arrow absolute inset-0 flex items-center justify-center text-xl">↓</span></div>;
}