import { Link } from 'react-router-dom'
import { useCategories } from '../../hooks/useServices'
import { formatPriceRange } from '../../lib/formatPrice'

export function PricingSection() {
  const { categories } = useCategories()

  const services = categories.flatMap((category) =>
    (category.SP_services ?? [])
      .filter((service) => service.price_min != null)
      .map((service) => ({ ...service, categoryName: category.name, categoryIcon: category.icon })),
  )

  if (services.length === 0) return null

  return (
    <section className="bg-slate-950 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">Precios</p>
        <h2 className="mt-3 font-serif text-3xl font-medium text-slate-50 sm:text-4xl">
          Precios según el mercado peruano
        </h2>
        <p className="mt-4 max-w-2xl text-slate-400">
          Rangos referenciales en soles. El precio final depende del alcance de tu proyecto y{' '}
          <span className="font-medium text-emerald-400">es negociable</span>: cuéntanos qué necesitas y
          lo ajustamos a tu presupuesto.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.id} className="flex flex-col rounded-xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-xs text-slate-500">
                {service.categoryIcon} {service.categoryName}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-slate-100">{service.title}</h3>
              <p className="mt-4 text-2xl font-semibold text-slate-50">
                {formatPriceRange(service.price_min, service.price_max)}
              </p>
              {service.negotiable && (
                <span className="mt-2 inline-flex w-fit rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/30">
                  Negociable
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            to="/reservar"
            className="inline-flex rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-500"
          >
            Solicitar cotización
          </Link>
        </div>
      </div>
    </section>
  )
}
