import { useState } from 'react'
import { Input, Textarea } from '../ui/Input'
import { Button } from '../ui/Button'
import { FeatureListEditor } from './FeatureListEditor'

export function HeroForm({ content, onSave }) {
  const [values, setValues] = useState({
    hero_badge: content.hero_badge,
    hero_title: content.hero_title,
    hero_highlight: content.hero_highlight,
    hero_subtitle: content.hero_subtitle,
    hero_tags: content.hero_tags ?? [],
    cta_title: content.cta_title,
    cta_subtitle: content.cta_subtitle,
    cta_button_text: content.cta_button_text,
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const set = (key) => (event) => setValues((prev) => ({ ...prev, [key]: event.target.value }))

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSaving(true)
    setSaved(false)
    await onSave(values)
    setIsSaving(false)
    setSaved(true)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-lg font-semibold text-slate-900">Hero (portada)</h2>
      <Input label="Texto de la insignia" value={values.hero_badge} onChange={set('hero_badge')} />
      <Textarea label="Título (parte normal)" rows={2} value={values.hero_title} onChange={set('hero_title')} />
      <Input label="Título (parte destacada, en celeste)" value={values.hero_highlight} onChange={set('hero_highlight')} />
      <Textarea label="Subtítulo" rows={2} value={values.hero_subtitle} onChange={set('hero_subtitle')} />
      <FeatureListEditor
        label="Etiquetas destacadas (bullets bajo el subtítulo)"
        features={values.hero_tags}
        onChange={(hero_tags) => setValues((prev) => ({ ...prev, hero_tags }))}
      />

      <hr className="border-slate-200" />
      <h3 className="font-semibold text-slate-900">Llamado a la acción final</h3>
      <Input label="Título" value={values.cta_title} onChange={set('cta_title')} />
      <Textarea label="Subtítulo" rows={2} value={values.cta_subtitle} onChange={set('cta_subtitle')} />
      <Input label="Texto del botón" value={values.cta_button_text} onChange={set('cta_button_text')} />

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Guardando…' : 'Guardar'}
        </Button>
        {saved && <span className="text-sm text-emerald-600">Guardado ✓</span>}
      </div>
    </form>
  )
}
