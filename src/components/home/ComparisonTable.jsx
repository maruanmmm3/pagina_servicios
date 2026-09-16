import { X, Check } from 'lucide-react'

export function ComparisonTable({ sinItems, conItems }) {
  if (!sinItems?.length && !conItems?.length) return null

  return (
    <section className="bg-slate-950 py-20">
      <div className="mx-auto max-w-5xl px-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-rose-400">
          La diferencia
        </p>
        <h2 className="mt-3 font-serif text-3xl font-medium text-slate-50 sm:text-4xl">
          Con sistema vs. sin sistema
        </h2>
        <p className="mt-4 max-w-2xl text-slate-400">
          El desarrollo a medida y la automatización no son lujos. Son la diferencia entre
          sobrevivir y escalar.
        </p>

        <div className="mt-10 grid overflow-hidden rounded-xl border border-slate-800 md:grid-cols-2">
          <div className="border-b border-slate-800 bg-slate-900/60 p-6 md:border-b-0 md:border-r">
            <span className="inline-flex rounded-full bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-400">
              SIN AMARU
            </span>
            <ul className="mt-4 space-y-3 text-sm">
              {sinItems.map((item) => (
                <li key={item.id} className="flex items-start gap-2 text-slate-400">
                  <X size={16} className="mt-0.5 shrink-0 text-rose-400" />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-900 p-6">
            <span className="inline-flex rounded-full bg-sky-400/10 px-3 py-1 text-xs font-semibold text-sky-400">
              CON AMARU
            </span>
            <ul className="mt-4 space-y-3 text-sm">
              {conItems.map((item) => (
                <li key={item.id} className="flex items-start gap-2 text-slate-200">
                  <Check size={16} className="mt-0.5 shrink-0 text-sky-400" />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
