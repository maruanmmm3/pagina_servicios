import { useState } from 'react'
import { Modal } from '../ui/Modal'
import { Input, Textarea } from '../ui/Input'
import { Button } from '../ui/Button'
import { uploadImage } from '../../lib/uploadImage'

export function ProjectForm({ initialProject, onSave, onClose }) {
  const [title, setTitle] = useState(initialProject?.title ?? '')
  const [description, setDescription] = useState(initialProject?.description ?? '')
  const [category, setCategory] = useState(initialProject?.category ?? '')
  const [linkUrl, setLinkUrl] = useState(initialProject?.link_url ?? '')
  const [demoUser, setDemoUser] = useState(initialProject?.demo_user ?? '')
  const [demoPassword, setDemoPassword] = useState(initialProject?.demo_password ?? '')
  const [demoEmail, setDemoEmail] = useState(initialProject?.demo_email ?? '')
  const [featured, setFeatured] = useState(initialProject?.featured ?? false)
  const [active, setActive] = useState(initialProject?.active ?? true)
  const [imageUrl, setImageUrl] = useState(initialProject?.image_url ?? '')
  const [isSaving, setIsSaving] = useState(false)
  const [photoStatus, setPhotoStatus] = useState('idle')
  const [photoError, setPhotoError] = useState('')

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    setPhotoStatus('uploading')
    setPhotoError('')

    const { url, error } = await uploadImage(file, `projects/${crypto.randomUUID()}.webp`)

    if (error) {
      setPhotoStatus('error')
      setPhotoError('No se pudo subir la imagen. Intenta con otro archivo.')
      return
    }

    setImageUrl(url)
    setPhotoStatus('idle')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSaving(true)
    await onSave({
      title,
      description,
      category,
      link_url: linkUrl || null,
      demo_user: demoUser || null,
      demo_password: demoPassword || null,
      demo_email: demoEmail || null,
      featured,
      active,
      image_url: imageUrl || null,
    })
    setIsSaving(false)
  }

  return (
    <Modal title={initialProject ? 'Editar proyecto' : 'Nuevo proyecto'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-32 items-center justify-center overflow-hidden rounded-md bg-slate-100">
            {imageUrl ? (
              <img src={imageUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <span className="text-xs text-slate-400">Sin imagen</span>
            )}
          </div>
          <div>
            <label className="inline-flex cursor-pointer items-center rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200">
              {photoStatus === 'uploading' ? 'Subiendo…' : 'Subir imagen'}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={photoStatus === 'uploading'}
                className="hidden"
              />
            </label>
            {imageUrl && (
              <button
                type="button"
                onClick={() => setImageUrl('')}
                className="ml-3 text-sm text-red-500 hover:text-red-600"
              >
                Quitar
              </button>
            )}
            {photoError && <p className="mt-1 text-xs text-red-600">{photoError}</p>}
          </div>
        </div>

        <Input label="Título" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <Textarea
          label="Descripción (qué se hizo, tecnologías usadas)"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          label="Categoría (ej. Página web, Automatización, E-commerce)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Input
          label="Enlace del proyecto (opcional)"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          placeholder="https://..."
        />

        <fieldset className="space-y-3 rounded-md border border-slate-200 p-3">
          <legend className="px-1 text-sm font-medium text-slate-700">
            Acceso de demostración (opcional)
          </legend>
          <Input
            label="Usuario"
            value={demoUser}
            onChange={(e) => setDemoUser(e.target.value)}
            placeholder="demo"
          />
          <Input
            label="Contraseña"
            value={demoPassword}
            onChange={(e) => setDemoPassword(e.target.value)}
            placeholder="demo-market-2026"
          />
          <Input
            label="Correo interno (informativo, no se usa para entrar)"
            value={demoEmail}
            onChange={(e) => setDemoEmail(e.target.value)}
            placeholder="demo@example.com"
          />
        </fieldset>

        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="h-4 w-4" />
            Destacar este proyecto
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} className="h-4 w-4" />
            Visible en el sitio público
          </label>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit" disabled={isSaving}>{isSaving ? 'Guardando…' : 'Guardar'}</Button>
        </div>
      </form>
    </Modal>
  )
}
