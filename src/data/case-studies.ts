import { getRoute } from "../i18n/routes";
import type { CaseStudyContent, CaseStudyId } from "../types/case-study";
import type { Locale } from "../types/site";

// Product functionality and image evidence are documented in data/product-pages.
// Adoption and availability context was confirmed by Quantix's owner.
function getTakofyCase(locale: Locale): CaseStudyContent {
  const es = locale === "es";
  return {
    id: "takofy",
    productName: "Takofy",
    category: es ? "Restaurantes" : "Restaurants",
    clientContext: es ? "Restaurantes de Nicaragua" : "Restaurants in Nicaragua",
    title: es ? "El recorrido de una comanda." : "The journey of a restaurant order.",
    summary: es
      ? "Cómo Takofy mantiene juntos la mesa, los platos y el estado del pedido, desde que se toma la comanda hasta que la cocina la marca lista."
      : "How Takofy keeps the table, items and order status together, from taking an order to the kitchen marking it ready.",
    preview: {
      challenge: es
        ? "Que la cocina reciba cada plato con su mesa, cantidad e indicaciones."
        : "Getting every item to the kitchen with its table, quantity and preparation notes.",
      solution: es
        ? "Una comanda compartida para tomar el pedido y seguir su preparación."
        : "A shared order that connects taking the request with tracking its preparation.",
    },
    seo: {
      title: es
        ? "Takofy: de la mesa a la cocina | Caso de producto"
        : "Takofy: from table to kitchen | Product study",
      description: es
        ? "Un recorrido por la gestión de comandas y el tablero de cocina de Takofy, con pantallas reales del producto."
        : "A look at order management and the kitchen board in Takofy, with actual product screens.",
    },
    scope: es ? "Comandas y cocina" : "Orders and kitchen workflow",
    context: es
      ? "Takofy ya se utiliza en restaurantes de Nicaragua. Su publicación en Play Store está prevista; todavía no está disponible en la tienda."
      : "Takofy is already used by restaurants in Nicaragua. A Play Store release is planned; it is not available in the store yet.",
    heroImage: {
      src: "/images/takofy/pedido-detalle.webp",
      width: 1280,
      height: 720,
      alt: es
        ? "Comanda de Takofy para Mesa 1, con productos, cantidades, notas y acción para enviar a cocina."
        : "Takofy order for Table 1, with products, quantities, notes and the action to send it to the kitchen.",
      caption: es
        ? "Preparación de una comanda. Captura de Takofy con un restaurante de ejemplo."
        : "Preparing an order. Takofy screen with an example restaurant.",
    },
    problem: {
      title: es
        ? "El pedido cambia de manos; su información debe acompañarlo."
        : "The order changes hands. Its information needs to follow.",
      paragraphs: es
        ? [
            "El salón toma la comanda y la cocina prepara los platos. En ese recorrido hacen falta la mesa de destino, los productos, sus cantidades y las indicaciones de preparación.",
            "El equipo también necesita distinguir lo que acaba de llegar, lo que ya está en preparación y lo que está listo para servir.",
          ]
        : [
            "Front of house takes the order and the kitchen prepares the food. Throughout that process, the team needs the destination table, items, quantities and preparation notes.",
            "The team also needs to distinguish newly received orders from those being prepared or ready to serve.",
          ],
    },
    solution: {
      title: es
        ? "Una comanda compartida entre salón y cocina."
        : "An order shared by front of house and the kitchen.",
      paragraphs: es
        ? [
            "Takofy reúne mesas, comandas, pagos, cocina e inventario en una aplicación. En la pantalla de pedido, el equipo selecciona productos, ajusta cantidades y agrega notas sin perder de vista la mesa ni el total.",
            "El tablero de cocina presenta cada comanda con sus platos, cantidades y tiempo de espera. Los estados de recibida, preparando y lista hacen visible en qué parte del recorrido está el pedido.",
          ]
        : [
            "Takofy brings tables, orders, payments, kitchen workflow and inventory into one application. On the order screen, the team selects products, adjusts quantities and adds notes while keeping the table and total visible.",
            "The kitchen board shows each order with its items, quantities and waiting time. Received, preparing and ready states show where each order is in the workflow.",
          ],
    },
    workflow: {
      title: es ? "Así se ve durante el servicio." : "What it looks like during service.",
      items: es
        ? [
            {
              title: "Preparar el pedido",
              text: "Seleccionar productos del menú, ajustar cantidades y añadir las notas que necesita la cocina.",
            },
            {
              title: "Enviar la comanda",
              text: "Revisar la mesa de destino y el total antes de usar la acción de enviar a cocina.",
            },
            {
              title: "Seguir la preparación",
              text: "Consultar las comandas del tablero, pasar una orden a preparando y marcarla lista para servir.",
            },
          ]
        : [
            {
              title: "Build the order",
              text: "Select menu items, adjust quantities and add the notes the kitchen needs.",
            },
            {
              title: "Send it to the kitchen",
              text: "Review the destination table and total before using the send-to-kitchen action.",
            },
            {
              title: "Follow preparation",
              text: "Review orders on the board, move an order to preparing and mark it ready to serve.",
            },
          ],
    },
    detailImage: {
      src: "/images/takofy/cocina-detalle.webp",
      width: 1280,
      height: 720,
      alt: es
        ? "Tablero de cocina de Takofy con una comanda en preparación y otra recibida."
        : "Takofy kitchen board with one order being prepared and another received.",
      caption: es
        ? "La vista de cocina conserva los platos y las cantidades de cada mesa. Datos de ejemplo."
        : "The kitchen view keeps the items and quantities for each table together. Example data.",
    },
    productLink: {
      label: es ? "Ver funciones de Takofy" : "See Takofy features",
      href: getRoute("takofy", locale),
    },
  };
}

