import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useHomeContent() {
  const [content, setContent] = useState(null)
  const [founder, setFounder] = useState(null)
  const [painTabs, setPainTabs] = useState([])
  const [approaches, setApproaches] = useState([])
  const [comparisonItems, setComparisonItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      const [contentRes, founderRes, tabsRes, approachesRes, comparisonRes] = await Promise.all([
        supabase.from('SP_home_content').select('*').limit(1).maybeSingle(),
        supabase.from('SP_founder').select('*').limit(1).maybeSingle(),
        supabase.from('SP_pain_tabs').select('*').order('order', { ascending: true }),
        supabase.from('SP_approaches').select('*').order('order', { ascending: true }),
        supabase.from('SP_comparison_items').select('*').order('order', { ascending: true }),
      ])

      if (cancelled) return
      setContent(contentRes.data)
      setFounder(founderRes.data)
      setPainTabs(tabsRes.data ?? [])
      setApproaches(approachesRes.data ?? [])
      setComparisonItems(comparisonRes.data ?? [])
      setIsLoading(false)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return {
    content,
    founder,
    painTabs,
    approaches,
    sinItems: comparisonItems.filter((item) => item.side === 'sin'),
    conItems: comparisonItems.filter((item) => item.side === 'con'),
    isLoading,
  }
}
