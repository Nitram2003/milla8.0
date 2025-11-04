import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCarrito } from "../store/useCarrito"; // ✅ tu store correcto
import logo from "/images/LOGO.png";

// 🔹 Ícono del carrito con contador
function CartIconWithCount() {
  const { items, reload } = useCarrito(); // ✅ no hay "cart", se llama "items"

  useEffect(() => {
    reload(); // recarga el carrito del usuario actual
  }, []);

  // ✅ proteger en caso de que items sea undefined o vacío
  const totalItems = Array.isArray(items)
    ? items.reduce((acc, p) => acc + (p.cantidad || 0), 0)
    : 0;

  return (
    <div className="relative">
      {/* Icono del carrito */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="h-6 w-6"
      >
        <path
          fill="currentColor"
          d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM6.2 6l.5 3H20a1 1 0 0 1 .98 1.2l-1.2 6A2 2 0 0 1 17.8 18H8a2 2 0 0 1-2-1.7L4.1 3H2V1h3a1 1 0 0 1 1 .86L6.2 6Z"
        />
      </svg>

      {/* 🔹 Contador visible solo si hay productos */}
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 shadow">
          {totalItems}
        </span>
      )}
    </div>
  );
}

export default function Nav() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const { reload } = useCarrito();

  const handleLogout = () => {
    localStorage.removeItem("user");
    reload(); // recarga carrito vacío para invitados
    navigate("/login");
  };

  const links = [
    { path: "/productos", label: "Productos" },
    { path: "/nosotros", label: "Nosotros" },
    { path: "/blogs", label: "Blogs" },
    { path: "/contacto", label: "Contacto" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-orange-50/80 backdrop-blur border-b border-orange-200">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        {/* Logo + Nombre */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Millapeluche" className="h-9 w-9" />
          <NavLink to="/" className="text-lg font-extrabold">
            Millapeluche
          </NavLink>
        </div>

        {/* Navegación */}
        <nav className="flex items-center gap-1">
          {links.map((it) => (
            <NavLink
              key={it.path}
              to={it.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm transition ${
                  isActive ? "bg-orange-200" : "hover:bg-orange-200/70"
                }`
              }
              end
            >
              {it.label}
            </NavLink>
          ))}

          {/* Si hay usuario logueado */}
          {user ? (
            <>
              <span className="ml-3 text-sm text-orange-900 font-semibold">
                👋 Hola, {user.username}
              </span>
              <button
                onClick={handleLogout}
                className="ml-2 px-3 py-1 rounded-lg text-sm bg-orange-400 text-white hover:bg-orange-500 transition"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="px-3 py-2 rounded-lg text-sm hover:bg-orange-200/70"
            >
              Login
            </NavLink>
          )}

          {/* Ícono del carrito con contador */}
          <NavLink
            to="/carrito"
            className="ml-3 p-2 rounded-lg hover:bg-orange-200/70 relative"
            aria-label="Carrito"
          >
            <CartIconWithCount />
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
