import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useCategories({ includeInactive = false } = {}) {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const reload = useCallback(async () => {
    setIsLoading(true)
    let query = supabase
      .from('SP_categories')
      .select('id, name, icon, order, SP_services(id, title, description, features, order, active)')
      .order('order', { ascending: true })
      .order('order', { ascending: true, referencedTable: 'SP_services' })

    if (!includeInactive) {
      query = query.eq('SP_services.active', true)
    }

    const { data, error: queryError } = await query
    setCategories(data ?? [])
    setError(queryError)
    setIsLoading(false)
  }, [includeInactive])

  useEffect(() => {
    reload()
  }, [reload])

  return { categories, isLoading, error, reload }
}
