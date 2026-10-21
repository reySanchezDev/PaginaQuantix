/* Motor reutilizable: fecha de Nicaragua, rangos inclusive y prioridad. */
(function (root) {
  "use strict";
  function localDateISO(now, timeZone) {
    const parts = {};
    for (const p of new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(now)) {
      if (["year", "month", "day"].includes(p.type)) parts[p.type] = p.value;
    }
    return parts.year + "-" + parts.month + "-" + parts.day;
  }
  function validDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return false;
    const d = new Date(value + "T12:00:00Z");
    return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
  }
  function isInRange(campaign, today) {
    if (
      campaign.enabled === false ||
      !validDate(campaign.start) ||
      !validDate(campaign.end) ||
      !validDate(today)
    )
      return false;
    if (campaign.recurrence === "once") {
      return today >= campaign.start && today <= campaign.end;
    }
    if (campaign.recurrence === "yearly") {
      const year = today.slice(0, 4),
        firstYear = campaign.start.slice(0, 4);
      const day = today.slice(5),
        from = campaign.start.slice(5),
        to = campaign.end.slice(5);
      if (year < firstYear || (from > to && year === firstYear && day <= to)) return false;
      return from <= to ? day >= from && day <= to : day >= from || day <= to;
    }
    return false;
  }
  function resolve(config, now) {
    const today = localDateISO(now, config.timeZone);
    return (
      (config.campaigns || [])
        .filter((campaign) => isInRange(campaign, today))
        .sort((a, b) => (b.priority || 0) - (a.priority || 0) || a.id.localeCompare(b.id))[0] ||
      null
    );
  }
  root.QuantixThemeScheduler = Object.freeze({ localDateISO, isInRange, resolve });
})(window);
