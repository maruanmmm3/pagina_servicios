import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'
import { es } from 'react-day-picker/locale'

export function toIsoDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function fromIsoDate(iso) {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function Calendar({ selectedDate, onSelectDate, inactiveWeekdays = [], blockedDates = [] }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const disabled = [
    { before: today },
    ...(inactiveWeekdays.length ? [{ dayOfWeek: inactiveWeekdays }] : []),
    ...blockedDates.map(fromIsoDate),
  ]

  return (
    <DayPicker
      mode="single"
      locale={es}
      className="booking-calendar"
      selected={selectedDate ? fromIsoDate(selectedDate) : undefined}
      onSelect={(date) => date && onSelectDate(toIsoDate(date))}
      disabled={disabled}
      startMonth={today}
      showOutsideDays
    />
  )
}
