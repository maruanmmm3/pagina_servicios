import { useCategories } from '../hooks/useServices'
import { CategorySection } from '../components/services/CategorySection'

export function Servicios() {
  const { categories, isLoading, error } = useCategories()

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <p className="text-xs font-semibold uppercase tracking-widest text-sky-400">Catálogo</p>
      <h1 className="mt-2 font-serif text-3xl font-medium text-slate-50 sm:text-4xl">
        Nuestros servicios
      </h1>
      <p className="mt-3 max-w-xl text-slate-400">
        Todo lo que podemos hacer por tu negocio, organizado por categoría.
      </p>

      {isLoading && <p className="mt-8 text-slate-500">Cargando servicios…</p>}
      {error && <p className="mt-8 text-rose-400">No se pudieron cargar los servicios.</p>}
      {!isLoading && !error && categories.length === 0 && (
        <p className="mt-8 text-slate-500">Todavía no hay servicios publicados.</p>
      )}

      {categories.map((category) => (
        <CategorySection key={category.id} category={category} />
      ))}
    </div>
  )
}
