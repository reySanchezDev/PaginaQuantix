(() => {
  // Sparse snow and ice crystals; no image requests or third-party animation library.
  const canvas = document.querySelector("[data-christmas-snow]");
  const toggle = document.querySelector("[data-snow-toggle]");
  if (canvas && toggle) {
    const context = canvas.getContext("2d", { alpha: true });
    if (context) initializeSnow(canvas, toggle, context);
  }
  function initializeSnow(canvas, toggle, ctx) {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let paused = false;
    try {
      paused = localStorage.getItem("quantix-snow-paused") === "1";
    } catch {
      /* Optional storage. */
    }
    let width = 0;
    let height = 0;
    let particles = [];
    let protectedAreas = [];
    let measurePending = true;
    let frame = null;
    let previousTime = 0;
    let lastPaint = 0;
    let running = false;
    const activeSeason = () => document.documentElement.dataset.seasonalTheme === "navidad-premium";
    const contentSelector =
      "h1,h2,h3,h4,p,a,button,label,input,select,textarea,img,video,iframe,[data-time-unit],summary,[role=dialog]";
    function measureContent() {
      protectedAreas = [...document.querySelectorAll(contentSelector)].flatMap((node) => {
        const rect = node.getBoundingClientRect();
        if (!rect.width || !rect.height || rect.bottom < 0 || rect.top > height) return [];
        // Keep all glyphs, product imagery and controls completely clear of snow.
        return [
          {
            left: rect.left - 8,
            right: rect.right + 8,
            top: rect.top - 8,
            bottom: rect.bottom + 8,
          },
        ];
      });
      measurePending = false;
    }
    function particle(initial = false) {
      return {
        x: Math.random() * width,
        y: initial ? Math.random() * height : -12,
        radius: 0.8 + Math.random() * 1.5,
        speed: 12 + Math.random() * 15,
        drift: 2 + Math.random() * 5,
        phase: Math.random() * Math.PI * 2,
        opacity: 0.2 + Math.random() * 0.24,
        crystal: Math.random() < 0.2,
      };
    }
    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      const scale = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      const count = width < 768 ? 20 : Math.min(58, Math.round((width * height) / 23000));
      particles = Array.from({ length: count }, () => particle(true));
      measurePending = true;
    }
    function draw(p, time) {
      const x = p.x + Math.sin(time * 0.00022 + p.phase) * p.drift;
      const size = p.crystal ? p.radius * 2 : p.radius;
      if (
        protectedAreas.some(
          (r) =>
            x + size > r.left && x - size < r.right && p.y + size > r.top && p.y - size < r.bottom,
        )
      )
        return;
      // More presence at the edges; much quieter in the central reading area.
      const edge = Math.abs(x / width - 0.5) * 2;
      ctx.globalAlpha = p.opacity * (0.45 + edge * 0.55);
      ctx.fillStyle = "#edf7f4";
      ctx.strokeStyle = "#dcece8";
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      if (p.crystal) {
        for (let ray = 0; ray < 6; ray++) {
          const angle = (ray * Math.PI) / 3 + p.phase;
          ctx.moveTo(x, p.y);
          ctx.lineTo(x + Math.cos(angle) * size, p.y + Math.sin(angle) * size);
        }
        ctx.stroke();
      } else {
        ctx.arc(x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    function animate(time) {
      if (!running) return;
      frame = requestAnimationFrame(animate);
      if (time - lastPaint < 1000 / 30) return;
      const elapsed = previousTime ? Math.min((time - previousTime) / 1000, 0.1) : 0;
      previousTime = time;
      lastPaint = time;
      if (measurePending) measureContent();
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.y += p.speed * elapsed;
        if (p.y > height + 12) Object.assign(p, particle());
        draw(p, time);
      }
    }
    function sync() {
      const available = activeSeason() && !reduced.matches;
      toggle.hidden = !available;
      toggle.setAttribute("aria-pressed", String(paused));
      toggle.querySelector("[data-snow-label]").textContent = paused
        ? toggle.dataset.resume
        : toggle.dataset.pause;
      const shouldRun = available && !paused && !document.hidden;
      if (shouldRun === running) return;
      running = shouldRun;
      canvas.hidden = !running;
      if (running) {
        resize();
        previousTime = 0;
        lastPaint = 0;
        frame = requestAnimationFrame(animate);
      } else {
        if (frame !== null) cancelAnimationFrame(frame);
        frame = null;
        ctx.clearRect(0, 0, width, height);
      }
    }
    toggle.addEventListener("click", () => {
      paused = !paused;
      try {
        localStorage.setItem("quantix-snow-paused", paused ? "1" : "0");
      } catch {
        /* Optional storage. */
      }
      sync();
    });
    new MutationObserver(sync).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-seasonal-theme"],
    });
    new ResizeObserver(() => {
      measurePending = true;
    }).observe(document.body);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    window.addEventListener("pageshow", sync);
    window.addEventListener(
      "resize",
      () => {
        if (running) resize();
      },
      { passive: true },
    );
    window.addEventListener(
      "scroll",
      () => {
        measurePending = true;
      },
      { passive: true },
    );
    document.addEventListener(
      "toggle",
      () => {
        measurePending = true;
      },
      true,
    );
    document.addEventListener(
      "load",
      () => {
        measurePending = true;
      },
      true,
    );
    document.fonts?.ready.then(() => {
      measurePending = true;
    });
    sync();
  }
})();
