import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useProjects() {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('SP_projects')
      .select('*')
      .eq('active', true)
      .order('order', { ascending: true })
      .then(({ data }) => {
        setProjects(data ?? [])
        setIsLoading(false)
      })
  }, [])

  return { projects, isLoading }
}
