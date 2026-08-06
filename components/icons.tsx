export function ArrowIcon({ className = "" }: { className?: string }) { return <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M8 5h11v11" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" /></svg>; }
export function MenuIcon() { return <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><path d="M3 7h16M3 15h16" stroke="currentColor" strokeWidth="1.4" /></svg>; }
export function CloseIcon() { return <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><path d="m5 5 12 12M17 5 5 17" stroke="currentColor" strokeWidth="1.4" /></svg>; }
export function SparkIcon() { return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M9 1.8 10.6 7.4 16.2 9l-5.6 1.6L9 16.2l-1.6-5.6L1.8 9l5.6-1.6L9 1.8Z" stroke="currentColor" strokeWidth="1.15" /></svg>; }
export function PlayIcon() { return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="7.2" stroke="currentColor" strokeWidth="1.15" /><path d="m7.5 5.8 4.5 3.2-4.5 3.2V5.8Z" stroke="currentColor" strokeWidth="1.15" /></svg>; }
export function PhoneIcon() { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="4.25" y="1.5" width="7.5" height="13" rx="1.4" stroke="currentColor" strokeWidth="1.1" /><path d="M7 3h2M7.2 12.4h1.6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" /></svg>; }

type IconProps = { className?: string };
const svgBase = { width: 26, height: 26, viewBox: "0 0 26 26", fill: "none", "aria-hidden": true } as const;

/* Viral Product Ads — vertical reel frame with play */
export function ReelIcon({ className = "" }: IconProps) { return <svg {...svgBase} className={className}><rect x="6.5" y="3" width="13" height="20" rx="2" stroke="currentColor" strokeWidth="1.1" /><path d="M11 9.7 15.5 13 11 16.3V9.7Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" /></svg>; }
/* Premium AI Visuals — faceted gem */
export function GemIcon({ className = "" }: IconProps) { return <svg {...svgBase} className={className}><path d="M8 4h10l4 6-9 12L4 10l4-6Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" /><path d="M4 10h18M10 4l3 18M16 4l-3 18" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" /></svg>; }
/* Motion-First Creative — speed / motion arcs */
export function MotionIcon({ className = "" }: IconProps) { return <svg {...svgBase} className={className}><path d="M3 8h11M3 13h16M3 18h9" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" /><path d="m18 5 4 3-4 3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
/* Fast Production — lightning bolt */
export function BoltIcon({ className = "" }: IconProps) { return <svg {...svgBase} className={className}><path d="M14 3 6 14h6l-2 9 10-13h-7l1-7Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" /></svg>; }
/* Multiple Variations — stacked layers */
export function LayersIcon({ className = "" }: IconProps) { return <svg {...svgBase} className={className}><path d="M13 3 3 8.5 13 14l10-5.5L13 3Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" /><path d="m3 13 10 5.5L23 13M3 17.5 13 23l10-5.5" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" /></svg>; }
/* Ecommerce Focused — price tag */
export function TagIcon({ className = "" }: IconProps) { return <svg {...svgBase} className={className}><path d="M4 4h8l10 10-8 8L4 12V4Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" /><circle cx="8.5" cy="8.5" r="1.6" stroke="currentColor" strokeWidth="1.1" /></svg>; }
