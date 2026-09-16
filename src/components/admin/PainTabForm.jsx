import { useState } from 'react'
import { Modal } from '../ui/Modal'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { ObjectListEditor } from './ObjectListEditor'
import { ICON_OPTIONS } from '../home/icons'

const cardFields = [
  { key: 'title', label: 'Título de la tarjeta' },
  { key: 'description', label: 'Descripción', type: 'textarea' },
]

const barFields = [
  { key: 'label', label: 'Etiqueta (ej. Atención al cliente)' },
  { key: 'display_value', label: 'Valor a mostrar (ej. ~8h o 85%)' },
]

export function PainTabForm({ initialTab, onSave, onClose }) {
  const [label, setLabel] = useState(initialTab?.label ?? '')
  const [icon, setIcon] = useState(initialTab?.icon ?? ICON_OPTIONS[0])
  const [statLabel, setStatLabel] = useState(initialTab?.stat_label ?? '')
  const [statValueDisplay, setStatValueDisplay] = useState(initialTab?.stat_value_display ?? '')
  const [statPercent, setStatPercent] = useState(initialTab?.stat_percent ?? 50)
  const [cards, setCards] = useState(initialTab?.cards ?? [])
  const [bars, setBars] = useState(initialTab?.bars ?? [])
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSaving(true)
    await onSave({
      key: initialTab?.key ?? label.toLowerCase().replace(/\s+/g, '-'),
      label,
      icon,
      stat_label: statLabel,
      stat_value_display: statValueDisplay,
      stat_percent: Number(statPercent) || 0,
      cards,
      bars,
    })
    setIsSaving(false)
  }

  return (
    <Modal title={initialTab ? 'Editar pestaña' : 'Nueva pestaña'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Nombre de la pestaña (ej. Tiempo)" value={label} onChange={(e) => setLabel(e.target.value)} required />

        <label className="flex flex-col gap-1 text-sm text-slate-700">
          <span className="font-medium">Ícono</span>
          <select value={icon} onChange={(e) => setIcon(e.target.value)} className="rounded-md border border-slate-300 px-3 py-2">
            {ICON_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <Input label="Etiqueta de la estadística grande" value={statLabel} onChange={(e) => setStatLabel(e.target.value)} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Valor a mostrar (ej. 40% del día)" value={statValueDisplay} onChange={(e) => setStatValueDisplay(e.target.value)} />
          <Input type="number" min="0" max="100" label="Relleno del círculo (0-100)" value={statPercent} onChange={(e) => setStatPercent(e.target.value)} />
        </div>

        <ObjectListEditor label="Tarjetas de esta pestaña" items={cards} fields={cardFields} onChange={setCards} />
        <ObjectListEditor label="Barras de detalle" items={bars} fields={barFields} onChange={setBars} />

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit" disabled={isSaving}>{isSaving ? 'Guardando…' : 'Guardar'}</Button>
        </div>
      </form>
    </Modal>
  )
}
