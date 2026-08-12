import type { Metadata } from "next";
import Script from "next/script";
import { DM_Mono, Instrument_Serif, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SiteCursor } from "../components/site-cursor";
import { SmoothScroll } from "../components/smooth-scroll";
import { I18nProvider } from "../lib/i18n";
import { Loader } from "../components/loader";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const instrument = Instrument_Serif({ variable: "--font-instrument", subsets: ["latin"], weight: "400" });
const mono = DM_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "Vantads AI Studio | Product ads made to move",
  description: "Premium AI-generated Instagram ads for ecommerce brands.",
  icons: { icon: "https://assets.vantads.studio/vantadslogodark.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${instrument.variable} ${mono.variable}`}>
      <body>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-ZQSWQESVK2" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-ZQSWQESVK2');`}
        </Script>
        <I18nProvider>
          <SmoothScroll>
            <Loader />
            <SiteCursor />
            {children}
          </SmoothScroll>
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  );
}
