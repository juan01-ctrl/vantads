"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";

function ScrollToHash() {
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    const hash = window.location.hash;
    if (!hash) return;
    const target = document.querySelector<HTMLElement>(hash);
    if (!target) return;
    lenis.scrollTo(target, { offset: 0 });
  }, [lenis]);
  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root autoRaf options={{ anchors: true, respectReducedMotion: true }}>
      <ScrollToHash />
      {children}
    </ReactLenis>
  );
}