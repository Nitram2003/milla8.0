import { useEffect, useState } from "react";
import axios from "axios";
import { useCarrito } from "../../store/useCarrito";

const API = "http://localhost:8080/api/productos/all"; // 🔹 API real del backend

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem, reload } = useCarrito();
  const [alerta, setAlerta] = useState("");

  // 🔹 Recargar carrito al entrar
  useEffect(() => {
    reload();
  }, []);

  // 🔹 Cargar productos en tiempo real desde BD
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(API);
        setProductos(data);
      } catch (err) {
        console.error("Error al cargar productos:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // 🔹 Agregar producto al carrito
  const handleAdd = (p) => {
    addItem(p);
    setAlerta(`🧸 ${p.nombre} agregado al carrito`);
    setTimeout(() => setAlerta(""), 2000);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 relative">
      {alerta && (
        <div className="fixed top-6 right-6 bg-orange-100 border border-orange-300 text-orange-900 px-4 py-2 rounded-xl shadow-md z-50 animate-fade-in">
          {alerta}
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6 text-orange-900">
        Nuestros Peluches
      </h1>

      {loading ? (
        <p className="opacity-70">Cargando productos...</p>
      ) : productos.length === 0 ? (
        <p className="opacity-80">No hay productos disponibles.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {productos.map((p) => (
            <article
              key={p.id}
              className="bg-white border border-orange-100 rounded-2xl p-4 flex flex-col items-center text-center shadow hover:shadow-lg transition"
            >
              {p.imagen ? (
                <img
                  src={p.imagen}
                  alt={p.nombre}
                  className="h-48 w-48 object-cover rounded-xl mb-3"
                />
              ) : (
                <div className="h-48 w-48 bg-orange-50 rounded-xl mb-3 flex items-center justify-center text-3xl text-orange-700">
                  🧸
                </div>
              )}

              <h2 className="text-lg font-semibold text-orange-900 mb-1">
                {p.nombre}
              </h2>

              <p className="text-sm text-gray-600 mb-2">{p.descripcion}</p>

              <p className="font-bold text-orange-700 mb-3">
                ${p.precio.toLocaleString()}
              </p>

              <button
                className="btn-primary bg-orange-400 hover:bg-orange-500 text-white font-medium px-4 py-2 rounded-lg transition"
                onClick={() => handleAdd(p)}
              >
                Agregar al carrito
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
