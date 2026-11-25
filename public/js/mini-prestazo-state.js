(() => {
  'use strict';

  const createInitialState = () => ({
    configuration: { companyName: 'Prestazo', country: 'NI', baseCurrency: 'NIO', availableCapital: 32400, capitalValidation: true, recoveryPriority: 'CAPITAL_FIRST' },
    customer: { created: false, name: '', dni: '', phone: '', address: '', payDay: 15 },
    loan: { created: false, principal: 0, monthlyRate: 0, frequency: 'MONTHLY', currency: 'NIO', disbursementDate: '', nextDueDate: '', cycles: [] },
    payment: { registered: false, amount: 0, type: 'MIXED', interest: 0, principal: 0, date: '' },
    backup: { created: false, restored: false },
  });

  const money = (value) => `C$ ${Math.max(0, Math.round(value)).toLocaleString('en-US')}`;
  const today = () => new Date().toISOString().slice(0, 10);
  const addDays = (date, days) => {
    const result = new Date(`${date}T12:00:00`);
    result.setDate(result.getDate() + days);
    return result.toISOString().slice(0, 10);
  };

  for (const demo of document.querySelectorAll('[data-miniprestazo]')) {
    const en = demo.dataset.locale === 'en';
    const state = createInitialState();
    const baseline = { customers: 24, loans: 18, paymentsToday: 4850, availableCapital: 32400, realized: 8420, projected: 14680, fx: 1240 };
    const field = (name) => demo.querySelector(`[data-mp-field="${name}"]`);
    const text = (selector, value) => { const node = demo.querySelector(selector); if (node) node.textContent = value; };

    const derive = () => {
      const amount = Math.max(0, Number(state.payment.amount || 0));
      const expectedInterest = Math.max(0, state.loan.principal * state.loan.monthlyRate / 100);
      state.payment.interest = state.payment.type === 'PRINCIPAL' ? 0 : Math.min(amount, expectedInterest);
      state.payment.principal = state.payment.type === 'INTEREST' ? 0 : Math.max(0, amount - state.payment.interest);
      state.loan.cycles = state.loan.created ? [{
        dueDate: state.loan.nextDueDate || addDays(state.loan.disbursementDate || today(), 30),
        expected: expectedInterest,
        status: state.payment.registered ? 'PAID' : 'DUE',
        pending: state.payment.registered ? 0 : expectedInterest,
      }] : [];
      return {
        customers: baseline.customers + (state.customer.created ? 1 : 0),
        loans: baseline.loans + (state.loan.created ? 1 : 0),
        paymentsToday: baseline.paymentsToday + (state.payment.registered ? amount : 0),
        availableCapital: baseline.availableCapital - (state.loan.created ? state.loan.principal : 0) + state.payment.principal,
        realized: baseline.realized + state.payment.interest,
        projected: baseline.projected + (state.loan.created ? expectedInterest : 0),
        fx: baseline.fx + (state.payment.registered ? amount * 0.02 : 0),
        balance: Math.max(0, state.loan.principal - state.payment.principal),
      };
    };

    const update = () => {
      const totals = derive();
      text('[data-mp-metric="customers"]', String(totals.customers));
      text('[data-mp-metric="loans"]', String(totals.loans));
      text('[data-mp-metric="payments"]', money(totals.paymentsToday));
      text('[data-mp-metric="capital"]', money(totals.availableCapital));
      text('[data-mp-report="realized"]', money(totals.realized));
      text('[data-mp-report="projected"]', money(totals.projected));
      text('[data-mp-report="fx"]', money(totals.fx));
      if (state.customer.created) {
        text('[data-mp-collection-name]', state.customer.name || (en ? 'New customer' : 'Nuevo cliente'));
        text('[data-mp-collection-detail]', state.loan.created ? `${money(Math.max(0, state.loan.principal * state.loan.monthlyRate / 100))} · ${en ? 'Payment due today' : 'Pago pendiente hoy'}` : (en ? 'Customer ready for a loan' : 'Cliente listo para préstamo'));
      }
      if (state.payment.registered) {
        text('[data-mp-history-receipt]', en ? 'Receipt #R-025' : 'Recibo #R-025');
        text('[data-mp-history-amount]', money(state.payment.amount));
        text('[data-mp-history-detail]', `${state.customer.name || 'Juan Pérez'} · ${en ? 'Mixed payment · Today' : 'Pago mixto · Hoy'}`);
      }
      demo.dispatchEvent(new CustomEvent('mp-state-change', { detail: { state, totals } }));
    };
    const feedback = (message) => text('[data-mp-backup-feedback]', message);

    demo.__mpState = state;
    demo.__mpResetState = () => { Object.assign(state, createInitialState()); update(); };
    demo.addEventListener('mp-demo-reset', () => demo.__mpResetState());
    demo.addEventListener('input', (event) => {
      const name = event.target?.dataset?.mpField;
      if (name === 'customerName') state.customer.name = event.target.value;
      if (name === 'customerDni') state.customer.dni = event.target.value;
      if (name === 'customerPhone') state.customer.phone = event.target.value;
      if (name === 'customerAddress') state.customer.address = event.target.value;
      if (name === 'customerPayDay') state.customer.payDay = Number(event.target.value || 15);
      if (name === 'loanAmount') state.loan.principal = Number(event.target.value || 0);
      if (name === 'monthlyRate') state.loan.monthlyRate = Number(event.target.value || 0);
      if (name === 'loanDate') state.loan.disbursementDate = event.target.value;
      if (name === 'paymentAmount') state.payment.amount = Number(event.target.value || 0);
      update();
    });
    demo.addEventListener('change', (event) => {
      const name = event.target?.dataset?.mpField;
      if (name === 'paymentType') state.payment.type = event.target.value.toUpperCase();
      if (name === 'loanFrequency') state.loan.frequency = event.target.value.toUpperCase();
      if (name === 'loanCurrency') state.loan.currency = event.target.value;
      if (name === 'paymentDate') state.payment.date = event.target.value;
      update();
    });
    demo.querySelector('[data-mp-action="createCustomer"]')?.addEventListener('click', () => { state.customer.created = true; update(); });
    demo.querySelector('[data-mp-action="createLoan"]')?.addEventListener('click', () => { state.loan.created = true; state.loan.disbursementDate ||= today(); state.loan.nextDueDate = addDays(state.loan.disbursementDate, 30); update(); });
    demo.querySelector('[data-mp-action="registerPayment"]')?.addEventListener('click', () => { state.payment.registered = true; state.payment.date ||= today(); update(); });
    demo.querySelector('[data-mp-backup-action="create"]')?.addEventListener('click', () => { state.backup.created = true; feedback(en ? 'Demo state: backup created successfully. The installed app writes a local SQLite file.' : 'Estado demo: respaldo creado correctamente. La app instalada escribe un archivo SQLite local.'); update(); });
    demo.querySelector('[data-mp-backup-action="restore"]')?.addEventListener('click', () => { state.backup.restored = true; feedback(en ? 'Demo state: restore confirmation shown. The installed app restores the selected local backup and restarts.' : 'Estado demo: confirmación de restauración mostrada. La app instalada restaura el respaldo local y reinicia.'); update(); });
    update();
  }
})();
