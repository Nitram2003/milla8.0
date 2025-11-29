import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";





const API_VENTAS = "http://localhost:8080/api/ventas/all";

export default function VentasAdmin() {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const { data } = await axiosClient.get(API_VENTAS);
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
                <th className="p-3 text-left"># Venta</th>
                <th className="p-3 text-left">Código</th>
                <th className="p-3 text-left">Cliente</th>
                <th className="p-3 text-left">Correo</th>
                <th className="p-3 text-left">Fecha</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Productos</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((v) => (
                <tr key={v.id} className="border-t border-orange-200">
                  <td className="p-3 font-semibold">{v.id}</td>
                  <td className="p-3">{v.codigo}</td>
                  <td className="p-3">{v.clienteNombre}</td>
                  <td className="p-3">{v.clienteCorreo}</td>
                  <td className="p-3">{v.fecha}</td>
                  <td className="p-3 font-bold text-orange-800">${v.total}</td>
                  <td className="p-3">
                    <ul className="list-disc pl-4">
                      {v.detalles.map((p, i) => (
                        <li key={i}>
                          {p.productoNombre} × {p.cantidad} (${p.precioUnitario})
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
