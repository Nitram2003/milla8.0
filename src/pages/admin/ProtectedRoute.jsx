import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // No hay usuario → redirige al login
    return <Navigate to="/login" replace />;
  }

  if (user.rol !== "admin") {
    // Usuario sin rol de admin → redirige al home
    return <Navigate to="/" replace />;
  }

  // Usuario válido → renderiza hijos (AdminLayout)
  return children;
}