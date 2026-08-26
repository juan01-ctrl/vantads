import type { Metadata } from "next";
import { InfoPage } from "../../components/info-page";

export const metadata: Metadata = {
  title: "Info | Vantads AI Studio",
  description: "A plain breakdown of Vantads AI Studio: services, process, plans, and pricing.",
  robots: { index: false, follow: false },
};

export default function Info() {
  return <InfoPage />;
}
