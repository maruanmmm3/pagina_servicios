import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useBusinessHours() {
  const [hours, setHours] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const reload = useCallback(async () => {
    setIsLoading(true)
    const { data } = await supabase
      .from('SP_business_hours')
      .select('*')
      .order('day_of_week', { ascending: true })
    setHours(data ?? [])
    setIsLoading(false)
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  const updateDay = async (id, changes) => {
    const { error } = await supabase.from('SP_business_hours').update(changes).eq('id', id)
    if (!error) await reload()
    return { error }
  }

  return { hours, isLoading, reload, updateDay }
}

export function useBlockedDates() {
  const [dates, setDates] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const reload = useCallback(async () => {
    setIsLoading(true)
    const { data } = await supabase
      .from('SP_blocked_dates')
      .select('*')
      .order('date', { ascending: true })
    setDates(data ?? [])
    setIsLoading(false)
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  const addBlockedDate = async (date, reason) => {
    const { error } = await supabase.from('SP_blocked_dates').insert({ date, reason: reason || null })
    if (!error) await reload()
    return { error }
  }

  const removeBlockedDate = async (id) => {
    const { error } = await supabase.from('SP_blocked_dates').delete().eq('id', id)
    if (!error) await reload()
    return { error }
  }

  return { dates, isLoading, reload, addBlockedDate, removeBlockedDate }
}
