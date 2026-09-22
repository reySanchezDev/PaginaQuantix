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
    return Math.min(160, Math.max(0, Number(element.dataset.motionDelay) || 0));
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
    if (preference.matches || element.contains(document.activeElement) || !element.animate) return;
    element.dataset.motionState = "running";
    const distance = element.dataset.reveal === "image" ? 16 : 12;
    const animation = element.animate(
      [
        { opacity: 0, transform: `translateY(${distance}px)` },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration, delay, easing, fill: "backwards" },
    );
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
      if (event.target instanceof Node && element.contains(event.target)) finish(element);
    });
  });
  preference.addEventListener("change", start);
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) active.forEach((_, element) => finish(element));
  });
  start();
}
