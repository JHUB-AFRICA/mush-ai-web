/** 480000 -> "KSh 480,000" (manual formatting avoids server/client locale mismatch) */
export function formatKsh(amount: number): string {
  return `KSh ${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}
