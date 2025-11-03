import { useCarrito } from "../../store/useCarrito";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const API_VENTAS = "http://localhost:5000/ventas";


export default function Pago() {
  const { items, clear } = useCarrito();
  const nav = useNavigate();
  const [form, setForm] = useState({ nombre: "", correo: "", tarjeta: "" });
  const [mensaje, setMensaje] = useState("");

  const total = items.reduce((sum, it) => sum + it.precio * it.cantidad, 0);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const pagar = async (e) => {
  e.preventDefault();
  if (!form.nombre || !form.correo || !form.tarjeta) {
    setMensaje("Por favor completa todos los campos.");
    return;
  }

  // Generar número de pedido
  const idPedido =
    "MP-" +
    new Date().toISOString().slice(0, 10).replace(/-/g, "") +
    "-" +
    Math.floor(1000 + Math.random() * 9000);

  // Crear objeto de venta
  const venta = {
    idPedido,
    cliente: form.nombre,
    correo: form.correo,
    fecha: new Date().toLocaleString(),
    total,
    productos: items.map((it) => ({
      id: it.id,
      nombre: it.nombre,
      cantidad: it.cantidad,
      precio: it.precio,
    })),
  };

  try {
    await axios.post(API_VENTAS, venta);
    clear();
    nav("/compra-exitosa");
  } catch (err) {
    console.error("Error registrando venta:", err);
    setMensaje("Error al procesar la venta.");
  }
};


  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Pago seguro 💳</h1>

      {mensaje && (
        <div className="bg-orange-100 border border-orange-300 text-orange-900 p-3 rounded-xl mb-4">
          {mensaje}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        <div className="card p-5">
          <h2 className="font-semibold text-lg mb-4">Resumen de tu pedido</h2>
          {items.length === 0 ? (
            <p>No hay productos en el carrito.</p>
          ) : (
            <>
              <ul className="space-y-2">
                {items.map((it) => (
                  <li key={it.id} className="flex justify-between">
                    <span>
                      {it.nombre} × {it.cantidad}
                    </span>
                    <span>${it.precio * it.cantidad}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 border-t pt-3 font-bold text-right">
                Total: ${total}
              </div>
            </>
          )}
        </div>

        <form className="card p-5 space-y-3" onSubmit={pagar}>
          <h2 className="font-semibold text-lg mb-2">Datos de pago</h2>
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="rounded-xl border p-3 w-full"
            placeholder="Nombre completo"
          />
          <input
            name="correo"
            value={form.correo}
            onChange={handleChange}
            type="email"
            className="rounded-xl border p-3 w-full"
            placeholder="Correo electrónico"
          />
          <input
            name="tarjeta"
            value={form.tarjeta}
            onChange={handleChange}
            className="rounded-xl border p-3 w-full"
            placeholder="Número de tarjeta"
          />
          <button className="btn-primary w-full" type="submit">
            Realizar pago
          </button>
        </form>
      </div>
    </section>
  );
}
