const feedback = document.querySelector<HTMLElement>("[data-email-feedback]");

if (feedback) {
  const email = feedback.dataset.email!;
  const copy = JSON.parse(feedback.dataset.copy!) as Record<string, string>;
  const toast = feedback.querySelector<HTMLElement>("[data-email-toast]")!;
  const title = feedback.querySelector<HTMLElement>("[data-toast-title]")!;
  const detail = feedback.querySelector<HTMLElement>("[data-toast-detail]")!;
  const address = feedback.querySelector<HTMLInputElement>("[data-toast-address]")!;
  const announcement = feedback.querySelector<HTMLElement>("[data-email-announcement]")!;
  let dismissTimer: number | undefined;
  let trigger: HTMLElement | null = null;
  let attempt = 0;

  const dismiss = () => {
    window.clearTimeout(dismissTimer);
    if (toast.contains(document.activeElement)) trigger?.focus({ preventScroll: true });
    toast.hidden = true;
    announcement.textContent = "";
  };
  const scheduleDismiss = () => {
    window.clearTimeout(dismissTimer);
    if (
      toast.dataset.state !== "error" &&
      !toast.contains(document.activeElement) &&
      !toast.matches(":hover")
    ) {
      dismissTimer = window.setTimeout(dismiss, 6500);
    }
  };
  const show = (copied: boolean, openingApp: boolean) => {
    title.textContent = copied ? copy.copied : copy.copyFailed;
    detail.textContent = copied
      ? openingApp
        ? copy.mailBackup
        : copy.copyDetail
      : copy.copyFailedDetail;
    toast.dataset.state = copied ? "success" : "error";
    address.hidden = copied;
    toast.hidden = false;
    announcement.textContent = "";
    requestAnimationFrame(() => {
      announcement.textContent = `${title.textContent}. ${detail.textContent}`;
    });
    scheduleDismiss();
  };
  const copyAddress = async (openingApp: boolean, source: HTMLElement) => {
    const currentAttempt = ++attempt;
    trigger = source;
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(email);
      if (currentAttempt === attempt) show(true, openingApp);
    } catch {
      if (currentAttempt === attempt) show(false, openingApp);
    }
  };

  document.querySelectorAll<HTMLButtonElement>("[data-copy-email]").forEach((button) => {
    button.hidden = false;
    button.addEventListener("click", () => {
      void copyAddress(false, button);
    });
  });
  document.addEventListener("click", (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    const link =
      event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>("a[href^='mailto:']")
        : null;
    if (
      !link ||
      link.getAttribute("href")?.split("?", 1)[0].toLowerCase() !== `mailto:${email}`.toLowerCase()
    )
      return;
    // Keep native mailto navigation synchronous; copy is a backup, not app detection.
    void copyAddress(true, link);
  });
  feedback.querySelector("[data-toast-close]")!.addEventListener("click", dismiss);
  address.addEventListener("click", () => address.select());
  address.addEventListener("focus", () => address.select());
  toast.addEventListener("mouseenter", () => window.clearTimeout(dismissTimer));
  toast.addEventListener("mouseleave", scheduleDismiss);
  toast.addEventListener("focusin", () => window.clearTimeout(dismissTimer));
  toast.addEventListener("focusout", () => requestAnimationFrame(scheduleDismiss));
  toast.addEventListener("keydown", (event) => {
    if (event.key === "Escape") dismiss();
  });
}
