import { Link } from 'react-router-dom'

export function Hero({ content }) {
  if (!content) return null

  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-sky-950/40" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-24 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 px-4 py-1.5 text-xs font-semibold tracking-wide text-sky-300">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            {content.hero_badge}
          </span>

          <h1 className="mt-6 font-serif text-4xl font-medium leading-tight text-slate-50 sm:text-5xl">
            {content.hero_title}{' '}
            <span className="text-sky-400">{content.hero_highlight}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-slate-400">{content.hero_subtitle}</p>

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-400">
            {content.hero_tags?.map((tag) => (
              <span key={tag} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/reservar"
              className="rounded-md bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-300"
            >
              Agenda tu consulta gratuita →
            </Link>
            <Link
              to="/servicios"
              className="rounded-md border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-800/50"
            >
              Ver servicios
            </Link>
          </div>

          <p className="mt-4 text-xs text-slate-500">Sin compromiso · Sin tecnicismos · Riesgo cero</p>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-sky-950/40">
            <div className="flex items-center gap-1.5 border-b border-slate-800 bg-slate-900/80 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
            </div>
            <div className="space-y-4 p-8">
              <div className="h-3 w-3/4 rounded-full bg-slate-700" />
              <div className="h-3 w-1/2 rounded-full bg-slate-800" />
              <div className="mt-6 flex items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/20 to-slate-800 py-10">
                <span className="text-5xl font-bold text-sky-400">{'{ }'}</span>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-800" />
              <div className="h-3 w-2/3 rounded-full bg-slate-800" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
