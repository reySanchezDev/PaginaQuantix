import { mkdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = join(projectRoot, "public/images/og");

const palette = {
  accent: "#bb3e20",
  canvas: "#f6f4ee",
  ink: "#25241f",
  muted: "#626057",
  border: "#b7b3a6",
};

const cards = [
  {
    file: "quantix-es",
    eyebrow: "Ingeniería de software",
    title: ["Software a medida", "para tu empresa."],
    description: "Desarrollo · Integraciones · Productos propios",
  },
  {
    file: "quantix-en",
    eyebrow: "Software engineering",
    title: ["Custom software", "for your business."],
    description: "Development · Integrations · Our products",
  },
  {
    file: "viggo-es",
    eyebrow: "PRODUCTO QUANTIX",
    title: ["VIGGO"],
    description: "Operación empresarial · Clientes · Ventas · Inventario",
    accent: "#715031",
  },
  {
    file: "viggo-en",
    eyebrow: "QUANTIX PRODUCT",
    title: ["VIGGO"],
    description: "Business operations · Customers · Sales · Inventory",
    accent: "#715031",
  },
  {
    file: "takofy-es",
    eyebrow: "PRODUCTO QUANTIX",
    title: ["Takofy"],
    description: "Restaurantes · Salón · Cocina · Caja · Inventario",
    accent: "#426047",
  },
  {
    file: "takofy-en",
    eyebrow: "QUANTIX PRODUCT",
    title: ["Takofy"],
    description: "Restaurants · Front of house · Kitchen · Point of sale",
    accent: "#426047",
  },
  {
    file: "oktara-es",
    eyebrow: "PRODUCTO QUANTIX",
    title: ["Oktara"],
    description: "Operaciones · Formularios · Sucursales · Seguimiento",
    accent: "#315c57",
  },
  {
    file: "oktara-en",
    eyebrow: "QUANTIX PRODUCT",
    title: ["Oktara"],
    description: "Operations · Forms · Locations · Follow-up",
    accent: "#315c57",
  },
  {
    file: "tentrix-es",
    eyebrow: "PRODUCTO QUANTIX",
    title: ["Tentrix"],
    description: "Soporte · Tickets · Responsables · Tiempos de atención",
    accent: "#56518a",
  },
  {
    file: "tentrix-en",
    eyebrow: "QUANTIX PRODUCT",
    title: ["Tentrix"],
    description: "Support · Tickets · Ownership · Response times",
    accent: "#56518a",
  },
  {
    file: "lendly-es",
    eyebrow: "PRODUCTO QUANTIX",
    title: ["Lendly"],
    description: "Clientes · Préstamos · Cuotas · Trabajo sin conexión",
    accent: "#24598a",
  },
  {
    file: "lendly-en",
    eyebrow: "QUANTIX PRODUCT",
    title: ["Lendly"],
    description: "Clients · Loans · Installments · Offline-first",
    accent: "#24598a",
  },
  {
    file: "hen-screenshots-es",
    eyebrow: "PRODUCTO QUANTIX",
    title: ["Hen Screenshots"],
    description: "App Store · Google Play · Portfolios · Open source",
    accent: "#7b5136",
  },
  {
    file: "hen-screenshots-en",
    eyebrow: "QUANTIX PRODUCT",
    title: ["Hen Screenshots"],
    description: "App Store · Google Play · Portfolios · Open source",
    accent: "#7b5136",
  },
  {
    file: "nica-finanzas-es",
    eyebrow: "PRODUCTO QUANTIX",
    title: ["Nica Finanzas"],
    description: "Cálculos financieros gratuitos para Nicaragua",
    accent: "#8c442c",
  },
  {
    file: "nica-finanzas-en",
    eyebrow: "QUANTIX PRODUCT",
    title: ["Nica Finanzas"],
    description: "Free financial calculators for Nicaragua",
    accent: "#8c442c",
  },
  {
    file: "qavision-es",
    eyebrow: "PRODUCTO QUANTIX",
    title: ["QAVision"],
    description: "Captura y anotación de evidencia de pruebas en Windows",
    accent: "#4e557d",
  },
  {
    file: "qavision-en",
    eyebrow: "QUANTIX PRODUCT",
    title: ["QAVision"],
    description: "Capture and annotate test evidence on Windows",
    accent: "#4e557d",
  },
];

function escapeXml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function renderCard(card) {
  const isProduct = !card.file.startsWith("quantix-");
  const accent = card.accent ?? palette.accent;
  const title = card.title
    .map(
      (line, index) =>
        `<text x="72" y="${isProduct ? 330 : 286 + index * 87}" fill="${isProduct ? accent : palette.ink}" font-family="Arial, Helvetica, sans-serif" font-size="${isProduct ? 84 : 70}" font-weight="700" letter-spacing="-3">${escapeXml(line)}</text>`,
    )
    .join("\n");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="${palette.canvas}" />
    <circle cx="88" cy="76" r="13" fill="none" stroke="${palette.accent}" stroke-width="7"/>
    <path d="m97 86 11 11" stroke="${palette.accent}" stroke-width="7"/>
    <text x="124" y="91" fill="${palette.ink}" font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="700" letter-spacing="-2">quantix.</text>
    <text x="72" y="179" fill="${palette.muted}" font-family="Arial, Helvetica, sans-serif" font-size="19">${escapeXml(card.eyebrow)}</text>
    ${title}
    <line x1="72" y1="486" x2="1128" y2="486" stroke="${palette.border}" />
    <text x="72" y="535" fill="${palette.muted}" font-family="Arial, Helvetica, sans-serif" font-size="23">${escapeXml(card.description)}</text>
    <text x="72" y="581" fill="${palette.muted}" font-family="Arial, Helvetica, sans-serif" font-size="17">quantix.software</text>
  </svg>`;
}

await mkdir(outputDirectory, { recursive: true });
await Promise.all(
  cards.map((card) =>
    sharp(Buffer.from(renderCard(card)))
      .png({ compressionLevel: 9, palette: true, quality: 100 })
      .toFile(join(outputDirectory, `${card.file}.png`)),
  ),
);

console.log(`Generated ${cards.length} Open Graph images in ${outputDirectory}.`);
