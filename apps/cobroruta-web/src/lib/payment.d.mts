export type DemoInstallment={ installmentNumber:number; payable:boolean; remainingTotalCents:number;remainingLateFeeCents:number;remainingInterestCents:number;remainingPrincipalCents:number;due:string };
export type DemoAllocation={ installmentNumber:number; lateFee:number;interest:number;principal:number;amount:number };
export type DemoResult={ amount:number;allocations:DemoAllocation[];lateFee:number;interest:number;principal:number;outstandingAfter:number };
export function outstanding(installments:readonly DemoInstallment[]):number;
export function suggestedAmount(installments?:readonly DemoInstallment[]):number;
export function allocatePayment(installments:readonly DemoInstallment[], amountCents:number):DemoResult;
export function validatePayment(options:{amountCents:number;selectedDate:string;firstDate:string;today:string;installments:readonly DemoInstallment[]}):string|null;
export const demoInstallments:readonly DemoInstallment[];
