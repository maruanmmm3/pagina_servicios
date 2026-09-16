import { useState } from 'react'
import { Modal } from '../ui/Modal'
import { Input, Textarea } from '../ui/Input'
import { Button } from '../ui/Button'
import { FeatureListEditor } from './FeatureListEditor'

export function ServiceForm({ initialService, onSave, onClose }) {
  const [title, setTitle] = useState(initialService?.title ?? '')
  const [description, setDescription] = useState(initialService?.description ?? '')
  const [features, setFeatures] = useState(initialService?.features ?? [])
  const [active, setActive] = useState(initialService?.active ?? true)
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSaving(true)
    await onSave({ title, description: description || null, features, active })
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
