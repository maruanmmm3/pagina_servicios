import { useBusinessHours, useBlockedDates } from '../../hooks/useSchedule'
import { ScheduleEditor } from '../../components/admin/ScheduleEditor'
import { BlockedDatesEditor } from '../../components/admin/BlockedDatesEditor'

export function AdminHorarios() {
  const { hours, isLoading, updateDay } = useBusinessHours()
  const { dates, addBlockedDate, removeBlockedDate } = useBlockedDates()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Horario de atención</h1>
        <p className="mt-1 text-slate-600">
          Define los días y horas en los que los clientes pueden reservar una cita.
        </p>
      </div>

      {isLoading ? (
        <p className="text-slate-500">Cargando…</p>
      ) : (
        <ScheduleEditor hours={hours} onUpdateDay={updateDay} />
      )}

      <BlockedDatesEditor dates={dates} onAdd={addBlockedDate} onRemove={removeBlockedDate} />
    </div>
  )
}
