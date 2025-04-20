export function indexToMonthName(index: number, isMobile: boolean) {
  return new Date(2025, index).toLocaleString('default', {month: isMobile ? 'short' : 'long'})
}
