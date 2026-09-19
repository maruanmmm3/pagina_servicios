import { useMemo, useState } from 'react'
import { useProjects } from '../../hooks/useProjects'
import { ProjectCard } from './ProjectCard'

export function PortfolioSection() {
  const { projects, isLoading } = useProjects()
  const [activeCategory, setActiveCategory] = useState('todos')

  const categories = useMemo(
    () => [...new Set(projects.map((project) => project.category).filter(Boolean))],
    [projects],
  )

  const visibleProjects =
    activeCategory === 'todos' ? projects : projects.filter((project) => project.category === activeCategory)

  if (isLoading || projects.length === 0) return null

  return (
    <section className="border-t border-slate-800 bg-slate-950 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-sky-400">Portafolio</p>
        <h2 className="mt-3 font-serif text-3xl font-medium text-slate-50 sm:text-4xl">
          Proyectos realizados
        </h2>
        <p className="mt-4 max-w-2xl text-slate-400">
          Ejemplos reales de lo que hemos construido: páginas, sistemas y automatizaciones.
        </p>

        {categories.length > 1 && (
          <div className="mt-8 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory('todos')}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === 'todos'
                  ? 'bg-sky-400 text-slate-950'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
              }`}
            >
              Todos
            </button>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-sky-400 text-slate-950'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
