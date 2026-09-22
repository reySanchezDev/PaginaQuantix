const toggle = document.getElementById("mobile-menu-toggle");
const overlay = document.getElementById("mobile-menu");
const dialog = overlay?.querySelector<HTMLElement>(".menu-dialog");
const closeButton = overlay?.querySelector<HTMLButtonElement>(".menu-close");
const desktopViewport = window.matchMedia("(min-width: 64rem)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const focusableSelector = "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])";
let closeFallback: number | undefined;
let scrollPosition = 0;

const pageSurfaces = [
  ...document.querySelectorAll<HTMLElement>(
    ".site-header, main, .site-footer, [data-email-feedback]",
  ),
];
function closeMenu({ immediate = false, restoreFocus = true } = {}) {
  if (!overlay || overlay.hidden || overlay.dataset.state === "closing") return;
  pageSurfaces.forEach((surface) => {
    surface.inert = false;
  });
  toggle?.setAttribute("aria-expanded", "false");
  if (restoreFocus) toggle?.focus({ preventScroll: true });
  overlay.setAttribute("aria-hidden", "true");
  overlay.inert = true;
  overlay.dataset.state = "closing";

  const finish = () => {
    if (overlay.dataset.state !== "closing") return;
    overlay.hidden = true;
    overlay.inert = false;
    overlay.dataset.state = "closed";
    const scrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    document.body.removeAttribute("data-menu-open");
    document.body.style.removeProperty("top");
    window.scrollTo(0, scrollPosition);
    document.documentElement.style.scrollBehavior = scrollBehavior;
  };
  window.clearTimeout(closeFallback);
  if (immediate || reducedMotion.matches) return finish();
  closeFallback = window.setTimeout(finish, 320);
}

function openMenu() {
  if (!overlay) return;
  window.clearTimeout(closeFallback);
  overlay.hidden = false;
  overlay.inert = false;
  overlay.setAttribute("aria-hidden", "false");
  toggle?.setAttribute("aria-expanded", "true");
  if (document.body.dataset.menuOpen !== "true") scrollPosition = window.scrollY;
  document.body.style.top = `-${scrollPosition}px`;
  document.body.dataset.menuOpen = "true";
  overlay.dataset.state = reducedMotion.matches ? "open" : "opening";
  if (!reducedMotion.matches) {
    requestAnimationFrame(() => {
      if (overlay.dataset.state === "opening") overlay.dataset.state = "open";
    });
  }
  closeButton?.focus({ preventScroll: true });
  pageSurfaces.forEach((surface) => {
    surface.inert = true;
  });
}

toggle?.addEventListener("click", openMenu);
desktopViewport.addEventListener("change", (event) => {
  if (!event.matches || overlay?.hidden) return;
  closeMenu({ immediate: true, restoreFocus: false });
  document.querySelector<HTMLElement>(".site-header a")?.focus({ preventScroll: true });
});
overlay?.querySelectorAll<HTMLElement>("[data-menu-close]").forEach((element) => {
  element.addEventListener("click", () => closeMenu());
});
overlay?.querySelectorAll<HTMLElement>("nav a").forEach((element) => {
  element.addEventListener("click", () => closeMenu({ immediate: true, restoreFocus: false }));
});

document.addEventListener("keydown", (event) => {
  if (!overlay || overlay.hidden) return;
  if (event.key === "Escape") {
    event.preventDefault();
    closeMenu();
    return;
  }
  if (event.key !== "Tab" || !dialog) return;

  const focusable = [...dialog.querySelectorAll<HTMLElement>(focusableSelector)];
  const first = focusable[0];
  const last = focusable.at(-1);
  if (!first || !last) return;

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus({ preventScroll: true });
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus({ preventScroll: true });
  }
});
