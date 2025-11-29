import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "/images/LOGO.png";

export default function AdminSidebar() {
  const nav = useNavigate();

  function logout() {
    localStorage.removeItem("user");
    nav("/login");
  }

  const linkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-lg font-medium transition
    ${
      isActive
        ? "bg-orange-300/60 text-orange-900 border-l-4 border-orange-600 shadow"
        : "hover:bg-orange-200/70 hover:text-orange-800"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-orange-100/90 backdrop-blur border-r border-orange-200 p-5 flex flex-col justify-between">
      
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <img src={logo} alt="Millapeluche" className="w-12 h-12" />
          <h1 className="font-bold text-xl text-orange-900">
            Millapeluche <span className="block text-sm">Admin</span>
          </h1>
        </div>

        {/* Navegación */}
        <nav className="flex flex-col space-y-2">
          <NavLink to="/admin" end className={linkClass}>🏠 Dashboard</NavLink>
          <NavLink to="/admin/productos" className={linkClass}>🧸 Productos</NavLink>
          <NavLink to="/admin/usuarios" className={linkClass}>👥 Usuarios</NavLink>
          <NavLink to="/admin/ventas" className={linkClass}>💳 Ventas</NavLink>
          <NavLink to="/admin/informes" className={linkClass}>📊 Informes</NavLink>
          <NavLink to="/admin/comentarios" className={linkClass}>💬 Comentarios</NavLink>
          <NavLink to="/admin/usuarios-activos" className={linkClass}>🟢 Usuarios Activos</NavLink>
        </nav>

        {/* Botón Ver Tienda */}
        <Link
          to="/"
          className="mt-6 block text-center bg-orange-200/80 hover:bg-orange-300 transition py-2 rounded-lg font-semibold text-orange-900 shadow"
        >
          👁 Ver tienda
        </Link>
      </div>

      {/* Botón Cerrar Sesión */}
      <button
        onClick={logout}
        className="mt-6 bg-orange-400 text-white py-2 rounded-lg hover:bg-orange-500 transition hover:scale-105 shadow"
      >
        Cerrar sesión
      </button>
    </aside>
  );
}
