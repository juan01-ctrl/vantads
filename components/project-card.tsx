"use client";

import { useEffect, useRef, useState } from "react";
import { PhoneIcon } from "./icons";
import type { Project } from "../app/content";

export function ProjectCard({ project, className = "" }: { project: Project; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hasViewed, setHasViewed] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [playing, setPlaying] = useState(false);
  const cursorRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dotRef = useRef<HTMLButtonElement>(null);
  const rafRef = useRef<number>(0);

  const play = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.playsInline = true;
    video.play()
      .then(() => setPlaying(true))
      .catch(() => {
        setPlaying(false);
        pause();
      });
  };

  const pause = () => {
    videoRef.current?.pause();
    if (videoRef.current) videoRef.current.currentTime = 0;
  };

  const enter = () => {
    setHovering(true);
    play();
  };

  const leave = () => {
    setHovering(false);
    setPlaying(false);
    pause();
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) video.preload = "auto";
  }, []);

  useEffect(() => {
    if (!hovering) return;
    const loop = () => {
      const dot = dotRef.current;
      const card = cardRef.current;
      if (dot && card) {
        const rect = card.getBoundingClientRect();
        const x = cursorRef.current.x - rect.left - 40;
        const y = cursorRef.current.y - rect.top - 40;
        dot.style.transform = `translate(${x}px, ${y}px)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [hovering]);

  const onMove = (e: React.MouseEvent) => {
    cursorRef.current = { x: e.clientX, y: e.clientY };
  };

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const open = () => {
    const video = modalVideoRef.current;
    if (video) {
      video.muted = false;
      video.play().catch(console.error);
    }
    setIsOpen(true);
  };

  const close = () => {
    modalVideoRef.current?.pause();
    setIsOpen(false);
  };

  useEffect(() => {
    if (!project.featured || hasViewed || !cardRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setHasViewed(true);
      observer.disconnect();
    }, { threshold: 0.35 });
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [hasViewed, project.featured]);

  return <>
    <article ref={cardRef} className={`media-card group relative block w-full cursor-none overflow-hidden rounded-[16px] bg-[#161616] ${className}`} onMouseEnter={enter} onMouseLeave={leave} onMouseMove={onMove} onClick={open}>
      <video ref={videoRef} src={project.previewVideo} poster={project.poster} aria-label={project.alt} muted playsInline autoPlay={false} loop preload="none" className="absolute inset-0 h-full w-full object-cover" />
      <img src={project.poster} alt="" aria-hidden="true" draggable={false} className={`card-poster pointer-events-none absolute inset-0 h-full w-full object-cover ${playing ? "card-poster--hidden" : ""}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
      {project.featured && hasViewed && <div className="phone-hint pointer-events-none absolute inset-0 z-10 flex items-center justify-center gap-3 bg-black/20 text-white/90"><svg className="pointer-click h-7 w-7 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m7.5 3.5 8.8 8.2-4.6 0.5 2.2 5.1-2.1 0.9-2.2-5-2.9 3.5V3.5Z" fill="white" stroke="white" strokeLinejoin="round" /><circle className="pointer-ring" cx="17.8" cy="6.2" r="3.1" stroke="#d34667" strokeWidth="1.2" /></svg><span className="font-mono text-[10px] uppercase tracking-[.1em]">Click to open phone view</span></div>}
      <button ref={dotRef} type="button" onClick={open} className={`media-cursor pointer-events-none absolute left-0 top-0 z-20 flex h-20 w-20 items-center justify-center rounded-full opacity-0 transition-opacity duration-300 ${hovering ? "opacity-100" : ""}`} aria-hidden="true" tabIndex={-1}>
        <svg className="media-cursor-path" viewBox="0 0 80 80" fill="none" aria-hidden="true">
          <defs><path id={`phone-cursor-arc-${project.title.replace(/\W/g, "-")}`} d="M 9 40 A 31 31 0 0 1 71 40" /></defs>
          <text className="media-cursor-text" textAnchor="middle" startOffset="50%">
            <textPath href={`#phone-cursor-arc-${project.title.replace(/\W/g, "-")}`} startOffset="50%">Phone View</textPath>
          </text>
        </svg>
        <PhoneIcon />
      </button>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
        <div><p className="eyebrow mb-2 text-white/65">{project.category}</p><h3 className="max-w-[290px] text-[15px] leading-[1.15] text-white sm:text-[17px]">{project.title}</h3></div>
      </div>
    </article>
    <div className={isOpen ? "fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm" : "hidden"} role="dialog" aria-modal="true" aria-label={`${project.title} preview`}>
      <button type="button" className="absolute inset-0 cursor-default" aria-label="Close video preview" onClick={close} />
      <div className="phone-modal relative z-10 h-[min(84vh,760px)] aspect-[9/16] overflow-hidden rounded-[22px] border border-white/20 bg-[#111] shadow-2xl shadow-black/70">
        <video ref={modalVideoRef} src={project.video} poster={project.poster} aria-label={project.alt} playsInline controls className="h-full w-full object-cover" />
        <button type="button" onClick={close} className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/50 text-lg text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-black" aria-label="Close video preview">×</button>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-14"><p className="eyebrow text-white/70">{project.category}</p><p className="mt-1 text-sm text-white">{project.title}</p></div>
      </div>
    </div>
  </>;
}
