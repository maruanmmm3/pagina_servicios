import { Check, TriangleAlert } from 'lucide-react'

export function Approaches({ approaches }) {
  if (!approaches?.length) return null

  return (
    <section className="bg-slate-950 py-20">
      <div className="mx-auto max-w-5xl px-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-sky-400">
          Cómo trabajamos
        </p>
        <h2 className="mt-3 font-serif text-3xl font-medium text-slate-50 sm:text-4xl">
          Dos formas de trabajar contigo.
          <br />
          Una que recomendamos siempre.
        </h2>
        <p className="mt-4 max-w-2xl text-slate-400">
          Implementar rápido no siempre es implementar bien. Entender la diferencia puede marcar
          la distancia entre un sistema que falla y uno que transforma.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {approaches.map((approach) => {
            const isRecommended = approach.badge_variant === 'recommended'
            return (
              <div
                key={approach.id}
                className={`flex flex-col rounded-xl border p-6 ${
                  isRecommended ? 'border-sky-400/50 bg-slate-900' : 'border-slate-800 bg-slate-900/60'
                }`}
              >
                <span
                  className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${
                    isRecommended ? 'bg-sky-400 text-slate-950' : 'border border-slate-700 text-slate-400'
                  }`}
                >
                  {approach.badge}
                  {isRecommended && <span className="rounded-full bg-slate-950/20 px-1.5">Recomendado</span>}
                </span>

                <h3 className="mt-4 text-xl font-semibold text-slate-100">{approach.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{approach.description}</p>

                <ul className="mt-5 space-y-2.5 text-sm">
                  {approach.points?.map((point) => (
                    <li key={point.text} className="flex items-start gap-2">
                      {point.type === 'warning' ? (
                        <TriangleAlert size={16} className="mt-0.5 shrink-0 text-amber-400" />
                      ) : (
                        <Check size={16} className="mt-0.5 shrink-0 text-sky-400" />
                      )}
                      <span className={point.type === 'warning' ? 'text-slate-400' : 'text-slate-300'}>
                        {point.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {approach.quote && (
                  <p className="mt-6 border-l-2 border-sky-400/60 pl-4 text-sm italic text-slate-400">
                    {approach.quote}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
