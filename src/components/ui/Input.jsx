export function Input({ label, className = '', id, ...props }) {
  const inputId = id || props.name

  return (
    <label className="flex flex-col gap-1 text-sm text-slate-700" htmlFor={inputId}>
      {label && <span className="font-medium">{label}</span>}
      <input
        id={inputId}
        className={`rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 ${className}`}
        {...props}
      />
    </label>
  )
}

export function Textarea({ label, className = '', id, ...props }) {
  const inputId = id || props.name

  return (
    <label className="flex flex-col gap-1 text-sm text-slate-700" htmlFor={inputId}>
      {label && <span className="font-medium">{label}</span>}
      <textarea
        id={inputId}
        className={`rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 ${className}`}
        {...props}
      />
    </label>
  )
}
