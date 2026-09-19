const format = (value) => `S/ ${Number(value).toLocaleString('es-PE', { maximumFractionDigits: 2 })}`

export function formatPriceRange(min, max) {
  if (min == null) return 'A consultar'
  if (max == null || Number(max) === Number(min)) return `Desde ${format(min)}`
  return `${format(min)} – ${format(max)}`
}
