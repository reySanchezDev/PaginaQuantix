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
      playIcon = e.querySelector("[data-mp-play-icon]"),
      pauseIcon = e.querySelector("[data-mp-pause-icon]"),
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
      playbackPosition = 0,
      replayTarget = null,
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
      const selectedPlan = e.querySelector("[data-mp-selected-plan-detail]");
      if (selectedPlan) selectedPlan.textContent = "WEEKLY_STANDARD" === d.loanPlan?.value ? ("en" === e.dataset.locale ? "12 installments · Weekly · 10% monthly" : "12 cuotas · Semanal · 10% mensual") : ("en" === e.dataset.locale ? "12 installments · Monthly · 10% monthly" : "12 cuotas · Mensual · 10% mensual");
      syncOnboardingViews();
      localizeEnglishDemo();
    }
    function syncOnboardingViewsLegacy() {
      const customerName = d.customerName?.value || ("en" === e.dataset.locale ? "New customer" : "Nuevo cliente");
      const loanAmount = Number(d.loanAmount?.value || 0);
      const paymentAmount = Number(d.paymentAmount?.value || 0);
      const monthlyRate = Number(d.monthlyRate?.value || 0);
      const paymentType = d.paymentType?.value || "mixed";
      const currency = "USD" === d.loanCurrency?.value ? "$" : "C$";
      const money = (value) => `${currency} ${Number(value || 0).toLocaleString("en-US")}`;
      const screenTitles = {
        collection: "en" === e.dataset.locale ? "To Collect" : "A Cobrar",
        history: "en" === e.dataset.locale ? "Payment History" : "Historial de Pagos",
        reports: "en" === e.dataset.locale ? "Reports" : "Reportes",
        backup: "en" === e.dataset.locale ? "Scheduled Backup" : "Respaldo Programado",
      };
      for (const [screen, title] of Object.entries(screenTitles)) {
        const heading = e.querySelector(`[data-mp-screen="${screen}"] .mp-section-title`);
        heading && (heading.textContent = title);
      }
      const customerCount = e.querySelector('[data-mp-metric="customers"]');
      const loanCount = e.querySelector('[data-mp-metric="loans"]');
      const placed = e.querySelector('[data-mp-metric="placed"]');
      const payments = e.querySelector('[data-mp-metric="payments"]');
      const capital = e.querySelector('[data-mp-metric="capital"]');
      const overdue = e.querySelector('[data-mp-metric="overdue"]');
      customerCount && (customerCount.textContent = d.customerName?.value ? "1" : "0");
      loanCount && (loanCount.textContent = loanAmount ? "1" : "0");
      placed && (placed.textContent = money(loanAmount));
      payments && (payments.textContent = money(paymentAmount));
      capital && (capital.textContent = money(Math.max(0, Number(d.capital?.value || 0) - loanAmount)));
      overdue && (overdue.textContent = "0");
      const collection = e.querySelectorAll(".mp-status-list")[0];
      if (collection) {
        collection.replaceChildren();
        const item = document.createElement("div");
        item.innerHTML = `<strong>${customerName}</strong><span class="mp-status mp-status-success">${"en" === e.dataset.locale ? "Due today" : "Vence hoy"}</span><small>${money(paymentAmount || 1500)} · ${"en" === e.dataset.locale ? "Monthly plan" : "Plan mensual"}</small><small>${"en" === e.dataset.locale ? "Installment amount and balance from the active loan." : "Cuota y saldo del préstamo activo."}</small>`;
        collection.append(item);
        const action = document.createElement("button");
        action.className = "mp-save-button";
        action.type = "button";
        action.dataset.mpNav = "payment";
        action.textContent = "en" === e.dataset.locale ? "Register payment" : "Registrar Pago";
        collection.append(action);
      }
      const history = e.querySelectorAll(".mp-status-list")[1];
      if (history) {
        history.replaceChildren();
        const item = document.createElement("div");
        item.innerHTML = `<strong>${"en" === e.dataset.locale ? "Receipt" : "Recibo"} #R-000</strong><span class="mp-status mp-status-success">${money(paymentAmount)}</span><small>${customerName} · ${"en" === e.dataset.locale ? "Mixed payment · Today" : "Pago mixto · Hoy"}</small>`;
        history.append(item);
      }
      const report = e.querySelector('[data-mp-report="realized"]');
      const projected = e.querySelector('[data-mp-report="projected"]');
      const fx = e.querySelector('[data-mp-report="fx"]');
      report && (report.textContent = money(paymentAmount));
      projected && (projected.textContent = money(loanAmount * (Number(d.monthlyRate?.value || 0) / 100)));
      fx && (fx.textContent = money(0));
      const statementName = e.querySelector("[data-mp-statement-name]");
      const statementId = e.querySelector("[data-mp-statement-id]");
      const statementBalance = e.querySelector("[data-mp-statement-balance]");
      const statementApplication = e.querySelector("[data-mp-statement-application]");
      statementName && (statementName.textContent = customerName);
      statementBalance && (statementBalance.textContent = money(Math.max(0, loanAmount - paymentAmount)));
      statementApplication && (statementApplication.textContent = money(paymentAmount));
    }
    function syncOnboardingViews() {
      const customerName = d.customerName?.value || "";
      const loanAmount = Number(d.loanAmount?.value || 0);
      const paymentAmount = Number(d.paymentAmount?.value || 0);
      const monthlyRate = Number(d.monthlyRate?.value || 0);
      const paymentType = d.paymentType?.value || "mixed";
      const currency = "USD" === d.loanCurrency?.value ? "$" : "C$";
      const money = (value) => `${currency} ${Number(value || 0).toLocaleString("en-US")}`;
      const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;", "'":"&#39;"})[char]);
      const empty = "en" === e.dataset.locale ? "No data in this demo yet." : "Aún no hay datos en esta demostración.";
      const collection = e.querySelector("[data-mp-collection-list]");
      if (collection) {
        collection.replaceChildren();
        if (!customerName || !loanAmount) collection.innerHTML = `<small class="mp-empty-state">${empty}</small>`;
        else {
          const item = document.createElement("div");
          item.innerHTML = `<strong>${esc(customerName)}</strong><span class="mp-status mp-status-success">${"en" === e.dataset.locale ? "Due today" : "Vence hoy"}</span><small>${"en" === e.dataset.locale ? "Loan A-001 · Due today" : "Préstamo A-001 · Vence hoy"}</small><small>${"en" === e.dataset.locale ? "Installment" : "Cuota"}: ${money(paymentAmount || loanAmount)} · ${"en" === e.dataset.locale ? "Principal" : "Capital"}: ${money(Math.max(0, loanAmount - paymentAmount))}</small><small>${"en" === e.dataset.locale ? "Last payment" : "Último pago"}: ${paymentAmount ? money(paymentAmount) : "—"} · 1 ${"en" === e.dataset.locale ? "active loan" : "préstamo activo"}</small>`;
          collection.append(item);
          const action = document.createElement("button");
          action.className = "mp-save-button";
          action.type = "button";
          action.dataset.mpNav = "payment";
          action.textContent = "en" === e.dataset.locale ? "Register payment" : "Registrar Pago";
          collection.append(action);
        }
      }
      const history = e.querySelector("[data-mp-history-list]");
      if (history) {
        history.replaceChildren();
        if (!customerName || !paymentAmount) history.innerHTML = `<small class="mp-empty-state">${"en" === e.dataset.locale ? "No payments registered." : "No hay pagos registrados."}</small>`;
        else {
          const item = document.createElement("div");
          const receipt = d.lastReceipt?.value || "R-000";
          item.innerHTML = `<strong>${"en" === e.dataset.locale ? "Receipt" : "Recibo"} #${esc(receipt)}</strong><span class="mp-status mp-status-success">${money(paymentAmount)}</span><small>${esc(customerName)} · ${"en" === e.dataset.locale ? "Mixed payment · Today" : "Pago mixto · Hoy"}</small><small>${"en" === e.dataset.locale ? "Interest and principal applied" : "Interés y capital aplicados"}</small>`;
          history.append(item);
        }
      }
      const report = e.querySelector('[data-mp-report="realized"]');
      const projected = e.querySelector('[data-mp-report="projected"]');
      const fx = e.querySelector('[data-mp-report="fx"]');
      report && (report.textContent = money(paymentAmount));
      projected && (projected.textContent = money(loanAmount * (Number(d.monthlyRate?.value || 0) / 100)));
      fx && (fx.textContent = money(0));
      const statementName = e.querySelector("[data-mp-statement-name]");
      const statementId = e.querySelector("[data-mp-statement-id]");
      const statementBalance = e.querySelector("[data-mp-statement-balance]");
      const statementApplication = e.querySelector("[data-mp-statement-application]");
      const paymentInterest = e.querySelector("[data-mp-payment-interest]");
      const paymentPrincipal = e.querySelector("[data-mp-payment-principal]");
      const paymentBalance = e.querySelector("[data-mp-payment-balance]");
      const loanSummaryAmount = e.querySelector("[data-mp-loan-summary-amount]");
      const loanSummaryRate = e.querySelector("[data-mp-loan-summary-rate]");
      const interest = paymentType === "principal" ? 0 : Math.min(paymentAmount, loanAmount * monthlyRate / 100);
      const principal = paymentType === "interest" ? 0 : Math.max(0, paymentAmount - interest);
      statementName && (statementName.textContent = customerName || empty);
      statementId && (statementId.textContent = customerName ? `DNI ${d.customerDni?.value || "—"}` : "");
      statementBalance && (statementBalance.textContent = money(Math.max(0, loanAmount - paymentAmount)));
      statementApplication && (statementApplication.textContent = money(paymentAmount));
      paymentInterest && (paymentInterest.textContent = money(interest));
      paymentPrincipal && (paymentPrincipal.textContent = money(principal));
      paymentBalance && (paymentBalance.textContent = money(Math.max(0, loanAmount - principal)));
      loanSummaryAmount && (loanSummaryAmount.textContent = loanAmount ? money(loanAmount) : "—");
      loanSummaryRate && (loanSummaryRate.textContent = monthlyRate ? `${monthlyRate}%` : "—");
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
            "Tenth,",
            "Eleventh,",
            "Twelfth,",
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
            "Lo décimo es",
            "Lo undécimo es",
            "Lo duodécimo es",
          ];
    const playbackTiming = { readablePhase: 4200, dashboard: 4200, backup: 5000 };
    let N = -1;
    const seekPlayback = (delta) => {
      if (!v) return;
      if (delta < 0) {
        const currentPosition = playbackPosition + (b?.elapsed?.() || 0);
        replayTarget = Math.max(0, currentPosition + delta);
        pendingSeek = 0;
        j();
        playbackPosition = 0;
        K();
        return;
      }
      pendingSeek += delta;
      if (b?.seekBy) {
        const queued = pendingSeek;
        pendingSeek = 0;
        b.seekBy(queued);
      }
    };
    function O(t) {
      const e = Math.max(0, Math.min(M.length - 1, t));
      for (const item of document.querySelectorAll("[data-mp-phase-item]")) {
        const index = Number(item.dataset.mpPhaseIndex);
        item.classList.toggle("is-active", index === e);
        item.classList.toggle("is-complete", index < e);
      }
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
          duration: Math.max(0, t),
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
          elapsed() {
            return Math.max(0, this.duration - this.remaining);
          },
          finish(t) {
            this.settled ||
              (this.halt(),
              (this.settled = !0),
              t && e === x && (playbackPosition += this.duration),
              b === this && (b = null),
              a(t));
          },
          seekBy(delta) {
            if (this.settled) return;
            this.halt();
            const amount = Number(delta) || 0;
            if (amount > 0 && amount >= this.remaining) {
              pendingSeek += amount - this.remaining;
              this.remaining = 0;
              this.finish(v && e === x);
            } else {
              this.remaining = Math.max(0, this.remaining - amount);
              if (this.remaining === 0) this.finish(v && e === x);
              else if (!C) this.start();
            }
          },
        };
        b = n;
        if (replayTarget !== null) {
          const skipped = Math.min(replayTarget, n.duration);
          replayTarget -= skipped;
          if (replayTarget <= 0) replayTarget = null;
          n.remaining = n.duration - skipped;
          if (n.remaining === 0) n.finish(v && e === x);
          else n.start();
        } else {
          n.start();
        }
        if (replayTarget === null && pendingSeek !== 0 && !n.settled) {
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
    e.addEventListener("click", (event) => {
      const nav = event.target.closest("[data-mp-nav]");
      if (!nav || !e.contains(nav)) return;
      const target = nav.dataset.mpNav;
      const index = screenNames.indexOf(target);
      if (index < 0) return;
      if (v) j();
      L = true;
      U(index);
      e.querySelectorAll("[data-mp-nav]").forEach((button) => button.classList.toggle("is-active", button.dataset.mpNav === target));
    });
    const feedback = (selector, message, ok = true) => {
      const node = e.querySelector(selector);
      if (!node) return;
      node.textContent = localizeMessage(message);
      node.classList.toggle("is-error", !ok);
      node.classList.toggle("is-success", ok);
    };
    const localizeMessage = (message) => {
      if ("en" !== e.dataset.locale) return message;
      const value = String(message || "");
      const lower = value.toLowerCase();
      if (lower.includes("campo") && lower.includes("requer")) return "This field is required";
      if (lower.includes("cliente creado")) return "Customer created successfully";
      if (lower.includes("detalle del cliente")) return "Customer details displayed";
      if (lower.includes("stamo creado")) return "Loan created successfully";
      if (lower.includes("seleccione un") && lower.includes("stamo")) return "Select a loan";
      if (lower.includes("pago registrado")) return "Payment registered successfully";
      if (lower.includes("configur") && lower.includes("guard")) return "Configuration saved";
      if (lower.includes("configuraci") && lower.includes("actualiz")) return "Configuration updated";
      if (lower.includes("respaldo creado")) return "Backup created successfully";
      if (lower.includes("respaldo restaurado")) return "Backup restored. Please restart the app.";
      if (lower.includes("no hay respaldos")) return "No backups available";
      if (lower.includes("detalle de cuenta")) return "Account details displayed";
      if (lower.includes("reporte generado")) return "Report generated successfully";
      return value;
    };
    function localizeEnglishDemo() {
      if ("en" !== e.dataset.locale) return;
      const replacements = [
        ["Tasa Mensual", "Monthly rate"], ["Tasa Diaria", "Daily rate"], ["InterÃ©s Calculado", "Calculated interest"], ["DÃ­as:", "Days:"], ["Capital:", "Principal:"],
        ["DÃ­as Exactos", "Exact days"], ["ProporciÃ³n del Ciclo", "Cycle proportion"], ["EstÃ¡ndar Comercial", "Commercial standard"],
        ["Medio Arriba", "Round half up"], ["Bancario", "Banker's rounding"], ["Truncar", "Round down"], ["Hacia Arriba", "Round up"],
        ["Nombre completo", "Full name"], ["DNI (CÃ©dula)", "ID number"], ["Apodo / Alias", "Nickname / Alias"],
        ["TelÃ©fono", "Phone"], ["DirecciÃ³n / Referencia", "Address / Reference"], ["PIN (Coordenadas)", "PIN (Coordinates)"],
        ["DÃ­a preferido de pago", "Preferred payment day"], ["Observaciones sobre el cliente", "Customer notes"],
        ["Resumen del PrÃ©stamo", "Loan summary"], ["Tasa mensual", "Monthly rate"], ["AplicaciÃ³n del pago", "Payment application"],
        ["Saldo restante", "Remaining balance"], ["Capital colocado", "Placed capital"], ["Acciones rÃ¡pidas", "Quick actions"],
        ["Cobraza de hoy", "Today's collection"], ["Cobranza de hoy", "Today's collection"], ["Estado de cuenta del cliente", "Customer statement"],
        ["ConfiguraciÃ³n de respaldo", "Backup settings"], ["Exportar Backup", "Export backup"], ["Restaurar Respaldo", "Restore backup"],
        ["No hay clientes atrasados en esta demostraciÃ³n.", "No overdue customers in this demo."],
      ];
      e.querySelectorAll("*").forEach((node) => {
        if (node.matches("input") && node.dataset.mpField === "customerNotes" && node.value) node.value = "Demo customer";
        if (node.matches("input") && node.dataset.mpField === "loanNotes" && node.value) node.value = "Initial loan";
        if (node.matches("input") && node.dataset.mpField === "paymentNotes" && node.value) node.value = "Installment payment";
        if (node.children.length === 0 && node.textContent) {
          let text = node.textContent;
          for (const [from, to] of replacements) text = text.replaceAll(from, to);
          if (text !== node.textContent) node.textContent = text;
        }
        for (const attr of ["placeholder", "aria-label", "title"]) {
          const value = node.getAttribute(attr);
          if (!value) continue;
          let translated = value;
          for (const [from, to] of replacements) translated = translated.replaceAll(from, to);
          if (translated !== value) node.setAttribute(attr, translated);
        }
      });
    }
    e.addEventListener("click", (event) => {
      const action = event.target.closest("[data-mp-action], [data-mp-backup-action], [data-mp-statement-action], [data-mp-customer-detail]");
      if (!action || !e.contains(action) || v) return;
      const name = action.dataset.mpAction;
      if (name === "createCustomer") {
        const required = ["customerName", "customerDni", "customerPhone", "customerAddress"];
        const missing = required.find((field) => !d[field]?.value.trim());
        if (missing) return feedback("[data-mp-customer-feedback]", "Este campo es requerido", false);
        feedback("[data-mp-customer-feedback]", "Cliente creado exitosamente");
        const directory = e.querySelector("[data-mp-customer-directory]");
        const form = e.querySelector("[data-mp-customer-form]");
        directory && (directory.hidden = false);
        form && (form.hidden = true);
        const directoryName = e.querySelector("[data-mp-directory-name]");
        const directoryDetail = e.querySelector("[data-mp-directory-detail]");
        directoryName && (directoryName.textContent = d.customerName.value);
        directoryDetail && (directoryDetail.textContent = `${d.customerDni.value} · ${d.customerPhone.value}`);
        return;
      }
      if (action.matches("[data-mp-customer-detail]")) {
        U(screenNames.indexOf("customer"));
        feedback("[data-mp-customer-feedback]", "Detalle del cliente mostrado");
        return;
      }
      if (name === "createLoan") {
        const required = ["loanPlan", "loanAmount", "monthlyRate", "loanFrequency"];
        const missing = required.find((field) => !d[field]?.value);
        if (missing || Number(d.loanAmount?.value) <= 0) return feedback("[data-mp-loan-feedback]", "Este campo es requerido", false);
        feedback("[data-mp-loan-feedback]", "Préstamo creado exitosamente");
        return;
      }
      if (name === "registerPayment") {
        if (!d.customerName?.value || !d.loanAmount?.value) return feedback("[data-mp-payment-feedback]", "Seleccione un préstamo", false);
        if (!d.paymentAmount?.value || Number(d.paymentAmount.value) <= 0) return feedback("[data-mp-payment-feedback]", "Este campo es requerido", false);
        feedback("[data-mp-payment-feedback]", "Pago registrado exitosamente");
        T();
        return;
      }
      if (["saveCompany", "saveCapital", "savePolicy", "saveLoan", "saveReceipt"].includes(name)) {
        const target = name === "savePolicy" ? "[data-mp-policy-feedback]" : "[data-mp-settings-feedback]";
        feedback(target, name === "savePolicy" ? "Configuración guardada" : "Configuración actualizada");
        return;
      }
      const backupAction = action.dataset.mpBackupAction;
      if (backupAction === "create") return feedback("[data-mp-backup-feedback]", "Respaldo creado exitosamente");
      if (backupAction === "restore") return feedback("[data-mp-backup-feedback]", "Respaldo restaurado. Por favor reinicie la app.");
      if (backupAction === "manage") return feedback("[data-mp-backup-feedback]", "No hay respaldos disponibles");
      if (backupAction === "save-settings") return feedback("[data-mp-backup-feedback]", "Configuración de respaldo guardada");
      if (action.dataset.mpStatementAction !== undefined) return feedback("[data-mp-statement-feedback]", "Detalle de cuenta mostrado");
    });
    e.addEventListener("click", (event) => {
      const tab = event.target.closest("[data-mp-report-tab]");
      if (!tab || !e.contains(tab)) return;
      e.querySelectorAll("[data-mp-report-tab]").forEach((button) => button.classList.toggle("is-selected", button === tab));
      const report = tab.dataset.mpReportTab;
      const card = e.querySelector("[data-mp-report-active]");
      if (card) card.textContent = report === "projected" ? ("en" === e.dataset.locale ? "Active loan projection" : "Proyección de préstamos activos") : report === "fx" ? ("en" === e.dataset.locale ? "Currency differential" : "Diferencial cambiario") : ("en" === e.dataset.locale ? "Payments in selected date range" : "Pagos dentro del rango seleccionado");
    });
    e.addEventListener("click", (event) => {
      const tab = event.target.closest("[data-mp-collection-tab]");
      if (!tab || !e.contains(tab)) return;
      e.querySelectorAll("[data-mp-collection-tab]").forEach((button) => button.classList.toggle("is-selected", button === tab));
      const list = e.querySelector("[data-mp-collection-list]");
      if (list && tab.dataset.mpCollectionTab === "overdue") {
        list.innerHTML = `<small class="mp-empty-state">${"en" === e.dataset.locale ? "No overdue customers in this demo." : "No hay clientes atrasados en esta demostración."}</small>`;
      } else {
        T();
      }
    });
    e.addEventListener("click", (event) => {
      const action = event.target.closest("[data-mp-report-action]");
      if (!action || !e.contains(action)) return;
      feedback("[data-mp-report-feedback]", "Reporte generado correctamente");
    });
    function $(t) {
      (r && r.setAttribute("aria-pressed", String(t)),
        playIcon && (playIcon.style.display = t ? "none" : ""),
        pauseIcon && (pauseIcon.style.display = t ? "" : "none"),
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
        loanPlan: "MONTHLY_STANDARD",
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
        e.querySelector("[data-mp-customer-directory]") && (e.querySelector("[data-mp-customer-directory]").hidden = true),
        e.querySelector("[data-mp-customer-form]") && (e.querySelector("[data-mp-customer-form]").hidden = false),
        localizeEnglishDemo(),
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
      n.classList.remove("mp-button-pressed");
      if (o && t === "createCustomer") {
        const directory = e.querySelector("[data-mp-customer-directory]");
        const form = e.querySelector("[data-mp-customer-form]");
        directory && (directory.hidden = false);
        form && (form.hidden = true);
      }
      return o;
    }
    async function K() {
      if (v) return;
      const t = document.activeElement;
      (t && e.contains(t) && t.matches("input, textarea, select") && t.blur(),
        (playbackPosition = 0),
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
        !(await G("customerCategory", "GENERAL", a)) ||
        !(await V("customerAlias", "Juanito", a)) ||
        !(await V("customerPhone", "8888-8888", a)) ||
        !(await V("customerAddress", "Del mercado 2c al norte", a)) ||
        !(await V("customerPayDay", "15", a)) ||
        !(await V("customerNotes", "Cliente de demostración", a)) ||
        !(await X("createCustomer", a)) ||
        !(await D(m.storyCustomerSaved, a))
      )
        return;
      R(m.loanHeading);
      U(6);
      if (
        !(await Y(550, a)) ||
        !(await G("loanPlan", "MONTHLY_STANDARD", a)) ||
        !(await G("loanCurrency", "NIO", a)) ||
        !(await V("exchangeRate", "1.0", a)) ||
        !(await V("loanAmount", "10000", a)) ||
        !(await V("monthlyRate", "10", a)) ||
        !(await G("loanFrequency", "monthly", a)) ||
        !(await V("loanNotes", "Préstamo inicial", a)) ||
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
        !(await V("paymentNotes", "Pago de cuota", a)) ||
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
        (replayTarget = null), (playbackPosition = 0), z(), K();
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
