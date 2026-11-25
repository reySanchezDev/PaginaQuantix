(() => {
  "use strict";
  const t = window.matchMedia("(prefers-reduced-motion: reduce)");
  for (const e of document.querySelectorAll("[data-miniprestazo]")) {
    const phaseScreens = (
      e.dataset.mpPhaseScreens ||
      "company,dashboard,customer,loan,payment,collection,history,reports,backup"
    )
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const screenNames = [
      "company",
      "monetary",
      "policy",
      "sequences",
      "dashboard",
      "customer",
      "loan",
      "payment",
      "collection",
      "history",
      "reports",
      "backup",
    ];
    const a = screenNames.map((t) => e.querySelector('[data-mp-screen="' + t + '"]')),
      n = e.querySelector("[data-mp-scroll]"),
      o = e.querySelector("[data-mp-app-title]"),
      s = e.querySelector("[data-mp-app-subtitle]"),
      i = e.querySelector("[data-mp-pointer]"),
      r = e.querySelector("[data-mp-play]"),
      c = e.querySelector("[data-mp-play-label]"),
      l = e.querySelector("[data-mp-reset]"),
      m = e.querySelector("[data-mp-i18n]")?.dataset || {},
      d = Object.fromEntries(
        [...e.querySelectorAll("[data-mp-field]")].map((t) => [t.dataset.mpField, t]),
      ),
      p = Object.fromEntries(
        [...e.querySelectorAll("[data-mp-toggle]")].map((t) => [t.dataset.mpToggle, t]),
      ),
      u = [
        m.company,
        m.monetary,
        m.policy,
        m.sequences,
        "en" === e.dataset.locale ? "Dashboard" : "Inicio",
        m.customerTitle,
        m.loanTitle,
        m.paymentTitle,
        "en" === e.dataset.locale ? "Collections" : "Cobranza",
        "en" === e.dataset.locale ? "History" : "Historial",
        "en" === e.dataset.locale ? "Reports" : "Reportes",
        "en" === e.dataset.locale ? "Backup" : "Respaldo",
      ],
      y = e.querySelector("[data-mp-story-title]"),
      h = e.closest(".mp-tour")?.querySelector("[data-mp-order-title]"),
      f = e.querySelector("[data-mp-story-panel]"),
      g = e.querySelector("[data-mp-story-message]");
    let w = 0,
      v = !1,
      C = !1,
      b = null,
      pendingSeek = 0,
      L = !1,
      S = !1,
      x = 0,
      q = !1;
    function E() {
      const t = Math.max(1, Number(d.daysMonth?.value || 30)),
        a = Number(d.decimals?.value || 2),
        n = 10 / t,
        o = ((1e4 * n) / 100) * 15,
        s = e.querySelector("[data-mp-daily-rate]"),
        i = e.querySelector("[data-mp-calc-interest]");
      (s && (s.textContent = "Tasa Diaria: " + n.toFixed(4) + "%"),
        i && (i.textContent = "Interés Calculado: C$ " + o.toFixed(a)));
    }
    function A() {
      for (const [t, a] of Object.entries(p)) {
        const n = e.querySelector('[data-mp-visible-label="' + t + '"]');
        n && (n.textContent = a.checked ? m.visible : m.hidden);
      }
    }
    function T() {
      const t = d.customerName?.value || "",
        a = e.querySelector("[data-mp-customer-initial]");
      a && (a.textContent = t.trim().charAt(0).toUpperCase());
      const n = d.customerDni?.value || "";
      for (const a of ["[data-mp-customer-display]", "[data-mp-payment-customer]"]) {
        const n = e.querySelector(a);
        n && (n.textContent = t);
      }
      for (const t of ["[data-mp-customer-dni]", "[data-mp-payment-dni]"]) {
        const a = e.querySelector(t);
        a && (a.textContent = n);
      }
      const o = d.loanAmount?.value || "",
        s = d.monthlyRate?.value || "",
        i = ("USD" === d.loanCurrency?.value ? "$ " : "C$ ") + o,
        r = e.querySelector("[data-mp-loan-summary-amount]"),
        c = e.querySelector("[data-mp-loan-summary-rate]"),
        l = e.querySelector("[data-mp-payment-loan]");
      (r && (r.textContent = o ? i : "—"),
        c && (c.textContent = s ? s + "%" : "—"),
        l && (l.textContent = o ? i : ""));
      const m = e.querySelector("[data-mp-loan-currency-symbol]"),
        p = e.querySelector("[data-mp-payment-symbol]");
      (m && (m.textContent = "USD" === d.loanCurrency?.value ? "$" : "C$"),
        p && (p.textContent = "USD" === d.paymentCurrency?.value ? "$" : "C$"));
      const u = e.querySelector("[data-mp-currency-label]");
      u && (u.textContent = d.loanCurrency?.selectedOptions?.[0]?.textContent || "");
      const y = e.querySelector("[data-mp-payment-currency-label]");
      y && (y.textContent = d.paymentCurrency?.selectedOptions?.[0]?.textContent || "");
      const h = e.querySelector("[data-mp-frequency-label]");
      h && (h.textContent = d.loanFrequency?.selectedOptions?.[0]?.textContent || "");
      const f = e.querySelector("[data-mp-date-label]");
      if (f && d.loanDate?.value) {
        const t = d.loanDate.value.split("-");
        f.textContent = 3 === t.length ? t[2] + "/" + t[1] + "/" + t[0] : "";
      }
      for (const t of e.querySelectorAll("[data-mp-payment-choice]")) {
        const e = t.dataset.mpPaymentChoice === d.paymentType?.value;
        (t.classList.toggle("is-selected", e), t.setAttribute("aria-pressed", String(e)));
      }
    }
    const M =
      "en" === e.dataset.locale
        ? [
            "First,",
            "Second,",
            "Third,",
            "Fourth,",
            "Fifth,",
            "Sixth,",
            "Seventh,",
            "Eighth,",
            "Ninth,",
          ]
        : [
            "Lo primero es",
            "Lo segundo es",
            "Lo tercero es",
            "Lo cuarto es",
            "Lo quinto es",
            "Lo sexto es",
            "Lo séptimo es",
            "Lo octavo es",
            "Lo noveno es",
          ];
    const playbackTiming = { readablePhase: 4200, dashboard: 4200, backup: 5000 };
    let N = -1;
    const seekPlayback = (delta) => {
      if (!v) return;
      if (b?.seekBy) b.seekBy(delta);
      else pendingSeek += delta;
    };
    function O(t) {
      const e = Math.max(0, Math.min(M.length - 1, t));
      e !== N &&
        h &&
        ((N = e),
        (h.textContent = M[e]),
        h.classList.remove("mp-step-title-enter"),
        h.offsetWidth,
        h.classList.add("mp-step-title-enter"));
    }
    function R(t) {
      y &&
        (y.classList.remove("mp-headline-enter"),
        (y.textContent = t),
        y.offsetWidth,
        y.classList.add("mp-headline-enter"));
    }
    function P() {
      (e.classList.remove("mp-story-active", "mp-story-exiting"),
        f && f.setAttribute("aria-hidden", "true"));
    }
    function F(t, e) {
      return new Promise((a) => {
        if (!v || e !== x) return a(!1);
        const n = {
          remaining: Math.max(0, t),
          startedAt: 0,
          timer: null,
          settled: !1,
          start() {
            this.settled ||
              C ||
              !v ||
              e !== x ||
              ((this.startedAt = performance.now()),
              (this.timer = window.setTimeout(() => {
                ((this.timer = null),
                  this.settled ||
                    (C
                      ? (this.remaining = Math.max(
                          0,
                          this.remaining - (performance.now() - this.startedAt),
                        ))
                      : this.finish(v && e === x)));
              }, this.remaining)));
          },
          halt() {
            this.settled ||
              null === this.timer ||
              (window.clearTimeout(this.timer),
              (this.timer = null),
              (this.remaining = Math.max(
                0,
                this.remaining - (performance.now() - this.startedAt),
              )));
          },
          finish(t) {
            this.settled || (this.halt(), (this.settled = !0), b === this && (b = null), a(t));
          },
          seekBy(delta) {
            if (this.settled) return;
            this.halt();
            this.remaining = Math.max(0, this.remaining - delta);
            if (this.remaining === 0) this.finish(v && e === x);
            else if (!C) this.start();
          },
        };
        ((b = n), n.start());
        if (pendingSeek !== 0) {
          const t = pendingSeek;
          pendingSeek = 0;
          n.seekBy(t);
        }
      });
    }
    function k(t, e) {
      return F(t, e);
    }
    async function D(a, o) {
      if (!v || o !== x) return !1;
      const s = String(a || "")
          .trim()
          .split(/\s+/),
        r = new Set([
          "prestazo",
          "clientes",
          "prestamos",
          "prestamo",
          "cartera",
          "pagos",
          "cobros",
          "listo",
          "lista",
          "ready",
          "customers",
          "loans",
          "payments",
          "portfolio",
        ]),
        c = window.matchMedia("(max-width:600px)").matches ? 65 : 78;
      (g &&
        (g.replaceChildren(),
        s.forEach((t, e) => {
          const a = document.createElement("span"),
            n = t
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/[^a-z]/g, "");
          ((a.className = "mp-story-word" + (r.has(n) ? " is-emphasis" : "")),
            (a.textContent = t),
            a.style.setProperty("--story-delay", 110 + e * c + "ms"),
            g.append(a, " "));
        })),
        n && (n.scrollTop = 0),
        i?.classList.remove("is-visible"),
        e.classList.remove("mp-story-exiting"),
        e.classList.add("mp-story-active"),
        f && f.setAttribute("aria-hidden", "false"));
      const l = t.matches ? 0 : 110 + (s.length - 1) * c + 880;
      return (
        !(l && !(await k(l, o))) &&
        !!(await k(6e3, o)) &&
        !(!v || o !== x) &&
        (e.classList.add("mp-story-exiting"),
        !!(await k(t.matches ? 100 : 700, o)) && (P(), Y(320, o)))
      );
    }
    function I(t, a) {
      const n = d[t];
      if (n) {
        if (
          ((q = !0),
          (n.value = a),
          n.dispatchEvent(new Event("input", { bubbles: !0 })),
          n.dispatchEvent(new Event("change", { bubbles: !0 })),
          (q = !1),
          "currency" === t)
        ) {
          const t = e.querySelector("[data-mp-currency-symbol]");
          t && (t.textContent = "USD" === a ? "$" : "C$");
          const n = e.querySelector("[data-mp-currency-value]");
          n && (n.textContent = d.currency?.selectedOptions?.[0]?.textContent || a);
        }
        ("convention" === t &&
          (("30/360" !== a && "30/365" !== a) || (d.daysMonth.value = "30"),
          ("30/360" !== a && "ACTUAL/360" !== a) || (d.daysYear.value = "360"),
          ("30/365" !== a && "ACTUAL/365" !== a) || (d.daysYear.value = "365")),
          E(),
          T());
      }
    }
    function B(t, e) {
      const a = p[t];
      a &&
        ((q = !0),
        (a.checked = e),
        a.dispatchEvent(new Event("change", { bubbles: !0 })),
        (q = !1),
        A());
    }
    function U(t) {
      ((w = Math.max(0, Math.min(a.length - 1, t))),
        O(Math.max(0, phaseScreens.indexOf(screenNames[w]))),
        a.forEach((t, e) => {
          t && (t.hidden = e !== w);
        }),
        o && (o.textContent = u[w]),
        o?.closest(".mp-appbar")?.classList.toggle("is-monetary", 1 === w),
        s && ((s.hidden = 1 !== w), (s.textContent = (1 === w && m.monetarySubtitle) || "")),
        n && (n.scrollTop = 0));
    }
    function $(t) {
      (r && r.setAttribute("aria-pressed", String(t)),
        c &&
          (c.textContent = t
            ? m.pause || "Pause"
            : v && C
              ? "en" === e.dataset.locale
                ? "Resume"
                : "Reanudar"
              : m.play || "Play"));
    }
    function H() {
      v && !C && ((C = !0), b?.halt(), $(!1), e.classList.add("mp-playback-paused"));
    }
    function j() {
      ((x += 1),
        (v = !1),
        (C = !1),
        (pendingSeek = 0),
        b?.finish(!1),
        e.classList.remove("mp-playback-paused"),
        $(!1),
        i?.classList.remove("is-visible", "is-tapping"),
        P(),
        e.querySelectorAll(".mp-demo-target").forEach((t) => t.classList.remove("mp-demo-target")),
        e.querySelectorAll(".mp-demo-typing").forEach((t) => t.classList.remove("mp-demo-typing")),
        e
          .querySelectorAll(".mp-demo-typing-field")
          .forEach((t) => t.classList.remove("mp-demo-typing-field")));
    }
    function z() {
      j();
      for (const [t, e] of Object.entries(d)) "SELECT" !== e.tagName && (e.value = "");
      Object.values(p).forEach((t) => {
        t.checked = !1;
      });
      for (const [t, e] of Object.entries({
        currency: "NIO",
        reportCurrency: "NIO",
        priority: "CAPITAL_FIRST",
        convention: "30/360",
        proration: "CYCLE_PROPORTION",
        decimals: "2",
        roundMode: "HALF_UP",
        daysMonth: "30",
        daysYear: "360",
        loanPlan: "",
        loanCurrency: "NIO",
        loanFrequency: "",
        paymentCurrency: "NIO",
        paymentType: "mixed",
      }))
        I(t, e);
      const t = new Date(),
        dateParts = [
          t.getFullYear(),
          String(t.getMonth() + 1).padStart(2, "0"),
          String(t.getDate()).padStart(2, "0"),
        ].join("-");
      (I("loanDate", dateParts),
        I("paymentDate", dateParts),
        I("exchangeRate", "1.0"),
        A(),
        E(),
        U(0),
        R(m.settingsHeading || "Configurar tu empresa."),
        T(),
        (S = !1),
        (L = !1),
        e.dispatchEvent(new CustomEvent("mp-demo-reset")));
    }
    function Y(e, a) {
      return F(t.matches ? Math.max(300, Math.min(e, 4e3)) : e, a);
    }
    async function _(a, o) {
      if (!a || !v || o !== x) return !1;
      const s = n.getBoundingClientRect(),
        r = a.getBoundingClientRect(),
        c = r.top - s.top + n.scrollTop - s.height / 2 + r.height / 2;
      if (
        (n.scrollTo({ top: Math.max(0, c), behavior: t.matches ? "instant" : "smooth" }),
        !(await Y(620, o)))
      )
        return !1;
      if (!i || t.matches) return !0;
      const l = e.querySelector(".mp-stage").getBoundingClientRect(),
        m = a.getBoundingClientRect();
      return (
        (i.style.left =
          Math.max(4, m.left + Math.min(0.75 * m.width, m.width - 10) - l.left) + "px"),
        (i.style.top = Math.max(4, m.top + 0.55 * m.height - l.top) + "px"),
        i.classList.add("is-visible"),
        Y(540, o)
      );
    }
    async function W(t, e) {
      if (!(await _(t, e))) return !1;
      const a = t.closest(".mp-input-wrap") || t;
      (t.classList.add("mp-demo-target"),
        a.classList.add("mp-interaction-pulse"),
        i?.classList.add("is-tapping"));
      try {
        return await Y(520, e);
      } finally {
        (i?.classList.remove("is-tapping"),
          t.classList.remove("mp-demo-target"),
          a.classList.remove("mp-interaction-pulse"));
      }
    }
    async function V(t, e, a) {
      const n = d[t];
      if (!n || !(await W(n, a))) return !1;
      const o = n.closest(".mp-input-wrap") || n;
      (o.classList.add("mp-demo-typing"), n.classList.add("mp-demo-typing-field"));
      try {
        I(t, "");
        for (const o of String(e)) {
          if (!v || a !== x) return !1;
          if ((I(t, n.value + o), !(await Y(112, a)))) return !1;
        }
        return Y(640, a);
      } finally {
        (o.classList.remove("mp-demo-typing"), n.classList.remove("mp-demo-typing-field"));
      }
    }
    async function G(a, n, o) {
      const s = d[a],
        i =
          "paymentType" === a
            ? e.querySelector('[data-mp-payment-choice="' + n + '"]')
            : "loanCurrency" === a
              ? s?.closest(".mp-currency-row")
              : "loanFrequency" === a
                ? s?.closest(".mp-frequency-row")
                : "paymentCurrency" === a
                  ? s?.closest(".mp-payment-currency-picker")
                  : s;
      if (!s || !(await W(i || s, o))) return !1;
      let r;
      if (!t.matches && "SELECT" === s.tagName && "paymentType" !== a) {
        ((r = document.createElement("div")), (r.className = "mp-demo-options"));
        const t = [...s.options];
        for (const e of t) {
          const t = document.createElement("div");
          ((t.textContent = e.textContent),
            (t.className = e.value === n ? "is-selected" : ""),
            r.append(t));
        }
        const a = s.getBoundingClientRect(),
          o = e.querySelector(".mp-stage").getBoundingClientRect();
        ((r.style.left = Math.max(8, a.left - o.left) + "px"),
          (r.style.top = Math.max(8, a.bottom - o.top + 3) + "px"),
          (r.style.width = Math.min(a.width, o.width - 16) + "px"),
          e.querySelector(".mp-stage").append(r));
      }
      return (await Y(980, o)) ? (I(a, n), r?.remove(), Y(620, o)) : (r?.remove(), !1);
    }
    async function J(t, e, a) {
      const n = p[t];
      return !!(await W(n?.closest("label") || n, a)) && (B(t, e), Y(590, a));
    }
    async function X(t, a) {
      const n = e.querySelector('[data-mp-action="' + t + '"]');
      if (!n || !(await W(n, a))) return !1;
      n.classList.add("mp-button-pressed");
      const o = await Y(880, a);
      return (n.classList.remove("mp-button-pressed"), o);
    }
    async function K() {
      if (v) return;
      const t = document.activeElement;
      (t && e.contains(t) && t.matches("input, textarea, select") && t.blur(),
        z(),
        (v = !0),
        (C = !1),
        (L = !0));
      const a = ++x;
      ($(!0), document.hidden && H());
      const n = [
        async () =>
          await (async () => (
            U(0),
            !!(await Y(480, a)) &&
              !!(await W(d.country, a)) &&
              (I("country", "🇳🇮 Nicaragua"),
              !!(await V("companyName", "Prestazo", a)) &&
                !!(await J("companyName", !0, a)) &&
                X("saveCompany", a))
          ))(),
        async () => (
          U(1),
          !!(await Y(550, a)) &&
            !!(await G("currency", "NIO", a)) &&
            !!(await V("capital", "10000", a)) &&
            !!(await X("saveCapital", a)) &&
            !!(await J("validateCapital", !0, a)) &&
            G("priority", "CAPITAL_FIRST", a)
        ),
        async () => (
          U(2),
          !!(await Y(550, a)) &&
            !!(await G("convention", "ACTUAL/365", a)) &&
            !!(await V("daysYear", "365", a)) &&
            !!(await G("proration", "EXACT_DAYS", a)) &&
            !!(await G("roundMode", "HALF_EVEN", a)) &&
            X("savePolicy", a)
        ),
        async () => (
          U(3),
          !!(await Y(550, a)) &&
            !!(await V("lastLoan", "A-000", a)) &&
            !!(await X("saveLoan", a)) &&
            !!(await V("lastReceipt", "R-000", a)) &&
            X("saveReceipt", a)
        ),
      ];
      for (let t = 0; t < n.length && v && a === x; t++) {
        if (!(await n[t]())) break;
        if (!(await Y(1450, a))) break;
      }
      if (!(v && a === x && (await Y(1400, a)) && (await D(m.storyConfigured, a)))) return;
      R("en" === e.dataset.locale ? "Review your portfolio." : "Revisar tu cartera.");
      U(4);
      if (!(await Y(playbackTiming.dashboard, a))) return;
      R(m.customerHeading);
      U(5);
      if (
        !(await Y(470, a)) ||
        !(await V("customerName", "Juan Pérez García", a)) ||
        !(await V("customerDni", "001-010100-0000A", a)) ||
        !(await V("customerPhone", "8888-8888", a)) ||
        !(await V("customerAddress", "Del mercado 2c al norte", a)) ||
        !(await X("createCustomer", a)) ||
        !(await D(m.storyCustomerSaved, a))
      )
        return;
      R(m.loanHeading);
      U(6);
      if (
        !(await Y(550, a)) ||
        !(await G("loanCurrency", "NIO", a)) ||
        !(await V("loanAmount", "10000", a)) ||
        !(await V("monthlyRate", "10", a)) ||
        !(await G("loanFrequency", "monthly", a)) ||
        !(await X("createLoan", a)) ||
        !(await D(m.storyLoanCreated, a))
      )
        return;
      R(m.paymentHeading);
      U(7);
      if (
        !(await Y(520, a)) ||
        !(await G("paymentCurrency", "NIO", a)) ||
        !(await V("paymentAmount", "1500", a)) ||
        !(await G("paymentType", "mixed", a)) ||
        !(await X("registerPayment", a)) ||
        !(await D(m.storyCompleted, a))
      )
        return;
      R("en" === e.dataset.locale ? "Review collections." : "Revisar cobranza.");
      U(8);
      if (!(await Y(playbackTiming.readablePhase, a))) return;
      R("en" === e.dataset.locale ? "Check the history." : "Consultar historial.");
      U(9);
      if (!(await Y(playbackTiming.readablePhase, a))) return;
      R("en" === e.dataset.locale ? "Read your reports." : "Revisar reportes.");
      U(10);
      if (!(await Y(playbackTiming.readablePhase, a))) return;
      R("en" === e.dataset.locale ? "Manage backups." : "Gestionar respaldos.");
      U(11);
      if (!(await Y(playbackTiming.backup, a))) return;
      if (v && a === x) z();
    }
    (e.addEventListener("input", (t) => {
      q || (t.target.matches("[data-mp-field]") && (v && j(), (L = !0), E(), T()));
    }),
      e.addEventListener("change", (t) => {
        q ||
          (t.target.matches("[data-mp-toggle]")
            ? (v && j(), (L = !0), A())
            : t.target.matches("[data-mp-field]") &&
              (v && j(),
              (L = !0),
              "convention" === t.target.dataset.mpField && I("convention", t.target.value),
              "currency" === t.target.dataset.mpField && I("currency", t.target.value),
              E(),
              T()));
      }),
      d.country?.addEventListener("click", () => {
        (v && j(), (L = !0), I("country", "🇳🇮 Nicaragua"));
      }));
    const Q = window.matchMedia("(max-width: 900px)"),
      Z = window.visualViewport;
    let tt = null,
      et = !1;
    function at() {
      if (!tt || !e.contains(tt) || !Q.matches) return;
      const t = n?.getBoundingClientRect();
      if (!t) return;
      const a = tt.getBoundingClientRect(),
        o = 16;
      (a.bottom > t.bottom - o
        ? (n.scrollTop += a.bottom - t.bottom + o)
        : a.top < t.top + o && (n.scrollTop -= t.top + o - a.top),
        requestAnimationFrame(() => {
          if (!tt || !e.contains(tt)) return;
          const t = tt.getBoundingClientRect(),
            a = Z ? Z.offsetTop : 0,
            n = Z ? Z.offsetTop + Z.height : window.innerHeight;
          t.bottom > n - o
            ? window.scrollBy(0, t.bottom - n + o + 12)
            : t.top < a + o && window.scrollBy(0, t.top - a - o - 12);
        }));
    }
    function nt() {
      Q.matches &&
        tt &&
        (Z && Z.height < 0.84 * window.innerHeight
          ? (e.classList.add("mp-keyboard-visible"),
            e.style.setProperty("--mp-visible-height", Z.height + "px"))
          : (e.classList.remove("mp-keyboard-visible"),
            e.style.removeProperty("--mp-visible-height")),
        et ||
          ((et = !0),
          requestAnimationFrame(() => {
            ((et = !1), at());
          })));
    }
    if (
      (e.addEventListener("focusin", (t) => {
        const e = t.target;
        Q.matches &&
          e.matches('input:not([readonly]):not([type="checkbox"]),textarea') &&
          ((tt = e), v && j(), (L = !0), nt(), window.setTimeout(nt, 240));
      }),
      e.addEventListener("focusout", (t) => {
        t.target === tt &&
          ((tt = null),
          e.classList.remove("mp-keyboard-visible"),
          e.style.removeProperty("--mp-visible-height"));
      }),
      Z?.addEventListener("resize", nt),
      Z?.addEventListener("scroll", nt),
      e.addEventListener("click", (t) => {
        const a = t.target.closest("[data-mp-payment-choice]");
        a && e.contains(a) && (v && j(), (L = !0), I("paymentType", a.dataset.mpPaymentChoice));
      }),
      e.addEventListener("pointerdown", (t) => {
        if (v || !t.target.closest(".mp-device")) return;
        const a = t.target.closest("button, input, select, label");
        if (!a || !e.contains(a)) return;
        const n = a.closest(".mp-input-wrap") || a;
        (n.classList.remove("mp-interaction-pulse"),
          n.offsetWidth,
          n.classList.add("mp-interaction-pulse"),
          window.setTimeout(() => n.classList.remove("mp-interaction-pulse"), 850),
          a.matches("[data-mp-action]") &&
            (a.classList.add("mp-button-pressed"),
            window.setTimeout(() => a.classList.remove("mp-button-pressed"), 850)));
      }),
      r?.addEventListener("click", () => {
        v
          ? C
            ? v &&
              C &&
              !document.hidden &&
              ((C = !1), e.classList.remove("mp-playback-paused"), $(!0), b?.start())
            : H()
          : K();
      }),
      e.querySelector("[data-mp-back]")?.addEventListener("click", () => {
        seekPlayback(-3000);
      }),
      e.querySelector("[data-mp-next]")?.addEventListener("click", () => {
        seekPlayback(3000);
      }),
      l?.addEventListener("click", () => {
        (z(), K());
      }),
      document.addEventListener("visibilitychange", () => {
        document.hidden && H();
      }),
      window.addEventListener("blur", H),
      window.addEventListener("pagehide", H),
      z(),
      !t.matches && "IntersectionObserver" in window)
    ) {
      const ot = new IntersectionObserver(
        (t) => {
          !L && t.some((t) => t.isIntersecting) && (ot.disconnect(), K());
        },
        { threshold: 0.2 },
      );
      ot.observe(e.querySelector(".mp-stage") || e);
    }
  }
})();
