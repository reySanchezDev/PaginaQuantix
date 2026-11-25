/** Pure demo math mirrored from PaymentService.registerPayment (Flutter).
 * All monetary values are integers in minor units (cents), NEVER floating point.
 * The web demo is simulated: it NEVER persists, transmits, or receives money.
 */
export function outstanding(installments) {
  return installments.filter(i => i.payable && i.remainingTotalCents > 0)
    .reduce((sum, i) => sum + i.remainingTotalCents, 0);
}
export function allocatePayment(installments, amountCents) {
  if (!Number.isSafeInteger(amountCents) || amountCents <= 0) throw new Error('INVALID_AMOUNT');
  const max = outstanding(installments);
  if (amountCents > max) throw new Error('EXCEEDS_BALANCE');
  let remaining = amountCents;
  const allocations = [];
  for (const installment of [...installments].filter(i => i.payable && i.remainingTotalCents > 0).sort((a,b) => a.installmentNumber - b.installmentNumber)) {
    if (!remaining) break;
    let portion = Math.min(remaining, installment.remainingTotalCents);
    let left = portion;
    const lateFee = Math.min(left, installment.remainingLateFeeCents); left -= lateFee;
    const interest = Math.min(left, installment.remainingInterestCents); left -= interest;
    const principal = Math.min(left, installment.remainingPrincipalCents); left -= principal;
    if (left !== 0) throw new Error('INVALID_FIXTURE');
    allocations.push({ installmentNumber: installment.installmentNumber, lateFee, interest, principal, amount: portion });
    remaining -= portion;
  }
  return { amount: amountCents, allocations, lateFee: allocations.reduce((s, i) => s+i.lateFee,0), interest: allocations.reduce((s, i) => s+i.interest,0), principal: allocations.reduce((s, i) => s+i.principal,0), outstandingAfter: max - amountCents };
}
export function validatePayment({ amountCents, selectedDate, firstDate, today, installments }) {
  if (!Number.isSafeInteger(amountCents) || amountCents <= 0) return 'INVALID_AMOUNT';
  if (amountCents > outstanding(installments)) return 'EXCEEDS_BALANCE';
  const iso = /^\d{4}-\d{2}-\d{2}$/;
  if (!iso.test(selectedDate) || selectedDate < firstDate || selectedDate > today) return 'INVALID_DATE';
  return null;
}
export const demoInstallments = Object.freeze([
  {installmentNumber: 1, payable: true, remainingTotalCents: 16500, remainingLateFeeCents: 1500, remainingInterestCents: 3500, remainingPrincipalCents: 11500, due: 'overdue'},
  {installmentNumber: 2, payable: true, remainingTotalCents: 15000, remainingLateFeeCents: 0, remainingInterestCents: 3000, remainingPrincipalCents: 12000, due: 'current'},
  {installmentNumber: 3, payable: true, remainingTotalCents: 15000, remainingLateFeeCents: 0, remainingInterestCents: 2500, remainingPrincipalCents: 12500, due: 'future'},
]);
export function suggestedAmount(installments = demoInstallments) {
  return installments.filter(i => i.payable && (i.due === 'overdue' || i.due === 'current')).reduce((s,i) => s+i.remainingTotalCents,0);
}
