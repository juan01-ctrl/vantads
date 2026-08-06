import { ArrowIcon } from "../components/icons";

export default function NotFound() {
  return (
    <main className="site-shell grain flex min-h-screen flex-col items-center justify-center gap-8 px-6 text-center">
      <p className="eyebrow text-[#d34667]">404</p>
      <h1 className="text-[clamp(44px,8vw,96px)] font-light leading-[.85] tracking-[-.08em] text-white">
        PAGE NOT<br />FOUND
      </h1>
      <a
        href="#studio"
        className="inline-flex items-center gap-4 border-b border-white/30 pb-3 text-[12px] uppercase tracking-[.1em] text-white transition-colors hover:border-[#d34667] hover:text-[#d34667]"
      >
        Back to Vanta AI Studio <ArrowIcon className="h-4 w-4" />
      </a>
    </main>
  );
}
