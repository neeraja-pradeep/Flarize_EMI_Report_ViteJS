/** Indian digit grouping, e.g. 230000 -> "₹2,30,000". */
export function formatInr(amount: number): string {
  return "₹" + Math.round(amount).toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
}

/** 5.75 -> "5.75%". */
export function formatPercent(value: number): string {
  return value.toFixed(2) + "%";
}

/** 18 -> "1 yr 6 mos", 12 -> "1 yr", 5 -> "5 mos". */
export function formatTenure(totalMonths: number): string {
  const months = Math.round(totalMonths);
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const yearPart = years ? `${years} yr${years > 1 ? "s" : ""}` : "";
  const monthPart = rest ? `${rest} mo${rest > 1 ? "s" : ""}` : "";
  return [yearPart, monthPart].filter(Boolean).join(" ");
}

/** Replaces `{key}` tokens in copy that carries computed values. */
export function interpolate(
  template: string,
  values: Readonly<Record<string, string>>,
): string {
  return template.replace(/\{(\w+)\}/g, (token, key: string) => values[key] ?? token);
}
