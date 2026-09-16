import { useState } from 'react'
import { useCategories } from '../../hooks/useServices'
import { useAvailableSlots } from '../../hooks/useAvailableSlots'
import { useBusinessHours, useBlockedDates } from '../../hooks/useSchedule'
import { createBooking } from '../../hooks/useBookings'
import { TimeSlotPicker } from './TimeSlotPicker'
import { Calendar } from './Calendar'

const fieldClass =
  'rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none placeholder:text-slate-600 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30'

export function BookingForm() {
  const { categories } = useCategories()
  const [serviceId, setServiceId] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const { slots, isLoading: slotsLoading } = useAvailableSlots(date)
  const { hours } = useBusinessHours()
  const { dates: blockedDates } = useBlockedDates()

  const inactiveWeekdays = hours.filter((day) => !day.is_active).map((day) => day.day_of_week)

  const handleSelectDate = (isoDate) => {
    setDate(isoDate)
    setTime('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    const { error } = await createBooking({
      serviceId: serviceId || null,
      clientName,
      clientEmail,
      clientPhone,
      bookingDate: date,
      bookingTime: time,
      notes,
    })

    if (error) {
      setStatus('error')
      setErrorMessage(
        error.code === '23505'
          ? 'Ese horario ya fue reservado por alguien más. Elige otro.'
          : 'No pudimos registrar tu reserva. Intenta nuevamente.',
      )
      return
    }

    setStatus('success')
  }

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-sky-400/30 bg-sky-400/10 p-6 text-sky-200">
        <h2 className="text-lg font-semibold text-sky-100">¡Reserva confirmada!</h2>
        <p className="mt-1 text-sm">
          Te contactaremos a {clientEmail} para confirmar los detalles de tu cita el {date} a las{' '}
          {time}.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <label className="flex flex-col gap-1 text-sm text-slate-300">
        <span className="font-medium">Servicio de interés (opcional)</span>
        <select
          value={serviceId}
          onChange={(event) => setServiceId(event.target.value)}
          className={fieldClass}
        >
          <option value="">Aún no lo sé / quiero asesoría</option>
          {categories.map((category) => (
            <optgroup key={category.id} label={`${category.icon} ${category.name}`}>
              {category.SP_services?.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.title}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </label>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2 text-sm text-slate-300">
          <span className="font-medium">Elige una fecha</span>
          <div className="rounded-lg border border-slate-700 bg-slate-900 p-3">
            <Calendar
              selectedDate={date}
              onSelectDate={handleSelectDate}
              inactiveWeekdays={inactiveWeekdays}
              blockedDates={blockedDates.map((item) => item.date)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 text-sm text-slate-300">
          <span className="font-medium">Elige un horario</span>
          {date ? (
            <TimeSlotPicker slots={slots} isLoading={slotsLoading} selected={time} onSelect={setTime} />
          ) : (
            <p className="text-sm text-slate-500">Elige primero una fecha en el calendario.</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          <span className="font-medium">Nombre completo</span>
          <input
            value={clientName}
            onChange={(event) => setClientName(event.target.value)}
            required
            className={fieldClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          <span className="font-medium">Teléfono</span>
          <input
            type="tel"
            value={clientPhone}
            onChange={(event) => setClientPhone(event.target.value)}
            required
            className={fieldClass}
          />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm text-slate-300">
        <span className="font-medium">Email</span>
        <input
          type="email"
          value={clientEmail}
          onChange={(event) => setClientEmail(event.target.value)}
          required
          className={fieldClass}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-slate-300">
        <span className="font-medium">Cuéntanos brevemente qué necesitas (opcional)</span>
        <textarea
          rows={3}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          className={fieldClass}
        />
      </label>

      {status === 'error' && <p className="text-sm text-rose-400">{errorMessage}</p>}

      <button
        type="submit"
        disabled={!date || !time || status === 'submitting'}
        className="rounded-md bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === 'submitting' ? 'Reservando…' : 'Confirmar reserva'}
      </button>
    </form>
  )
}
