import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
const ctx = { window: {}, Intl, Date, Number, Object };
runInNewContext(readFileSync(new URL("../public/themes/scheduler.js", import.meta.url), "utf8"), ctx);
runInNewContext(readFileSync(new URL("../public/themes/calendar.js", import.meta.url), "utf8"), ctx);
const s = ctx.window.QuantixThemeScheduler, c = ctx.window.QuantixThemeCalendar;
const date = (value) => new Date(value);
test("octubre 2026 inicia el 1 a las 00:00 Nicaragua", () => {
  assert.equal(s.resolve(c, date("2026-10-01T05:59:59Z")), null);
  assert.equal(s.resolve(c, date("2026-10-01T06:00:00Z"))?.id, "octubre-rosa");
});
test("octubre 2026 termina el 31 a las 23:59:59 Nicaragua", () => {
  assert.equal(s.resolve(c, date("2026-11-01T05:59:59Z"))?.id, "octubre-rosa");
  assert.equal(s.resolve(c, date("2026-11-01T06:00:00Z")), null);
});
test("no se reactiva solo al año siguiente", () => {
  assert.equal(s.resolve(c, date("2027-10-19T19:00:00Z")), null);
});
test("prioridad y exclusión de campañas deshabilitadas", () => {
  const config = { ...c, campaigns: [
    { id: "low", enabled: true, start: "2026-10-01", end: "2026-10-31", recurrence: "once", priority: 1 },
    { id: "high", enabled: true, start: "2026-10-01", end: "2026-10-31", recurrence: "once", priority: 2 },
    { id: "off", enabled: false, start: "2026-10-01", end: "2026-10-31", recurrence: "once", priority: 99 },
  ] };
  assert.equal(s.resolve(config, date("2026-10-20T18:00:00Z"))?.id, "high");
});
test("el motor admite fechas anuales que cruzan año nuevo", () => {
  const config = { ...c, campaigns: [{
    id: "christmas", enabled: true, start: "2026-12-15", end: "2027-01-07",
    recurrence: "yearly", priority: 1,
  }] };
  assert.equal(s.resolve(config, date("2026-01-03T18:00:00Z")), null);
  assert.equal(s.resolve(config, date("2026-12-20T18:00:00Z"))?.id, "christmas");
  assert.equal(s.resolve(config, date("2027-01-03T18:00:00Z"))?.id, "christmas");
  assert.equal(s.resolve(config, date("2027-03-03T18:00:00Z")), null);
});
test("descarta fechas inválidas", () => {
  assert.equal(s.isInRange({ start: "2026-02-31", end: "2026-03-31", recurrence: "once" }, "2026-03-01"), false);
});