function getViggoCase(locale: Locale): CaseStudyContent {
  const es = locale === "es";
  return {
    id: "viggo",
    productName: "VIGGO",
    category: es ? "Gestión empresarial" : "Business management",
    clientContext: es ? "Gimnasios de Nicaragua" : "Gyms in Nicaragua",
    title: es ? "Del cobro al registro de inventario." : "From payment to the inventory record.",
    summary: es
      ? "Un recorrido por la caja y el Kardex de VIGGO: dos vistas para consultar los cobros de un turno y los movimientos de un producto por sede."
      : "A look at the cash register and inventory ledger in VIGGO: two views for reviewing a shift’s payments and a product’s movements by branch.",
    preview: {
      challenge: es
        ? "Saber qué se cobró, cómo se pagó y qué movimientos tuvo el inventario."
        : "Knowing what was collected, how it was paid and how stock changed.",
      solution: es
        ? "Registros de caja e inventario que permiten revisar cada transacción por sede."
        : "Cash register and inventory records for reviewing each transaction by branch.",
    },
    seo: {
      title: es
        ? "VIGGO: cobros e inventario | Caso de producto"
        : "VIGGO: payments and inventory | Product study",
      description: es
        ? "Cómo VIGGO presenta transacciones, cierres y movimientos de inventario, con capturas reales de caja y Kardex."
        : "How VIGGO presents transactions, closeouts and inventory movements, with actual cash register and ledger screens.",
    },
    scope: es ? "Caja y movimientos de inventario" : "Cash register and inventory movements",
    context: es
      ? "VIGGO es una aplicación web que ya utilizan gimnasios de Nicaragua."
      : "VIGGO is a web application already used by gyms in Nicaragua.",
    heroImage: {
      src: "/images/viggo/viggo-caja-gestion-2.webp",
      width: 1916,
      height: 940,
      alt: es
        ? "Gestión de caja en VIGGO con ventas, transacciones y datos del turno."
        : "Cash register management in VIGGO, showing sales, transactions and shift details.",
      caption: es
        ? "Caja: transacciones, importes y estado del turno."
        : "Cash register: transactions, amounts and shift status.",
    },
    problem: {
      title: es
        ? "Revisar una operación requiere más que un total."
        : "Reviewing an operation takes more than a total.",
      paragraphs: es
        ? [
            "En caja importa cuánto se cobró, pero también cuándo, por qué concepto, con qué método y en qué turno. En inventario, el saldo necesita el contexto de las entradas y salidas que lo componen.",
            "Para consultar esa actividad, el equipo necesita registros de transacciones y movimientos que puedan revisarse por sede y período.",
          ]
        : [
            "At the cash register, the amount collected matters, along with when it was paid, what it was for, the payment method and the shift. In inventory, a stock balance needs the context of its incoming and outgoing movements.",
            "To review that activity, the team needs transaction and movement records that can be checked by branch and period.",
          ],
    },
    solution: {
      title: es
        ? "Caja e inventario dentro del mismo sistema."
        : "Cash register and inventory in the same system.",
      paragraphs: es
        ? [
            "VIGGO reúne clientes, servicios, ventas, cobros e inventario. La pantalla de caja presenta las transacciones del turno junto con el método de pago, la referencia y el estado de cada registro.",
            "El Kardex permite consultar un producto por sede y rango de fechas. Cada movimiento muestra su tipo, documento, entrada, salida y saldo, conservando el detalle detrás de las existencias.",
          ]
        : [
            "VIGGO brings customers, services, sales, payments and inventory together. The cash register screen presents the shift’s transactions with the payment method, reference and status of each record.",
            "The inventory ledger lets the team review a product by branch and date range. Each movement shows its type, document, quantity in, quantity out and balance, preserving the detail behind current stock.",
          ],
    },
    workflow: {
      title: es ? "Del turno al movimiento concreto." : "From the shift to an individual movement.",
      items: es
        ? [
            {
              title: "Consultar la caja",
              text: "Revisar el fondo inicial, las ventas y anulaciones junto con la sede y el estado del turno.",
            },
            {
              title: "Revisar una transacción",
              text: "Consultar la hora, el concepto, el importe, el método de pago, la referencia y el estado del cobro.",
            },
            {
              title: "Seguir las existencias",
              text: "Elegir un producto, una sede y un período en el Kardex para ver sus entradas, salidas y saldo.",
            },
          ]
        : [
            {
              title: "Review the cash register",
              text: "Check opening funds, sales and voids alongside the branch and shift status.",
            },
            {
              title: "Inspect a transaction",
              text: "Review the time, concept, amount, payment method, reference and payment status.",
            },
            {
              title: "Follow stock movements",
              text: "Choose a product, branch and period in the ledger to see quantities in, quantities out and the balance.",
            },
          ],
    },
    detailImage: {
      src: "/images/viggo/viggo-kardex-2.webp",
      width: 1917,
      height: 941,
      alt: es
        ? "Kardex de VIGGO con filtros de producto, sede y fechas, y movimientos de compra y venta."
        : "VIGGO inventory ledger with product, branch and date filters, and purchase and sale movements.",
      caption: es
        ? "Kardex: cada entrada y salida conserva su documento y el saldo de la sede."
        : "Inventory ledger: each incoming and outgoing movement retains its document and branch balance.",
    },
    productLink: {
      label: es ? "Ver funciones de VIGGO" : "See VIGGO features",
      href: getRoute("viggo", locale),
    },
  };
}

export function getCaseStudy(id: CaseStudyId, locale: Locale): CaseStudyContent {
  return id === "takofy" ? getTakofyCase(locale) : getViggoCase(locale);
}

export function getCaseStudies(locale: Locale): CaseStudyContent[] {
  return [getTakofyCase(locale), getViggoCase(locale)];
}
