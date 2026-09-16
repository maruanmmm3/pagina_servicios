import { useState } from 'react'
import { Button } from '../ui/Button'

function ColumnEditor({ title, items, onAdd, onRemove }) {
  const [draft, setDraft] = useState('')

  const handleAdd = async (event) => {
    event.preventDefault()
    if (!draft.trim()) return
    await onAdd(draft.trim())
    setDraft('')
  }

  return (
    <div>
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex items-start justify-between gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm">
            <span>{item.text}</span>
            <button type="button" onClick={() => onRemove(item.id)} className="shrink-0 text-red-500 hover:text-red-600">
              ✕
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAdd} className="mt-3 flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Nuevo punto"
          className="flex-1 rounded-md border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
        <Button type="submit" variant="secondary">Agregar</Button>
      </form>
    </div>
  )
}

export function ComparisonItemsEditor({ sinItems, conItems, onAdd, onRemove }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-lg font-semibold text-slate-900">Con sistema vs. sin sistema</h2>
      <div className="mt-4 grid gap-6 sm:grid-cols-2">
        <ColumnEditor title="Sin Amaru" items={sinItems} onAdd={(text) => onAdd('sin', text)} onRemove={onRemove} />
        <ColumnEditor title="Con Amaru" items={conItems} onAdd={(text) => onAdd('con', text)} onRemove={onRemove} />
      </div>
    </div>
  )
}
