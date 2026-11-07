// Calendar arithmetic in the selected IANA zone; no geolocation or permissions.
export function zonedParts(instant, timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(instant);
  return Object.fromEntries(
    parts.filter((p) => p.type !== "literal").map((p) => [p.type, Number(p.value)]),
  );
}
function stamp(p) {
  return Date.UTC(p.year, p.month - 1, p.day, p.hour || 0, p.minute || 0, p.second || 0);
}
export function zonedInstant(parts, timeZone) {
  const wall = stamp(parts);
  let instant = wall;
  for (let i = 0; i < 5; i++) {
    const correction = wall - stamp(zonedParts(new Date(instant), timeZone));
    if (!correction) break;
    instant += correction;
  }
  return instant;
}
export function newYearState(now, timeZone) {
  const local = zonedParts(now, timeZone);
  if (
    local.year < 2026 ||
    (local.year === 2026 && local.month < 11) ||
    local.year > 2027 ||
    (local.year === 2027 && (local.month > 1 || local.day > 7))
  )
    return { phase: "hidden" };
  const target = zonedInstant({ year: 2027, month: 1, day: 1 }, timeZone);
  if (now.getTime() >= target) return { phase: "welcome", target };
  // Count whole calendar months and days before dividing the remaining elapsed seconds.
  let months = 0;
  let cursor = Math.floor(now.getTime() / 1000) * 1000;
  for (let count = 1; count <= 2; count++) {
    const monthIndex = local.month - 1 + count;
    const year = local.year + Math.floor(monthIndex / 12);
    const month = (monthIndex % 12) + 1;
    const day = Math.min(local.day, new Date(Date.UTC(year, month, 0)).getUTCDate());
    const candidate = zonedInstant({ ...local, year, month, day }, timeZone);
    if (candidate > target) break;
    months = count;
    cursor = candidate;
  }
  let days = 0;
  for (let i = 0; i < 32; i++) {
    const p = zonedParts(new Date(cursor), timeZone);
    const nextDay = new Date(Date.UTC(p.year, p.month - 1, p.day + 1));
    const candidate = zonedInstant(
      {
        ...p,
        year: nextDay.getUTCFullYear(),
        month: nextDay.getUTCMonth() + 1,
        day: nextDay.getUTCDate(),
      },
      timeZone,
    );
    if (candidate > target) break;
    cursor = candidate;
    days++;
  }
  let remainder = Math.max(0, Math.floor((target - cursor) / 1000));
  const hours = Math.floor(remainder / 3600);
  remainder %= 3600;
  return {
    phase: "countdown",
    target,
    months,
    days,
    hours,
    minutes: Math.floor(remainder / 60),
    seconds: remainder % 60,
  };
}
