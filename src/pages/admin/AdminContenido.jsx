import { useState } from 'react'
import { useAdminHomeContent } from '../../hooks/useAdminHomeContent'
import { HeroForm } from '../../components/admin/HeroForm'
import { FounderForm } from '../../components/admin/FounderForm'
import { PainTabForm } from '../../components/admin/PainTabForm'
import { ApproachForm } from '../../components/admin/ApproachForm'
import { ComparisonItemsEditor } from '../../components/admin/ComparisonItemsEditor'
import { Button } from '../../components/ui/Button'
import { DynamicIcon } from '../../components/home/icons'

export function AdminContenido() {
  const {
    content,
    founder,
    painTabs,
    approaches,
    sinItems,
    conItems,
    isLoading,
    updateContent,
    updateFounder,
    createPainTab,
    updatePainTab,
    deletePainTab,
    createApproach,
    updateApproach,
    deleteApproach,
    addComparisonItem,
    removeComparisonItem,
  } = useAdminHomeContent()

  const [tabModal, setTabModal] = useState(null)
  const [approachModal, setApproachModal] = useState(null)

  if (isLoading) return <p className="text-slate-500">Cargando…</p>

  const handleSaveTab = async (values) => {
    if (tabModal.tab) await updatePainTab(tabModal.tab.id, values)
    else await createPainTab(values)
    setTabModal(null)
  }

  const handleSaveApproach = async (values) => {
    if (approachModal.approach) await updateApproach(approachModal.approach.id, values)
    else await createApproach(values)
    setApproachModal(null)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Contenido de la página de inicio</h1>
        <p className="mt-1 text-slate-600">
          Edita los textos, estadísticas y secciones que se muestran en el sitio público.
        </p>
      </div>

      {content && <HeroForm content={content} onSave={updateContent} />}
      {founder && <FounderForm founder={founder} onSave={updateFounder} />}

      <section className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Pestañas de "Lo que te está costando"</h2>
          <Button onClick={() => setTabModal({ tab: null })}>+ Nueva pestaña</Button>
        </div>
        <ul className="mt-4 divide-y divide-slate-100">
          {painTabs.map((tab) => (
            <li key={tab.id} className="flex items-center justify-between gap-4 py-3">
              <div className="flex items-center gap-3">
                <DynamicIcon name={tab.icon} size={18} className="text-slate-500" />
                <div>
                  <p className="font-medium text-slate-900">{tab.label}</p>
                  <p className="text-sm text-slate-500">
                    {tab.stat_label} · {tab.stat_value_display} · {tab.cards?.length ?? 0} tarjetas ·{' '}
                    {tab.bars?.length ?? 0} barras
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button variant="secondary" onClick={() => setTabModal({ tab })}>Editar</Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    if (confirm(`¿Eliminar la pestaña "${tab.label}"?`)) deletePainTab(tab.id)
                  }}
                >
                  Eliminar
                </Button>
              </div>
            </li>
          ))}
          {painTabs.length === 0 && <p className="py-2 text-sm text-slate-500">No hay pestañas todavía.</p>}
        </ul>
      </section>

      <section className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Formas de trabajo</h2>
          <Button onClick={() => setApproachModal({ approach: null })}>+ Nueva</Button>
        </div>
        <ul className="mt-4 divide-y divide-slate-100">
          {approaches.map((approach) => (
            <li key={approach.id} className="flex items-center justify-between gap-4 py-3">
              <div>
                <p className="font-medium text-slate-900">
                  {approach.title}
                  {approach.badge_variant === 'recommended' && (
                    <span className="ml-2 rounded-full bg-sky-100 px-2 py-0.5 text-xs text-sky-700">
                      Recomendado
                    </span>
                  )}
                </p>
                <p className="text-sm text-slate-500">{approach.points?.length ?? 0} puntos</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button variant="secondary" onClick={() => setApproachModal({ approach })}>Editar</Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    if (confirm(`¿Eliminar "${approach.title}"?`)) deleteApproach(approach.id)
                  }}
                >
                  Eliminar
                </Button>
              </div>
            </li>
          ))}
          {approaches.length === 0 && <p className="py-2 text-sm text-slate-500">No hay formas de trabajo todavía.</p>}
        </ul>
      </section>

      <ComparisonItemsEditor
        sinItems={sinItems}
        conItems={conItems}
        onAdd={addComparisonItem}
        onRemove={removeComparisonItem}
      />

      {tabModal && (
        <PainTabForm initialTab={tabModal.tab} onSave={handleSaveTab} onClose={() => setTabModal(null)} />
      )}
      {approachModal && (
        <ApproachForm
          initialApproach={approachModal.approach}
          onSave={handleSaveApproach}
          onClose={() => setApproachModal(null)}
        />
      )}
    </div>
  )
}
