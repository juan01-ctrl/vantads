"use client";

import { useEffect, useState } from "react";

export function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loader ${done ? "loader--done" : ""}`} aria-hidden="true">
      <div className="loader-inner">
        <img src="/vantadslogo.png" alt="" className="loader-brand-img" />
        <span className="loader-line" />
        <p className="loader-sub">EST · 2026</p>
      </div>
    </div>
  );
}