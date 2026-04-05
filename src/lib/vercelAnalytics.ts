type AnalyticsMode = "auto" | "development" | "production";

declare global {
  interface Window {
    va?: (event: "beforeSend" | "event" | "pageview", properties?: unknown) => void;
    vaq?: [string, unknown?][];
    vam?: Exclude<AnalyticsMode, "auto">;
  }
}

const SDK_NAME = "@vercel/analytics/astro";
const SDK_VERSION = "2.0.1";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function setMode(mode: AnalyticsMode = "auto"): void {
  if (!isBrowser()) {
    return;
  }

  window.vam = mode === "auto" ? (import.meta.env.DEV ? "development" : "production") : mode;
}

function isDevelopment(): boolean {
  return isBrowser() ? window.vam === "development" : import.meta.env.DEV;
}

function makeAbsolute(url: string): string {
  return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/")
    ? url
    : `/${url}`;
}

function turnValueToRegExp(value: string): RegExp {
  return new RegExp(`/${escapeRegExp(value)}(?=[/?#]|$)`);
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getScriptSrc(basePath?: string): string {
  if (isDevelopment()) {
    return "https://va.vercel-scripts.com/v1/script.debug.js";
  }

  if (basePath) {
    return makeAbsolute(`${basePath}/insights/script.js`);
  }

  return "/_vercel/insights/script.js";
}

export function initVercelAnalytics({
  mode = "auto",
  basePath,
}: {
  mode?: AnalyticsMode;
  basePath?: string;
} = {}): void {
  if (!isBrowser()) {
    return;
  }

  setMode(mode);

  if (!window.va) {
    window.va = function queue(...params): void {
      if (!window.vaq) {
        window.vaq = [];
      }

      window.vaq.push(params as [string, unknown?]);
    };
  }

  const scriptSrc = getScriptSrc(basePath);

  if (document.head.querySelector(`script[src*="${scriptSrc}"]`)) {
    return;
  }

  const script = document.createElement("script");
  script.src = scriptSrc;
  script.defer = true;
  script.dataset.sdkn = SDK_NAME;
  script.dataset.sdkv = SDK_VERSION;
  script.dataset.disableAutoTrack = "1";

  if (basePath) {
    script.dataset.endpoint = makeAbsolute(`${basePath}/insights`);
  }

  script.onerror = (): void => {
    const message = isDevelopment()
      ? "Revisa si hay un bloqueador de contenido activo e intenta de nuevo."
      : "Activa Web Analytics en Vercel y vuelve a desplegar para empezar a recibir eventos.";

    console.log(`[Vercel Web Analytics] No se pudo cargar ${scriptSrc}. ${message}`);
  };

  document.head.appendChild(script);
}

export function computeRoute(
  pathname: string | null,
  pathParams: Record<string, string | string[]> | null,
): string | null {
  if (!pathname || !pathParams) {
    return pathname;
  }

  let result = pathname;

  try {
    const entries = Object.entries(pathParams);

    for (const [key, value] of entries) {
      if (!Array.isArray(value)) {
        const matcher = turnValueToRegExp(value);

        if (matcher.test(result)) {
          result = result.replace(matcher, `/[${key}]`);
        }
      }
    }

    for (const [key, value] of entries) {
      if (Array.isArray(value)) {
        const matcher = turnValueToRegExp(value.join("/"));

        if (matcher.test(result)) {
          result = result.replace(matcher, `/[...${key}]`);
        }
      }
    }

    return result;
  } catch {
    return pathname;
  }
}

export function trackPageview(path: string, params: Record<string, string | string[]> | null): void {
  if (!isBrowser()) {
    return;
  }

  window.va?.("pageview", {
    route: computeRoute(path, params),
    path,
  });
}

export function track(name: string, properties?: Record<string, string | number | boolean>): void {
  if (!isBrowser()) {
    return;
  }

  window.va?.("event", {
    name,
    data: properties,
  });
}
