"use client";

import type { ReactNode } from "react";
import { LangSwitcher } from "./lang-switcher";
import { useI18n } from "../lib/i18n";

/** Minimal brand header for client-share pages (no site navigation). */
export function ShareHeader({ trailing }: { trailing?: ReactNode }) {
  const { t } = useI18n();

  return (
    <header className="mb-12 flex flex-wrap items-center justify-between gap-6 px-5 sm:mb-16 sm:px-8">
      <div className="flex h-7 items-center">
        <img
          src="https://assets.vantads.studio/vantadslogo.png"
          alt={t("brand")}
          className="h-full w-auto object-contain"
        />
      </div>
      {trailing}
    </header>
  );
}

export function ShareHeaderWithLang({ trailing }: { trailing?: ReactNode }) {
  return (
    <ShareHeader
      trailing={
        <div className="flex items-center gap-5">
          {trailing}
          <LangSwitcher />
        </div>
      }
    />
  );
}
