import { useEffect, useState } from "react";
import axios from "axios";

const API_VENTAS = "http://localhost:5000/ventas";

export default function VentasAdmin() {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const { data } = await axios.get(API_VENTAS);
        setVentas(data);
      } catch (error) {
        console.error("Error cargando ventas:", error);
      }
    };
    fetchVentas();
  }, []);

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-orange-800">
        Ventas registradas
      </h1>

      {ventas.length === 0 ? (
        <p className="opacity-80">Aún no hay transacciones.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-orange-300 rounded-xl bg-white/90">
            <thead className="bg-orange-100">
              <tr>
                <th className="p-3 text-left"># Pedido</th>
                <th className="p-3 text-left">Cliente</th>
                <th className="p-3 text-left">Correo</th>
                <th className="p-3 text-left">Fecha</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Productos</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((v) => (
                <tr key={v.idPedido} className="border-t border-orange-200">
                  <td className="p-3 font-semibold">{v.idPedido}</td>
                  <td className="p-3">{v.cliente}</td>
                  <td className="p-3">{v.correo}</td>
                  <td className="p-3">{v.fecha}</td>
                  <td className="p-3 font-bold text-orange-800">${v.total}</td>
                  <td className="p-3">
                    <ul className="list-disc pl-4">
                      {v.productos.map((p, i) => (
                        <li key={i}>
                          {p.nombre} × {p.cantidad} (${p.precio})
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
