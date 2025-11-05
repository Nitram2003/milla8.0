import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "/images/LOGO.png";

export default function AdminLayout() {
  const nav = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    nav("/login");
  };

  return (
    <div className="flex min-h-screen bg-[#fff9f4] text-[#3a2d28]">
      {/* Sidebar */}
      <aside className="w-64 bg-orange-200/60 backdrop-blur border-r border-orange-300 p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <img src={logo} alt="Millapeluche" className="w-12 h-12" />
            <h1 className="font-bold text-xl text-orange-900">
              Millapeluche <span className="block text-sm">Admin</span>
            </h1>
          </div>

          <nav className="space-y-3 font-medium">
            <Link to="/admin" className="block hover:text-orange-700 hover:scale-110 hover:shadow-lg" >🏠 Dashboard</Link>
            <Link to="/admin/productos" className="block hover:text-orange-700 hover:scale-110 hover:shadow-lg">🧸 Productos</Link>
            <Link to="/admin/usuarios" className="block hover:text-orange-700 hover:scale-110 hover:shadow-lg">👥 Usuarios</Link>
            <Link to="/admin/ventas" className="block hover:text-orange-700 hover:scale-110 hover:shadow-lg">💳 Ventas</Link>
            <Link to="/admin/informes" className="block hover:text-orange-700 hover:scale-110 hover:shadow-lg">📊 Informes</Link>
            <Link to="/admin/comentarios" className="block hover:text-orange-700 hover:scale-110 hover:shadow-lg">💬 Comentarios</Link>
            <Link to="/admin/usuarios-activos" className="block hover:text-orange-700 hover:scale-110 hover:shadow-lg">🟢 Usuarios Activos</Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 bg-orange-400 text-white py-2 rounded-lg hover:bg-orange-500 transition hover:scale-110 hover:shadow-lg"
        >
          Cerrar sesión
        </button>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}