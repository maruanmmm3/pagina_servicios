import { useMemo, useState } from 'react'
import { useAdminBookings } from '../../hooks/useBookings'
import { BookingsTable } from '../../components/admin/BookingsTable'

const statusFilters = [
  { value: 'all', label: 'Todas' },
  { value: 'pending', label: 'Pendientes' },
  { value: 'confirmed', label: 'Confirmadas' },
  { value: 'cancelled', label: 'Canceladas' },
]

export function AdminCitas() {
  const { bookings, isLoading, updateStatus } = useAdminBookings()
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('')

  const filtered = useMemo(() => {
    return bookings.filter((booking) => {
      if (statusFilter !== 'all' && booking.status !== statusFilter) return false
      if (dateFilter && booking.booking_date !== dateFilter) return false
      return true
    })
  }, [bookings, statusFilter, dateFilter])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Citas reservadas</h1>

      <div className="flex flex-wrap items-end gap-4">
        <div className="flex gap-2">
          {statusFilters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setStatusFilter(filter.value)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                statusFilter === filter.value
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-slate-600 ring-1 ring-slate-300 hover:bg-slate-50'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <label className="flex flex-col gap-1 text-sm text-slate-700">
          <span className="font-medium">Filtrar por fecha</span>
          <input
            type="date"
            value={dateFilter}
            onChange={(event) => setDateFilter(event.target.value)}
            className="rounded-md border border-slate-300 px-3 py-1.5"
          />
        </label>
        {dateFilter && (
          <button
            type="button"
            onClick={() => setDateFilter('')}
            className="text-sm text-slate-500 hover:text-slate-700"
          >
            Limpiar fecha
          </button>
        )}
      </div>

      {isLoading ? (
        <p className="text-slate-500">Cargando…</p>
      ) : (
        <BookingsTable bookings={filtered} onUpdateStatus={updateStatus} />
      )}
    </div>
  )
}
