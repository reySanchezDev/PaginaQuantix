import test from 'node:test';
import assert from 'node:assert/strict';
import { allocatePayment, demoInstallments, outstanding, suggestedAmount, validatePayment } from '../src/lib/payment.mjs';
test('balance is sum of collectible installments',()=>assert.equal(outstanding(demoInstallments),46500));
test('suggested = overdue + first upcoming',()=>assert.equal(suggestedAmount(),31500));
test('payment waterfall: late fees -> interest -> principal, FIFO',()=>{
 const r=allocatePayment(demoInstallments,17000);
 assert.equal(r.lateFee,1500); assert.equal(r.interest,4000);assert.equal(r.principal,11500);
 assert.deepEqual(r.allocations.map(a=>a.installmentNumber),[1,2]);
 assert.equal(r.outstandingAfter,29500);
});
test('full payment allocates entire debt',()=>assert.equal(allocatePayment(demoInstallments,46500).outstandingAfter,0));
test('amount cannot exceed debt',()=>assert.throws(()=>allocatePayment(demoInstallments,46501),/EXCEEDS_BALANCE/));
test('zero and negative cannot be recorded',()=>{for(const n of [0,-1,1.5]) assert.throws(()=>allocatePayment(demoInstallments,n),/INVALID_AMOUNT/)});
test('reject future dates, prior dates, and overpayments',()=>{
 const base={amountCents:1000,selectedDate:'2026-11-08',firstDate:'2026-01-01',today:'2026-11-08',installments:demoInstallments};
 assert.equal(validatePayment(base),null);
 assert.equal(validatePayment({...base,selectedDate:'2027-01-01'}),'INVALID_DATE');
 assert.equal(validatePayment({...base,selectedDate:'2025-01-01'}),'INVALID_DATE');
 assert.equal(validatePayment({...base,amountCents:99999}),'EXCEEDS_BALANCE');
});
