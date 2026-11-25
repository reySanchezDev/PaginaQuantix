(() => {
  'use strict';

  const initial = () => ({
    configuration: { companyName: 'Prestazo', country: 'NI', baseCurrency: 'NIO', availableCapital: 32400, capitalValidation: true, recoveryPriority: 'CAPITAL_FIRST' },
    customer: { created: false, name: '', dni: '', alias: '', category: '', phone: '', address: '', coords: '', payDay: 15, notes: '' },
    loan: { created: false, plan: 'MONTHLY_STANDARD', principal: 0, monthlyRate: 0, frequency: 'MONTHLY', currency: 'NIO', disbursementDate: '', nextDueDate: '', cycles: [] },
    payment: { registered: false, amount: 0, type: 'MIXED', interest: 0, principal: 0, date: '' },
    backup: { created: false, restored: false, frequency: 'DISABLED', retention: 30, name: 'prestazo_backup' },
  });

  const money = (value) => `C$ ${Math.max(0, Math.round(value)).toLocaleString('en-US')}`;
  const today = () => new Date().toISOString().slice(0, 10);
  const addDays = (date, days) => { const result = new Date(`${date}T12:00:00`); result.setDate(result.getDate() + days); return result.toISOString().slice(0, 10); };

  for (const demo of document.querySelectorAll('[data-miniprestazo]')) {
    const en = demo.dataset.locale === 'en';
    const state = initial();
    const baseline = { customers: 24, loans: 18, paymentsToday: 4850, availableCapital: 32400, realized: 8420, projected: 14680, fx: 1240 };
    const field = (name) => demo.querySelector(`[data-mp-field="${name}"]`);
    const text = (selector, value) => { const node = demo.querySelector(selector); if (node) node.textContent = value; };
    const feedback = (selector, message) => text(selector, message);

    const derive = () => {
      const amount = Math.max(0, Number(state.payment.amount || 0));
      const expectedInterest = Math.max(0, state.loan.principal * state.loan.monthlyRate / 100);
      state.payment.interest = state.payment.type === 'PRINCIPAL' ? 0 : Math.min(amount, expectedInterest);
      state.payment.principal = state.payment.type === 'INTEREST' ? 0 : Math.max(0, amount - state.payment.interest);
      state.loan.cycles = state.loan.created ? [{ dueDate: state.loan.nextDueDate || today(), expected: expectedInterest, status: state.payment.registered ? 'PAID' : 'DUE', pending: state.payment.registered ? 0 : expectedInterest }] : [];
      return {
        customers: baseline.customers + (state.customer.created ? 1 : 0),
        loans: baseline.loans + (state.loan.created ? 1 : 0),
        paymentsToday: baseline.paymentsToday + (state.payment.registered ? amount : 0),
        availableCapital: baseline.availableCapital - (state.loan.created ? state.loan.principal : 0) + state.payment.principal,
        placed: state.loan.created ? state.loan.principal : 0,
        overdue: state.loan.created && !state.payment.registered ? 1 : 0,
        realized: baseline.realized + state.payment.interest,
        projected: baseline.projected + (state.loan.created ? expectedInterest : 0),
        fx: baseline.fx + (state.payment.registered ? amount * 0.02 : 0),
        balance: Math.max(0, state.loan.principal - state.payment.principal),
      };
    };

    const update = () => {
      const totals = derive();
      text('[data-mp-metric="customers"]', String(totals.customers)); text('[data-mp-metric="loans"]', String(totals.loans));
      text('[data-mp-metric="payments"]', money(totals.paymentsToday)); text('[data-mp-metric="capital"]', money(totals.availableCapital));
      text('[data-mp-metric="placed"]', money(totals.placed)); text('[data-mp-metric="overdue"]', String(totals.overdue));
      text('[data-mp-report="realized"]', money(totals.realized)); text('[data-mp-report="projected"]', money(totals.projected)); text('[data-mp-report="fx"]', money(totals.fx));
      text('[data-mp-customer-initial]', (state.customer.name || 'P').trim().charAt(0).toUpperCase());
      text('[data-mp-customer-display]', state.customer.name || (en ? 'New customer' : 'Nuevo cliente')); text('[data-mp-customer-dni]', state.customer.dni || (en ? 'Identification pending' : 'Identificación pendiente'));
      text('[data-mp-payment-customer]', state.customer.name || (en ? 'New customer' : 'Nuevo cliente')); text('[data-mp-payment-dni]', state.customer.dni || '');
      text('[data-mp-payment-loan]', state.loan.created ? `${money(state.loan.principal)} · ${en ? 'Active loan' : 'Préstamo activo'}` : (en ? 'Loan pending' : 'Préstamo pendiente'));
      text('[data-mp-loan-summary-amount]', money(state.loan.principal)); text('[data-mp-loan-summary-rate]', `${state.loan.monthlyRate || 0}%`); text('[data-mp-loan-summary-due]', state.loan.nextDueDate || '—');
      text('[data-mp-collection-name]', state.customer.name || (en ? 'New customer' : 'Nuevo cliente'));
      text('[data-mp-collection-detail]', state.loan.created ? `${money(state.loan.cycles[0]?.expected || 0)} · ${state.payment.registered ? (en ? 'Paid today' : 'Pagado hoy') : (en ? 'Due today' : 'Vence hoy')}` : (en ? 'Customer ready for a loan' : 'Cliente listo para préstamo'));
      text('[data-mp-history-receipt]', state.payment.registered ? (en ? 'Receipt #R-025' : 'Recibo #R-025') : (en ? 'Receipt pending' : 'Recibo pendiente')); text('[data-mp-history-amount]', money(state.payment.amount));
      text('[data-mp-history-detail]', `${state.customer.name || 'Juan Pérez'} · ${state.payment.registered ? (en ? 'Mixed payment · Today' : 'Pago mixto · Hoy') : (en ? 'No payment registered' : 'Sin pago registrado')}`);
      text('[data-mp-payment-interest]', money(state.payment.interest)); text('[data-mp-payment-principal]', money(state.payment.principal)); text('[data-mp-payment-balance]', money(totals.balance));
      text('[data-mp-statement-name]', state.customer.name || (en ? 'New customer' : 'Nuevo cliente')); text('[data-mp-statement-id]', state.customer.dni || (en ? 'Customer identification' : 'Identificación del cliente'));
      text('[data-mp-statement-balance]', money(totals.balance)); text('[data-mp-statement-application]', money(state.payment.amount)); text('[data-mp-directory-name]', state.customer.name || (en ? 'New customer' : 'Nuevo cliente'));
      text('[data-mp-directory-detail]', state.customer.created ? `${state.customer.dni} · ${state.customer.phone}` : (en ? 'Create the customer to see the detail.' : 'Crea el cliente para ver el detalle.'));
      demo.dispatchEvent(new CustomEvent('mp-state-change', { detail: { state, totals } }));
    };

    demo.__mpState = state;
    demo.__mpResetState = () => { Object.assign(state, initial()); update(); };
    demo.addEventListener('mp-demo-reset', () => demo.__mpResetState());
    demo.addEventListener('input', (event) => {
      const name = event.target?.dataset?.mpField;
      if (name === 'customerName') state.customer.name = event.target.value; if (name === 'customerDni') state.customer.dni = event.target.value; if (name === 'customerAlias') state.customer.alias = event.target.value;
      if (name === 'customerCategory') state.customer.category = event.target.value; if (name === 'customerPhone') state.customer.phone = event.target.value; if (name === 'customerAddress') state.customer.address = event.target.value;
      if (name === 'customerCoords') state.customer.coords = event.target.value; if (name === 'customerPayDay') state.customer.payDay = Number(event.target.value || 15); if (name === 'customerNotes') state.customer.notes = event.target.value;
      if (name === 'loanAmount') state.loan.principal = Number(event.target.value || 0); if (name === 'monthlyRate') state.loan.monthlyRate = Number(event.target.value || 0); if (name === 'loanDate') state.loan.disbursementDate = event.target.value; if (name === 'paymentAmount') state.payment.amount = Number(event.target.value || 0);
      update();
    });
    demo.addEventListener('change', (event) => {
      const name = event.target?.dataset?.mpField;
      if (name === 'paymentType') state.payment.type = event.target.value.toUpperCase(); if (name === 'loanPlan') state.loan.plan = event.target.value; if (name === 'loanFrequency') state.loan.frequency = event.target.value.toUpperCase(); if (name === 'loanCurrency') state.loan.currency = event.target.value; if (name === 'paymentDate') state.payment.date = event.target.value;
      if (event.target.id === 'mp-backup-frequency') state.backup.frequency = event.target.value; if (event.target.id === 'mp-backup-retention') state.backup.retention = Number(event.target.value || 30); if (event.target.id === 'mp-backup-name') state.backup.name = event.target.value;
      update();
    });
    demo.querySelectorAll('[data-mp-payment-choice]').forEach((button) => button.addEventListener('click', () => { const select = field('paymentType'); if (select) { select.value = button.dataset.mpPaymentChoice; select.dispatchEvent(new Event('change', { bubbles: true })); } }));
    demo.querySelector('[data-mp-action="createCustomer"]')?.addEventListener('click', () => { state.customer.created = true; feedback('[data-mp-customer-feedback]', en ? 'Customer created successfully.' : 'Cliente creado exitosamente.'); const directory = demo.querySelector('[data-mp-customer-directory]'); if (directory) directory.hidden = false; update(); });
    demo.querySelector('[data-mp-action="createLoan"]')?.addEventListener('click', () => { state.loan.created = true; state.loan.disbursementDate ||= addDays(today(), -30); state.loan.nextDueDate = today(); update(); });
    demo.querySelector('[data-mp-action="registerPayment"]')?.addEventListener('click', () => { state.payment.registered = true; state.payment.date ||= today(); feedback('[data-mp-payment-feedback]', en ? 'Payment registered successfully.' : 'Pago registrado exitosamente.'); update(); });
    demo.querySelector('[data-mp-customer-search]')?.addEventListener('input', update);
    demo.querySelector('[data-mp-backup-action="create"]')?.addEventListener('click', () => { state.backup.created = true; feedback('[data-mp-backup-feedback]', en ? 'Demo state: backup created successfully. The installed app writes a local SQLite file.' : 'Estado demo: respaldo creado exitosamente. La app instalada escribe un archivo SQLite local.'); update(); });
    demo.querySelector('[data-mp-backup-action="save-settings"]')?.addEventListener('click', () => { feedback('[data-mp-backup-feedback]', en ? 'Backup settings saved successfully.' : 'Configuración de respaldo guardada.'); update(); });
    demo.querySelector('[data-mp-backup-action="restore"]')?.addEventListener('click', () => { state.backup.restored = true; feedback('[data-mp-backup-feedback]', en ? 'Demo state: restore confirmation shown. The installed app restores the selected local backup and restarts.' : 'Estado demo: confirmación de restauración mostrada. La app instalada restaura el respaldo local y reinicia.'); update(); });
    update();
  }
})();
