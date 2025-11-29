import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

// ✅ ENDPOINTS CORRECTOS PARA TU BACKEND
const API_VENTAS = "http://localhost:8080/api/ventas/all";
const API_PRODUCTOS = "http://localhost:8080/api/productos/all";
const API_USUARIOS = "http://localhost:8080/api/personas/all";


export default function Dashboard() {
  const [totalVentas, setTotalVentas] = useState(0);
  const [montoTotal, setMontoTotal] = useState(0);
  const [productos, setProductos] = useState(0);
  const [usuarios, setUsuarios] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ⬇ Consultar todo al mismo tiempo
        const [vRes, pRes, uRes] = await Promise.all([
          axiosClient.get(API_VENTAS),
          axiosClient.get(API_PRODUCTOS),
          axiosClient.get(API_USUARIOS),
        ]);

        const ventasData = vRes.data;

        // 🔢 Total de ventas
        setTotalVentas(ventasData.length);

        // 💰 Monto total recaudado
        setMontoTotal(
          ventasData.reduce((sum, v) => sum + v.total, 0)
        );

        // 📦 Productos disponibles
        setProductos(pRes.data.length);

        // 👤 Usuarios registrados
        setUsuarios(uRes.data.length);

      } catch (error) {
        console.error("Error cargando dashboard:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <h1 className="text-3xl font-bold mb-8 text-orange-900">
        Panel de control 🧸
      </h1>

      {/* TARJETAS DE MÉTRICAS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total ventas" value={totalVentas} />
        <Card title="Monto total" value={`$${montoTotal.toLocaleString()}`} />
        <Card title="Productos" value={productos} />
        <Card title="Usuarios" value={usuarios} />
      </div>

      {/* ÚLTIMAS VENTAS */}
      <div className="mt-10 bg-white/90 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-3 text-orange-900">
          Últimas ventas
        </h2>
        <VentasRecientes />
      </div>
    </section>
  );
}

// 🟦 COMPONENTE DE TARJETAS
function Card({ title, value }) {
  return (
    <div className="card bg-orange-100 border border-orange-300 p-6 text-center hover:scale-105 transition-all hover:bg-orange-200 hover:shadow-lg">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-4xl font-bold text-orange-800">{value}</p>
    </div>
  );
}

// 🟧 COMPONENTE: Últimas 3 ventas
function VentasRecientes() {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    axiosClient.get(API_VENTAS).then(({ data }) => {
      // ⬇ Obtener las últimas 3 ventas (ID más alto)
      setVentas(data.slice(-3).reverse());
    });
  }, []);

  return (
    <table className="min-w-full border border-orange-200 rounded-xl bg-white">
      <thead className="bg-orange-100">
        <tr>
          <th className="p-3 text-left"># Venta</th>
          <th className="p-3 text-left">Cliente</th>
          <th className="p-3 text-left">Fecha</th>
          <th className="p-3 text-right">Total</th>
        </tr>
      </thead>
      <tbody>
        {ventas.length === 0 ? (
          <tr>
            <td colSpan="4" className="p-4 text-center opacity-70">
              No hay ventas recientes.
            </td>
          </tr>
        ) : (
          ventas.map((v) => (
            <tr key={v.id} className="border-t border-orange-100">
              <td className="p-3">{v.id}</td>
              <td className="p-3">{v.clienteNombre}</td>
              <td className="p-3">{v.fecha}</td>
              <td className="p-3 text-right font-semibold text-orange-800">
                ${v.total.toLocaleString()}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
