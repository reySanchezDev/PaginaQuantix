import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
const ctx = { window: {}, Intl, Date, Number, Object };
runInNewContext(
  readFileSync(new URL("../public/themes/scheduler.js", import.meta.url), "utf8"),
  ctx,
);
runInNewContext(
  readFileSync(new URL("../public/themes/calendar.js", import.meta.url), "utf8"),
  ctx,
);
const s = ctx.window.QuantixThemeScheduler,
  c = ctx.window.QuantixThemeCalendar;
const date = (value) => new Date(value);
test("cada campaña visual tiene un banner informativo bilingüe", () => {
  const layout = readFileSync(new URL("../src/layouts/BaseLayout.astro", import.meta.url), "utf8");
  const bannerIds = [...layout.matchAll(/data-seasonal-banner="([^"]+)"/g)].map(
    (match) => match[1],
  );
  assert.equal(new Set(bannerIds).size, bannerIds.length, "No se deben duplicar los banners");
  assert.deepEqual(
    bannerIds.sort(),
    Array.from(c.campaigns, (campaign) => campaign.id).sort(),
    "Toda campaña del calendario debe explicar su ambientación al visitante",
  );
  assert.match(layout, /"Día de Muertos en Quantix\."/);
  assert.match(layout, /"Day of the Dead at Quantix\."/);
  assert.match(layout, /"Navidad en Quantix\."/);
  assert.match(layout, /"Christmas at Quantix\."/);
});

test("octubre 2026 inicia el 1 a las 00:00 Nicaragua", () => {
  assert.equal(s.resolve(c, date("2026-10-01T05:59:59Z")), null);
  assert.equal(s.resolve(c, date("2026-10-01T06:00:00Z"))?.id, "octubre-rosa");
});
test("octubre rosa cede prioridad a Halloween desde el 30 de octubre de 2026", () => {
  assert.equal(s.resolve(c, date("2026-10-30T05:59:59Z"))?.id, "octubre-rosa");
  assert.equal(s.resolve(c, date("2026-10-30T06:00:00Z"))?.id, "halloween-tech-noir");
  assert.equal(s.resolve(c, date("2026-10-31T06:00:00Z"))?.id, "halloween-tech-noir");
  assert.equal(s.resolve(c, date("2026-11-01T05:59:59Z"))?.id, "halloween-tech-noir");
  assert.equal(s.resolve(c, date("2026-11-01T06:00:00Z")), null);
});

test("halloween respeta octubre rosa hasta el 29 de octubre", () => {
  assert.equal(s.resolve(c, date("2026-10-20T18:00:00Z"))?.id, "octubre-rosa");
  assert.equal(s.resolve(c, date("2026-10-29T18:00:00Z"))?.id, "octubre-rosa");
  assert.equal(s.resolve(c, date("2026-10-30T18:00:00Z"))?.id, "halloween-tech-noir");
});

test("halloween no vuelve en 2027 sin autorizacion", () => {
  assert.equal(s.resolve(c, date("2027-10-31T12:00:00Z")), null);
});
test("Día de Muertos Premium solo está activo el 2 de noviembre de 2026", () => {
  assert.equal(s.resolve(c, date("2026-11-01T18:00:00Z")), null);
  assert.equal(s.resolve(c, date("2026-11-02T06:00:00Z"))?.id, "dia-de-muertos-premium");
  assert.equal(s.resolve(c, date("2026-11-03T05:59:59Z"))?.id, "dia-de-muertos-premium");
});
test("Navidad Premium inicia y termina a medianoche de Nicaragua", () => {
  assert.equal(s.resolve(c, date("2026-11-03T05:59:59Z"))?.id, "dia-de-muertos-premium");
  assert.equal(s.resolve(c, date("2026-11-03T06:00:00Z"))?.id, "navidad-premium");
  assert.equal(s.resolve(c, date("2027-01-01T05:59:59Z"))?.id, "navidad-premium");
  assert.equal(s.resolve(c, date("2027-01-01T06:00:00Z")), null);
});
test("Navidad Premium no se reactiva en la siguiente temporada", () => {
  assert.equal(s.resolve(c, date("2027-11-03T12:00:00Z")), null);
});
test("no se reactiva solo al año siguiente", () => {
  assert.equal(s.resolve(c, date("2027-10-19T19:00:00Z")), null);
});
test("prioridad y exclusión de campañas deshabilitadas", () => {
  const config = {
    ...c,
    campaigns: [
      {
        id: "low",
        enabled: true,
        start: "2026-10-01",
        end: "2026-10-31",
        recurrence: "once",
        priority: 1,
      },
      {
        id: "high",
        enabled: true,
        start: "2026-10-01",
        end: "2026-10-31",
        recurrence: "once",
        priority: 2,
      },
      {
        id: "off",
        enabled: false,
        start: "2026-10-01",
        end: "2026-10-31",
        recurrence: "once",
        priority: 99,
      },
    ],
  };
  assert.equal(s.resolve(config, date("2026-10-20T18:00:00Z"))?.id, "high");
});
test("el motor admite fechas anuales que cruzan año nuevo", () => {
  const config = {
    ...c,
    campaigns: [
      {
        id: "christmas",
        enabled: true,
        start: "2026-12-15",
        end: "2027-01-07",
        recurrence: "yearly",
        priority: 1,
      },
    ],
  };
  assert.equal(s.resolve(config, date("2026-01-03T18:00:00Z")), null);
  assert.equal(s.resolve(config, date("2026-12-20T18:00:00Z"))?.id, "christmas");
  assert.equal(s.resolve(config, date("2027-01-03T18:00:00Z"))?.id, "christmas");
  assert.equal(s.resolve(config, date("2027-03-03T18:00:00Z")), null);
});
test("descarta fechas inválidas", () => {
  assert.equal(
    s.isInRange({ start: "2026-02-31", end: "2026-03-31", recurrence: "once" }, "2026-03-01"),
    false,
  );
});
