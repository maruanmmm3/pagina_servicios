import { useState } from 'react'

export function FeatureListEditor({ features, onChange, label = 'Características' }) {
  const [draft, setDraft] = useState('')

  const addFeature = () => {
    const value = draft.trim()
    if (!value) return
    onChange([...features, value])
    setDraft('')
  }

  const removeFeature = (index) => {
    onChange(features.filter((_, i) => i !== index))
  }

  const moveFeature = (index, direction) => {
    const target = index + direction
    if (target < 0 || target >= features.length) return
    const next = [...features]
    ;[next[index], next[target]] = [next[target], next[index]]
    onChange(next)
  }

  return (
    <div>
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <ul className="mt-2 space-y-2">
        {features.map((feature, index) => (
          <li key={`${feature}-${index}`} className="flex items-center gap-2">
            <span className="flex-1 rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-900">
              {feature}
            </span>
            <button
              type="button"
              onClick={() => moveFeature(index, -1)}
              disabled={index === 0}
              className="text-slate-400 hover:text-slate-600 disabled:opacity-30"
              aria-label="Subir"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={() => moveFeature(index, 1)}
              disabled={index === features.length - 1}
              className="text-slate-400 hover:text-slate-600 disabled:opacity-30"
              aria-label="Bajar"
            >
              ↓
            </button>
            <button
              type="button"
              onClick={() => removeFeature(index)}
              className="text-red-500 hover:text-red-600"
              aria-label="Quitar"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-2 flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              addFeature()
            }
          }}
          placeholder="Nueva característica"
          className="flex-1 rounded-md border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
        <button
          type="button"
          onClick={addFeature}
          className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200"
        >
          Agregar
        </button>
      </div>
    </div>
  )
}
