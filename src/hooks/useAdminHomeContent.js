import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useAdminHomeContent() {
  const [content, setContent] = useState(null)
  const [founder, setFounder] = useState(null)
  const [painTabs, setPainTabs] = useState([])
  const [approaches, setApproaches] = useState([])
  const [comparisonItems, setComparisonItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const reload = useCallback(async () => {
    setIsLoading(true)
    const [contentRes, founderRes, tabsRes, approachesRes, comparisonRes] = await Promise.all([
      supabase.from('SP_home_content').select('*').limit(1).maybeSingle(),
      supabase.from('SP_founder').select('*').limit(1).maybeSingle(),
      supabase.from('SP_pain_tabs').select('*').order('order', { ascending: true }),
      supabase.from('SP_approaches').select('*').order('order', { ascending: true }),
      supabase.from('SP_comparison_items').select('*').order('order', { ascending: true }),
    ])
    setContent(contentRes.data)
    setFounder(founderRes.data)
    setPainTabs(tabsRes.data ?? [])
    setApproaches(approachesRes.data ?? [])
    setComparisonItems(comparisonRes.data ?? [])
    setIsLoading(false)
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  const updateContent = async (changes) => {
    const { error } = await supabase.from('SP_home_content').update(changes).eq('id', content.id)
    if (!error) await reload()
    return { error }
  }

  const updateFounder = async (changes) => {
    const { error } = await supabase.from('SP_founder').update(changes).eq('id', founder.id)
    if (!error) await reload()
    return { error }
  }

  const createPainTab = async (values) => {
    const { error } = await supabase
      .from('SP_pain_tabs')
      .insert({ ...values, order: painTabs.length + 1 })
    if (!error) await reload()
    return { error }
  }

  const updatePainTab = async (id, changes) => {
    const { error } = await supabase.from('SP_pain_tabs').update(changes).eq('id', id)
    if (!error) await reload()
    return { error }
  }

  const deletePainTab = async (id) => {
    const { error } = await supabase.from('SP_pain_tabs').delete().eq('id', id)
    if (!error) await reload()
    return { error }
  }

  const createApproach = async (values) => {
    const { error } = await supabase
      .from('SP_approaches')
      .insert({ ...values, order: approaches.length + 1 })
    if (!error) await reload()
    return { error }
  }

  const updateApproach = async (id, changes) => {
    const { error } = await supabase.from('SP_approaches').update(changes).eq('id', id)
    if (!error) await reload()
    return { error }
  }

  const deleteApproach = async (id) => {
    const { error } = await supabase.from('SP_approaches').delete().eq('id', id)
    if (!error) await reload()
    return { error }
  }

  const addComparisonItem = async (side, text) => {
    const order = comparisonItems.filter((item) => item.side === side).length + 1
    const { error } = await supabase.from('SP_comparison_items').insert({ side, text, order })
    if (!error) await reload()
    return { error }
  }

  const removeComparisonItem = async (id) => {
    const { error } = await supabase.from('SP_comparison_items').delete().eq('id', id)
    if (!error) await reload()
    return { error }
  }

  return {
    content,
    founder,
    painTabs,
    approaches,
    sinItems: comparisonItems.filter((item) => item.side === 'sin'),
    conItems: comparisonItems.filter((item) => item.side === 'con'),
    isLoading,
    updateContent,
    updateFounder,
    createPainTab,
    updatePainTab,
    deletePainTab,
    createApproach,
    updateApproach,
    deleteApproach,
    addComparisonItem,
    removeComparisonItem,
  }
}
