// Format a whole-RWF amount, e.g. 18000 -> "18,000 RWF".
export function formatRwf(amount: number): string {
  return `${amount.toLocaleString('en-US')} RWF`;
}
