import { useEffect, useState } from "react";
import axios from "axios";

const API_VENTAS = "http://localhost:5000/ventas";
const API_PRODUCTOS = "http://localhost:5000/productos";

export default function InformesAdmin() {
  const [ventas, setVentas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(null);

  // 🕒 Cargar datos al montar y luego refrescar automáticamente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [v, p] = await Promise.all([
          axios.get(API_VENTAS),
          axios.get(API_PRODUCTOS),
        ]);
        setVentas(v.data);
        setProductos(p.data);
        setLastUpdate(new Date().toLocaleString());
      } catch (err) {
        console.error("Error cargando informes:", err);
      }
    };

    fetchData(); // primera carga
    const interval = setInterval(fetchData, 5000); // 🔁 refrescar cada 10 segundos
    return () => clearInterval(interval); // limpiar al salir
  }, []);

  // 📊 Calcular totales
  const totalVentas = ventas.length;
  const montoTotal = ventas.reduce((sum, v) => sum + v.total, 0);
  const productosVendidos = ventas.reduce(
    (sum, v) =>
      sum + v.productos.reduce((acc, p) => acc + p.cantidad, 0),
    0
  );

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-orange-900">
        📊 Informes de Ventas
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-orange-100 border border-orange-300 p-6 text-center hover:scale-105 transition-all hover:bg-orange-200 hover:shadow-lg">
          <h2 className="text-lg font-semibold">Total Ventas</h2>
          <p className="text-4xl font-bold text-orange-800">
            {totalVentas}
          </p>
        </div>

        <div className="card bg-orange-100 border border-orange-300 p-6 text-center hover:scale-105 transition-all hover:bg-orange-200 hover:shadow-lg">
          <h2 className="text-lg font-semibold">Monto Total</h2>
          <p className="text-4xl font-bold text-orange-800">
            ${montoTotal.toLocaleString()}
          </p>
        </div>

        <div className="card bg-orange-100 border border-orange-300 p-6 text-center hover:scale-105 transition-all hover:bg-orange-200 hover:shadow-lg">
          <h2 className="text-lg font-semibold">Productos Vendidos</h2>
          <p className="text-4xl font-bold text-orange-800">
            {productosVendidos}
          </p>
        </div>
      </div>

      <div className="bg-white/90 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-orange-900">
          Detalle de ventas recientes
        </h2>

        {ventas.length === 0 ? (
          <p className="opacity-70">Aún no hay transacciones registradas.</p>
        ) : (
          <table className="min-w-full border border-orange-200 rounded-xl bg-white">
            <thead className="bg-orange-100">
              <tr>
                <th className="p-3 text-left"># Pedido</th>
                <th className="p-3 text-left">Cliente</th>
                <th className="p-3 text-left">Fecha</th>
                <th className="p-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {ventas
                .slice()
                .reverse()
                .slice(0, 5)
                .map((v) => (
                  <tr key={v.idPedido} className="border-t border-orange-100">
                    <td className="p-3">{v.idPedido}</td>
                    <td className="p-3">{v.cliente}</td>
                    <td className="p-3">{v.fecha}</td>
                    <td className="p-3 text-right font-semibold text-orange-800">
                      ${v.total.toLocaleString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      <p className="mt-6 text-sm text-gray-500">
        Última actualización:{" "}
        <span className="font-semibold text-orange-700">{lastUpdate}</span>
      </p>
    </section>
  );
}
