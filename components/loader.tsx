"use client";

import { useEffect, useState } from "react";
import { useI18n } from "../lib/i18n";

export function Loader() {
  const [done, setDone] = useState(false);
  const { t } = useI18n();
  const brand = t("brand");

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loader ${done ? "loader--done" : ""}`} aria-hidden="true">
      <div className="loader-inner">
        <p className="loader-brand">{brand}</p>
        <span className="loader-line" />
        <p className="loader-sub">EST · 2026</p>
      </div>
    </div>
  );
}