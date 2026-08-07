"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "en" | "es";

const NESTED = {
  en: {
    brand: "VANTA AI STUDIO",
    nav: { studio: "Studio", services: "Services", work: "Work", pricing: "Pricing", contact: "Contact", info: "Info" },
    hero: {
      eyebrow: "AI advertising\nstudio",
      h1a: "WE MAKE",
      h1b: "VIRAL PRODUCT",
      h1c: "ADS",
      sub: "Premium AI-generated Instagram ads for ecommerce brands that need to stop the scroll, elevate their products and launch content faster.",
      tagline: "AI visual.\nMotion.\nProduct storytelling.",
      scroll: "SCROLL TO SEE OUR WORK · SCROLL TO SEE OUR WORK ·",
      scrollAria: "Scroll to see our work",
    },
    services: { label: "01 / Services", titleA: "WHAT", titleB: "WE DO", tagline: "Ads built\nto move" },
    svc: [
      { title: "Viral Product Ads", text: "Scroll-stopping product videos designed for Reels, Stories, and paid social campaigns." },
      { title: "Premium AI Visuals", text: "High-end product scenes generated around your brand, packaging, materials, and visual identity." },
      { title: "Motion-First Creative", text: "Camera movement, speed ramps, transitions, type, effects, and cinematic product reveals." },
      { title: "Fast Production", text: "Launch new ad concepts without traditional shoots, large crews, studios, or production drag." },
      { title: "Multiple Variations", text: "Different hooks, visual directions, formats, and campaign variations to test what performs best." },
      { title: "Ecommerce Focused", text: "Creative built around product desirability, brand perception, retention, and conversion." },
    ],
    work: { label: "02 / Selected work", eyebrow: "Product films\nmade for the\nattention economy" },
    projects: {
      glasses: { category: "AI Product Film", alt: "Animated glasses product advertisement" },
      shoes: { category: "Motion Advertisement", alt: "Nike shoes product advertisement" },
      watch: { category: "Instagram Campaign", alt: "Rolex watch product advertisement" },
      coffee: { category: "Launch Campaign", alt: "Kaor coffee product advertisement" },
      headphones: { category: "Ecommerce Creative", alt: "Marshall headphone product advertisement" },
    },
    process: { label: "03 / Process", titleA: "FROM", titleB: "PRODUCT", titleC: "TO CAMPAIGN" },
    steps: [
      ["Creative Direction", "We define the product angle, audience, references, campaign mood, and visual identity."],
      ["Concepts", "We develop multiple hooks, scenes, visual treatments, and motion directions."],
      ["Production", "We generate, refine, animate, edit, and polish each creative."],
      ["Delivery", "You receive platform-ready vertical ads, organized and ready to publish or test."],
    ],
    pricing: {
      label: "04 / Monthly creative plans",
      titleA: "MONTHLY",
      titleB: "CREATIVE PLANS",
      sub: "Consistent premium content without the cost and complexity of traditional production.",
      badge: "14-Day",
      badgeTitle: "14-Day Money-Back Guarantee",
      badgeText: "Not satisfied within two weeks? We refund your subscription in full — no questions asked.",
      popular: "Most popular",
      custom: "Need a custom volume, launch campaign, or one-off project?",
      customLink: "Contact us",
      customTail: "for a tailored production plan.",
      perMonth: "/ month",
      mail: {
        subject: "I want to start the {plan} plan",
        body: "Hi Vanta,\n\nI'd like to start the {plan} plan ({volume}).\n\nMy products (IG, ecommerce shop, etc): \n\nPlease send me the details to get started.\n\nThanks!",
      },
    },
    plans: {
      essential: { name: "Essential", volume: "10 videos / month", description: "For brands that need a consistent monthly presence.", price: "$390 / month", perVideo: "$39 / video", discount: "Standard rate", cta: "Start Essential", features: ["10 vertical product ads", "Up to 15 seconds each", "1 revision round per video", "Instagram-ready 9:16 delivery", "Basic motion typography", "Standard delivery schedule"] },
      growth: { name: "Growth", volume: "20 videos / month", description: "For ecommerce brands actively testing and scaling creative.", price: "$585 / month", perVideo: "$29.25 / video", discount: "Save 25%", cta: "Choose Growth", features: ["20 vertical product ads", "Up to 15 seconds each", "Multiple hooks and variations", "2 revision rounds per video", "Premium motion design", "Creative direction included", "Priority production", "Campaign-ready exports"] },
      scale: { name: "Scale", volume: "+40 videos / month", description: "For brands that need a high volume of fresh campaign creatives.", price: "From $858 / month", perVideo: "$21.45 / video", discount: "Save 45%", cta: "Scale With Vanta", features: ["40+ vertical product ads", "Multiple products or campaigns", "Hook and concept variations", "2 revision rounds per video", "Advanced motion and editing", "Priority creative support", "Organized monthly production pipeline", "Paid social and organic formats"] },
    },
    signal: { label: "05 / The signal", titleA: "CREATIVE", titleB: "THAT", titleC: "PERFORMS", adv: "The advantage", advText: "Faster, better creative.\nA motion system that performs.", q1: "“Vanta turned a single product into an entire month of premium creative.”", q1by: "— Ecommerce founder", q2: "“The final videos looked like a full production campaign without the traditional production process.”", q2by: "— Brand director" },
    contact: { label: "06 / Start a project", titleA: "LET’S MAKE", titleB: "YOUR PRODUCT", titleC: "IMPOSSIBLE", titleD: "TO IGNORE", sub: "Tell us about your brand, product, and campaign. We’ll turn it into premium visual content built for attention.", cta: "Start a project", view: "View our work" },
    footer: { addresses: "Vanta AI St. / Buenos Aires / Available worldwide", instagram: "Instagram" },
    modal: { phoneView: "Phone View", clickToOpen: "Click to open phone view", open: "Open preview", close: "Close video preview" },
    info: {
      label: "Info",
      titleA: "WHAT WE DO",
      titleB: "AND WHAT IT COSTS",
      intro: "A plain breakdown of Vanta AI Studio: the work we produce, how we work, what you get, and what it costs. No fluff.",
      whatLabel: "01 / What we do",
      howLabel: "02 / How it works",
      priceLabel: "03 / Pricing",
      priceNote: "All prices in USD, billed monthly.",
      specsLabel: "04 / Delivery & specs",
      contactLabel: "05 / Contact",
      specs: [
        ["Format", "Vertical 9:16, Instagram-ready"],
        ["Length", "Up to 15 seconds per ad"],
        ["Turnaround", "First concepts within 7 days"],
        ["Revisions", "1–2 rounds per video, depending on plan"],
        ["Guarantee", "14-day money-back guarantee"],
      ],
      backHome: "Back to home",
      start: "Start",
      contactIntro: "Tell us about your brand, product, and campaign.",
      plans: [
        { name: "Essential", volume: "10 videos / month", price: "$390 / month", perVideo: "$39 / video", features: "10 vertical product ads · up to 15 seconds · 1 revision round · 9:16 delivery · basic motion typography" },
        { name: "Growth", volume: "20 videos / month", price: "$585 / month", perVideo: "$29.25 / video", features: "20 vertical product ads · multiple hooks · 2 revision rounds · premium motion design · creative direction · priority production" },
        { name: "Scale", volume: "+40 videos / month", price: "From $858 / month", perVideo: "$21.45 / video", features: "40+ vertical product ads · multiple products · 2 revision rounds · advanced motion · priority support · campaign-ready exports" },
      ],
    },
  },
  es: {
    brand: "VANTA AI STUDIO",
    nav: { studio: "Estudio", services: "Servicios", work: "Trabajo", pricing: "Precios", contact: "Contacto", info: "Info" },
    hero: {
      eyebrow: "Estudio de\nIA creativa",
      h1a: "CREAMOS",
      h1b: "PRODUCTOS",
      h1c: "VIRALES",
      sub: "Anuncios premium generados con IA para marcas ecommerce que necesitan frenar el scroll, destacar sus productos y lanzar contenido más rápido.",
      tagline: "Visuales IA.\nMotion design.\nNarrativa de producto.",
      scroll: "DESPLAZATE PARA VER NUESTRO TRABAJO · DESPLAZATE PARA VER NUESTRO TRABAJO ·",
      scrollAria: "Desplazate para ver nuestro trabajo",
    },
    services: { label: "01 / Servicios", titleA: "QUÉ", titleB: "HACEMOS", tagline: "Anuncios\nque mueven" },
    svc: [
      { title: "Anuncios de producto virales", text: "Videos de producto que frenan el scroll, diseñados para Reels, Stories y campañas de pauta social." },
      { title: "Visuales IA premium", text: "Escenas de producto de alto nivel generadas alrededor de tu marca, packaging, materiales e identidad visual." },
      { title: "Creatividad centrada en el movimiento", text: "Movimiento de cámara, ramps de velocidad, transiciones, tipografía, efectos y aperturas cinematográficas." },
      { title: "Producción rápida", text: "Lanza nuevos conceptos de anuncios sin shoots tradicionales, equipos grandes, estudios ni demoras." },
      { title: "Múltiples variaciones", text: "Diferentes hooks, direcciones visuales, formatos y campañas para testear qué rinde mejor." },
      { title: "Enfocado en ecommerce", text: "Creativos construidos alrededor de la deseabilidad, la percepción de marca y la conversión." },
    ],
    work: { label: "02 / Trabajo seleccionado", eyebrow: "Films de producto\nhechos para la\natención" },
    projects: {
      glasses: { category: "Film de producto IA", alt: "Publicidad animada de producto de anteojos" },
      shoes: { category: "Anuncio en movimiento", alt: "Publicidad de producto de zapatillas Nike" },
      watch: { category: "Campaña de Instagram", alt: "Publicidad de producto de reloj Rolex" },
      coffee: { category: "Campaña de lanzamiento", alt: "Publicidad de producto de café Kaor" },
      headphones: { category: "Creativo ecommerce", alt: "Publicidad de producto de auriculares Marshall" },
    },
    process: { label: "03 / Proceso", titleA: "DEL", titleB: "PRODUCTO", titleC: "A LA CAMPAÑA" },
    steps: [
      ["Dirección creativa", "Definimos el ángulo del producto, la audiencia, las referencias, el mood y la identidad visual."],
      ["Conceptos", "Desarrollamos múltiples hooks, escenas, tratamientos visuales y direcciones de movimiento."],
      ["Producción", "Generamos, refinamos, animamos, editamos y pulimos cada creativo."],
      ["Entrega", "Recibes anuncios verticales listos para publicar, organizados y preparados para testear."],
    ],
    pricing: {
      label: "04 / Planes creativos mensuales",
      titleA: "PLANES",
      titleB: "CREATIVOS MENSUALES",
      sub: "Contenido premium consistente sin el costo y la complejidad de la producción tradicional.",
      guarantee: "14 días",
      badge: "14 días",
      badgeTitle: "Garantía de devolución de 14 días",
      badgeText: "¿No estás conforme dentro de dos semanas? Te devolvemos la suscripción completa, sin preguntas.",
      popular: "Más popular",
      custom: "¿Necesitas un volumen a medida, una campaña de lanzamiento o un proyecto puntual?",
      customLink: "Contactanos",
      customTail: "para un plan de producción a medida.",
      perMonth: "/ mes",
      mail: {
        subject: "Quiero empezar con el plan {plan}",
        body: "Hola Vanta,\n\nQuiero empezar con el plan {plan} ({volume}).\n\nMis productos (IG, tienda ecommerce, etc): \n\nEnvíenme los detalles para comenzar.\n\n¡Gracias!",
      },
    },
    plans: {
      essential: { name: "Essential", volume: "10 videos / mes", description: "Para marcas que necesitan una presencia mensual consistente.", price: "$390 / mes", perVideo: "$39 / video", discount: "Tarifa estándar", cta: "Empezar Essential", features: ["10 anuncios de producto verticales", "Hasta 15 segundos cada uno", "1 ronda de revisiones por video", "Entrega 9:16 lista para Instagram", "Tipografía de movimiento básica", "Calendario de entrega estándar"] },
      growth: { name: "Growth", volume: "20 videos / mes", description: "Para ecommerce que testea y escala creativos activamente.", price: "$585 / mes", perVideo: "$29.25 / video", discount: "Ahorrá 25%", cta: "Elegir Growth", features: ["20 anuncios de producto verticales", "Hasta 15 segundos cada uno", "Múltiples hooks y variaciones", "2 rondas de revisiones por video", "Motion design premium", "Dirección creativa incluida", "Producción prioritaria", "Exports listos para campaña"] },
      scale: { name: "Scale", volume: "+40 videos / mes", description: "Para marcas que necesitan alto volumen de creativos frescos.", price: "Desde $858 / mes", perVideo: "$21.45 / video", discount: "Ahorrá 45%", cta: "Escalar con Vanta", features: ["40+ anuncios de producto verticales", "Múltiples productos o campañas", "Variaciones de hook y concepto", "2 rondas de revisiones por video", "Motion y edición avanzada", "Soporte creativo prioritario", "Pipeline mensual organizado", "Formatos para pauta y orgánico"] },
    },
    signal: { label: "05 / La señal", titleA: "CREATIVO", titleB: "QUE", titleC: "RINDE", tag: "La ventaja", advText: "Producción creativa más rápida.\nMás variaciones para testear.\nMenos overhead.", q1: "“Vanta nos ayudó a convertir un solo producto en un mes completo de creativo premium.”", q1by: "— Fundador de ecommerce", q2: "“Los videos finales parecían una producción de campaña completa, sin el proceso tradicional.”", q2by: "— Director de marca" },
    contact: { label: "06 / Empezar un proyecto", titleA: "HAGAMOS", titleB: "TU PRODUCTO", titleC: "IMPESIBLE", titleD: "DE IGNORAR", sub: "Contanos sobre tu marca, tu producto y tu campaña. Lo convertimos en contenido visual premium construido para atraer la atención.", cta: "Empezar un proyecto", view: "Ver nuestro trabajo" },
    footer: { addresses: "Vanta AI · Buenos Aires · Disponible mundialmente", instagram: "Instagram" },
    modal: { phoneView: "Vista móvil", clickToOpen: "Tocá para abrir la vista móvil", open: "Abrir preview", close: "Cerrar preview" },
    info: {
      label: "Info",
      titleA: "QUÉ HACEMOS",
      titleB: "Y CUÁNTO CUESTA",
      intro: "Un desglose claro de Vanta AI Studio: el trabajo que producimos, cómo trabajamos, qué obtenés y cuánto cuesta. Sin vueltas.",
      whatLabel: "01 / Qué hacemos",
      howLabel: "02 / Cómo trabajamos",
      priceLabel: "03 / Precios",
      priceNote: "Todos los precios en pesos argentinos (ARS), cobrados mensualmente. 1 USD = 1500 ARS.",
      specsLabel: "04 / Entrega y especificaciones",
      contactLabel: "05 / Contacto",
      specs: [
        ["Formato", "Vertical 9:16, listo para Instagram"],
        ["Duración", "Hasta 15 segundos por aviso"],
        ["Tiempo de entrega", "Primeros conceptos en 7 días"],
        ["Revisiones", "1–2 rondas por video, según el plan"],
        ["Garantía", "Garantía de devolución de 14 días"],
      ],
      backHome: "Volver al inicio",
      start: "Empezar",
      contactIntro: "Contanos sobre tu marca, tu producto y tu campaña.",
      plans: [
        { name: "Essential", volume: "10 videos / mes", price: "ARS $585.000 / mes", perVideo: "ARS $58.500 / video", features: "10 anuncios de producto verticales · hasta 15 segundos · 1 ronda de revisiones · entrega 9:16 · tipografía de movimiento básica" },
        { name: "Growth", volume: "20 videos / mes", price: "ARS $877.500 / mes", perVideo: "ARS $43.875 / video", features: "20 anuncios de producto verticales · múltiples hooks · 2 rondas de revisiones · motion design premium · dirección creativa · producción prioritaria" },
        { name: "Scale", volume: "+40 videos / mes", price: "Desde ARS $1.287.000 / mes", perVideo: "ARS $32.175 / video", features: "40+ anuncios de producto verticales · múltiples productos · 2 rondas de revisiones · motion avanzado · soporte prioritario · exports listos para campaña" },
      ],
    },
  },
} as const;

type Deep = typeof NESTED;

function getPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => (acc && typeof acc === "object" ? (acc as Record<string, unknown>)[key] : undefined), obj);
}

export function getLang(): Lang {
  const nav = typeof navigator !== "undefined" ? navigator.language?.toLowerCase() ?? "" : "";
  const preferred: Lang = nav.startsWith("es") || nav.includes("es-") ? "es" : "en";
  const stored = typeof localStorage === "undefined" ? null : localStorage.getItem("vanta-lang");
  return stored === "en" || stored === "es" ? stored : preferred;
}

const I18nContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string; ta: (key: string) => readonly string[] }>({ lang: "en", setLang: () => {}, t: (k) => k, ta: (k) => [] });

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    setLangState(getLang());
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem("vanta-lang", lang); } catch { /* no-op */ }
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);

  const t = useCallback((key: string) => {
    const v = getPath(NESTED[lang], key);
    return typeof v === "string" ? v : key;
  }, [lang]);

  const ta = useCallback((key: string) => {
    const v = getPath(NESTED[lang], key);
    return Array.isArray(v) ? (v as string[]) : [];
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t, ta }), [lang, setLang, t, ta]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}