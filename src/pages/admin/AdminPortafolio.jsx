import { useState } from 'react'
import { useAdminProjects } from '../../hooks/useAdminProjects'
import { Button } from '../../components/ui/Button'
import { ProjectForm } from '../../components/admin/ProjectForm'

export function AdminPortafolio() {
  const { projects, isLoading, createProject, updateProject, deleteProject, moveProject } = useAdminProjects()
  const [modal, setModal] = useState(null)

  const handleSave = async (values) => {
    if (modal.project) await updateProject(modal.project.id, values)
    else await createProject(values)
    setModal(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Portafolio</h1>
          <p className="mt-1 text-slate-600">Proyectos realizados que se muestran en la página de inicio.</p>
        </div>
        <Button onClick={() => setModal({ project: null })}>+ Nuevo proyecto</Button>
      </div>

      {isLoading && <p className="text-slate-500">Cargando…</p>}

      <div className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
        <ul className="divide-y divide-slate-100">
          {projects.map((project, index) => (
            <li key={project.id} className="flex items-center gap-4 p-4">
              <div className="flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-md bg-slate-100">
                {project.image_url ? (
                  <img src={project.image_url} alt="" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-xs text-slate-400">Sin imagen</span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-slate-900">
                  {project.title}
                  {project.featured && (
                    <span className="ml-2 rounded-full bg-sky-100 px-2 py-0.5 text-xs text-sky-700">Destacado</span>
                  )}
                  {!project.active && (
                    <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">Oculto</span>
                  )}
                </p>
                <p className="truncate text-sm text-slate-500">
                  {project.category || 'Sin categoría'} · {project.description}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveProject(project.id, -1)}
                  disabled={index === 0}
                  className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-30"
                  aria-label="Subir"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveProject(project.id, 1)}
                  disabled={index === projects.length - 1}
                  className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-30"
                  aria-label="Bajar"
                >
                  ↓
                </button>
                <Button variant="secondary" onClick={() => setModal({ project })}>Editar</Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    if (confirm(`¿Eliminar el proyecto "${project.title}"?`)) deleteProject(project.id)
                  }}
                >
                  Eliminar
                </Button>
              </div>
            </li>
          ))}
          {!isLoading && projects.length === 0 && (
            <li className="p-6 text-center text-sm text-slate-500">Todavía no agregaste ningún proyecto.</li>
          )}
        </ul>
      </div>

      {modal && (
        <ProjectForm initialProject={modal.project} onSave={handleSave} onClose={() => setModal(null)} />
      )}
    </div>
  )
}
