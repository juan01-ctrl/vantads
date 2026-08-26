import type { WelcomeClient } from "./welcome-clients";

export type ContractSection = {
  number: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  afterBullets?: string[];
  subsections?: { title: string; paragraphs: string[] }[];
};

export function buildContract(client: WelcomeClient) {
  const sections: ContractSection[] = [
    {
      number: "1",
      title: "Objeto del servicio",
      paragraphs: [
        `Vantads AI Studio prestará a ${client.name} servicios mensuales de producción de contenido creativo utilizando inteligencia artificial, diseño, motion y edición.`,
        "El objetivo es desarrollar contenido visual premium para redes sociales, comunicación de producto y campañas publicitarias.",
      ],
    },
    {
      number: "2",
      title: `Alcance del Plan ${client.plan}`,
      paragraphs: [`Durante el período contratado, Vantads entregará:`],
      bullets: [
        "12 videos por mes",
        "20 imágenes de producto",
        "Formato vertical 9:16",
        "Videos de hasta 30 segundos",
        "1 ronda de revisión por video",
        "Motion typography básico",
        "Dirección creativa adaptada a la identidad de la marca",
      ],
      afterBullets: ["El contenido será producido y entregado progresivamente durante el período mensual."],
    },
    {
      number: "3",
      title: "Proceso de trabajo",
      paragraphs: [],
      subsections: [
        {
          title: "Onboarding",
          paragraphs: [
            "Al inicio del período se definirán los productos, objetivos, referencias visuales, identidad de marca y prioridades de contenido.",
          ],
        },
        {
          title: "Primeros conceptos",
          paragraphs: [
            "Los primeros conceptos serán entregados dentro de los primeros 7 días del período, siempre que Vantads haya recibido los materiales necesarios para comenzar.",
          ],
        },
        {
          title: "Producción",
          paragraphs: [
            "El contenido será producido y entregado progresivamente durante el mes, buscando mantener un flujo constante de nuevas piezas.",
          ],
        },
        {
          title: "Feedback",
          paragraphs: [
            "El Cliente podrá enviar feedback sobre las piezas entregadas, respetando la cantidad de revisiones incluida en el plan.",
            "El feedback deberá ser claro y consolidado para facilitar una producción eficiente.",
          ],
        },
      ],
    },
    {
      number: "4",
      title: "Revisiones",
      paragraphs: [
        "Cada video incluye 1 ronda de revisión.",
        "Una ronda comprende un conjunto consolidado de comentarios sobre la pieza entregada.",
        "Cambios que impliquen rehacer sustancialmente una pieza, modificar completamente el concepto, cambiar el producto o alterar la dirección creativa original podrán considerarse una nueva pieza o trabajo adicional.",
      ],
    },
    {
      number: "5",
      title: "Materiales proporcionados por el Cliente",
      paragraphs: [
        `${client.name} deberá proporcionar los materiales necesarios para la producción, incluyendo cuando corresponda:`,
      ],
      bullets: [
        "Fotografías o renders de productos.",
        "Logos.",
        "Identidad visual.",
        "Información de productos.",
        "Referencias visuales.",
        "Claims o información comercial.",
        "Cualquier otro material necesario para la producción.",
      ],
      afterBullets: [
        "El Cliente es responsable de que los materiales proporcionados puedan ser utilizados legalmente.",
        "Los retrasos en la entrega de materiales o feedback podrán afectar los tiempos de producción.",
      ],
    },
    {
      number: "6",
      title: "Inversión y forma de pago",
      paragraphs: [
        "El fee correspondiente al período contratado es de:",
        `USD ${client.feeTotal}`,
        "El pago se divide en dos partes:",
        `Pago inicial — 50%\nUSD ${client.feeInitial}\nDebe abonarse ${client.feeInitialDue} y habilita el comienzo de la producción.`,
        `Pago final — 50%\nUSD ${client.feeFinal}\nDebe abonarse al finalizar el período contratado, el ${client.feeFinalDue}.`,
        "La producción correspondiente a un nuevo período podrá quedar pausada hasta la recepción del pago pendiente.",
      ],
    },
    {
      number: "7",
      title: "Inicio y duración",
      paragraphs: [
        "El servicio comienza el:",
        client.periodStart,
        "y finaliza el:",
        client.periodEnd,
        "El período corresponde a un ciclo mensual de servicio.",
        "La renovación de un nuevo período se realizará mediante confirmación entre ambas partes y estará sujeta al fee vigente al momento de la renovación.",
      ],
    },
    {
      number: "8",
      title: "Contenido no utilizado",
      paragraphs: [
        "El volumen contratado corresponde a la capacidad de producción reservada durante el período.",
        "Las piezas que no sean solicitadas o utilizadas durante el período no se acumulan automáticamente para períodos posteriores, salvo acuerdo previo entre ambas partes.",
      ],
    },
    {
      number: "9",
      title: "Trabajo adicional",
      paragraphs: [
        `Cualquier solicitud que exceda el alcance del Plan ${client.plan} podrá presupuestarse por separado.`,
        "Esto incluye, entre otros:",
      ],
      bullets: [
        "Videos adicionales.",
        "Imágenes adicionales.",
        "Revisiones adicionales.",
        "Nuevos conceptos sobre piezas ya aprobadas.",
        "Cambios sustanciales de dirección creativa.",
        "Formatos adicionales.",
        "Producción urgente o fuera del calendario acordado.",
      ],
      afterBullets: ["Los trabajos adicionales requerirán aprobación previa del Cliente."],
    },
    {
      number: "10",
      title: "Cancelación",
      paragraphs: [
        "El servicio contratado corresponde exclusivamente al período comprendido entre el 1 de septiembre y el 1 de octubre de 2026.",
        "Una vez iniciado el período, el servicio no podrá ser cancelado unilateralmente con devolución del fee correspondiente, excepto cuando resulte aplicable la garantía de 14 días establecida a continuación.",
        "La renovación de períodos posteriores no es automática y deberá ser confirmada por ambas partes.",
      ],
    },
    {
      number: "11",
      title: "Garantía de 14 días",
      paragraphs: [
        "Vantads ofrece una garantía de satisfacción de 14 días.",
        "Si durante los primeros 14 días del período el Cliente considera que el servicio no cumple con sus expectativas, podrá solicitar la cancelación y el reembolso correspondiente de acuerdo con las condiciones de la garantía.",
        "La garantía no aplica a trabajos adicionales previamente aprobados por el Cliente.",
      ],
    },
    {
      number: "12",
      title: "Propiedad y uso del contenido",
      paragraphs: [
        `Una vez recibido el pago completo correspondiente al período, ${client.name} obtiene el derecho de utilizar las piezas finales entregadas por Vantads en sus redes sociales, campañas publicitarias, canales digitales y comunicación comercial.`,
        "Los archivos de trabajo, proyectos internos, prompts, workflows, procesos, herramientas y metodología utilizados para producir el contenido permanecen bajo propiedad de Vantads AI Studio, salvo acuerdo escrito diferente.",
        "Vantads podrá utilizar las piezas finales producidas como portfolio, caso de estudio o material comercial, salvo que el Cliente solicite expresamente confidencialidad sobre determinados contenidos.",
      ],
    },
    {
      number: "13",
      title: "Resultados comerciales",
      paragraphs: [
        "Vantads tiene como objetivo producir contenido visual de alta calidad y orientado a comunicación y performance.",
        "Sin embargo, Vantads no garantiza resultados específicos de ventas, conversiones, ROAS, alcance, engagement u otros indicadores comerciales.",
        "El rendimiento de las campañas depende también de factores externos como producto, precio, oferta, audiencia, presupuesto, plataforma, targeting y estrategia de marketing.",
      ],
    },
    {
      number: "14",
      title: "Comunicación",
      paragraphs: [
        "La comunicación operativa se realizará mediante los canales acordados entre ambas partes.",
        "Para mantener una producción eficiente, el Cliente deberá centralizar el feedback y comunicar los cambios de manera clara.",
        "Los cambios importantes en prioridades, productos o dirección creativa deberán comunicarse antes de comenzar la producción correspondiente.",
      ],
    },
    {
      number: "15",
      title: "Aceptación digital",
      paragraphs: [
        "El Cliente acepta los términos y condiciones establecidos en este documento mediante la selección del checkbox de aceptación disponible en la página de contratación de Vantads AI Studio.",
        "Al marcar el checkbox y completar el proceso de contratación y pago, el Cliente declara haber leído, comprendido y aceptado las condiciones del presente acuerdo.",
        "La aceptación digital tendrá validez para el período y plan especificados en este documento.",
      ],
    },
  ];

  return {
    brand: "VANTADS AI STUDIO",
    title: "MONTHLY CREATIVE SERVICES AGREEMENT",
    meta: [
      { label: "Cliente", value: client.name },
      { label: "Plan", value: client.plan },
      { label: "Período contratado", value: `${client.periodStart} – ${client.periodEnd}` },
      { label: "Fee mensual", value: `USD ${client.feeTotal}` },
    ],
    sections,
    summary: [
      { label: "Cliente", value: client.name },
      { label: "Plan", value: client.plan },
      { label: "Período", value: client.periodLabel },
      { label: "Fee total", value: `USD ${client.feeTotal}` },
      { label: "Pago inicial", value: `USD ${client.feeInitial}` },
      { label: "Pago final", value: `USD ${client.feeFinal}` },
    ],
    footer: [
      "VANTADS AI STUDIO",
      "Buenos Aires · Available worldwide",
      "hello@vantads.studio",
      "Vantads AI Studio · 2026",
    ],
  };
}

export type BuiltContract = ReturnType<typeof buildContract>;
