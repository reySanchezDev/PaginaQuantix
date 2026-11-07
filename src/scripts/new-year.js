async function initNewYear() {
  const section = document.querySelector("[data-new-year]");
  if (!section) return;
  const { newYearState } = await import(/* @vite-ignore */ "/themes/new-year-clock.js");
  const es = section.dataset.locale === "es";
  const autoZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  let zone = autoZone;
  try {
    const saved = localStorage.getItem("quantix-new-year-zone");
    if (saved) {
      new Intl.DateTimeFormat("en", { timeZone: saved }).format();
      zone = saved;
    }
  } catch {
    /* Storage is optional, including private browsing. */
  }
  const select = section.querySelector("[data-zone-select]");
  const zones = new Set([
    autoZone,
    zone,
    "UTC",
    "America/Managua",
    "America/New_York",
    "America/Los_Angeles",
  ]);
  if (Intl.supportedValuesOf)
    for (const value of Intl.supportedValuesOf("timeZone")) zones.add(value);
  for (const value of [...zones].sort()) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value.replaceAll("_", " ");
    select.append(option);
  }
  select.value = zone;
  const units = section.querySelectorAll("[data-time-unit]");
  const welcome = section.querySelector("[data-welcome-copy]");
  const caption = section.querySelector("[data-zone-caption]");
  const fireworks = section.querySelector("[data-fireworks]");
  let celebrated = false;
  let previousPhase;
  function celebrate() {
    if (celebrated || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    celebrated = true;
    try {
      if (localStorage.getItem("quantix-welcome-2027")) return;
      localStorage.setItem("quantix-welcome-2027", "1");
    } catch {
      /* Still celebrate once in this page when storage is unavailable. */
    }
    fireworks.hidden = false;
    for (let burst = 0; burst < 6; burst++) {
      for (let ray = 0; ray < 24; ray++) {
        const particle = document.createElement("i");
        particle.className = "new-year__particle";
        const angle = (ray * Math.PI) / 12;
        const radius = 80 + (ray % 3) * 24;
        particle.style.cssText = `--x:${15 + (burst % 3) * 35}%;--y:${25 + (burst % 2) * 25}%;--dx:${Math.cos(angle) * radius}px;--dy:${Math.sin(angle) * radius + 45}px;--delay:${burst * 0.9}s`;
        fireworks.append(particle);
      }
    }
    setTimeout(() => {
      fireworks.hidden = true;
      fireworks.replaceChildren();
    }, 8000);
  }
  function tick() {
    const state = newYearState(new Date(), zone);
    section.hidden = state.phase === "hidden";
    section.dataset.phase = state.phase;
    if (state.phase === "hidden") {
      previousPhase = state.phase;
      return;
    }
    const isWelcome = state.phase === "welcome";
    for (const node of section.querySelectorAll("[data-countdown-copy]")) node.hidden = isWelcome;
    welcome.hidden = !isWelcome;
    section.setAttribute("aria-labelledby", isWelcome ? "new-year-greeting" : "new-year-title");
    welcome.querySelector("h2").id = "new-year-greeting";
    if (!isWelcome) {
      for (const [i, key] of ["months", "days", "hours", "minutes", "seconds"].entries()) {
        const value = String(state[key]).padStart(2, "0");
        if (units[i].textContent !== value) units[i].textContent = value;
      }
    }
    caption.textContent = `${isWelcome ? (es ? "Celebramos contigo" : "Celebrating with you") : es ? "Rumbo a 2027" : "On our way to 2027"} · ${zone.replaceAll("_", " ")}`;
    if (isWelcome && previousPhase !== "welcome") celebrate();
    previousPhase = state.phase;
  }
  select.addEventListener("change", () => {
    zone = select.value;
    try {
      localStorage.setItem("quantix-new-year-zone", zone);
    } catch {
      /* Optional persistence. */
    }
    tick();
  });
  section.querySelector("[data-zone-auto]").addEventListener("click", () => {
    zone = autoZone;
    select.value = zone;
    try {
      localStorage.removeItem("quantix-new-year-zone");
    } catch {
      /* Optional persistence. */
    }
    tick();
  });
  tick();
  setInterval(() => {
    if (!document.hidden) tick();
  }, 1000);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) tick();
  });
  window.addEventListener("pageshow", tick);
}
initNewYear();
