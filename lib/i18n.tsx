"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "en" | "es";

const NESTED = {
  en: {
    brand: "VANTADS AI STUDIO",
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
      badge: "14-Day Trial",
      badgeTitle: "14-Day Trial Period",
      badgeText: "Try the service for two weeks. If you decide not to continue, we refund 50% of your monthly payment.",
      popular: "Most Popular",
      custom: "Need a custom volume, launch campaign, or one-off project?",
      customLink: "Contact us",
      customTail: "for a tailored production plan.",
      billingMonthly: "Monthly",
      billingQuarterly: "Quarterly",
      perMonth: "/month",
      perMo: "/mo",
      mail: {
        subject: "I want to start the {plan} plan",
        body: "Hi Vantads,\n\nI'd like to start the {plan} plan ({volume}).\n\nMy products (IG, ecommerce shop, etc): \n\nPlease send me the details to get started.\n\nThanks!",
      },
    },
    plans: {
      essential: {
        name: "Essential",
        volume: "8 videos / month",
        description: "The easiest entry into a monthly creative partnership.",
        priceMonthly: "$459",
        priceQuarterly: "$409",
        billedQuarterly: "billed $1,227 every 3 months",
        save: "Save 11%",
        cta: "Start Essential",
        features: ["8 videos per month", "12 product photos per month", "Creative direction", "Multiple concepts & hooks", "2 revision rounds"],
      },
      growth: {
        name: "Growth",
        volume: "12 videos / month",
        description: "The best-value monthly partnership for brands testing and scaling creative.",
        priceMonthly: "$619",
        priceQuarterly: "$529",
        billedQuarterly: "billed $1,587 every 3 months",
        save: "Save 15%",
        cta: "Choose Growth",
        features: ["12 videos per month", "20 product photos per month", "Creative direction", "Multiple concepts & hooks", "Premium motion & editing", "2 revision rounds"],
      },
      scale: {
        name: "Scale",
        volume: "16+ videos / month",
        description: "For brands that need consistent high-volume creative — pricing starts at $789 and scales with production.",
        priceMonthly: "$789+",
        priceQuarterly: "$629+",
        billedQuarterly: "billed $1,887+ every 3 months",
        save: "Save 20%",
        cta: "Scale With Vantads",
        features: ["16+ videos per month", "36 product photos per month", "Higher creative volume", "Multiple concepts & hooks", "Premium motion & editing", "Priority production", "2 revision rounds"],
      },
    },
    signal: { label: "05 / The signal", titleA: "CREATIVE", titleB: "THAT", titleC: "PERFORMS", adv: "The advantage", advText: "Faster, better creative.\nA motion system that performs.", q1: "“Vantads turned a single product into an entire month of premium creative.”", q1by: "— Ecommerce founder", q2: "“The final videos looked like a full production campaign without the traditional production process.”", q2by: "— Brand director" },
    contact: { label: "06 / Start a project", titleA: "LET’S MAKE", titleB: "YOUR PRODUCT", titleC: "IMPOSSIBLE", titleD: "TO IGNORE", sub: "Tell us about your brand, product, and campaign. We’ll turn it into premium visual content built for attention.", cta: "Start a project", view: "View our work" },
    footer: { addresses: "Vantads AI St. / Buenos Aires / Available worldwide", instagram: "Instagram" },
    modal: { phoneView: "Phone View", clickToOpen: "Click to open phone view", open: "Open preview", close: "Close video preview" },
    info: {
      label: "Info",
      titleA: "WHAT WE DO",
      titleB: "AND WHAT IT COSTS",
      intro: "A plain breakdown of Vantads AI Studio: the work we produce, how we work, what you get, and what it costs. No fluff.",
      whatLabel: "01 / What we do",
      howLabel: "02 / How it works",
      howIntro: "This is exactly what happens once we start working together, from kickoff to the monthly delivery.",
      process: [
        ["Day 0", "Onboarding", "A short kickoff call to define your product angle, audience, references, and brand identity."],
        ["Day 1–7", "First concepts", "Within 7 days you receive your first vertical ad concepts for review."],
        ["Weekly", "Delivery cadence", "Your monthly volume arrives in weekly batches, so you always have fresh creative to test."],
        ["Per video", "Revisions", "Each video includes 2 revision rounds. You send feedback, we refine."],
        ["Ongoing", "Iteration", "We see what performs and double down on winning hooks, formats, and angles each month."],
      ],
      priceLabel: "03 / Pricing",
      priceNote: "All prices in USD. Monthly or quarterly billing — higher commitments unlock progressively better rates.",
      specsLabel: "04 / Delivery & specs",
      contactLabel: "05 / Contact",
      specs: [
        ["Format", "Vertical 9:16, Instagram-ready"],
        ["Length", "Up to 30 seconds per ad"],
        ["Turnaround", "First concepts within 7 days"],
        ["Revisions", "2 rounds per video"],
        ["Trial period", "14 days — if you don't continue, 50% of your monthly payment refunded"],
      ],
      backHome: "Back to home",
      start: "Start",
      contactIntro: "Tell us about your brand, product, and campaign.",
      plans: [
        { name: "Essential", volume: "8 videos / month", price: "$459 / month", priceAlt: "or $409/mo billed quarterly · Save 11%", features: "8 videos · 12 product photos · creative direction · multiple concepts & hooks · 2 revision rounds" },
        { name: "Growth", volume: "12 videos / month", price: "$619 / month", priceAlt: "or $529/mo billed quarterly · Save 15%", features: "12 videos · 20 product photos · creative direction · multiple concepts & hooks · premium motion & editing · 2 revision rounds" },
        { name: "Scale", volume: "16+ videos / month", price: "$789+ / month", priceAlt: "or $629+/mo billed quarterly · Save 20%", features: "16+ videos · 36 product photos · higher creative volume · multiple concepts & hooks · premium motion & editing · priority production · 2 revision rounds" },
      ],
    },
  },
  es: {
    brand: "VANTADS AI STUDIO",
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
      { title: "Anuncios de productos virales", text: "Videos de producto que frenan el scroll, diseñados para Reels, Stories y campañas de pauta social." },
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
      guarantee: "Periodo de prueba de 14 días",
      badge: "Prueba 14 días",
      badgeTitle: "Periodo de prueba de 14 días",
      badgeText: "Probá el servicio durante dos semanas. Si decidís no continuar, te devolvemos el 50% de tu pago mensual.",
      popular: "Más Popular",
      custom: "¿Necesitas un volumen a medida, una campaña de lanzamiento o un proyecto puntual?",
      customLink: "Contactanos",
      customTail: "para un plan de producción a medida.",
      billingMonthly: "Mensual",
      billingQuarterly: "Trimestral",
      perMonth: "/mes",
      perMo: "/mes",
      mail: {
        subject: "Quiero empezar con el plan {plan}",
        body: "Hola Vantads,\n\nQuiero empezar con el plan {plan} ({volume}).\n\nMis productos (IG, tienda ecommerce, etc): \n\nEnvíenme los detalles para comenzar.\n\n¡Gracias!",
      },
    },
    plans: {
      essential: {
        name: "Essential",
        volume: "8 videos / mes",
        description: "El punto de entrada más simple a un partnership creativo mensual.",
        priceMonthly: "$459",
        priceQuarterly: "$409",
        billedQuarterly: "facturado $1,227 cada 3 meses",
        save: "Ahorrá 11%",
        cta: "Empezar Essential",
        features: ["8 videos por mes", "12 fotos de producto por mes", "Dirección creativa", "Múltiples conceptos y hooks", "2 rondas de revisiones"],
      },
      growth: {
        name: "Growth",
        volume: "12 videos / mes",
        description: "El partnership mensual con mejor valor para marcas que testean y escalan creativos.",
        priceMonthly: "$619",
        priceQuarterly: "$529",
        billedQuarterly: "facturado $1,587 cada 3 meses",
        save: "Ahorrá 15%",
        cta: "Elegir Growth",
        features: ["12 videos por mes", "20 fotos de producto por mes", "Dirección creativa", "Múltiples conceptos y hooks", "Motion y edición premium", "2 rondas de revisiones"],
      },
      scale: {
        name: "Scale",
        volume: "16+ videos / mes",
        description: "Para marcas que necesitan alto volumen creativo constante — el precio parte de $789 y escala con la producción.",
        priceMonthly: "$789+",
        priceQuarterly: "$629+",
        billedQuarterly: "facturado $1,887+ cada 3 meses",
        save: "Ahorrá 20%",
        cta: "Escalar con Vantads",
        features: ["16+ videos por mes", "36 fotos de producto por mes", "Mayor volumen creativo", "Múltiples conceptos y hooks", "Motion y edición premium", "Producción prioritaria", "2 rondas de revisiones"],
      },
    },
    signal: { label: "05 / La señal", titleA: "CREATIVO", titleB: "QUE", titleC: "RINDE", tag: "La ventaja", advText: "Producción creativa más rápida.\nMás variaciones para testear.\nMenos overhead.", q1: "“Vantads nos ayudó a convertir un solo producto en un mes completo de creativo premium.”", q1by: "— Fundador de ecommerce", q2: "“Los videos finales parecían una producción de campaña completa, sin el proceso tradicional.”", q2by: "— Director de marca" },
    contact: { label: "06 / Empezar un proyecto", titleA: "HAGAMOS", titleB: "TU PRODUCTO", titleC: "IMPESIBLE", titleD: "DE IGNORAR", sub: "Contanos sobre tu marca, tu producto y tu campaña. Lo convertimos en contenido visual premium construido para atraer la atención.", cta: "Empezar un proyecto", view: "Ver nuestro trabajo" },
    footer: { addresses: "Vantads AI · Buenos Aires · Disponible mundialmente", instagram: "Instagram" },
    modal: { phoneView: "Vista móvil", clickToOpen: "Tocá para abrir la vista móvil", open: "Abrir preview", close: "Cerrar preview" },
    info: {
      label: "Info",
      titleA: "QUÉ HACEMOS",
      titleB: "Y CUÁNTO CUESTA",
      intro: "Un desglose claro de Vantads AI Studio: el trabajo que producimos, cómo trabajamos, qué obtenés y cuánto cuesta. Sin vueltas.",
      whatLabel: "01 / Qué hacemos",
      howLabel: "02 / Cómo trabajamos",
      howIntro: "Esto es exactamente lo que pasa una vez que empezamos a trabajar juntos, del primer contacto a la entrega mensual.",
      process: [
        ["Día 0", "Onboarding", "Una llamada corta para definir el ángulo de tu producto, la audiencia, las referencias y tu identidad de marca."],
        ["Día 1–7", "Primeros conceptos", "En 7 días recibís tus primeros conceptos de avisos verticales para revisar."],
        ["Semanal", "Ritmo de entrega", "Tu volumen mensual llega en tandas semanales, así siempre tenés creativos frescos para testear."],
        ["Por video", "Revisiones", "Cada video incluye 2 rondas de revisiones. Enviás feedback y lo refinamos."],
        ["Continuo", "Iteración", "Vemos qué funciona y nos enfocamos en los hooks, formatos y ángulos ganadores cada mes."],
      ],
      priceLabel: "03 / Precios",
      priceNote: "Todos los precios en USD. Facturación mensual o trimestral — a mayor compromiso, mejor tarifa.",
      specsLabel: "04 / Entrega y especificaciones",
      contactLabel: "05 / Contacto",
      specs: [
        ["Formato", "Vertical 9:16, listo para Instagram"],
        ["Duración", "Hasta 30 segundos por aviso"],
        ["Tiempo de entrega", "Primeros conceptos en 7 días"],
        ["Revisiones", "2 rondas por video"],
        ["Periodo de prueba", "14 días — si no continuás, te devolvemos el 50% del pago mensual"],
      ],
      backHome: "Volver al inicio",
      start: "Empezar",
      contactIntro: "Contanos sobre tu marca, tu producto y tu campaña.",
      plans: [
        { name: "Essential", volume: "8 videos / mes", price: "$459 / mes", priceAlt: "o $409/mes facturado trimestral · Ahorrá 11%", features: "8 videos · 12 fotos de producto · dirección creativa · múltiples conceptos y hooks · 2 rondas de revisiones" },
        { name: "Growth", volume: "12 videos / mes", price: "$619 / mes", priceAlt: "o $529/mes facturado trimestral · Ahorrá 15%", features: "12 videos · 20 fotos de producto · dirección creativa · múltiples conceptos y hooks · motion y edición premium · 2 rondas de revisiones" },
        { name: "Scale", volume: "16+ videos / mes", price: "$789+ / mes", priceAlt: "o $629+/mes facturado trimestral · Ahorrá 20%", features: "16+ videos · 36 fotos de producto · mayor volumen creativo · múltiples conceptos y hooks · motion y edición premium · producción prioritaria · 2 rondas de revisiones" },
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