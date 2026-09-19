import { formatPriceRange } from '../../lib/formatPrice'

export function ServiceCard({ service }) {
  return (
    <div className="flex flex-col rounded-lg border border-slate-800 bg-slate-900 p-6">
      <h3 className="text-lg font-semibold text-slate-100">{service.title}</h3>
      {service.description && <p className="mt-1 text-sm text-slate-400">{service.description}</p>}
      {service.features?.length > 0 && (
        <ul className="mt-4 space-y-1.5 text-sm text-slate-400">
          {service.features.map((feature) => (
            <li key={feature} className="flex gap-2">
              <span className="text-sky-400">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}
      {(service.price_min != null || service.negotiable) && (
        <div className="mt-auto border-t border-slate-800 pt-4">
          {service.price_min != null && (
            <p className="text-lg font-semibold text-slate-50">{formatPriceRange(service.price_min, service.price_max)}</p>
          )}
          <p className="text-xs text-slate-500">Precio referencial de mercado</p>
          {service.negotiable && (
            <span className="mt-2 inline-flex rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/30">
              Negociable
            </span>
          )}
        </div>
      )}
    </div>
  )
}
