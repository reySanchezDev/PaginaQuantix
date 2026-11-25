/* Simulación visual de Prestazo, basada en Prestazo/develop (24/11/2026).
 * Interacciones efímeras; sin red, localStorage ni cambios a la aplicación real. */
(() => {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  for (const root of document.querySelectorAll('[data-miniprestazo]')) {
    const screenNames = ['company', 'monetary', 'policy', 'sequences', 'customer', 'loan', 'payment'];
    const screens = screenNames.map(name => root.querySelector('[data-mp-screen="' + name + '"]'));
    const appScroll = root.querySelector('[data-mp-scroll]');
    const appTitle = root.querySelector('[data-mp-app-title]');
    const appSubtitle = root.querySelector('[data-mp-app-subtitle]');
    const pointer = root.querySelector('[data-mp-pointer]');
    const playButton = root.querySelector('[data-mp-play]');
    const playLabel = root.querySelector('[data-mp-play-label]');
    const resetButton = root.querySelector('[data-mp-reset]');
    const i18n = root.querySelector('[data-mp-i18n]')?.dataset || {};
    const fields = Object.fromEntries(
      [...root.querySelectorAll('[data-mp-field]')].map(el => [el.dataset.mpField, el])
    );
    const toggleElements = Object.fromEntries(
      [...root.querySelectorAll('[data-mp-toggle]')].map(el => [el.dataset.mpToggle, el])
    );
    const labels = [i18n.company, i18n.monetary, i18n.policy, i18n.sequences, i18n.customerTitle, i18n.loanTitle, i18n.paymentTitle];
    const heading = root.querySelector('[data-mp-story-title]');
    const orderHeading = root.closest('.mp-tour')?.querySelector('[data-mp-order-title]');
    const storyPanel = root.querySelector('[data-mp-story-panel]');
    const storyMessage = root.querySelector('[data-mp-story-message]');
    let stage = 0;
    let running = false;
    let initiated = false;
    let finished = false;
    let sequence = 0;
    let scripting = false;

    function updatePolicyPreview() {
      const month = Math.max(1, Number(fields.daysMonth?.value || 30));
      const decimals = Number(fields.decimals?.value || 2);
      const daily = 10 / month;
      const interest = 10000 * daily / 100 * 15;
      const dailyEl = root.querySelector('[data-mp-daily-rate]');
      const interestEl = root.querySelector('[data-mp-calc-interest]');
      if (dailyEl) dailyEl.textContent = 'Tasa Diaria: ' + daily.toFixed(4) + '%';
      if (interestEl) interestEl.textContent = 'Interés Calculado: C$ ' + interest.toFixed(decimals);
    }
    function updateVisibility() {
      for (const [name, check] of Object.entries(toggleElements)) {
        const label = root.querySelector('[data-mp-visible-label="' + name + '"]');
        if (label) label.textContent = check.checked ? i18n.visible : i18n.hidden;
      }
    }
    function updateBusinessFlow() {
      const name = fields.customerName?.value || '';
      const customerInitial = root.querySelector('[data-mp-customer-initial]');
      if (customerInitial) customerInitial.textContent = name.trim().charAt(0).toUpperCase();
      const id = fields.customerDni?.value || '';
      for (const selector of ['[data-mp-customer-display]','[data-mp-payment-customer]']) {
        const el = root.querySelector(selector);
        if (el) el.textContent = name;
      }
      for (const selector of ['[data-mp-customer-dni]','[data-mp-payment-dni]']) {
        const el = root.querySelector(selector);
        if (el) el.textContent = id;
      }
      const loanAmount = fields.loanAmount?.value || '';
      const loanRate = fields.monthlyRate?.value || '';
      const money = (fields.loanCurrency?.value === 'USD' ? '$ ' : 'C$ ') + loanAmount;
      const amountEl = root.querySelector('[data-mp-loan-summary-amount]');
      const rateEl = root.querySelector('[data-mp-loan-summary-rate]');
      const paymentLoan = root.querySelector('[data-mp-payment-loan]');
      if (amountEl) amountEl.textContent = loanAmount ? money : '—';
      if (rateEl) rateEl.textContent = loanRate ? loanRate + '%' : '—';
      if (paymentLoan) paymentLoan.textContent = loanAmount ? money : '';
      const loanSymbol = root.querySelector('[data-mp-loan-currency-symbol]');
      const paymentSymbol = root.querySelector('[data-mp-payment-symbol]');
      if (loanSymbol) loanSymbol.textContent = fields.loanCurrency?.value === 'USD' ? '$' : 'C$';
      if (paymentSymbol) paymentSymbol.textContent = fields.paymentCurrency?.value === 'USD' ? '$' : 'C$';
      const currencyCopy = root.querySelector('[data-mp-currency-label]');
      if (currencyCopy) currencyCopy.textContent = fields.loanCurrency?.selectedOptions?.[0]?.textContent || '';
      const paymentCurrencyCopy = root.querySelector('[data-mp-payment-currency-label]');
      if (paymentCurrencyCopy) paymentCurrencyCopy.textContent = fields.paymentCurrency?.selectedOptions?.[0]?.textContent || '';
      const freqCopy = root.querySelector('[data-mp-frequency-label]');
      if (freqCopy) freqCopy.textContent = fields.loanFrequency?.selectedOptions?.[0]?.textContent || '';
      const dateCopy = root.querySelector('[data-mp-date-label]');
      if (dateCopy && fields.loanDate?.value) {
        const parts = fields.loanDate.value.split('-');
        dateCopy.textContent = parts.length === 3 ? parts[2] + '/' + parts[1] + '/' + parts[0] : '';
      }
      for (const chip of root.querySelectorAll('[data-mp-payment-choice]')) {
        const active = chip.dataset.mpPaymentChoice === fields.paymentType?.value;
        chip.classList.toggle('is-selected', active);
        chip.setAttribute('aria-pressed', String(active));
      }
    }

    const ordinals = root.dataset.locale === 'en'
      ? ['First,', 'Second,', 'Third,', 'Fourth,']
      : ['Lo primero es', 'Lo segundo es', 'Lo tercero es', 'Lo cuarto es'];
    let currentOrder = -1;
    function setJourneyOrder(index) {
      const next = Math.max(0, Math.min(ordinals.length - 1, index));
      if (next === currentOrder || !orderHeading) return;
      currentOrder = next;
      orderHeading.textContent = ordinals[next];
      orderHeading.classList.remove('mp-step-title-enter');
      void orderHeading.offsetWidth;
      orderHeading.classList.add('mp-step-title-enter');
    }
    function setHeadline(text) {
      if (!heading) return;
      heading.classList.remove('mp-headline-enter');
      heading.textContent = text;
      void heading.offsetWidth;
      heading.classList.add('mp-headline-enter');
    }
    function hideStory() {
      root.classList.remove('mp-story-active', 'mp-story-exiting');
      if (storyPanel) storyPanel.setAttribute('aria-hidden', 'true');
    }
    // A timed promise scoped to the playback token. Unlike sleep(), its
    // duration is never capped by the reduced-motion preference.
    function waitStory(ms, token) {
      return new Promise(resolve => window.setTimeout(
        () => resolve(running && token === sequence), ms
      ));
    }
    async function story(text, token) {
      if (!running || token !== sequence) return false;
      const words = String(text || '').trim().split(/\s+/);
      const emphasis = new Set([
        'prestazo','clientes','prestamos','prestamo','cartera','pagos','cobros',
        'listo','lista','ready','customers','loans','payments','portfolio'
      ]);
      const stagger = window.matchMedia('(max-width:600px)').matches ? 65 : 78;
      if (storyMessage) {
        storyMessage.replaceChildren();
        words.forEach((word, index) => {
          const span = document.createElement('span');
          const normalized = word.toLowerCase().normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '').replace(/[^a-z]/g, '');
          span.className = 'mp-story-word' + (emphasis.has(normalized) ? ' is-emphasis' : '');
          span.textContent = word;
          span.style.setProperty('--story-delay', (110 + index * stagger) + 'ms');
          storyMessage.append(span, ' ');
        });
      }
      if (appScroll) appScroll.scrollTop = 0;
      pointer?.classList.remove('is-visible');
      root.classList.remove('mp-story-exiting');
      root.classList.add('mp-story-active');
      if (storyPanel) storyPanel.setAttribute('aria-hidden', 'false');

      // El anterior efecto desvanecía el panel antes de terminar los 6000 ms.
      // Ahora se esperan todas las palabras y luego SEIS SEGUNDOS COMPLETOS
      // de lectura, seguidos de una salida independiente de 700 ms.
      const revealMs = reduceMotion.matches ? 0 : 110 + (words.length - 1) * stagger + 880;
      if (revealMs && !await waitStory(revealMs, token)) return false;
      if (!await waitStory(6000, token)) return false;
      if (!running || token !== sequence) return false;
      root.classList.add('mp-story-exiting');
      if (!await waitStory(reduceMotion.matches ? 100 : 700, token)) return false;
      hideStory();
      return sleep(320, token);
    }
    function changeField(name, value) {
      const el = fields[name];
      if (!el) return;
      scripting = true;
      el.value = value;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
      scripting = false;
      if (name === 'currency') {
        const symbol = root.querySelector('[data-mp-currency-symbol]');
        if (symbol) symbol.textContent = value === 'USD' ? '$' : 'C$';
        const valueLabel = root.querySelector('[data-mp-currency-value]');
        if (valueLabel) valueLabel.textContent = fields.currency?.selectedOptions?.[0]?.textContent || value;
      }
      if (name === 'convention') {
        if (value === '30/360' || value === '30/365') fields.daysMonth.value = '30';
        if (value === '30/360' || value === 'ACTUAL/360') fields.daysYear.value = '360';
        if (value === '30/365' || value === 'ACTUAL/365') fields.daysYear.value = '365';
      }
      updatePolicyPreview();
      updateBusinessFlow();
    }
    function changeToggle(name, checked) {
      const el = toggleElements[name];
      if (!el) return;
      scripting = true;
      el.checked = checked;
      el.dispatchEvent(new Event('change', { bubbles: true }));
      scripting = false;
      updateVisibility();
    }
    function showScreen(index) {
      stage = Math.max(0, Math.min(screens.length - 1, index));
      setJourneyOrder(stage < 4 ? 0 : stage - 3);
      screens.forEach((s, i) => { if (s) s.hidden = i !== stage; });
      if (appTitle) appTitle.textContent = labels[stage];
      appTitle?.closest('.mp-appbar')?.classList.toggle('is-monetary',stage === 1);
      if (appSubtitle) {
        appSubtitle.hidden = stage !== 1;
        appSubtitle.textContent = stage === 1 ? (i18n.monetarySubtitle || '') : '';
      }
      if (appScroll) appScroll.scrollTop = 0;
    }
    function stop() {
      sequence += 1;
      running = false;
      if (playButton) playButton.setAttribute('aria-pressed', 'false');
      if (playLabel) playLabel.textContent = i18n.play || 'Play';
      pointer?.classList.remove('is-visible', 'is-tapping');
      hideStory();
      root.querySelectorAll('.mp-demo-target').forEach(el => el.classList.remove('mp-demo-target'));
      root.querySelectorAll('.mp-demo-typing').forEach(el => el.classList.remove('mp-demo-typing'));
      root.querySelectorAll('.mp-demo-typing-field').forEach(el => el.classList.remove('mp-demo-typing-field'));
    }
    function reset() {
      stop();
      for (const [name, el] of Object.entries(fields)) {
        if (el.tagName === 'SELECT') continue;
        el.value = '';
      }
      Object.values(toggleElements).forEach(el => { el.checked = false; });
      for (const [name, value] of Object.entries({
        currency: 'NIO', reportCurrency: 'NIO', priority: 'CAPITAL_FIRST',
        convention: '30/360', proration: 'CYCLE_PROPORTION',
        decimals: '2', roundMode: 'HALF_UP', daysMonth: '30', daysYear: '360',
        loanPlan: '', loanCurrency: 'NIO', loanFrequency: '',
        paymentCurrency: 'NIO', paymentType: 'mixed'
      })) changeField(name, value);
      // El formulario Flutter inicia con la fecha actual de desembolso.
      const now = new Date();
      const today = [now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');
      changeField('loanDate', today);
      changeField('paymentDate', today);
      changeField('exchangeRate','1.0');
      updateVisibility();
      updatePolicyPreview();
      showScreen(0);
      setHeadline(i18n.settingsHeading || 'Configurar tu empresa.');
      updateBusinessFlow();
      finished = false;
      initiated = false;
    }
    function sleep(ms, token) {
      // Motion reduced: remove visual motion but keep messages readable.
      const delay = reduceMotion.matches ? Math.max(300, Math.min(ms, 4000)) : ms;
      return new Promise(resolve => window.setTimeout(() => resolve(running && token === sequence), delay));
    }
    async function pointAt(element, token) {
      if (!element || !running || token !== sequence) return false;
      const frame = appScroll.getBoundingClientRect();
      const rect = element.getBoundingClientRect();
      const centered = rect.top - frame.top + appScroll.scrollTop - frame.height / 2 + rect.height / 2;
      appScroll.scrollTo({ top: Math.max(0, centered), behavior: reduceMotion.matches ? 'instant' : 'smooth' });
      if (!await sleep(620, token)) return false;
      if (!pointer || reduceMotion.matches) return true;
      const area = root.querySelector('.mp-stage').getBoundingClientRect();
      const target = element.getBoundingClientRect();
      pointer.style.left = Math.max(4, target.left + Math.min(target.width * .75, target.width - 10) - area.left) + 'px';
      pointer.style.top = Math.max(4, target.top + target.height * .55 - area.top) + 'px';
      pointer.classList.add('is-visible');
      return sleep(540, token);
    }
    async function tap(element, token) {
      if (!await pointAt(element, token)) return false;
      const highlight = element.closest('.mp-input-wrap') || element;
      element.classList.add('mp-demo-target');
      highlight.classList.add('mp-interaction-pulse');
      pointer?.classList.add('is-tapping');
      try {
        return await sleep(520, token);
      } finally {
        pointer?.classList.remove('is-tapping');
        element.classList.remove('mp-demo-target');
        highlight.classList.remove('mp-interaction-pulse');
      }
    }
    // Reproducir la escritura de manera visual. Nunca dar foco a un campo
    // durante la reproducción automática: en iOS/Android abriría el teclado
    // real, tapando el formulario y desplazando la página.
    async function typeInto(name, value, token) {
      const el = fields[name];
      if (!el || !await tap(el, token)) return false;
      const wrapper = el.closest('.mp-input-wrap') || el;
      wrapper.classList.add('mp-demo-typing');
      el.classList.add('mp-demo-typing-field');
      try {
        changeField(name, '');
        for (const char of String(value)) {
          if (!running || token !== sequence) return false;
          changeField(name, el.value + char);
          if (!await sleep(112, token)) return false;
        }
        return sleep(640, token);
      } finally {
        wrapper.classList.remove('mp-demo-typing');
        el.classList.remove('mp-demo-typing-field');
      }
    }
    async function choose(name, value, token) {
      const el = fields[name];
      const target = name === 'paymentType'
        ? root.querySelector('[data-mp-payment-choice="' + value + '"]')
        : (name === 'loanCurrency' ? el?.closest('.mp-currency-row')
           : (name === 'loanFrequency' ? el?.closest('.mp-frequency-row')
           : (name === 'paymentCurrency' ? el?.closest('.mp-payment-currency-picker') : el)));
      if (!el || !await tap(target || el, token)) return false;
      // Show the same options that exist in the real input, not custom choices.
      let popover;
      if (!reduceMotion.matches && el.tagName === 'SELECT' && name !== 'paymentType') {
        popover = document.createElement('div');
        popover.className = 'mp-demo-options';
        const options = [...el.options];
        for (const option of options) {
          const row = document.createElement('div');
          row.textContent = option.textContent;
          row.className = option.value === value ? 'is-selected' : '';
          popover.append(row);
        }
        const target = el.getBoundingClientRect();
        const area = root.querySelector('.mp-stage').getBoundingClientRect();
        popover.style.left = Math.max(8, target.left - area.left) + 'px';
        popover.style.top = Math.max(8, target.bottom - area.top + 3) + 'px';
        popover.style.width = Math.min(target.width, area.width - 16) + 'px';
        root.querySelector('.mp-stage').append(popover);
      }
      if (!await sleep(980, token)) { popover?.remove(); return false; }
      changeField(name, value);
      popover?.remove();
      return sleep(620, token);
    }
    async function flip(name, checked, token) {
      const el = toggleElements[name];
      if (!await tap(el?.closest('label') || el, token)) return false;
      changeToggle(name, checked);
      return sleep(590, token);
    }
    async function press(name, token) {
      const btn = root.querySelector('[data-mp-action="' + name + '"]');
      if (!btn || !await tap(btn, token)) return false;
      btn.classList.add('mp-button-pressed');
      const ok = await sleep(880, token);
      btn.classList.remove('mp-button-pressed');
      return ok;
    }
    async function auto() {
      if (running) return;
      // Un usuario puede pulsar Reiniciar mientras edita: cerrar primero
      // el teclado y devolver la reproducción a modo exclusivamente visual.
      const focused = document.activeElement;
      if (focused && root.contains(focused) && focused.matches('input, textarea, select')) {
        focused.blur();
      }
      reset();
      running = true;
      initiated = true;
      const token = ++sequence;
      playButton?.setAttribute('aria-pressed', 'true');
      if (playLabel) playLabel.textContent = i18n.pause || 'Pause';
      const script = [
        async () =>
          await (async () => {
            showScreen(0);
            if (!await sleep(480,token)) return false;
            if (!await tap(fields.country,token)) return false;
            changeField('country','🇳🇮 Nicaragua');
            if (!await typeInto('companyName','Prestazo',token)) return false;
            if (!await flip('companyName',true,token)) return false;
            return press('saveCompany',token);
          })(),
        async () => {
          showScreen(1);
          if (!await sleep(550,token)) return false;
          if (!await choose('currency','NIO',token)) return false;
          if (!await typeInto('capital','10000',token)) return false;
          if (!await press('saveCapital',token)) return false;
          if (!await flip('validateCapital',true,token)) return false;
          return choose('priority','CAPITAL_FIRST',token);
        },
        async () => {
          showScreen(2);
          if (!await sleep(550,token)) return false;
          if (!await choose('convention','ACTUAL/365',token)) return false;
          if (!await typeInto('daysYear','365',token)) return false;
          if (!await choose('proration','EXACT_DAYS',token)) return false;
          if (!await choose('roundMode','HALF_EVEN',token)) return false;
          return press('savePolicy',token);
        },
        async () => {
          showScreen(3);
          if (!await sleep(550,token)) return false;
          if (!await typeInto('lastLoan','A-000',token)) return false;
          if (!await press('saveLoan',token)) return false;
          if (!await typeInto('lastReceipt','R-000',token)) return false;
          return press('saveReceipt',token);
        }
      ];
      for (let i = 0; i < script.length; i++) {
        if (!running || token !== sequence) break;
        const ok = await script[i]();
        if (!ok) break;
        if (!await sleep(1450, token)) break;
      }
      if (!running || token !== sequence) return;
      if (!await sleep(1400,token)) return;
      if (!await story(i18n.storyConfigured, token)) return;
      setHeadline(i18n.customerHeading);
      showScreen(4);
      if (!await sleep(470,token)) return;
      // Valores ilustrativos tomados de las pistas del formulario real, no son datos personales.
      if (!await typeInto('customerName','Juan Pérez García',token)) return;
      if (!await typeInto('customerDni','001-010100-0000A',token)) return;
      if (!await typeInto('customerPhone','8888-8888',token)) return;
      if (!await typeInto('customerAddress','Del mercado 2c al norte',token)) return;
      if (!await press('createCustomer',token)) return;

      if (!await story(i18n.storyCustomerSaved,token)) return;
      setHeadline(i18n.loanHeading);
      showScreen(5);
      if (!await sleep(550,token)) return;
      if (!await choose('loanCurrency','NIO',token)) return;
      if (!await typeInto('loanAmount','10000',token)) return;
      if (!await typeInto('monthlyRate','10',token)) return;
      if (!await choose('loanFrequency','monthly',token)) return;
      if (!await press('createLoan',token)) return;

      if (!await story(i18n.storyLoanCreated,token)) return;
      setHeadline(i18n.paymentHeading);
      showScreen(6);
      if (!await sleep(520,token)) return;
      if (!await choose('paymentCurrency','NIO',token)) return;
      if (!await typeInto('paymentAmount','1500',token)) return;
      if (!await choose('paymentType','mixed',token)) return;
      if (!await press('registerPayment',token)) return;
      if (!await story(i18n.storyCompleted,token)) return;
      if (running && token === sequence) {
        finished = true;
        stop();
      }
    }
    root.addEventListener('input', ev => {
      if (scripting) return;
      if (ev.target.matches('[data-mp-field]')) {
        if (running) stop();
        initiated = true;
        updatePolicyPreview();
        updateBusinessFlow();
      }
    });
    root.addEventListener('change', ev => {
      if (scripting) return;
      if (ev.target.matches('[data-mp-toggle]')) {
        if (running) stop();
        initiated = true;
        updateVisibility();
      } else if (ev.target.matches('[data-mp-field]')) {
        if (running) stop();
        initiated = true;
        if (ev.target.dataset.mpField === 'convention') changeField('convention', ev.target.value);
        if (ev.target.dataset.mpField === 'currency') changeField('currency', ev.target.value);
        updatePolicyPreview();
        updateBusinessFlow();
      }
    });
    fields.country?.addEventListener('click', () => {
      if (running) stop();
      initiated = true;
      changeField('country','🇳🇮 Nicaragua');
    });
    // En exploración MANUAL sí se permite el teclado del sistema. Reducimos
    // el panel según el viewport visible y acercamos el campo sin perderlo
    // detrás del teclado nativo (especialmente Safari iOS).
    const mobileQuery = window.matchMedia('(max-width: 900px)');
    const viewport = window.visualViewport;
    let manualFocused = null;
    let repositionPending = false;
    function positionManualField() {
      if (!manualFocused || !root.contains(manualFocused) || !mobileQuery.matches) return;
      const frame = appScroll?.getBoundingClientRect();
      if (!frame) return;
      const target = manualFocused.getBoundingClientRect();
      const margin = 16;
      if (target.bottom > frame.bottom - margin) {
        appScroll.scrollTop += target.bottom - frame.bottom + margin;
      } else if (target.top < frame.top + margin) {
        appScroll.scrollTop -= frame.top + margin - target.top;
      }
      requestAnimationFrame(() => {
        if (!manualFocused || !root.contains(manualFocused)) return;
        const rect = manualFocused.getBoundingClientRect();
        const top = viewport ? viewport.offsetTop : 0;
        const bottom = viewport ? viewport.offsetTop + viewport.height : window.innerHeight;
        // Desplazar el documento sólo cuando el teclado oculta el campo.
        if (rect.bottom > bottom - margin) window.scrollBy(0, rect.bottom - bottom + margin + 12);
        else if (rect.top < top + margin) window.scrollBy(0, rect.top - top - margin - 12);
      });
    }
    function onViewportChange() {
      if (!mobileQuery.matches || !manualFocused) return;
      if (viewport && viewport.height < window.innerHeight * .84) {
        root.classList.add('mp-keyboard-visible');
        root.style.setProperty('--mp-visible-height', viewport.height + 'px');
      } else {
        root.classList.remove('mp-keyboard-visible');
        root.style.removeProperty('--mp-visible-height');
      }
      if (!repositionPending) {
        repositionPending = true;
        requestAnimationFrame(() => {
          repositionPending = false;
          positionManualField();
        });
      }
    }
    root.addEventListener('focusin', event => {
      const element = event.target;
      if (!mobileQuery.matches || !element.matches('input:not([readonly]):not([type="checkbox"]),textarea')) return;
      manualFocused = element;
      if (running) stop();
      initiated = true;
      onViewportChange();
      // El viewport móvil puede encogerse después del evento de foco.
      window.setTimeout(onViewportChange, 240);
    });
    root.addEventListener('focusout', event => {
      if (event.target !== manualFocused) return;
      manualFocused = null;
      root.classList.remove('mp-keyboard-visible');
      root.style.removeProperty('--mp-visible-height');
    });
    viewport?.addEventListener('resize', onViewportChange);
    viewport?.addEventListener('scroll', onViewportChange);

    // Los ChoiceChip son los controles visibles; la selección oculta sólo guarda
    // el valor de la simulación y nunca se muestra como dropdown genérico.
    root.addEventListener('click', event => {
      const chip = event.target.closest('[data-mp-payment-choice]');
      if (!chip || !root.contains(chip)) return;
      if (running) stop();
      initiated = true;
      changeField('paymentType', chip.dataset.mpPaymentChoice);
    });
    // Mostrar el mismo feedback visual cuando el visitante interactúa
    // manualmente, sin impedir las acciones nativas ni abrir teclados extra.
    root.addEventListener('pointerdown', event => {
      if (running || !event.target.closest('.mp-device')) return;
      const control = event.target.closest('button, input, select, label');
      if (!control || !root.contains(control)) return;
      const highlight = control.closest('.mp-input-wrap') || control;
      highlight.classList.remove('mp-interaction-pulse');
      void highlight.offsetWidth;
      highlight.classList.add('mp-interaction-pulse');
      window.setTimeout(() => highlight.classList.remove('mp-interaction-pulse'), 850);
      if (control.matches('[data-mp-action]')) {
        control.classList.add('mp-button-pressed');
        window.setTimeout(() => control.classList.remove('mp-button-pressed'), 850);
      }
    });
    playButton?.addEventListener('click', () => running ? stop() : auto());
    resetButton?.addEventListener('click', () => { reset(); auto(); });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && running) stop();
    });
    reset();
    if (!reduceMotion.matches && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        if (!initiated && entries.some(e => e.isIntersecting)) {
          io.disconnect();
          auto();
        }
      }, { threshold: .2 });
      io.observe(root.querySelector('.mp-stage') || root);
    }
  }
})();