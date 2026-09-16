import { useState } from 'react'
import { Modal } from '../ui/Modal'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'

export function CategoryForm({ initialCategory, onSave, onClose }) {
  const [name, setName] = useState(initialCategory?.name ?? '')
  const [icon, setIcon] = useState(initialCategory?.icon ?? '')
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSaving(true)
    await onSave({ name, icon: icon || null })
    setIsSaving(false)
  }

  return (
    <Modal title={initialCategory ? 'Editar categoría' : 'Nueva categoría'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="name" label="Nombre" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input
          name="icon"
          label="Ícono (emoji, opcional)"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          placeholder="🌐"
        />
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? 'Guardando…' : 'Guardar'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
