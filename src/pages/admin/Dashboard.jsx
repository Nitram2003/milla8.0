import { useEffect, useState } from "react";
import axios from "axios";

const API_VENTAS = "http://localhost:5000/ventas";
const API_PRODUCTOS = "http://localhost:5000/productos";
const API_USUARIOS = "http://localhost:5000/usuarios";

export default function Dashboard() {
  const [totalVentas, setTotalVentas] = useState(0);
  const [montoTotal, setMontoTotal] = useState(0);
  const [productos, setProductos] = useState(0);
  const [usuarios, setUsuarios] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const [vRes, pRes, uRes] = await Promise.all([
        axios.get(API_VENTAS),
        axios.get(API_PRODUCTOS),
        axios.get(API_USUARIOS)
      ]);
      setTotalVentas(vRes.data.length);
      setMontoTotal(vRes.data.reduce((sum, v) => sum + v.total, 0));
      setProductos(pRes.data.length);
      setUsuarios(uRes.data.length);
    };
    fetchData();
  }, []);

  return (
    <section>
      <h1 className="text-3xl font-bold mb-8 text-orange-900">
        Panel de control 🧸
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-orange-100 border border-orange-300 p-6 text-center hover:scale-105 transition-all hover:bg-orange-200 hover:shadow-lg">
          <h2 className="text-lg font-semibold">Total ventas</h2>
          <p className="text-4xl font-bold text-orange-800">{totalVentas}</p>
        </div>

        <div className="card bg-orange-100 border border-orange-300 p-6 text-center hover:scale-105 transition-all hover:bg-orange-200 hover:shadow-lg">
          <h2 className="text-lg font-semibold">Monto total</h2>
          <p className="text-4xl font-bold text-orange-800">
            ${montoTotal.toLocaleString()}
          </p>
        </div>

        <div className="card bg-orange-100 border border-orange-300 p-6 text-center hover:scale-105 transition-all hover:bg-orange-200 hover:shadow-lg">
          <h2 className="text-lg font-semibold">Productos</h2>
          <p className="text-4xl font-bold text-orange-800">{productos}</p>
        </div>

        <div className="card bg-orange-100 border border-orange-300 p-6 text-center hover:scale-105 transition-all hover:bg-orange-200 hover:shadow-lg">
          <h2 className="text-lg font-semibold">Usuarios</h2>
          <p className="text-4xl font-bold text-orange-800">{usuarios}</p>
        </div>
      </div>

      <div className="mt-10 bg-white/90 p-6 rounded-xl shadow-md ">
        <h2 className="text-xl font-semibold mb-3 text-orange-900">
          Últimas ventas
        </h2>
        {/* tabla simple */}
        <VentasRecientes />
      </div>
    </section>
  );
}

// Pequeño subcomponente para mostrar últimas 3 ventas
function VentasRecientes() {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    axios.get(API_VENTAS).then(({ data }) => {
      setVentas(data.slice(-3).reverse());
    });
  }, []);

  return (
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
        {ventas.length === 0 ? (
          <tr>
            <td colSpan="4" className="p-4 text-center opacity-70">
              No hay ventas recientes.
            </td>
          </tr>
        ) : (
          ventas.map((v) => (
            <tr key={v.idPedido} className="border-t border-orange-100">
              <td className="p-3">{v.idPedido}</td>
              <td className="p-3">{v.cliente}</td>
              <td className="p-3">{v.fecha}</td>
              <td className="p-3 text-right font-semibold text-orange-800">
                ${v.total}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
