"use client";

import { useEffect, useRef } from "react";

export function SiteCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(false);
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: PointerEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      posRef.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };

    const onDown = () => {
      dot.style.transform = `${dot.style.transform.split("scale")[0]} scale(.8)`;
      ring.style.transform = `${ring.style.transform.split("scale")[0]} scale(.8)`;
    };

    let raf = 0;
    const loop = () => {
      const target = targetRef.current;
      const pos = posRef.current;
      pos.x += (target.x - pos.x) * 0.24;
      pos.y += (target.y - pos.y) * 0.24;
      ring.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    const onOver = (e: PointerEvent) => {
      const t = e.target as Element;
      if (t && t.closest("a, button, [data-cursor], input, textarea, select")) {
        ring.classList.add("site-cursor--hover");
        activeRef.current = true;
      } else {
        ring.classList.remove("site-cursor--hover");
        activeRef.current = false;
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerover", onOver);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="site-cursor site-cursor--dot" aria-hidden="true" />
      <div ref={ringRef} className="site-cursor site-cursor--ring" aria-hidden="true">
        <span className="site-cursor-grain" />
      </div>
    </>
  );
}