import { useState } from 'react'
import { useAdminServices } from '../../hooks/useAdminServices'
import { Button } from '../../components/ui/Button'
import { CategoryForm } from '../../components/admin/CategoryForm'
import { formatPriceRange } from '../../lib/formatPrice'
import { ServiceForm } from '../../components/admin/ServiceForm'

export function AdminServicios() {
  const {
    categories,
    isLoading,
    createCategory,
    updateCategory,
    deleteCategory,
    createService,
    updateService,
    deleteService,
  } = useAdminServices()

  const [editingCategory, setEditingCategory] = useState(null)
  const [showNewCategory, setShowNewCategory] = useState(false)
  const [serviceModal, setServiceModal] = useState(null)

  const handleSaveCategory = async (values) => {
    if (editingCategory) {
      await updateCategory(editingCategory.id, values)
      setEditingCategory(null)
    } else {
      await createCategory({ ...values, order: categories.length + 1 })
      setShowNewCategory(false)
    }
  }

  const handleSaveService = async (values) => {
    if (serviceModal.service) {
      await updateService(serviceModal.service.id, values)
    } else {
      const count = serviceModal.category.SP_services?.length ?? 0
      const { price_min, price_max, ...rest } = values
      await createService({
        categoryId: serviceModal.category.id,
        ...rest,
        priceMin: price_min,
        priceMax: price_max,
        order: count + 1,
      })
    }
    setServiceModal(null)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Servicios</h1>
          <p className="mt-1 text-slate-600">Gestiona las categorías y servicios que se muestran en el sitio.</p>
        </div>
        <Button onClick={() => setShowNewCategory(true)}>Nueva categoría</Button>
      </div>

      {isLoading && <p className="text-slate-500">Cargando…</p>}

      <div className="space-y-6">
        {categories.map((category) => (
          <section key={category.id} className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </h2>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => setEditingCategory(category)}>
                  Editar
                </Button>
                <Button variant="secondary" onClick={() => setServiceModal({ category, service: null })}>
                  + Servicio
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    if (confirm(`¿Eliminar la categoría "${category.name}" y todos sus servicios?`)) {
                      deleteCategory(category.id)
                    }
                  }}
                >
                  Eliminar
                </Button>
              </div>
            </div>

            <ul className="mt-4 divide-y divide-slate-100">
              {category.SP_services?.map((service) => (
                <li key={service.id} className="flex items-start justify-between gap-4 py-3">
                  <div>
                    <p className="font-medium text-slate-900">
                      {service.title}
                      {!service.active && (
                        <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                          Oculto
                        </span>
                      )}
                    </p>
                    {service.description && <p className="text-sm text-slate-500">{service.description}</p>}
                    {(service.price_min != null || service.negotiable) && (
                      <p className="mt-1 text-sm font-medium text-emerald-700">
                        {formatPriceRange(service.price_min, service.price_max)}
                        {service.negotiable && ' · Negociable'}
                      </p>
                    )}
                    <ul className="mt-1 flex flex-wrap gap-1.5">
                      {service.features?.map((feature) => (
                        <li key={feature} className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs text-indigo-700">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button variant="secondary" onClick={() => setServiceModal({ category, service })}>
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        if (confirm(`¿Eliminar el servicio "${service.title}"?`)) {
                          deleteService(service.id)
                        }
                      }}
                    >
                      Eliminar
                    </Button>
                  </div>
                </li>
              ))}
              {(!category.SP_services || category.SP_services.length === 0) && (
                <p className="py-2 text-sm text-slate-500">Sin servicios todavía.</p>
              )}
            </ul>
          </section>
        ))}
      </div>

      {showNewCategory && <CategoryForm onSave={handleSaveCategory} onClose={() => setShowNewCategory(false)} />}
      {editingCategory && (
        <CategoryForm
          initialCategory={editingCategory}
          onSave={handleSaveCategory}
          onClose={() => setEditingCategory(null)}
        />
      )}
      {serviceModal && (
        <ServiceForm
          initialService={serviceModal.service}
          onSave={handleSaveService}
          onClose={() => setServiceModal(null)}
        />
      )}
    </div>
  )
}
