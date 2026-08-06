"use client";

import { useI18n } from "../lib/i18n";

export function LangSwitcher() {
  const { lang, setLang } = useI18n();
  const options = [
    { code: "es", label: "ES" },
    { code: "en", label: "EN" },
  ] as const;

  return (
    <div role="group" aria-label="Language" className="flex items-center gap-0.5 rounded-full border border-white/15 bg-white/5 px-1 py-0.5 backdrop-blur-sm">
      {options.map((opt) => {
        const active = lang === opt.code;
        return (
          <button
            key={opt.code}
            type="button"
            onClick={() => setLang(opt.code)}
            aria-pressed={active}
            className={`rounded-full px-2 py-1 font-mono text-[10px] tracking-[.08em] transition-colors duration-300 ${active ? "bg-[#d34667] text-white" : "text-[#b3b0ac] hover:text-white"}`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}