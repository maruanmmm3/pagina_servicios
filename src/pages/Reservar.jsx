import { BookingForm } from '../components/booking/BookingForm'

export function Reservar() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <p className="text-xs font-semibold uppercase tracking-widest text-sky-400">Agenda tu cita</p>
      <h1 className="mt-2 font-serif text-3xl font-medium text-slate-50 sm:text-4xl">
        Reserva tu consulta gratuita
      </h1>
      <p className="mt-3 text-slate-400">
        Elige un horario disponible y cuéntanos qué necesitas. No hace falta crear una cuenta.
      </p>
      <div className="mt-10">
        <BookingForm />
      </div>
    </div>
  )
}
