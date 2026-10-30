/* Halloween Tech Noir: decorative-only effects; never intercept clicks or focus. */
(() => {
  "use strict";

  const root = document.documentElement;
  const settings = Object.freeze({
    spiderCursor: true,
    ambientSpiders: true,
    spiderWebs: true,
  });
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const spider = `<svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><radialGradient id="spider-abdomen" cx=".32" cy=".18" r=".85"><stop stop-color="#67514a"/><stop offset=".38" stop-color="#2b1f23"/><stop offset="1" stop-color="#060910"/></radialGradient></defs><g class="halloween-spider__legs halloween-spider__legs--left" fill="none" stroke-linecap="round" stroke-linejoin="round"><g stroke="#08090f" stroke-width="7.2"><path d="M40 40 29 29 18 12 5 9"/><path d="M39 45 23 39 11 29 2 33"/><path d="M39 50 22 56 8 69 4 80"/><path d="M42 54 30 68 23 84 16 94"/></g><g stroke="#c28a65" stroke-width="3.1"><path d="M40 40 29 29 18 12 5 9"/><path d="M39 45 23 39 11 29 2 33"/><path d="M39 50 22 56 8 69 4 80"/><path d="M42 54 30 68 23 84 16 94"/></g></g><g class="halloween-spider__legs halloween-spider__legs--right" fill="none" stroke-linecap="round" stroke-linejoin="round"><g stroke="#08090f" stroke-width="7.2"><path d="M56 40 67 29 78 12 91 9"/><path d="M57 45 73 39 85 29 94 33"/><path d="M57 50 74 56 88 69 92 80"/><path d="M54 54 66 68 73 84 80 94"/></g><g stroke="#c28a65" stroke-width="3.1"><path d="M56 40 67 29 78 12 91 9"/><path d="M57 45 73 39 85 29 94 33"/><path d="M57 50 74 56 88 69 92 80"/><path d="M54 54 66 68 73 84 80 94"/></g></g><ellipse cx="48" cy="62" rx="19" ry="22" fill="url(#spider-abdomen)" stroke="#c28b64" stroke-width="2.4"/><path d="M39 52q9-6 18 0M39 68q9 8 18 0M47 46v31" fill="none" stroke="#e1a17a" stroke-width="1.8" opacity=".6"/><path d="M43 59 48 65 53 59 48 55Z" fill="#c88964" opacity=".7"/><ellipse cx="48" cy="39" rx="13" ry="11" fill="#292025" stroke="#d1a077" stroke-width="2.3"/><path d="M42 45 39 52M54 45 57 52" stroke="#aa846a" stroke-width="2.5"/><g fill="#ffc38c"><circle cx="44" cy="36" r="1.6"/><circle cx="52" cy="36" r="1.6"/></g></svg>`;

  let currentMode = "";
  let teardown = () => {};

  function mountWalkers() {
    const hosts = [
      document.querySelector(".home-hero") || document.querySelector("main > section:first-child"),
      document.querySelector(".cta-section"),
      document.querySelector(".site-footer"),
    ];
    const mounted = [];
    for (const [index, host] of hosts.entries()) {
      if (!host || mounted.some((item) => item.host === host)) continue;
      const node = document.createElement("span");
      node.className = "halloween-walker";
      node.innerHTML = spider;
      node.style.setProperty("--walk-delay", `-${index * 6}s`);
      host.classList.add("halloween-walkway");
      host.append(node);
      mounted.push({ host, node });
      if (mounted.length === 3) break;
    }
    return () => {
      for (const { host, node } of mounted) {
        node.remove();
        host.classList.remove("halloween-walkway");
      }
    };
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
    const animate = enabled && !reduced.matches;
    const mode = !animate ? "off" : finePointer.matches ? "desktop" : "touch";
    if (currentMode === mode) return;
    teardown();
    currentMode = mode;
    if (!animate) {
      teardown = () => {};
      return;
    }
    const cleanups = [];
    if (settings.ambientSpiders) cleanups.push(mountWalkers());
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
