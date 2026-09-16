import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useAvailableSlots(date) {
  const [slots, setSlots] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!date) {
      setSlots([])
      return
    }

    let cancelled = false
    setIsLoading(true)
    setError(null)

    supabase
      .rpc('sp_get_available_slots', { p_date: date })
      .then(({ data, error: rpcError }) => {
        if (cancelled) return
        setSlots((data ?? []).map((row) => row.slot_time.slice(0, 5)))
        setError(rpcError)
        setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [date])

  return { slots, isLoading, error }
}
