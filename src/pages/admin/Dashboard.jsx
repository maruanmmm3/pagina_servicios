import { Link } from 'react-router-dom'
import { useAdminBookings } from '../../hooks/useBookings'
import { Badge } from '../../components/ui/Badge'

const todayIso = () => new Date().toISOString().slice(0, 10)

export function Dashboard() {
  const { bookings, isLoading } = useAdminBookings()

  const upcoming = bookings
    .filter((booking) => booking.booking_date >= todayIso() && booking.status !== 'cancelled')
    .slice(0, 8)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>

      <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Próximas citas</h2>
          <Link to="/admin/citas" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            Ver todas
          </Link>
        </div>

        {isLoading && <p className="text-slate-500">Cargando…</p>}
        {!isLoading && upcoming.length === 0 && (
          <p className="text-slate-500">No hay citas próximas.</p>
        )}

        <ul className="divide-y divide-slate-100">
          {upcoming.map((booking) => (
            <li key={booking.id} className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-slate-900">{booking.client_name}</p>
                <p className="text-sm text-slate-500">
                  {booking.booking_date} · {booking.booking_time.slice(0, 5)}
                  {booking.SP_services?.title ? ` · ${booking.SP_services.title}` : ''}
                </p>
              </div>
              <Badge status={booking.status} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
