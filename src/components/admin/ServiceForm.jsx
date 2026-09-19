import { useState } from 'react'
import { Modal } from '../ui/Modal'
import { Input, Textarea } from '../ui/Input'
import { Button } from '../ui/Button'
import { FeatureListEditor } from './FeatureListEditor'

export function ServiceForm({ initialService, onSave, onClose }) {
  const [title, setTitle] = useState(initialService?.title ?? '')
  const [description, setDescription] = useState(initialService?.description ?? '')
  const [features, setFeatures] = useState(initialService?.features ?? [])
  const [priceMin, setPriceMin] = useState(initialService?.price_min ?? '')
  const [priceMax, setPriceMax] = useState(initialService?.price_max ?? '')
  const [negotiable, setNegotiable] = useState(initialService?.negotiable ?? false)
  const [active, setActive] = useState(initialService?.active ?? true)
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSaving(true)
    await onSave({
      title,
      description: description || null,
      features,
      price_min: priceMin === '' ? null : Number(priceMin),
      price_max: priceMax === '' ? null : Number(priceMax),
      negotiable,
      active,
    })
    setIsSaving(false)
  }

  return (
    <Modal title={initialService ? 'Editar servicio' : 'Nuevo servicio'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="title" label="Título" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <Textarea
          name="description"
          label="Descripción (opcional)"
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FeatureListEditor features={features} onChange={setFeatures} />
        <div className="grid grid-cols-2 gap-3">
          <Input
            name="price_min"
            label="Precio desde (S/)"
            type="number"
            min="0"
            step="0.01"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
          />
          <Input
            name="price_max"
            label="Precio hasta (S/, opcional)"
            type="number"
            min="0"
            step="0.01"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={negotiable} onChange={(e) => setNegotiable(e.target.checked)} className="h-4 w-4" />
          Precio negociable
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} className="h-4 w-4" />
          Visible en el sitio público
        </label>
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? 'Guardando…' : 'Guardar'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
