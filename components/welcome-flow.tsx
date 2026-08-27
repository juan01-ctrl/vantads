"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowIcon } from "./icons";
import { ShareHeader } from "./share-header";
import { buildContract } from "../lib/contract";
import { downloadContractPdf } from "../lib/contract-pdf";
import { getWelcomeClient, PAYMENT_DETAILS, type WelcomeClient } from "../lib/welcome-clients";

type Step = "welcome" | "contract" | "payment";

function acceptanceKey(slug: string) {
  return `vantads-welcome-accepted:${slug}`;
}

function StepRail({ step }: { step: Step }) {
  const items: { id: Step; label: string }[] = [
    { id: "welcome", label: "Welcome" },
    { id: "contract", label: "Agreement" },
    { id: "payment", label: "Payment" },
  ];
  const index = items.findIndex((i) => i.id === step);

  return (
    <ol className="flex flex-wrap items-center gap-x-4 gap-y-2" aria-label="Onboarding progress">
      {items.map((item, i) => {
        const active = i === index;
        const done = i < index;
        return (
          <li key={item.id} className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2.5">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full border font-mono text-[9px] tracking-[.08em] ${
                  active
                    ? "border-[#d34667] bg-[#d34667]/15 text-[#f0a0b2]"
                    : done
                      ? "border-[#d34667]/50 bg-[#d34667]/10 text-[#d34667]"
                      : "border-white/15 text-[#6f6c68]"
                }`}
                aria-current={active ? "step" : undefined}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={`eyebrow ${active ? "!text-white" : done ? "!text-[#cfcbc6]" : ""}`}>{item.label}</span>
            </span>
            {i < items.length - 1 && <span className="hidden h-px w-8 bg-white/15 sm:block" aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  );
}

function WelcomeStep({ client, onStart }: { client: WelcomeClient; onStart: () => void }) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-24 top-10 h-64 w-64 rounded-full bg-[#d34667]/10 blur-3xl" aria-hidden="true" />
      <p className="eyebrow">Client onboarding</p>
      <h1 className="mt-8 max-w-[820px] text-[clamp(44px,8vw,92px)] font-light leading-[.86] tracking-[-.08em] text-white">
        BIENVENIDO,
        <br />
        <span className="display-serif tracking-[-.05em]">{client.name}</span>
      </h1>
      <p className="mt-8 max-w-[460px] text-[14px] leading-[1.65] text-[#aaa7a3]">
        Estás a unos pasos de activar tu plan <span className="text-white">{client.plan}</span>. Revisá el acuerdo,
        confirmá las condiciones y completá el pago inicial para comenzar la producción.
      </p>

      <dl className="mt-12 grid max-w-[560px] gap-px bg-white/[.08] sm:grid-cols-2">
        {[
          ["Plan", client.plan],
          ["Período", client.periodLabel],
          ["Fee mensual", `USD ${client.feeTotal}`],
          ["Pago inicial", `USD ${client.feeInitial}`],
        ].map(([label, value]) => (
          <div key={label} className="bg-[#111] px-5 py-4">
            <dt className="eyebrow !text-[#6f6c68]">{label}</dt>
            <dd className="mt-2 text-[15px] tracking-[-.02em] text-white">{value}</dd>
          </div>
        ))}
      </dl>

      <button
        type="button"
        onClick={onStart}
        className="mt-12 inline-flex items-center gap-4 bg-[#d34667] px-6 py-3.5 text-[11px] uppercase tracking-[.12em] text-white transition-all duration-300 hover:bg-[#e05f80] hover:shadow-[0_12px_40px_-12px_rgba(211,70,103,.75)]"
      >
        Empezar
        <ArrowIcon className="h-4 w-4" />
      </button>
    </section>
  );
}

function ContractStep({
  client,
  accepted,
  onAcceptedChange,
  onContinue,
  onBack,
}: {
  client: WelcomeClient;
  accepted: boolean;
  onAcceptedChange: (value: boolean) => void;
  onContinue: () => void;
  onBack: () => void;
}) {
  const contract = useMemo(() => buildContract(client), [client]);
  const [downloading, startDownload] = useTransition();

  const handleDownload = () => {
    startDownload(async () => {
      await downloadContractPdf(client);
    });
  };

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">02 / Agreement</p>
          <h1 className="mt-5 max-w-[720px] text-[clamp(36px,6.5vw,72px)] font-light leading-[.88] tracking-[-.07em] text-white">
            ACUERDO MENSUAL DE
            <br />
            <span className="display-serif">SERVICIOS CREATIVOS</span>
          </h1>
        </div>
        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className="inline-flex items-center gap-3 border border-white/20 px-4 py-3 text-[10px] uppercase tracking-[.12em] text-white transition-colors hover:border-[#d34667] hover:text-[#d34667] disabled:opacity-60"
        >
          {downloading ? "Generando…" : "Descargar PDF"}
          <span aria-hidden="true">↓</span>
        </button>
      </div>

      <div className="mt-10 overflow-hidden border border-white/[.08] bg-[#0e0e0e]">
        <div className="border-b border-white/[.08] bg-[#121212] px-5 py-5 sm:px-8">
          <p className="font-mono text-[10px] uppercase tracking-[.18em] text-[#d34667]">{contract.brand}</p>
          <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {contract.meta.map((row) => (
              <div key={row.label}>
                <dt className="eyebrow !text-[#6f6c68]">{row.label}</dt>
                <dd className="mt-1.5 text-[13px] text-white">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          className="welcome-contract-scroll max-h-[min(81vh,832px)] space-y-8 overflow-y-auto px-5 py-8 sm:px-8"
          data-lenis-prevent
        >
          {contract.sections.map((section) => (
            <article key={section.number} className="border-b border-white/[.06] pb-8 last:border-b-0 last:pb-0">
              <h2 className="flex gap-3 text-[16px] tracking-[-.02em] text-white">
                <span className="font-mono text-[11px] text-[#d34667]">{section.number.padStart(2, "0")}</span>
                <span>{section.title}</span>
              </h2>
              <div className="mt-4 space-y-3 pl-8 text-[12px] leading-[1.65] text-[#9d9a95]">
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="whitespace-pre-line">
                    {p}
                  </p>
                ))}
                {section.subsections?.map((sub) => (
                  <div key={sub.title} className="pt-1">
                    <p className="font-medium text-[#d7d3cd]">{sub.title}</p>
                    {sub.paragraphs.map((p, i) => (
                      <p key={i} className="mt-2">
                        {p}
                      </p>
                    ))}
                  </div>
                ))}
                {section.bullets && (
                  <ul className="space-y-1.5 pt-1">
                    {section.bullets.map((b) => (
                      <li key={b} className="flex gap-2.5">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#d34667]" aria-hidden="true" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.afterBullets?.map((p, i) => (
                  <p key={`after-${i}`}>{p}</p>
                ))}
              </div>
            </article>
          ))}

          <div className="rounded-sm border border-white/[.08] bg-[#121212] p-5">
            <p className="eyebrow text-[#d34667]">Datos del servicio</p>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              {contract.summary.map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-4 border-b border-white/[.06] pb-2">
                  <dt className="eyebrow !text-[#6f6c68]">{row.label}</dt>
                  <dd className="text-right text-[12px] text-white">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <label className="mt-8 flex cursor-pointer items-start gap-3 border border-white/[.1] bg-[#121212] p-4 sm:p-5">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => onAcceptedChange(e.target.checked)}
          className="welcome-checkbox mt-0.5"
        />
        <span className="text-[12px] leading-[1.6] text-[#cfcbc6]">
          He leído y acepto los términos y condiciones del{" "}
          <span className="text-white">Acuerdo Mensual de Servicios Creativos</span> para el plan {client.plan} y el período{" "}
          {client.periodLabel}. Confirmo que esta aceptación digital tiene validez contractual.
        </span>
      </label>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-2 py-3 text-[10px] uppercase tracking-[.12em] text-[#8b8986] transition-colors hover:text-white"
        >
          ← Volver
        </button>
        <button
          type="button"
          onClick={onContinue}
          disabled={!accepted}
          className="inline-flex items-center gap-4 bg-[#d34667] px-6 py-3.5 text-[11px] uppercase tracking-[.12em] text-white transition-all duration-300 hover:bg-[#e05f80] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-[#6f6c68] disabled:hover:shadow-none"
        >
          Continuar al pago
          <ArrowIcon className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="font-mono text-[9px] uppercase tracking-[.14em] text-[#d34667] transition-colors hover:text-[#f0a0b2]"
      aria-label={`Copiar ${label}`}
    >
      {copied ? "Copiado" : "Copiar"}
    </button>
  );
}

function PaymentStep({ client, onBack }: { client: WelcomeClient; onBack: () => void }) {
  const mailHref = `mailto:${PAYMENT_DETAILS.email}?subject=${encodeURIComponent(`Comprobante de pago — ${client.name}`)}&body=${encodeURIComponent(`Hola Vantads,\n\nAdjunto el comprobante del pago inicial (USD ${client.feeInitial}) correspondiente al plan ${client.plan}.\n\nCliente: ${client.name}\n\nGracias.`)}`;
  const waHref = `${PAYMENT_DETAILS.whatsappUrl}?text=${encodeURIComponent(`Hola Vantads, te envío el comprobante del pago inicial (USD ${client.feeInitial}) — ${client.name}.`)}`;

  return (
    <section>
      <p className="eyebrow">03 / Payment</p>
      <h1 className="mt-5 max-w-[720px] text-[clamp(36px,6.5vw,72px)] font-light leading-[.88] tracking-[-.07em] text-white">
        PAGO INICIAL
        <br />
        <span className="display-serif">PARA COMENZAR</span>
      </h1>
      <p className="mt-6 max-w-[480px] text-[13px] leading-[1.6] text-[#aaa7a3]">
        Transferí el pago inicial para habilitar la producción. Una vez acreditado, coordinamos el onboarding.
      </p>

      <div className="mt-10 grid gap-3 lg:grid-cols-[1.15fr_.85fr]">
        <div className="border border-white/[.09] bg-[#111] p-6 sm:p-8">
          <p className="eyebrow text-[#d34667]">Transferencia bancaria</p>

          <div className="mt-8 space-y-6">
            <div className="flex items-start justify-between gap-4 border-b border-white/[.08] pb-5">
              <div>
                <p className="eyebrow !text-[#6f6c68]">Titular</p>
                <p className="mt-2 text-[16px] tracking-[-.02em] text-white">{PAYMENT_DETAILS.accountName}</p>
              </div>
              <CopyButton value={PAYMENT_DETAILS.accountName} label="titular" />
            </div>

            <div className="flex items-start justify-between gap-4 border-b border-white/[.08] pb-5">
              <div className="min-w-0">
                <p className="eyebrow !text-[#6f6c68]">CBU</p>
                <p className="mt-2 break-all font-mono text-[15px] tracking-[.04em] text-white sm:text-[17px]">
                  {PAYMENT_DETAILS.cbu}
                </p>
              </div>
              <CopyButton value={PAYMENT_DETAILS.cbu} label="CBU" />
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow !text-[#6f6c68]">Monto a pagar</p>
                <p className="mt-2 font-mono text-[28px] leading-none tracking-[-.03em] text-white">
                  USD {client.feeInitial}
                </p>
                <p className="mt-2 text-[11px] text-[#8b8986]">Pago inicial · 50% del fee mensual</p>
              </div>
              <CopyButton value={String(client.feeInitial)} label="monto" />
            </div>
          </div>

          <div className="mt-8 border border-[#d34667]/25 bg-[#d34667]/[0.07] p-4 sm:p-5">
            <p className="font-mono text-[9px] uppercase tracking-[.14em] text-[#e27b93]">Pesos argentinos</p>
            <p className="mt-2 text-[12px] leading-[1.6] text-[#e8dfe2]">
              También podés pagar en pesos al tipo de cambio oficial del día del pago (valor venta).
            </p>
          </div>
        </div>

        <div className="flex flex-col border border-white/[.09] bg-[#0f0f0f] p-6 sm:p-8">
          <p className="eyebrow">Enviar comprobante</p>
          <p className="mt-4 text-[13px] leading-[1.6] text-[#9d9a95]">
            Después de transferir, enviá el comprobante por mail o WhatsApp para confirmar el inicio.
          </p>

          <div className="mt-8 flex flex-1 flex-col gap-3">
            <a
              href={mailHref}
              className="group flex items-center justify-between gap-3 border border-white/15 px-4 py-4 text-[11px] uppercase tracking-[.1em] text-white transition-colors hover:border-[#d34667] hover:text-[#d34667]"
            >
              <span className="flex min-w-0 flex-col gap-1 normal-case tracking-normal">
                <span className="text-[10px] uppercase tracking-[.12em] text-[#8b8986] group-hover:text-[#d34667]/80">
                  Email
                </span>
                <span className="truncate font-mono text-[12px]">{PAYMENT_DETAILS.email}</span>
              </span>
              <span aria-hidden="true">↗</span>
            </a>

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-3 border border-white/15 px-4 py-4 text-[11px] uppercase tracking-[.1em] text-white transition-colors hover:border-[#d34667] hover:text-[#d34667]"
            >
              <span className="flex min-w-0 flex-col gap-1 normal-case tracking-normal">
                <span className="text-[10px] uppercase tracking-[.12em] text-[#8b8986] group-hover:text-[#d34667]/80">
                  WhatsApp
                </span>
                <span className="font-mono text-[12px]">{PAYMENT_DETAILS.whatsappDisplay}</span>
              </span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <p className="mt-8 text-[11px] leading-[1.55] text-[#6f6c68]">
            Fee total del período: USD {client.feeTotal}. El saldo de USD {client.feeFinal} se abona al finalizar el
            período ({client.feeFinalDue}).
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onBack}
        className="mt-8 inline-flex items-center gap-2 px-2 py-3 text-[10px] uppercase tracking-[.12em] text-[#8b8986] transition-colors hover:text-white"
      >
        ← Volver al acuerdo
      </button>
    </section>
  );
}

function WelcomeMissing() {
  return (
    <section className="py-10">
      <p className="eyebrow">Welcome</p>
      <h1 className="mt-6 text-[clamp(40px,7vw,72px)] font-light leading-[.88] tracking-[-.07em] text-white">
        LINK
        <br />
        <span className="display-serif">NO VÁLIDO</span>
      </h1>
      <p className="mt-6 max-w-[420px] text-[13px] leading-[1.6] text-[#aaa7a3]">
        Este enlace de bienvenida no corresponde a un cliente activo. Si creés que es un error, escribinos a{" "}
        <a href="mailto:hello@vantads.studio" className="text-white underline underline-offset-4 hover:text-[#d34667]">
          hello@vantads.studio
        </a>
        .
      </p>
    </section>
  );
}

export function WelcomeFlow() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const user = searchParams.get("user");
  const stepParam = searchParams.get("step");
  const client = getWelcomeClient(user);
  const requestedStep: Step = stepParam === "contract" || stepParam === "payment" ? stepParam : "welcome";
  const [accepted, setAccepted] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!client) {
      setHydrated(true);
      return;
    }
    try {
      setAccepted(sessionStorage.getItem(acceptanceKey(client.slug)) === "1");
    } catch {
      setAccepted(false);
    }
    setHydrated(true);
  }, [client]);

  useEffect(() => {
    if (!hydrated || !client) return;
    if (requestedStep === "payment" && !accepted) {
      const params = new URLSearchParams();
      params.set("user", client.slug);
      params.set("step", "contract");
      router.replace(`/welcome?${params.toString()}`);
    }
  }, [hydrated, client, requestedStep, accepted, router]);

  const step: Step = requestedStep === "payment" && !accepted ? "contract" : requestedStep;

  const persistAccepted = (value: boolean) => {
    setAccepted(value);
    if (!client) return;
    try {
      if (value) sessionStorage.setItem(acceptanceKey(client.slug), "1");
      else sessionStorage.removeItem(acceptanceKey(client.slug));
    } catch {
      /* ignore storage errors */
    }
  };

  const goTo = (next: Step) => {
    if (!client) return;
    const params = new URLSearchParams();
    params.set("user", client.slug);
    if (next !== "welcome") params.set("step", next);
    router.push(`/welcome?${params.toString()}`, { scroll: true });
  };

  return (
    <main className="site-shell grain pb-16 pt-10 sm:pb-24 sm:pt-14">
      <ShareHeader trailing={client ? <StepRail step={step} /> : undefined} />

      <div className="px-5 sm:px-8">
        {!client ? (
          <WelcomeMissing />
        ) : step === "welcome" ? (
          <WelcomeStep client={client} onStart={() => goTo("contract")} />
        ) : step === "contract" ? (
          <ContractStep
            client={client}
            accepted={accepted}
            onAcceptedChange={persistAccepted}
            onContinue={() => goTo("payment")}
            onBack={() => goTo("welcome")}
          />
        ) : (
          <PaymentStep client={client} onBack={() => goTo("contract")} />
        )}
      </div>

      <footer className="mt-20 border-t border-white/[.07] px-5 py-7 sm:px-8">
        <p className="eyebrow">© {new Date().getFullYear()} VANTADS AI STUDIO · Buenos Aires · Available worldwide</p>
      </footer>
    </main>
  );
}
