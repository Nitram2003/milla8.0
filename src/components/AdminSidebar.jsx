import { NavLink, useNavigate } from 'react-router-dom'
import logo from "/images/LOGO.png";





export default function AdminSidebar() {
  const nav = useNavigate()
  function logout() {
    localStorage.removeItem('auth')
    nav('/login')
  }
  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg transition ${isActive ? 'bg-orange-300/60 border-l-4 border-orange-600' : 'hover:bg-orange-200/70'}`
  return (
    <aside className="w-64 min-h-screen bg-orange-100 border-r border-orange-200 p-4">
      <div className="flex items-center gap-2 mb-6">
        <img src={logo} alt="Millapeluche Admin" className="h-8 w-8" />
        <div className="font-extrabold">Millapeluche Admin</div>
      </div>
      <nav className="flex flex-col gap-1">
        <NavLink to="/admin" end className={linkClass}>Dashboard</NavLink>
        <NavLink to="/admin/productos" className={linkClass}>Productos</NavLink>
        <NavLink to="/admin/usuarios" className={linkClass}>Usuarios</NavLink>
        <NavLink to="/admin/informes" className={linkClass}>Informes</NavLink>
      </nav>
      <div className="mt-6">
        <button onClick={logout} className="btn-ghost w-full">Cerrar sesión</button>
      </div>
    </aside>
  )
}
