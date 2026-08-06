"use client";

import { useEffect, useRef, useState } from "react";
import { PhoneIcon } from "./icons";
import type { Project } from "../app/content";

const IS_SAFARI =
  typeof navigator !== "undefined" &&
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export function ProjectCard({ project, className = "" }: { project: Project; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hasViewed, setHasViewed] = useState(false);
  const [hovering, setHovering] = useState(false);

  const play = () => {
    if (IS_SAFARI) return;
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.playsInline = true;
    video.play().catch(console.error);
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
    pause();
  };

  useEffect(() => {
    if (IS_SAFARI) return;
    const video = videoRef.current;
    if (video) video.preload = "auto";
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
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
    <article ref={cardRef} className={`media-card group relative block w-full cursor-pointer overflow-hidden rounded-[16px] bg-[#161616] ${className}`} onMouseEnter={enter} onMouseLeave={leave} onClick={open}>
      <video ref={videoRef} src={project.previewVideo} poster={project.poster} aria-label={project.alt} muted playsInline autoPlay={false} loop preload="none" className="absolute inset-0 h-full w-full object-cover" />
      <img src={project.poster} alt="" aria-hidden="true" draggable={false} className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${hovering ? "opacity-0" : "opacity-100"}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
      {project.featured && hasViewed && <div className="phone-hint pointer-events-none absolute inset-0 z-10 flex items-center justify-center gap-3 bg-black/20 text-white/90"><svg className="pointer-click h-7 w-7 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m7.5 3.5 8.8 8.2-4.6 0.5 2.2 5.1-2.1 0.9-2.2-5-2.9 3.5V3.5Z" fill="white" stroke="white" strokeLinejoin="round" /><circle className="pointer-ring" cx="17.8" cy="6.2" r="3.1" stroke="#d34667" strokeWidth="1.2" /></svg><span className="font-mono text-[10px] uppercase tracking-[.1em]">Click to open phone view</span></div>}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
        <div><p className="eyebrow mb-2 text-white/65">{project.category}</p><h3 className="max-w-[290px] text-[15px] leading-[1.15] text-white sm:text-[17px]">{project.title}</h3></div>
        <button type="button" onClick={open} onFocus={enter} onBlur={leave} className="phone-trigger flex shrink-0 items-center gap-2 border border-white/30 bg-black/30 px-3 py-2 text-[10px] uppercase tracking-[.08em] text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white hover:text-black" aria-label={`View ${project.title} on phone`}><PhoneIcon /> <span className="hidden sm:inline">Phone view</span></button>
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
