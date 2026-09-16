import { useState } from 'react'
import { Modal } from '../ui/Modal'
import { Input, Textarea } from '../ui/Input'
import { Button } from '../ui/Button'
import { ObjectListEditor } from './ObjectListEditor'

const pointFields = [
  { key: 'text', label: 'Texto del punto' },
  {
    key: 'type',
    label: 'Tipo',
    type: 'select',
    default: 'good',
    options: [
      { value: 'good', label: '✓ Positivo' },
      { value: 'warning', label: '⚠ Advertencia' },
    ],
  },
]

export function ApproachForm({ initialApproach, onSave, onClose }) {
  const [badge, setBadge] = useState(initialApproach?.badge ?? '')
  const [badgeVariant, setBadgeVariant] = useState(initialApproach?.badge_variant ?? 'default')
  const [title, setTitle] = useState(initialApproach?.title ?? '')
  const [description, setDescription] = useState(initialApproach?.description ?? '')
  const [points, setPoints] = useState(initialApproach?.points ?? [])
  const [quote, setQuote] = useState(initialApproach?.quote ?? '')
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSaving(true)
    await onSave({
      badge,
      badge_variant: badgeVariant,
      title,
      description,
      points,
      quote: quote || null,
    })
    setIsSaving(false)
  }

  return (
    <Modal title={initialApproach ? 'Editar forma de trabajo' : 'Nueva forma de trabajo'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Texto de la insignia (ej. DIAGNÓSTICO + SOLUCIÓN)" value={badge} onChange={(e) => setBadge(e.target.value)} />
        <label className="flex flex-col gap-1 text-sm text-slate-700">
          <span className="font-medium">Tipo</span>
          <select value={badgeVariant} onChange={(e) => setBadgeVariant(e.target.value)} className="rounded-md border border-slate-300 px-3 py-2">
            <option value="default">Normal</option>
            <option value="recommended">Recomendado (resaltado)</option>
          </select>
        </label>
        <Input label="Título" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <Textarea label="Descripción" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
        <ObjectListEditor label="Puntos" items={points} fields={pointFields} onChange={setPoints} />
        <Textarea label="Cita destacada al final (opcional)" rows={2} value={quote} onChange={(e) => setQuote(e.target.value)} />

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit" disabled={isSaving}>{isSaving ? 'Guardando…' : 'Guardar'}</Button>
        </div>
      </form>
    </Modal>
  )
}
