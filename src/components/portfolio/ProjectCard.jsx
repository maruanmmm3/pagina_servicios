import { ExternalLink } from 'lucide-react'

export function ProjectCard({ project }) {
  return (
    <div
      className={`group flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900 transition-colors hover:border-slate-700 ${
        project.featured ? 'sm:col-span-2' : ''
      }`}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-slate-800">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-600">
            <span className="text-3xl">{'{ }'}</span>
          </div>
        )}
        {project.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-sky-400 px-2.5 py-1 text-xs font-semibold text-slate-950">
            Destacado
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        {project.category && (
          <span className="w-fit rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-medium text-sky-300">
            {project.category}
          </span>
        )}
        <h3 className="text-lg font-semibold text-slate-100">{project.title}</h3>
        <p className="flex-1 text-sm text-slate-400">{project.description}</p>
        {(project.demo_user || project.demo_password) && (
          <div className="mt-2 rounded-md border border-slate-800 bg-slate-950 p-3 text-xs text-slate-300">
            <p className="mb-1 font-semibold text-sky-300">Prueba el sistema</p>
            {project.demo_user && (
              <p>Usuario: <span className="font-mono text-slate-100">{project.demo_user}</span></p>
            )}
            {project.demo_password && (
              <p>Contraseña: <span className="font-mono text-slate-100">{project.demo_password}</span></p>
            )}
            {project.demo_email && (
              <p className="mt-1 text-slate-500">
                Correo interno: {project.demo_email} (no se usa para entrar, el login pide el usuario)
              </p>
            )}
          </div>
        )}
        {project.link_url && (
          <a
            href={project.link_url}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-sky-400 hover:text-sky-300"
          >
            Ver proyecto <ExternalLink size={14} />
          </a>
        )}
      </div>
    </div>
  )
}
