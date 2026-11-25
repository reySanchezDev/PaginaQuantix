(() => {
  const money = (value) => `C$ ${Math.max(0, Math.round(value)).toLocaleString('en-US')}`;

  for (const demo of document.querySelectorAll('[data-miniprestazo]')) {
    const en = demo.dataset.locale === 'en';
    const state = {
      customer: { created: false, name: '', dni: '' },
      loan: { created: false, amount: 0, rate: 0 },
      payment: { registered: false, amount: 0, type: 'mixed' },
      backup: { created: false },
    };
    const base = { customers: 24, loans: 18, payments: 4850, capital: 32400, realized: 8420, projected: 14680, fx: 1240 };
    const field = (name) => demo.querySelector(`[data-mp-field="${name}"]`);
    const text = (selector, value) => { const node = demo.querySelector(selector); if (node) node.textContent = value; };
    const update = () => {
      const loanAmount = Number(field('loanAmount')?.value || state.loan.amount || 0);
      const paymentAmount = Number(field('paymentAmount')?.value || state.payment.amount || 0);
      const customers = base.customers + (state.customer.created ? 1 : 0);
      const loans = base.loans + (state.loan.created ? 1 : 0);
      const payments = base.payments + (state.payment.registered ? paymentAmount : 0);
      const capital = base.capital - (state.loan.created ? loanAmount : 0) + (state.payment.registered ? paymentAmount : 0);
      const realized = base.realized + (state.payment.registered ? paymentAmount : 0);
      const projected = base.projected + (state.loan.created ? loanAmount * 0.1 : 0);
      text('[data-mp-metric="customers"]', String(customers));
      text('[data-mp-metric="loans"]', String(loans));
      text('[data-mp-metric="payments"]', money(payments));
      text('[data-mp-metric="capital"]', money(capital));
      text('[data-mp-report="realized"]', money(realized));
      text('[data-mp-report="projected"]', money(projected));
      text('[data-mp-report="fx"]', money(base.fx + (state.payment.registered ? paymentAmount * 0.02 : 0)));
      if (state.customer.created) {
        text('[data-mp-collection-name]', state.customer.name || (en ? 'New customer' : 'Nuevo cliente'));
        text('[data-mp-collection-detail]', `${money(state.loan.created ? Math.max(0, loanAmount * 0.1) : 1250)} · ${en ? 'Demo scenario' : 'Escenario demo'}`);
      }
      if (state.payment.registered) {
        text('[data-mp-history-receipt]', 'Receipt #R-025');
        text('[data-mp-history-amount]', money(paymentAmount));
        text('[data-mp-history-detail]', `${state.customer.name || 'Juan Pérez'} · ${en ? `${state.payment.type} payment · Today` : `Pago ${state.payment.type} · Hoy`}`);
      }
    };
    const feedback = (message) => text('[data-mp-backup-feedback]', message);

    demo.addEventListener('input', (event) => {
      const name = event.target?.dataset?.mpField;
      if (name === 'customerName') state.customer.name = event.target.value;
      if (name === 'customerDni') state.customer.dni = event.target.value;
      if (name === 'loanAmount') state.loan.amount = Number(event.target.value || 0);
      if (name === 'monthlyRate') state.loan.rate = Number(event.target.value || 0);
      if (name === 'paymentAmount') state.payment.amount = Number(event.target.value || 0);
      update();
    });
    demo.addEventListener('change', (event) => {
      if (event.target.matches('[data-mp-field="paymentType"]')) state.payment.type = event.target.value;
      update();
    });
    demo.querySelector('[data-mp-action="createCustomer"]')?.addEventListener('click', () => { state.customer.created = true; update(); });
    demo.querySelector('[data-mp-action="createLoan"]')?.addEventListener('click', () => { state.loan.created = true; update(); });
    demo.querySelector('[data-mp-action="registerPayment"]')?.addEventListener('click', () => { state.payment.registered = true; update(); });
    demo.querySelector('[data-mp-backup-action="create"]')?.addEventListener('click', () => { state.backup.created = true; feedback(en ? 'Demo state: backup created successfully. The installed app writes a local SQLite file.' : 'Estado demo: respaldo creado correctamente. La app instalada escribe un archivo SQLite local.'); });
    demo.querySelector('[data-mp-backup-action="restore"]')?.addEventListener('click', () => feedback(en ? 'Demo state: restore confirmation shown. The installed app restores the selected local backup and restarts.' : 'Estado demo: confirmación de restauración mostrada. La app instalada restaura el respaldo local y reinicia.'));
    update();
  }
})();
