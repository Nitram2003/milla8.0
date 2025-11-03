import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const authed = localStorage.getItem('auth') === 'true'
  if (!authed) return <Navigate to="/login" replace />
  return children
}
