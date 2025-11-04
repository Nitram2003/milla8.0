import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCarrito } from "../../store/useCarrito";

export default function Carrito() {
  const { items, increase, decrease, removeItem, clear, reload } = useCarrito();
  const nav = useNavigate();

  // 🔹 Si cambia el usuario (login/logout), recargamos su carrito
  useEffect(() => {
    reload();
  }, []);

  const total = items.reduce((sum, it) => sum + it.precio * it.cantidad, 0);

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Tu carrito 🛒</h1>

      {items.length === 0 ? (
        <p className="opacity-80">
          El carrito está vacío.{" "}
          <Link to="/productos" className="link text-orange-600 underline">
            Ir a productos
          </Link>
        </p>
      ) : (
        <>
          {/* 🔸 Lista de productos */}
          <div className="space-y-3">
            {items.map((it) => (
              <div
                key={it.id}
                className="card p-4 flex items-center justify-between bg-white shadow-sm border border-orange-100 rounded-xl"
              >
                <div className="flex items-center gap-4">
                  {it.imagen ? (
                    <img
                      src={it.imagen}
                      alt={it.nombre}
                      className="h-16 w-16 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="h-16 w-16 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">
                      🧸
                    </div>
                  )}
                  <div>
                    <h2 className="font-semibold text-orange-900">
                      {it.nombre}
                    </h2>
                    <p className="text-sm opacity-80">${it.precio}</p>
                  </div>
                </div>

                {/* Controles de cantidad */}
                <div className="flex items-center gap-2">
                  <button
                    className="btn-ghost px-3 text-lg text-orange-800"
                    onClick={() => decrease(it.id)}
                  >
                    −
                  </button>
                  <span className="font-semibold">{it.cantidad}</span>
                  <button
                    className="btn-ghost px-3 text-lg text-orange-800"
                    onClick={() => increase(it.id)}
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <div className="w-24 text-right font-semibold text-orange-900">
                  ${(it.precio * it.cantidad).toLocaleString()}
                </div>

                {/* Quitar producto */}
                <button
                  className="btn-ghost text-sm text-red-500 hover:text-red-700"
                  onClick={() => removeItem(it.id)}
                >
                  ✖
                </button>
              </div>
            ))}
          </div>

          {/* 🔸 Total y acciones */}
          <div className="mt-6 flex justify-between items-center bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="text-xl font-bold text-orange-900">
              Total: ${total.toLocaleString()}
            </div>
            <div className="flex gap-3">
              <button
                className="btn-ghost hover:text-orange-700"
                onClick={clear}
              >
                Vaciar carrito
              </button>
              <button
                className="btn-primary bg-orange-400 hover:bg-orange-500 text-white font-semibold px-4 py-2 rounded-lg transition"
                onClick={() => nav("/pago")}
              >
                Finalizar compra
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
