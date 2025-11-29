import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const API_VENTAS = "http://localhost:8080/api/ventas/all";
const API_PRODUCTOS = "http://localhost:8080/api/productos/all";

export default function InformesAdmin() {
  const [ventas, setVentas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Filtros de fecha
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

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

    fetchData();
  }, []);

  // Filtrar ventas según fechas
  const ventasFiltradas = ventas.filter((v) => {
    const fecha = new Date(v.fecha);

    if (fechaInicio && fecha < new Date(fechaInicio)) return false;
    if (fechaFin && fecha > new Date(fechaFin)) return false;

    return true;
  });

  // Cálculos
  const totalVentas = ventasFiltradas.length;
  const montoTotal = ventasFiltradas.reduce((sum, v) => sum + v.total, 0);
  const productosVendidos = ventasFiltradas.reduce(
    (sum, v) =>
      sum + v.detalles.reduce((acc, p) => acc + p.cantidad, 0),
    0
  );

  // Procesar ventas por día
  const ventasPorDia = {};

  ventasFiltradas.forEach((v) => {
    const fecha = v.fecha.substring(0, 10); // YYYY-MM-DD

    if (!ventasPorDia[fecha]) {
      ventasPorDia[fecha] = { total: 0, monto: 0 };
    }

    ventasPorDia[fecha].total++;
    ventasPorDia[fecha].monto += v.total;
  });

  const labels = Object.keys(ventasPorDia);
  const dataVentas = labels.map((f) => ventasPorDia[f].total);
  const dataMontos = labels.map((f) => ventasPorDia[f].monto);

  // Datos para ChartJS
  const chartData = {
    labels,
    datasets: [
      {
        label: "Ventas por día",
        data: dataVentas,
        borderColor: "#f97316",
        backgroundColor: "rgba(249, 115, 22, 0.3)",
        tension: 0.3,
      },
      {
        label: "Monto recaudado ($)",
        data: dataMontos,
        borderColor: "#ea580c",
        backgroundColor: "rgba(234, 88, 12, 0.3)",
        tension: 0.3,
      },
    ],
  };

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-orange-900">
        📊 Informes de Ventas
      </h1>

      {/* FILTRO DE FECHAS */}
      <div className="mb-8 p-4 bg-orange-50 border border-orange-200 rounded-xl">
        <h2 className="text-lg font-semibold mb-4 text-orange-900">Filtrar por fecha</h2>

        <div className="flex gap-6 flex-wrap">
          <div>
            <label className="block font-semibold mb-1">Inicio:</label>
            <input
              type="date"
              className="p-2 border rounded"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Fin:</label>
            <input
              type="date"
              className="p-2 border rounded"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* TARJETAS */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card title="Total Ventas" value={totalVentas} />
        <Card title="Monto Total" value={`$${montoTotal.toLocaleString()}`} />
        <Card title="Productos Vendidos" value={productosVendidos} />
      </div>

      {/* GRAFICO */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-4 text-orange-900">
          📈 Ventas por día
        </h2>
        <Line data={chartData} />
      </div>

      {/* TABLA */}
      <div className="bg-white/90 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-orange-900">
          Detalle de ventas recientes
        </h2>

        <VentasRecientes ventas={ventasFiltradas} />
      </div>

      <p className="mt-6 text-sm text-gray-500">
        Última actualización:{" "}
        <span className="font-semibold text-orange-700">{lastUpdate}</span>
      </p>
    </section>
  );
}

function Card({ title, value }) {
  return (
    <div className="card bg-orange-100 border border-orange-300 p-6 text-center hover:scale-105 transition-all hover:bg-orange-200 hover:shadow-lg">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-4xl font-bold text-orange-800">{value}</p>
    </div>
  );
}

function VentasRecientes({ ventas }) {
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
        {ventas
          .slice()
          .reverse()
          .slice(0, 5)
          .map((v) => (
            <tr key={v.id} className="border-t border-orange-100">
              <td className="p-3">{v.id}</td>
              <td className="p-3">{v.clienteNombre}</td>
              <td className="p-3">{v.fecha}</td>
              <td className="p-3 text-right font-semibold text-orange-800">
                ${v.total.toLocaleString()}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
