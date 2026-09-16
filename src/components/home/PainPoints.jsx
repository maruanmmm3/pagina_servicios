import { useState } from 'react'
import { DynamicIcon } from './icons'

function RadialStat({ value, label }) {
  const circumference = 2 * Math.PI * 42
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="relative flex h-[140px] w-[140px] items-center justify-center">
      <svg width="140" height="140" viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
        <circle cx="50" cy="50" r="42" fill="none" stroke="#1e293b" strokeWidth="10" />
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <p className="relative px-2 text-center text-xl font-bold leading-tight text-sky-400">{label}</p>
    </div>
  )
}

export function PainPoints({ tabs }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = tabs[activeIndex]

  if (!active) return null

  return (
    <section className="bg-slate-950 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-medium text-slate-50 sm:text-4xl">
            Lo que te está costando más de lo que crees
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Identifica en cuál de estas áreas estás dejando más valor sobre la mesa — con datos
            reales de negocios sin sistema.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2 rounded-lg bg-slate-900 p-2">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                index === activeIndex
                  ? 'bg-sky-400 text-slate-950'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <DynamicIcon name={tab.icon} size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="grid gap-4 sm:grid-cols-1">
            {active.cards?.map((card) => (
              <div key={card.title} className="rounded-lg border border-slate-800 bg-slate-900 p-5">
                <h3 className="font-semibold text-slate-100">{card.title}</h3>
                <p className="mt-1.5 text-sm text-slate-400">{card.description}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-lg border border-slate-800 bg-slate-900 p-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {active.stat_label}
              </p>
              <div className="mt-2 flex justify-center">
                <RadialStat value={active.stat_percent} label={active.stat_value_display} />
              </div>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Detalle
              </p>
              <div className="space-y-3">
                {active.bars?.map((bar) => (
                  <div key={bar.label} className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-slate-400">{bar.label}</span>
                    <span className="font-semibold text-sky-400">{bar.display_value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
