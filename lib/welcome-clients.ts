export type WelcomeClient = {
  slug: string;
  name: string;
  plan: string;
  periodStart: string;
  periodEnd: string;
  periodLabel: string;
  feeTotal: number;
  feeInitial: number;
  feeFinal: number;
  feeInitialDue: string;
  feeFinalDue: string;
};

export const WELCOME_CLIENTS: Record<string, WelcomeClient> = {
  // soymasqueaccesorios: {
  //   slug: "soymasqueaccesorios",
  //   name: "Soy Más Que Accesorios",
  //   plan: "Essential",
  //   periodStart: "1 de septiembre de 2026",
  //   periodEnd: "1 de octubre de 2026",
  //   periodLabel: "01/09/2026 – 01/10/2026",
  //   feeTotal: 390,
  //   feeInitial: 195,
  //   feeFinal: 195,
  //   feeInitialDue: "antes del inicio del período",
  //   feeFinalDue: "1 de octubre de 2026",
  // },
};

export const PAYMENT_DETAILS = {
  accountName: "IERACE JUAN IGNACIO",
  cbu: "0720207288000001764086",
  email: "hello@vantads.studio",
  whatsappDisplay: "+54 11 4043-1125",
  whatsappUrl: "https://wa.me/541140431125",
};

export function getWelcomeClient(slug: string | null | undefined): WelcomeClient | null {
  if (!slug) return null;
  return WELCOME_CLIENTS[slug.toLowerCase().trim()] ?? null;
}
