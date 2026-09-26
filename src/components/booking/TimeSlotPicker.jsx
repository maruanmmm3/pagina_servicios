export function TimeSlotPicker({ slots, isLoading, selected, onSelect }) {
  if (isLoading) return <p className="text-sm text-slate-500">Buscando horarios disponibles…</p>

  if (slots.length === 0) {
    return <p className="text-sm text-slate-500">No hay horarios disponibles ese día. Elige otra fecha.</p>
  }

  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
      {slots.map((slot) => (
        <button
          key={slot}
          type="button"
          onClick={() => onSelect(slot)}
          className={`rounded-md px-3 py-2 text-sm font-medium ring-1 transition-all ${
            selected === slot
              ? 'bg-gradient-to-br from-sky-400 to-sky-500 text-slate-950 ring-sky-300 shadow-md shadow-sky-500/40'
              : 'bg-slate-900 text-slate-300 ring-slate-700 hover:bg-sky-400/10 hover:text-sky-300 hover:ring-sky-400/50'
          }`}
        >
          {slot}
        </button>
      ))}
    </div>
  )
}
