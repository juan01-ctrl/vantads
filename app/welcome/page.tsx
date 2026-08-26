import type { Metadata } from "next";
import { Suspense } from "react";
import { WelcomeFlow } from "../../components/welcome-flow";

export const metadata: Metadata = {
  title: "Welcome | Vantads AI Studio",
  description: "Client onboarding — review your agreement and complete your initial payment.",
  robots: { index: false, follow: false },
};

function WelcomeFallback() {
  return (
    <main className="site-shell grain flex min-h-[60vh] items-center justify-center px-5 py-20">
      <p className="eyebrow">Loading…</p>
    </main>
  );
}

export default function WelcomePage() {
  return (
    <Suspense fallback={<WelcomeFallback />}>
      <WelcomeFlow />
    </Suspense>
  );
}
