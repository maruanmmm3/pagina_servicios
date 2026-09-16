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
    </div>
  )
}
