import { useState } from 'react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

export function BlockedDatesEditor({ dates, onAdd, onRemove }) {
  const [date, setDate] = useState('')
  const [reason, setReason] = useState('')

  const handleAdd = async (event) => {
    event.preventDefault()
    if (!date) return
    await onAdd(date, reason)
    setDate('')
    setReason('')
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-lg font-semibold text-slate-900">Fechas bloqueadas</h2>
      <p className="mt-1 text-sm text-slate-500">
        Feriados o días sin atención. No aparecerán horarios disponibles en esas fechas.
      </p>

      <form onSubmit={handleAdd} className="mt-4 flex flex-wrap items-end gap-3">
        <Input type="date" name="blockedDate" label="Fecha" value={date} onChange={(e) => setDate(e.target.value)} />
        <Input
          name="reason"
          label="Motivo (opcional)"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <Button type="submit">Agregar</Button>
      </form>

      <ul className="mt-4 divide-y divide-slate-100">
        {dates.map((item) => (
          <li key={item.id} className="flex items-center justify-between py-2 text-sm">
            <span>
              {item.date} {item.reason && <span className="text-slate-500">— {item.reason}</span>}
            </span>
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="text-red-600 hover:text-red-500"
            >
              Quitar
            </button>
          </li>
        ))}
        {dates.length === 0 && <p className="py-2 text-sm text-slate-500">No hay fechas bloqueadas.</p>}
      </ul>
    </div>
  )
}
