import { ServiceCard } from './ServiceCard'

export function CategorySection({ category }) {
  if (!category.SP_services || category.SP_services.length === 0) return null

  return (
    <section className="py-10">
      <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-100">
        <span>{category.icon}</span>
        <span>{category.name}</span>
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {category.SP_services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  )
}
