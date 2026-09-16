import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

export function BookingsTable({ bookings, onUpdateStatus }) {
  if (bookings.length === 0) {
    return <p className="text-slate-500">No hay citas que coincidan con el filtro.</p>
  }

  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
          <tr>
            <th className="px-4 py-3">Fecha</th>
            <th className="px-4 py-3">Hora</th>
            <th className="px-4 py-3">Cliente</th>
            <th className="px-4 py-3">Contacto</th>
            <th className="px-4 py-3">Servicio</th>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="px-4 py-3">{booking.booking_date}</td>
              <td className="px-4 py-3">{booking.booking_time.slice(0, 5)}</td>
              <td className="px-4 py-3 font-medium text-slate-900">{booking.client_name}</td>
              <td className="px-4 py-3 text-slate-500">
                <div>{booking.client_email}</div>
                <div>{booking.client_phone}</div>
              </td>
              <td className="px-4 py-3">{booking.SP_services?.title ?? '—'}</td>
              <td className="px-4 py-3">
                <Badge status={booking.status} />
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  {booking.status !== 'confirmed' && (
                    <Button variant="secondary" onClick={() => onUpdateStatus(booking.id, 'confirmed')}>
                      Confirmar
                    </Button>
                  )}
                  {booking.status !== 'cancelled' && (
                    <Button variant="danger" onClick={() => onUpdateStatus(booking.id, 'cancelled')}>
                      Cancelar
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
