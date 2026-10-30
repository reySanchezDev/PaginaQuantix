/* Halloween Tech Noir: decorative-only effects; never intercept clicks or focus. */
(() => {
  "use strict";

  const root = document.documentElement;
  const settings = Object.freeze({
    spiderCursor: true,
    spiderWebs: true,
  });
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const spider = `<img src="/themes/halloween-tech-noir/spider.svg?v=minimal-20261030" alt="" draggable="false" aria-hidden="true" />`;

  let currentMode = "";
  let teardown = () => {};

  function mountHangingSpider() {
    const hero = document.querySelector(".home-hero");
    if (!hero) return () => {};
    const hanging = document.createElement("span");
    hanging.className = "halloween-hanging-spider";
    hanging.setAttribute("aria-hidden", "true");
    hanging.innerHTML = spider;
    hero.append(hanging);
    return () => hanging.remove();
  }

  function mountCursor() {
    const controller = new AbortController();
    const { signal } = controller;
    const pointer = document.createElement("span");
    pointer.className = "halloween-spider-pointer";
    pointer.innerHTML = spider;
    document.body.append(pointer);
    let frame = 0;
    let posX = 0;
    let posY = 0;
    const shots = new Set();

    const hide = () => {
      root.removeAttribute("data-halloween-cursor");
      pointer.classList.remove("is-visible");
    };
    const move = (event) => {
      if (event.pointerType && event.pointerType !== "mouse") return hide();
      if (
        event.target instanceof Element &&
        event.target.closest("input, textarea, select, [contenteditable], [role='textbox']")
      )
        return hide();
      posX = event.clientX;
      posY = event.clientY;
      root.setAttribute("data-halloween-cursor", "on");
      pointer.classList.add("is-visible");
      if (frame) return;
      frame = requestAnimationFrame(() => {
        pointer.style.left = `${posX}px`;
        pointer.style.top = `${posY}px`;
        frame = 0;
      });
    };
    const shoot = (event) => {
      if (event.button !== 0 || root.getAttribute("data-halloween-cursor") !== "on") return;
      pointer.classList.remove("is-tapping");
      // Restart the short leg-tap even on consecutive clicks.
      void pointer.offsetWidth;
      pointer.classList.add("is-tapping");
      const shot = document.createElement("span");
      shot.className = "halloween-silk-shot";
      shot.style.left = `${event.clientX}px`;
      shot.style.top = `${event.clientY - 27}px`;
      document.body.append(shot);
      shots.add(shot);
      shot.addEventListener(
        "animationend",
        () => {
          shot.remove();
          shots.delete(shot);
        },
        { once: true },
      );
      // The click itself is never delayed: navigation continues normally.
    };

    window.addEventListener("pointermove", move, { passive: true, signal });
    window.addEventListener("pointerdown", shoot, { passive: true, signal });
    window.addEventListener("blur", hide, { signal });
    document.addEventListener(
      "pointerout",
      (event) => {
        if (!event.relatedTarget) hide();
      },
      { passive: true, signal },
    );

    return () => {
      controller.abort();
      if (frame) cancelAnimationFrame(frame);
      hide();
      pointer.remove();
      for (const shot of shots) shot.remove();
      shots.clear();
    };
  }

  function sync() {
    root.toggleAttribute("data-halloween-webs-off", !settings.spiderWebs);
    const enabled = root.getAttribute("data-seasonal-theme") === "halloween-tech-noir";
    const mode = !enabled
      ? "off"
      : reduced.matches
        ? "static"
        : finePointer.matches
          ? "desktop"
          : "touch";
    if (currentMode === mode) return;
    teardown();
    currentMode = mode;
    if (!enabled) {
      teardown = () => {};
      return;
    }
    const cleanups = [];
    if (settings.spiderWebs) cleanups.push(mountHangingSpider());
    if (mode === "desktop" && settings.spiderCursor) cleanups.push(mountCursor());
    teardown = () => cleanups.forEach((cleanup) => cleanup());
  }

  const observer = new MutationObserver(sync);
  observer.observe(root, { attributes: true, attributeFilter: ["data-seasonal-theme"] });
  reduced.addEventListener("change", sync);
  finePointer.addEventListener("change", sync);
  window.addEventListener("pagehide", () => {
    teardown();
    teardown = () => {};
    currentMode = "";
  });
  window.addEventListener("pageshow", sync);
  sync();
})();
