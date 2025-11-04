import { useEffect, useState } from "react";
import axios from "axios";
import { useCarrito } from "../../store/useCarrito";

const API = "http://localhost:5000/productos";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCarrito();
  const [alerta, setAlerta] = useState("");

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

  const handleAdd = (p) => {
    addItem(p);
    setAlerta(`🧸 ${p.nombre} agregado al carrito`);
    setTimeout(() => setAlerta(""), 2000);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 relative">
      {alerta && (
        <div className="fixed top-6 right-6 bg-orange-200 border border-orange-400 text-orange-900 px-4 py-2 rounded-xl shadow-soft z-50">
          {alerta}
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6 text-orange-900">Nuestros Peluches</h1>

      {loading ? (
        <p>Cargando productos...</p>
      ) : productos.length === 0 ? (
        <p className="opacity-80">No hay productos disponibles.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {productos.map((p) => (
            <article
              key={p.id}
              className="card p-4 flex flex-col items-center text-center hover:shadow-gray-700 transition-all hover:scale-[1.02]"
            >
              {p.imagen ? (
                <img
                  src={p.imagen}
                  alt={p.nombre}
                  className="h-48 w-48 object-cover rounded-xl mb-3 "
                />
              ) : (
                <div className="h-48 w-48 bg-orange-100 rounded-xl mb-3 flex items-center justify-center text-3xl">
                  🧸
                </div>
              )}
              <h2 className="text-xl font-semibold">{p.nombre}</h2>
              <p className="text-sm opacity-90 mb-2">{p.descripcion}</p>
              <p className="font-bold text-orange-700 mb-3">${p.precio}</p>
              <button
                className="btn-primary"
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
