/** Motion is an enhancement: content stays visible if scripts or observers fail. */
export function initializeSiteMotion() {
  if (document.documentElement.dataset.motionReady || !("IntersectionObserver" in window)) return;
  document.documentElement.dataset.motionReady = "true";
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-enter], [data-reveal]"));
  const seen = new WeakSet<HTMLElement>();
  const active = new Map<HTMLElement, Animation>();
  const tokens = getComputedStyle(document.documentElement);
  const easing =
    tokens.getPropertyValue("--motion-ease-out").trim() || "cubic-bezier(0.22, 1, 0.36, 1)";
  // CSS minification can serialize 480ms as .48s; WAAPI always expects milliseconds.
  const durationToken = tokens.getPropertyValue("--motion-reveal").trim();
  const duration =
    Number.parseFloat(durationToken) * (durationToken.endsWith("ms") ? 1 : 1000) || 480;

  function readDelay(element: HTMLElement) {
    return Math.min(260, Math.max(0, Number(element.dataset.motionDelay) || 0));
  }

  function finish(element: HTMLElement) {
    active.get(element)?.cancel();
    active.delete(element);
    element.dataset.motionState = "done";
  }

  function reveal(element: HTMLElement, delay = 0) {
    observer.unobserve(element);
    if (seen.has(element)) return;
    seen.add(element);
    const frame = element.dataset.reveal === "frame";
    const focusSurface = frame ? element.closest("a") || element : element;
    if (preference.matches || focusSurface.contains(document.activeElement) || !element.animate)
      return;
    element.dataset.motionState = "running";
    const distance = element.dataset.reveal === "image" ? 16 : 12;
    let keyframes: Keyframe[] = [
      { opacity: 0, transform: `translateY(${distance}px)` },
      { opacity: 1, transform: "translateY(0)" },
    ];
    let timing = duration;
    if (frame) {
      keyframes = [
        { clipPath: "polygon(0 0, 8% 0, 0 100%, 0 100%)", transform: "scale(1.04)" },
        { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", transform: "scale(1)" },
      ];
      timing = 680;
    } else if (element.dataset.enter === "headline") {
      keyframes = [
        { clipPath: "inset(95% -6% -18% -6%)", transform: "translateY(0.28em)" },
        { clipPath: "inset(-15% -6% -18% -6%)", transform: "translateY(0)" },
      ];
      timing = 620;
    } else if (element.dataset.enter === "stage") {
      keyframes = [
        { opacity: 0.2, transform: "translateY(20px) scale(0.96)" },
        { opacity: 1, transform: "translateY(0) scale(1)" },
      ];
      timing = 680;
    }
    const animation = element.animate(keyframes, {
      duration: timing,
      delay,
      easing,
      fill: "backwards",
    });
    active.set(element, animation);
    animation.finished.then(
      () => finish(element),
      () => finish(element),
    );
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        if (entry.isIntersecting) reveal(element, readDelay(element));
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
  );

  function start() {
    if (preference.matches) {
      observer.disconnect();
      active.forEach((_, element) => finish(element));
      return;
    }
    targets.forEach((element) => {
      if (seen.has(element)) return;
      const rect = element.getBoundingClientRect();
      if (rect.bottom <= 0) {
        seen.add(element);
      } else if (rect.top < window.innerHeight - 24) {
        const delay =
          window.scrollY === 0 || element.hasAttribute("data-reveal") ? readDelay(element) : 0;
        reveal(element, delay);
      } else {
        observer.observe(element);
      }
    });
  }

  document.addEventListener("focusin", (event) => {
    active.forEach((_, element) => {
      if (!(event.target instanceof Node)) return;
      const focusSurface =
        element.dataset.reveal === "frame" ? element.closest("a") || element : element;
      if (focusSurface.contains(event.target)) finish(element);
    });
  });
  preference.addEventListener("change", start);
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) active.forEach((_, element) => finish(element));
  });
  start();
}
