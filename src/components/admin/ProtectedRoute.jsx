import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'

export function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated } = useAuthContext()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        Cargando…
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}
