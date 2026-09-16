function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 3)
    .join('')
    .toUpperCase()
}

export function FounderSection({ founder }) {
  if (!founder) return null

  return (
    <section className="bg-slate-950 py-20">
      <div className="mx-auto max-w-5xl px-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-sky-400">
          Quién está detrás
        </p>
        <h2 className="mt-3 font-serif text-3xl font-medium text-slate-50 sm:text-4xl">
          La persona que va a transformar tu negocio
        </h2>

        <div className="mt-10 grid gap-8 md:grid-cols-[auto_1fr] md:items-start">
          <div className="flex flex-col items-center gap-4 md:items-start">
            {founder.photo_url ? (
              <img
                src={founder.photo_url}
                alt={founder.name}
                className="h-32 w-32 rounded-xl object-cover"
              />
            ) : (
              <div className="flex h-32 w-32 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-slate-900 text-3xl font-bold text-white">
                {initials(founder.name)}
              </div>
            )}
            <div className="flex gap-6">
              <div>
                <p className="text-2xl font-bold text-sky-400">{founder.years_automation}+</p>
                <p className="text-xs text-slate-500">años en automatización</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-sky-400">{founder.years_dev}+</p>
                <p className="text-xs text-slate-500">años en desarrollo</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {founder.role}
            </p>
            <h3 className="mt-1 text-2xl font-bold text-slate-100">{founder.name}</h3>
            <p className="mt-1 italic text-sky-400">"{founder.quote}"</p>
            <p className="mt-4 leading-relaxed text-slate-400">{founder.bio}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
