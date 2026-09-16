import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useAdminServices() {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const reload = useCallback(async () => {
    setIsLoading(true)
    const { data, error: queryError } = await supabase
      .from('SP_categories')
      .select('id, name, icon, order, SP_services(id, title, description, features, order, active, category_id)')
      .order('order', { ascending: true })
      .order('order', { ascending: true, referencedTable: 'SP_services' })

    setCategories(data ?? [])
    setError(queryError)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  const createCategory = async ({ name, icon, order }) => {
    const { error: insertError } = await supabase.from('SP_categories').insert({ name, icon, order })
    if (!insertError) await reload()
    return { error: insertError }
  }

  const updateCategory = async (id, changes) => {
    const { error: updateError } = await supabase.from('SP_categories').update(changes).eq('id', id)
    if (!updateError) await reload()
    return { error: updateError }
  }

  const deleteCategory = async (id) => {
    const { error: deleteError } = await supabase.from('SP_categories').delete().eq('id', id)
    if (!deleteError) await reload()
    return { error: deleteError }
  }

  const createService = async ({ categoryId, title, description, features, order }) => {
    const { error: insertError } = await supabase
      .from('SP_services')
      .insert({ category_id: categoryId, title, description, features, order })
    if (!insertError) await reload()
    return { error: insertError }
  }

  const updateService = async (id, changes) => {
    const { error: updateError } = await supabase.from('SP_services').update(changes).eq('id', id)
    if (!updateError) await reload()
    return { error: updateError }
  }

  const deleteService = async (id) => {
    const { error: deleteError } = await supabase.from('SP_services').delete().eq('id', id)
    if (!deleteError) await reload()
    return { error: deleteError }
  }

  return {
    categories,
    isLoading,
    error,
    reload,
    createCategory,
    updateCategory,
    deleteCategory,
    createService,
    updateService,
    deleteService,
  }
}
