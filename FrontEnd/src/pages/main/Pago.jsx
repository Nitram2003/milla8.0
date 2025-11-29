import { useCarrito } from "../../store/useCarrito";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

const API_VENTAS = "http://localhost:8080/api/ventas/save";
const API_ME = "http://localhost:8080/api/personas/me";

export default function Pago() {
  const { items, clear } = useCarrito();
  const nav = useNavigate();
  const [form, setForm] = useState({ nombre: "", correo: "", tarjeta: "" });
  const [mensaje, setMensaje] = useState("");

  const total = items.reduce((sum, it) => sum + it.precio * it.cantidad, 0);

  // 🔥 Autocompletar nombre y correo desde backend
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return; // si no hay sesión, no hace nada

    const fetchUser = async () => {
      try {
        const res = await axiosClient.get(API_ME, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = res.data;

        setForm((prev) => ({
          ...prev,
          // aquí tomo username como nombre visible y email como correo
          nombre: user.username || "",
          correo: user.email || "",
        }));
      } catch (err) {
        console.error("Error obteniendo usuario actual:", err);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const pagar = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.correo || !form.tarjeta) {
      setMensaje("Por favor completa todos los campos.");
      return;
    }

    const codigoPedido =
      "MP-" +
      new Date().toISOString().slice(0, 10).replace(/-/g, "") +
      "-" +
      Math.floor(1000 + Math.random() * 9000);

    const venta = {
      codigo: codigoPedido,
      clienteNombre: form.nombre,
      clienteCorreo: form.correo,
      fecha: new Date().toISOString(),
      total,
      detalles: items.map((it) => ({
        productoNombre: it.nombre,
        cantidad: it.cantidad,
        precioUnitario: it.precio,
      })),
    };

    try {
      await axiosClient.post(API_VENTAS, venta);
      clear();
      nav("/compra-exitosa", { state: { pedido: codigoPedido } });
    } catch (err) {
      console.error("Error registrando venta:", err);
      setMensaje("Error al procesar la venta.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF3E9] bg-[radial-gradient(#f0d8c0_1px,transparent_1px)] [background-size:20px_20px] flex justify-center items-start px-4 py-12">

      {/* Contenedor en columnas */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* CUADRO IZQUIERDO: Resumen de compra */}
        <div className="bg-white rounded-2xl shadow-md border border-orange-200 p-8">
          <h2 className="text-2xl font-bold text-[#6B3E26] mb-6">
            🧸 Resumen de Compra
          </h2>

          <div className="space-y-3 text-[#6B3E26]">
            <p className="text-lg">
              <span className="font-semibold">Productos:</span> {items.length}
            </p>

            <p className="text-lg">
              <span className="font-semibold">Total a pagar:</span> ${total.toFixed(0)}
            </p>
          </div>

          <hr className="my-6 border-orange-200" />

          <h3 className="text-lg font-semibold text-[#6B3E26] mb-3">
            Detalles:
          </h3>

          {items.map((it, i) => (
            <div
              key={i}
              className="flex justify-between bg-[#FFE9D6] border border-orange-200 rounded-xl px-4 py-3 mb-3"
            >
              <div>
                <p className="font-semibold">{it.nombre}</p>
                <p className="text-sm">Cantidad: {it.cantidad}</p>
              </div>
              <p className="font-semibold text-[#6B3E26]">
                ${it.precio * it.cantidad}
              </p>
            </div>
          ))}
        </div>

        {/* CUADRO DERECHO: Formulario */}
        <div className="bg-white rounded-2xl shadow-md border border-orange-200 p-8">
          <h1 className="text-2xl font-bold text-[#6B3E26] mb-6">
            💳 Datos del Pago
          </h1>

          {mensaje && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-xl">
              {mensaje}
            </div>
          )}

          <form onSubmit={pagar} className="space-y-4">

            <div>
              <label className="block text-sm font-medium text-[#6B3E26] mb-1">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                className="w-full bg-white border border-orange-200 px-4 py-2 rounded-xl focus:ring-2 focus:ring-orange-300 outline-none"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#6B3E26] mb-1">
                Correo
              </label>
              <input
                type="email"
                name="correo"
                value={form.correo}
                onChange={handleChange}
                className="w-full bg-white border border-orange-200 px-4 py-2 rounded-xl focus:ring-2 focus:ring-orange-300 outline-none"
                placeholder="tucorreo@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#6B3E26] mb-1">
                Número de Tarjeta
              </label>
              <input
                type="text"
                name="tarjeta"
                value={form.tarjeta}
                onChange={handleChange}
                className="w-full bg-white border border-orange-200 px-4 py-2 rounded-xl focus:ring-2 focus:ring-orange-300 outline-none"
                placeholder="4111 1111 1111 1111"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition"
            >
              Pagar ${total.toFixed(2)}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}
