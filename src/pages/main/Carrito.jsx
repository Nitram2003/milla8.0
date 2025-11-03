import { Link, useNavigate } from "react-router-dom";
import { useCarrito } from "../../store/useCarrito";

export default function Carrito() {
  const { items, increase, decrease, removeItem, clear } = useCarrito();
  const nav = useNavigate();

  const total = items.reduce((sum, it) => sum + it.precio * it.cantidad, 0);

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Tu carrito 🛒</h1>

      {items.length === 0 ? (
        <p className="opacity-80">
          El carrito está vacío. <Link to="/productos" className="link">Ir a productos</Link>
        </p>
      ) : (
        <>
          <div className="space-y-3">
            {items.map((it) => (
              <div
                key={it.id}
                className="card p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  {it.imagen ? (
                    <img
                      src={it.imagen}
                      alt={it.nombre}
                      className="h-16 w-16 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="h-16 w-16 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">🧸</div>
                  )}
                  <div>
                    <h2 className="font-semibold">{it.nombre}</h2>
                    <p className="text-sm opacity-80">${it.precio}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="btn-ghost px-3" onClick={() => decrease(it.id)}>-</button>
                  <span className="font-semibold">{it.cantidad}</span>
                  <button className="btn-ghost px-3" onClick={() => increase(it.id)}>+</button>
                </div>

                <div className="w-20 text-right font-semibold">
                  ${it.precio * it.cantidad}
                </div>

                <button
                  className="btn-ghost text-sm"
                  onClick={() => removeItem(it.id)}
                >
                  ✖
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div className="text-xl font-bold text-orange-800">
              Total: ${total}
            </div>
            <div className="flex gap-3">
              <button className="btn-ghost" onClick={clear}>Vaciar carrito</button>
              <button className="btn-primary" onClick={() => nav("/pago")}>
                Finalizar compra
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
