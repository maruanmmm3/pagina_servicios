import { useState } from 'react'
import { Input, Textarea } from '../ui/Input'
import { Button } from '../ui/Button'
import { uploadImage } from '../../lib/uploadImage'

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 3)
    .join('')
    .toUpperCase()
}

export function FounderForm({ founder, onSave }) {
  const [values, setValues] = useState({
    name: founder.name,
    role: founder.role,
    quote: founder.quote,
    bio: founder.bio,
    years_automation: founder.years_automation,
    years_dev: founder.years_dev,
    photo_url: founder.photo_url ?? '',
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [photoStatus, setPhotoStatus] = useState('idle')
  const [photoError, setPhotoError] = useState('')

  const set = (key) => (event) => setValues((prev) => ({ ...prev, [key]: event.target.value }))

  const handlePhotoChange = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    setPhotoStatus('uploading')
    setPhotoError('')

    const { url, error } = await uploadImage(file, `founder/${founder.id}.webp`)

    if (error) {
      setPhotoStatus('error')
      setPhotoError('No se pudo subir la imagen. Intenta con otro archivo.')
      return
    }

    setValues((prev) => ({ ...prev, photo_url: url }))
    setPhotoStatus('idle')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSaving(true)
    setSaved(false)
    await onSave({
      ...values,
      years_automation: Number(values.years_automation) || 0,
      years_dev: Number(values.years_dev) || 0,
      photo_url: values.photo_url || null,
    })
    setIsSaving(false)
    setSaved(true)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-lg font-semibold text-slate-900">Quién está detrás (fundador)</h2>
      <Input label="Nombre" value={values.name} onChange={set('name')} />
      <Input label="Cargo" value={values.role} onChange={set('role')} />
      <Input label="Frase destacada" value={values.quote} onChange={set('quote')} />
      <Textarea label="Biografía" rows={4} value={values.bio} onChange={set('bio')} />
      <div className="grid grid-cols-2 gap-4">
        <Input type="number" min="0" label="Años en automatización" value={values.years_automation} onChange={set('years_automation')} />
        <Input type="number" min="0" label="Años en desarrollo" value={values.years_dev} onChange={set('years_dev')} />
      </div>

      <div className="flex flex-col gap-2 text-sm text-slate-700">
        <span className="font-medium">Foto</span>
        <div className="flex items-center gap-4">
          {values.photo_url ? (
            <img src={values.photo_url} alt="" className="h-16 w-16 rounded-lg object-cover ring-1 ring-slate-200" />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-500">
              {initials(values.name || '?')}
            </div>
          )}
          <div>
            <label className="inline-flex cursor-pointer items-center rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200">
              {photoStatus === 'uploading' ? 'Subiendo…' : 'Subir foto'}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                disabled={photoStatus === 'uploading'}
                className="hidden"
              />
            </label>
            {values.photo_url && (
              <button
                type="button"
                onClick={() => setValues((prev) => ({ ...prev, photo_url: '' }))}
                className="ml-3 text-sm text-red-500 hover:text-red-600"
              >
                Quitar
              </button>
            )}
            <p className="mt-1 text-xs text-slate-500">Se comprime y redimensiona automáticamente al subirla.</p>
            {photoError && <p className="mt-1 text-xs text-red-600">{photoError}</p>}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Guardando…' : 'Guardar'}
        </Button>
        {saved && <span className="text-sm text-emerald-600">Guardado ✓</span>}
      </div>
    </form>
  )
}
