import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { PublicLayout } from './components/layout/PublicLayout'
import { Home } from './pages/Home'
import { Servicios } from './pages/Servicios'
import { Reservar } from './pages/Reservar'

// El panel de administración se separa en su propio chunk: los visitantes
// del sitio público (la gran mayoría) nunca descargan este código.
const AdminLayout = lazy(() => import('./components/layout/AdminLayout').then((m) => ({ default: m.AdminLayout })))
const ProtectedRoute = lazy(() => import('./components/admin/ProtectedRoute').then((m) => ({ default: m.ProtectedRoute })))
const Login = lazy(() => import('./pages/admin/Login').then((m) => ({ default: m.Login })))
const Dashboard = lazy(() => import('./pages/admin/Dashboard').then((m) => ({ default: m.Dashboard })))
const AdminServicios = lazy(() => import('./pages/admin/AdminServicios').then((m) => ({ default: m.AdminServicios })))
const AdminContenido = lazy(() => import('./pages/admin/AdminContenido').then((m) => ({ default: m.AdminContenido })))
const AdminHorarios = lazy(() => import('./pages/admin/AdminHorarios').then((m) => ({ default: m.AdminHorarios })))
const AdminCitas = lazy(() => import('./pages/admin/AdminCitas').then((m) => ({ default: m.AdminCitas })))

function AdminFallback() {
  return <div className="flex min-h-screen items-center justify-center text-slate-500">Cargando…</div>
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<AdminFallback />}>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/servicios" element={<Servicios />} />
              <Route path="/reservar" element={<Reservar />} />
            </Route>

            <Route path="/admin/login" element={<Login />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="contenido" element={<AdminContenido />} />
              <Route path="servicios" element={<AdminServicios />} />
              <Route path="horarios" element={<AdminHorarios />} />
              <Route path="citas" element={<AdminCitas />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
