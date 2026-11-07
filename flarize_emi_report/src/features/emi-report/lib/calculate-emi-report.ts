import {
  DAYS_PER_MONTH,
  MAX_SCENARIOS,
  MAX_SIMULATED_MONTHS,
  MIN_DOWN_PAYMENT_RATIO,
  RATE_RULES,
  SCENARIO_DOWN_PAYMENT_RATIOS,
} from "../constants";
import type { EmiInput } from "../schemas/emi-report.schema";

export interface DownPaymentScenario {
  readonly downPayment: number;
  readonly loan: number;
  readonly ratePct: number;
  readonly emi: number;
  /** Monthly EMI saved versus the minimum down payment (0 for the first row). */
  readonly emiSaved: number;
  readonly isCurrentPlan: boolean;
}

export interface EmiReport {
  readonly reportDate: string;
  readonly tenureYears: number;
  readonly subsidyMode: EmiInput["subsidyMode"];
  readonly subsidyAmount: number;
  /** Subsidy deducted from the loan up front (0 unless mode is "upfront"). */
  readonly subsidyApplied: number;
  readonly quotation: number;
  readonly downPayment: number;
  readonly downPaymentPct: number;
  readonly loan: number;
  readonly ratePct: number;
  readonly emi: number;
  readonly emiPerDay: number;
  readonly totalInterest: number;
  readonly totalRepay: number;
  readonly emiCount: number;
  /** "Credited later" subsidy ends the loan before the full tenure. */
  readonly endsEarly: boolean;
  readonly earlyTenureMonths: number;
  readonly interestSaved: number;
  readonly monthlyBill: number;
  /** EMI minus electricity savings. Zero or negative means the system pays for itself. */
  readonly netMonthly: number;
  readonly emiBarPct: number;
  readonly billBarPct: number;
  readonly scenarios: readonly DownPaymentScenario[];
}

function rateFor(loan: number): number {
  for (const rule of RATE_RULES) {
    if (rule.maxLoan === null || loan <= rule.maxLoan) return rule.ratePct;
  }
  return RATE_RULES[RATE_RULES.length - 1].ratePct;
}

function emiFor(principal: number, annualRatePct: number, months: number): number {
  if (principal <= 0) return 0;
  const monthlyRate = annualRatePct / 1200;
  if (!monthlyRate) return principal / months;
  const growth = Math.pow(1 + monthlyRate, months);
  return (principal * monthlyRate * growth) / (growth - 1);
}

/** Month-by-month payoff with a one-off subsidy credit in `creditMonth`. */
function simulatePayoff(
  principal: number,
  annualRatePct: number,
  emi: number,
  subsidy: number,
  creditMonth: number,
): { months: number; totalPaid: number } {
  const monthlyRate = annualRatePct / 1200;
  let balance = principal;
  let totalPaid = 0;
  let month = 0;
  while (balance > 1 && month < MAX_SIMULATED_MONTHS) {
    month++;
    const interest = balance * monthlyRate;
    const principalPaid = emi - interest;
    if (principalPaid >= balance) {
      totalPaid += balance + interest;
      balance = 0;
      break;
    }
    balance -= principalPaid;
    totalPaid += emi;
    if (subsidy && month === creditMonth) {
      balance = Math.max(0, balance - subsidy);
      if (balance <= 1) break;
    }
  }
  return { months: month, totalPaid };
}

/**
 * Turns a customer's quote into every figure the report shows. Pure: same
 * input, same output, no formatting — components format at render time.
 */
export function calculateEmiReport(input: EmiInput): EmiReport {
  const quotation = Math.max(0, input.quotation);
  const minDown = Math.round(quotation * MIN_DOWN_PAYMENT_RATIO);
  const downPayment = Math.min(quotation, Math.max(minDown, input.downPayment));
  const tenureMonths = input.tenureYears * 12;

  const loanBeforeSubsidy = quotation - downPayment;
  const ratePct = rateFor(loanBeforeSubsidy);
  const hasSubsidy = input.subsidyMode !== "none";
  const isUpfront = input.subsidyMode === "upfront";
  const subsidyApplied = isUpfront ? Math.min(input.subsidyAmount, loanBeforeSubsidy) : 0;
  const loan = Math.max(0, loanBeforeSubsidy - subsidyApplied);

  const emi = emiFor(loan, ratePct, tenureMonths);
  const baseRepay = emi * tenureMonths;
  const baseInterest = baseRepay - loan;

  const payoff =
    hasSubsidy && !isUpfront
      ? simulatePayoff(loan, ratePct, emi, input.subsidyAmount, input.subsidyCreditMonth)
      : null;
  const endsEarly = payoff !== null && payoff.months < tenureMonths;
  const totalRepay = endsEarly ? payoff.totalPaid : baseRepay;
  const totalInterest = endsEarly
    ? Math.max(0, payoff.totalPaid - (loan - input.subsidyAmount))
    : baseInterest;
  const interestSaved = endsEarly ? Math.max(0, baseInterest - totalInterest) : 0;

  const rawScenarios: { downPayment: number; loan: number; ratePct: number; emi: number }[] = [];
  const seenDownPayments = new Set<number>();
  for (const ratio of SCENARIO_DOWN_PAYMENT_RATIOS) {
    const scenarioDown = Math.max(minDown, Math.round(quotation * ratio));
    if (seenDownPayments.has(scenarioDown)) continue;
    seenDownPayments.add(scenarioDown);
    const gross = quotation - scenarioDown;
    const scenarioRate = rateFor(gross);
    const scenarioLoan = isUpfront ? Math.max(0, gross - Math.min(input.subsidyAmount, gross)) : gross;
    rawScenarios.push({
      downPayment: scenarioDown,
      loan: scenarioLoan,
      ratePct: scenarioRate,
      emi: emiFor(scenarioLoan, scenarioRate, tenureMonths),
    });
  }
  const baselineEmi = rawScenarios.length ? rawScenarios[0].emi : emi;
  const scenarios = rawScenarios.slice(0, MAX_SCENARIOS).map((s) => ({
    ...s,
    emiSaved: s.emi < baselineEmi - 0.5 ? baselineEmi - s.emi : 0,
    isCurrentPlan: s.downPayment === downPayment,
  }));

  const monthlyBill = input.systemKw * input.unitsPerKwPerMonth * input.tariffPerUnit;
  const barScale = Math.max(emi, monthlyBill, 1);

  return {
    reportDate: input.reportDate,
    tenureYears: input.tenureYears,
    subsidyMode: input.subsidyMode,
    subsidyAmount: input.subsidyAmount,
    subsidyApplied,
    quotation,
    downPayment,
    downPaymentPct: quotation ? Math.round((downPayment / quotation) * 100) : 0,
    loan,
    ratePct,
    emi,
    emiPerDay: emi / DAYS_PER_MONTH,
    totalInterest,
    totalRepay,
    emiCount: endsEarly ? payoff.months : tenureMonths,
    endsEarly,
    earlyTenureMonths: payoff?.months ?? 0,
    interestSaved,
    monthlyBill,
    netMonthly: emi - monthlyBill,
    emiBarPct: (emi / barScale) * 100,
    billBarPct: (monthlyBill / barScale) * 100,
    scenarios,
  };
}
