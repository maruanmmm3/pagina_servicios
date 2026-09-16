const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

export function ScheduleEditor({ hours, onUpdateDay }) {
  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
          <tr>
            <th className="px-4 py-3">Día</th>
            <th className="px-4 py-3">Activo</th>
            <th className="px-4 py-3">Desde</th>
            <th className="px-4 py-3">Hasta</th>
            <th className="px-4 py-3">Duración cita (min)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {hours.map((day) => (
            <tr key={day.id}>
              <td className="px-4 py-3 font-medium text-slate-900">{dayNames[day.day_of_week]}</td>
              <td className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={day.is_active}
                  onChange={(event) => onUpdateDay(day.id, { is_active: event.target.checked })}
                  className="h-4 w-4"
                />
              </td>
              <td className="px-4 py-3">
                <input
                  type="time"
                  value={day.start_time.slice(0, 5)}
                  onChange={(event) => onUpdateDay(day.id, { start_time: event.target.value })}
                  className="rounded-md border border-slate-300 px-2 py-1"
                />
              </td>
              <td className="px-4 py-3">
                <input
                  type="time"
                  value={day.end_time.slice(0, 5)}
                  onChange={(event) => onUpdateDay(day.id, { end_time: event.target.value })}
                  className="rounded-md border border-slate-300 px-2 py-1"
                />
              </td>
              <td className="px-4 py-3">
                <input
                  type="number"
                  min="5"
                  step="5"
                  value={day.slot_duration_minutes}
                  onChange={(event) =>
                    onUpdateDay(day.id, { slot_duration_minutes: Number(event.target.value) })
                  }
                  className="w-20 rounded-md border border-slate-300 px-2 py-1"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
