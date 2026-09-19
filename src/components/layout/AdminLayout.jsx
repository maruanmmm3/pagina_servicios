import { NavLink, Outlet } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'

const links = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/contenido', label: 'Contenido de inicio' },
  { to: '/admin/portafolio', label: 'Portafolio' },
  { to: '/admin/servicios', label: 'Servicios' },
  { to: '/admin/horarios', label: 'Horarios' },
  { to: '/admin/citas', label: 'Citas' },
]

export function AdminLayout() {
  const { signOut } = useAuthContext()

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="flex w-56 flex-col border-r border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-4 py-4 text-lg font-bold text-slate-900">
          Admin
        </div>
        <nav className="flex-1 space-y-1 px-2 py-4">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-sm font-medium ${
                  isActive ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          onClick={signOut}
          className="m-2 rounded-md px-3 py-2 text-left text-sm font-medium text-slate-600 hover:bg-slate-100"
        >
          Cerrar sesión
        </button>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}
