import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export async function createBooking({ serviceId, clientName, clientEmail, clientPhone, bookingDate, bookingTime, notes }) {
  return supabase.from('SP_bookings').insert({
    service_id: serviceId || null,
    client_name: clientName,
    client_email: clientEmail,
    client_phone: clientPhone,
    booking_date: bookingDate,
    booking_time: bookingTime,
    notes: notes || null,
  })
}

export function useAdminBookings() {
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const reload = useCallback(async () => {
    setIsLoading(true)
    const { data, error: queryError } = await supabase
      .from('SP_bookings')
      .select('id, client_name, client_email, client_phone, booking_date, booking_time, status, notes, SP_services(title)')
      .order('booking_date', { ascending: true })
      .order('booking_time', { ascending: true })

    setBookings(data ?? [])
    setError(queryError)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  const updateStatus = async (id, status) => {
    const { error: updateError } = await supabase.from('SP_bookings').update({ status }).eq('id', id)
    if (!updateError) await reload()
    return { error: updateError }
  }

  return { bookings, isLoading, error, reload, updateStatus }
}
