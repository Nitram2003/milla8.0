import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import logo from "/images/LOGO.png";


export default function AdminLayout() {
  const nav = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.rol !== "admin") nav("/login");
  }, [nav]);

  return (
    <div className="flex min-h-screen bg-[#fff9f4] text-[#3a2d28]">
      {/* Sidebar */}
      <aside className="w-64 bg-orange-200/60 backdrop-blur border-r border-orange-300 p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <img src="../public/images/LOGO.png" alt="Millapeluche" className="w-12 h-12" />

            <h1 className="font-bold text-xl text-orange-900">
              Millapeluche <span className="block text-sm">Admin</span>
            </h1>
          </div>
          <nav className="space-y-3 font-medium">
            <Link to="/admin" className="block hover:text-orange-700">🏠 Dashboard</Link>
            <Link to="/admin/productos" className="block hover:text-orange-700">🧸 Productos</Link>
            <Link to="/admin/usuarios" className="block hover:text-orange-700">👥 Usuarios</Link>
            <Link to="/admin/ventas" className="block hover:text-orange-700">💳 Ventas</Link>
            <Link to="/admin/informes" className="block hover:text-orange-700">📊 Informes</Link>
          </nav>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("user");
            nav("/login");
          }}
          className="mt-8 bg-orange-400 text-white py-2 rounded-lg hover:bg-orange-500 transition"
        >
          Cerrar sesión
        </button>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
