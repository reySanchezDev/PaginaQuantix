import { mkdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = join(projectRoot, "public/images/og");

const palette = {
  accent: "#a94f2f",
  canvas: "#f3f0e8",
  dark: "#102c32",
  ink: "#142326",
  muted: "#4f5c5d",
  subtle: "#626e70",
  border: "#d0d4cf",
  inverse: "#f2f4f1",
  inverseMuted: "#b8c5c4",
};

const cards = [
  {
    file: "quantix-es",
    eyebrow: "INGENIERÍA DE SOFTWARE",
    title: ["Productos de software", "y desarrollo", "a medida."],
    description: "Sistemas empresariales · Productos · Integraciones",
  },
  {
    file: "quantix-en",
    eyebrow: "SOFTWARE ENGINEERING",
    title: ["Software products", "and custom", "development."],
    description: "Business systems · Products · Integrations",
  },
  {
    file: "viggo-es",
    eyebrow: "PRODUCTO QUANTIX",
    title: ["VIGGO"],
    description: "Operación empresarial · Clientes · Ventas · Inventario",
    accent: "#5147bd",
  },
  {
    file: "viggo-en",
    eyebrow: "QUANTIX PRODUCT",
    title: ["VIGGO"],
    description: "Business operations · Customers · Sales · Inventory",
    accent: "#5147bd",
  },
  {
    file: "takofy-es",
    eyebrow: "PRODUCTO QUANTIX",
    title: ["Takofy"],
    description: "Restaurantes · Salón · Cocina · Caja · Inventario",
    accent: "#0e665f",
  },
  {
    file: "takofy-en",
    eyebrow: "QUANTIX PRODUCT",
    title: ["Takofy"],
    description: "Restaurants · Front of house · Kitchen · Point of sale",
    accent: "#0e665f",
  },
  {
    file: "nica-finanzas-es",
    eyebrow: "PRODUCTO QUANTIX",
    title: ["Nica Finanzas"],
    description: "Cálculos financieros gratuitos para Nicaragua",
    accent: "#356847",
  },
  {
    file: "nica-finanzas-en",
    eyebrow: "QUANTIX PRODUCT",
    title: ["Nica Finanzas"],
    description: "Free financial calculators for Nicaragua",
    accent: "#356847",
  },
  {
    file: "qavision-es",
    eyebrow: "PRODUCTO QUANTIX",
    title: ["QAVision"],
    description: "Captura y anotación de evidencia de pruebas en Windows",
    accent: "#335f87",
  },
  {
    file: "qavision-en",
    eyebrow: "QUANTIX PRODUCT",
    title: ["QAVision"],
    description: "Capture and annotate software-testing evidence on Windows",
    accent: "#335f87",
  },
];

function escapeXml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function brandMark() {
  return `
    <rect x="72" y="72" width="64" height="64" rx="5" fill="#fbfaf6" />
    <g transform="translate(79 79) scale(2.05)">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" fill="none" stroke="${palette.dark}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" fill="none" stroke="${palette.accent}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" />
    </g>`;
}

function renderCard(card) {
  const isProduct = card.file.split("-").length > 2 || !card.file.startsWith("quantix-");
  const titleSize = isProduct ? (card.title[0].length > 12 ? 78 : 94) : 68;
  const titleStart = isProduct ? 326 : 258;
  const titleGap = isProduct ? 96 : 83;
  const accent = card.accent ?? palette.dark;
  const title = card.title
    .map(
      (line, index) =>
        `<text x="380" y="${titleStart + index * titleGap}" fill="${palette.ink}" font-family="Arial, Helvetica, sans-serif" font-size="${titleSize}" font-weight="700" letter-spacing="-2">${escapeXml(line)}</text>`,
    )
    .join("\n");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="${palette.canvas}" />
    <rect width="300" height="630" fill="${palette.dark}" />
    ${brandMark()}
    <text x="72" y="507" fill="${palette.inverse}" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700" letter-spacing="1.5">QUANTIX</text>
    <text x="72" y="541" fill="${palette.inverseMuted}" font-family="Arial, Helvetica, sans-serif" font-size="17" letter-spacing="1.2">SOFTWARE</text>
    <rect x="72" y="572" width="156" height="6" fill="${palette.accent}" />
    <text x="380" y="112" fill="${accent}" font-family="Courier New, monospace" font-size="17" font-weight="700" letter-spacing="2">${escapeXml(card.eyebrow)}</text>
    <line x1="380" y1="148" x2="1128" y2="148" stroke="${palette.border}" stroke-width="2" />
    ${title}
    <text x="380" y="528" fill="${palette.muted}" font-family="Arial, Helvetica, sans-serif" font-size="25">${escapeXml(card.description)}</text>
    <text x="380" y="575" fill="${palette.subtle}" font-family="Courier New, monospace" font-size="16" font-weight="700" letter-spacing="1.5">quantix.software</text>
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
