import {allocatePayment, demoInstallments, outstanding, suggestedAmount, validatePayment} from '../lib/payment.mjs';

type DemoRoot = HTMLElement & { dataset: DOMStringMap };
const messages = {
  es: { invalid: 'Ingresá un importe válido mayor que cero.', exceeds: 'El pago no puede superar el saldo pendiente.', date: 'Seleccioná una fecha válida. No se permiten fechas futuras.' },
  en: { invalid: 'Enter a valid amount greater than zero.', exceeds: 'The payment cannot exceed the outstanding balance.', date: 'Select a valid date. Future dates are not allowed.' }
};
const localToday = () => { const now = new Date(); return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`; };
const format = (cents:number) => (cents/100).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
function setup(root: DemoRoot) {
  if (root.dataset.ready === 'true') return;
  root.dataset.ready = 'true';
  const locale = root.dataset.locale === 'en' ? 'en' : 'es';
  const q = <T extends Element>(selector:string):T | null => root.querySelector<T>(selector);
  const amount = q<HTMLInputElement>('[data-demo-amount]')!;
  const date = q<HTMLInputElement>('[data-demo-date]')!;
  const method = q<HTMLSelectElement>('[data-demo-method]')!;
  const channel = q<HTMLSelectElement>('[data-demo-channel]')!;
  const error = q<HTMLElement>('[data-demo-error]')!;
  const dialog = q<HTMLDialogElement>('[data-full-dialog]')!;
  date.value = localToday(); date.max = localToday();
  let screen = 0;
  let saved = false;
  let result:{ amount:number, outstandingAfter:number, lateFee:number, interest:number, principal:number } | null = null;
  function show(next:number) {
    screen = next;
    root.querySelectorAll<HTMLElement>('[data-screen]').forEach(s => { s.hidden = Number(s.dataset.screen) !== next; });
    root.querySelectorAll<HTMLElement>('[data-progress]').forEach(s => { s.classList.toggle('is-current', Number(s.dataset.progress) === next); s.classList.toggle('is-complete', Number(s.dataset.progress) < next); });
    q<HTMLElement>(`[data-screen="${next}"] h3`)?.setAttribute('tabindex','-1');
    q<HTMLElement>(`[data-screen="${next}"] h3`)?.focus({preventScroll:true});
  }
  function cents(){ return Math.round(Number(amount.value)*100); }
  function put(selector:string, value:string) { const el = q<HTMLElement>(selector); if(el) el.textContent = value; }
  function refresh(){
    let breakdown:{lateFee:number,interest:number,principal:number,amount:number}|null=null;
    try { breakdown = allocatePayment(demoInstallments,cents()); } catch {}
    const values = breakdown ?? {lateFee:0,interest:0,principal:0,amount:0};
    put('[data-total]', format(values.amount));
    put('[data-late]',format(values.lateFee));
    put('[data-interest]',format(values.interest));
    put('[data-principal]',format(values.principal));
    const total = values.amount || 1;
    for(const [part,key] of [['late','lateFee'],['interest','interest'],['principal','principal']] as const){
      const el = q<HTMLElement>(`[data-bar-${part}]`); if(el) el.style.width = (100*values[key]/total)+'%';
    }
    error.hidden = true;
  }
  function review(){
    const validation = validatePayment({amountCents:cents(), selectedDate:date.value, firstDate:'2026-01-01', today:localToday(), installments:demoInstallments});
    if(validation){ error.textContent = validation === 'EXCEEDS_BALANCE' ? messages[locale].exceeds : validation === 'INVALID_DATE' ? messages[locale].date : messages[locale].invalid; error.hidden=false; (validation === 'INVALID_DATE' ? date : amount).focus(); return; }
    result = allocatePayment(demoInstallments,cents());
    put('[data-review-amount]','NIO '+format(result.amount));
    put('[data-review-date]', date.value);
    put('[data-review-method]',method.options[method.selectedIndex].text);
    put('[data-review-channel]',channel.options[channel.selectedIndex].text);
    show(2);
  }
  root.addEventListener('click',event => {
    const target = (event.target as Element).closest<HTMLElement>('[data-demo-action]');
    if(!target || !root.contains(target)) return;
    switch(target.dataset.demoAction){
      case 'start': show(1); refresh();break;
      case 'back':show(0);break;
      case 'suggested':amount.value=format(suggestedAmount()).replace(/,/g,'');refresh();break;
      case 'full':dialog.showModal();break;
      case 'review':review();break;
      case 'edit':show(1);break;
      case 'confirm': if(saved || !result) return; saved=true; put('[data-after]','NIO '+format(result.outstandingAfter));show(3);break;
      case 'restart':saved=false;result=null;amount.value='165.00';method.selectedIndex=0;channel.selectedIndex=0;date.value=localToday();refresh();show(0);break;
    }
  });
  amount.addEventListener('input',refresh);
  q('[data-full-no]')?.addEventListener('click',()=>dialog.close());
  q('[data-full-yes]')?.addEventListener('click',()=>{amount.value=format(outstanding(demoInstallments)).replace(/,/g,''); dialog.close();refresh();});
  refresh();
}
export function attachPaymentDemos(){document.querySelectorAll<DemoRoot>('[data-payment-demo]').forEach(setup)}
