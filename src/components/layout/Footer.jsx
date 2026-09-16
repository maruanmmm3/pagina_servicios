import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-slate-500 sm:flex-row">
        <p>© {new Date().getFullYear()} Amaru — Desarrollo de software y automatización.</p>
        <Link to="/admin/login" className="hover:text-slate-300">
          Acceso administrador
        </Link>
      </div>
    </footer>
  )
}
