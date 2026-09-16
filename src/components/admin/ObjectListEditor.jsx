const emptyItem = (fields) => Object.fromEntries(fields.map((field) => [field.key, field.default ?? '']))

export function ObjectListEditor({ label, items, fields, onChange }) {
  const updateItem = (index, key, value) => {
    const next = items.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    onChange(next)
  }

  const addItem = () => onChange([...items, emptyItem(fields)])
  const removeItem = (index) => onChange(items.filter((_, i) => i !== index))

  const moveItem = (index, direction) => {
    const target = index + direction
    if (target < 0 || target >= items.length) return
    const next = [...items]
    ;[next[index], next[target]] = [next[target], next[index]]
    onChange(next)
  }

  return (
    <div>
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div className="mt-2 space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-2 rounded-md border border-slate-200 p-3">
            <div className="flex-1 space-y-2">
              {fields.map((field) => (
                <div key={field.key}>
                  {field.type === 'textarea' ? (
                    <textarea
                      value={item[field.key] ?? ''}
                      onChange={(e) => updateItem(index, field.key, e.target.value)}
                      placeholder={field.label}
                      rows={2}
                      className="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    />
                  ) : field.type === 'select' ? (
                    <select
                      value={item[field.key] ?? field.options[0].value}
                      onChange={(e) => updateItem(index, field.key, e.target.value)}
                      className="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm"
                    >
                      {field.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={item[field.key] ?? ''}
                      onChange={(e) => updateItem(index, field.key, e.target.value)}
                      placeholder={field.label}
                      className="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-1">
              <button type="button" onClick={() => moveItem(index, -1)} disabled={index === 0} className="text-slate-400 hover:text-slate-600 disabled:opacity-30">↑</button>
              <button type="button" onClick={() => moveItem(index, 1)} disabled={index === items.length - 1} className="text-slate-400 hover:text-slate-600 disabled:opacity-30">↓</button>
              <button type="button" onClick={() => removeItem(index)} className="text-red-500 hover:text-red-600">✕</button>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addItem}
        className="mt-2 rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200"
      >
        + Agregar
      </button>
    </div>
  )
}
