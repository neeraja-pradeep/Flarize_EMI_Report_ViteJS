/** Flarize financing rules used to build the report. */

/** Smallest down payment accepted, as a share of the system price. */
export const MIN_DOWN_PAYMENT_RATIO = 0.1;

/** Down-payment shares shown in the comparison table (first is the minimum). */
export const SCENARIO_DOWN_PAYMENT_RATIOS = [MIN_DOWN_PAYMENT_RATIO, 0.25, 0.4, 0.5] as const;

/** Number of scenario rows shown in the comparison table. */
export const MAX_SCENARIOS = 3;

/** Interest rate by loan size. The last rule (`maxLoan: null`) is the fallback. */
export const RATE_RULES = [
  { maxLoan: 200_000, ratePct: 5.75 },
  { maxLoan: null, ratePct: 8 },
] as const;

/** Safety stop for the "credited later" payoff simulation (50 years). */
export const MAX_SIMULATED_MONTHS = 600;

/** The EMI is divided by this many days for the "save per day" figure. */
export const DAYS_PER_MONTH = 30;
