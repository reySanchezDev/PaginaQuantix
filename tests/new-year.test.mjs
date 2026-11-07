import test from "node:test";
import assert from "node:assert/strict";
import { newYearState, zonedInstant } from "../src/lib/new-year-clock.js";

test("each visitor celebrates at midnight in their selected time zone", () => {
  for (const [zone, instant] of [
    ["America/Managua", "2027-01-01T06:00:00Z"],
    ["America/New_York", "2027-01-01T05:00:00Z"],
    ["America/Los_Angeles", "2027-01-01T08:00:00Z"],
    ["Asia/Kolkata", "2026-12-31T18:30:00Z"],
    ["Pacific/Kiritimati", "2026-12-31T10:00:00Z"],
    ["Pacific/Pago_Pago", "2027-01-01T11:00:00Z"],
  ]) {
    const target = Date.parse(instant);
    assert.equal(zonedInstant({ year: 2027, month: 1, day: 1 }, zone), target);
    const before = newYearState(new Date(target - 1000), zone);
    assert.deepEqual(
      [before.months, before.days, before.hours, before.minutes, before.seconds],
      [0, 0, 0, 0, 1],
    );
    assert.equal(newYearState(new Date(target), zone).phase, "welcome");
  }
});
test("same instant gives different remaining times and welcome states", () => {
  const now = new Date("2027-01-01T05:30:00Z");
  assert.equal(newYearState(now, "America/New_York").phase, "welcome");
  assert.equal(newYearState(now, "America/Managua").minutes, 30);
  assert.equal(newYearState(now, "America/Los_Angeles").hours, 2);
});
test("whole calendar months, remaining days and December rollover", () => {
  const state = newYearState(new Date("2026-11-07T04:30:15Z"), "America/Managua");
  assert.deepEqual(
    [state.months, state.days, state.hours, state.minutes, state.seconds],
    [1, 25, 1, 29, 45],
  );
  const december = newYearState(new Date("2026-12-31T18:00:00Z"), "America/Managua");
  assert.deepEqual([december.months, december.days, december.hours], [0, 0, 12]);
});
test("campaign is removed January 8 locally and never repeats in 2028", () => {
  assert.equal(newYearState(new Date("2027-01-08T05:59:59Z"), "America/Managua").phase, "welcome");
  assert.equal(newYearState(new Date("2027-01-08T06:00:00Z"), "America/Managua").phase, "hidden");
  assert.equal(newYearState(new Date("2028-01-01T00:00:00Z"), "UTC").phase, "hidden");
  assert.equal(newYearState(new Date("2026-10-31T12:00:00Z"), "UTC").phase, "hidden");
});
