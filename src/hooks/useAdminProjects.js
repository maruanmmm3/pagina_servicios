import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useAdminProjects() {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const reload = useCallback(async () => {
    setIsLoading(true)
    const { data } = await supabase.from('SP_projects').select('*').order('order', { ascending: true })
    setProjects(data ?? [])
    setIsLoading(false)
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  const createProject = async (values) => {
    const { error } = await supabase.from('SP_projects').insert({ ...values, order: projects.length + 1 })
    if (!error) await reload()
    return { error }
  }

  const updateProject = async (id, changes) => {
    const { error } = await supabase.from('SP_projects').update(changes).eq('id', id)
    if (!error) await reload()
    return { error }
  }

  const deleteProject = async (id) => {
    const { error } = await supabase.from('SP_projects').delete().eq('id', id)
    if (!error) await reload()
    return { error }
  }

  const moveProject = async (id, direction) => {
    const index = projects.findIndex((project) => project.id === id)
    const targetIndex = index + direction
    if (index === -1 || targetIndex < 0 || targetIndex >= projects.length) return { error: null }

    const current = projects[index]
    const target = projects[targetIndex]

    await Promise.all([
      supabase.from('SP_projects').update({ order: target.order }).eq('id', current.id),
      supabase.from('SP_projects').update({ order: current.order }).eq('id', target.id),
    ])
    await reload()
    return { error: null }
  }

  return { projects, isLoading, createProject, updateProject, deleteProject, moveProject }
}
