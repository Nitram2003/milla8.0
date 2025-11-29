import axiosClient from "../../api/axiosClient";
import { useEffect, useState } from "react";

export default function Comentarios() {
  const [comentarios, setComentarios] = useState([]);
  const [respuesta, setRespuesta] = useState("");

  const load = async () => {
    const res = await axiosClient.get("http://localhost:8080/api/comentarios/all");
    setComentarios(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const responder = async (id) => {
    await axiosClient.post(`http://localhost:8080/api/comentarios/responder/${id}`, {
      respuesta
    });
    setRespuesta("");
    load();
    alert("Respuesta enviada");
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Comentarios</h1>

      <table className="w-full bg-white shadow rounded-xl">
        <thead className="bg-orange-100">
          <tr>
            <th className="p-3">Nombre</th>
            <th className="p-3">Tipo</th>
            <th className="p-3">Mensaje</th>
            <th className="p-3">Respuesta</th>
          </tr>
        </thead>
        <tbody>
          {comentarios.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="p-3">{c.nombre}</td>
              <td className="p-3">{c.tipo}</td>
              <td className="p-3">{c.mensaje}</td>
              <td className="p-3">
                {c.respondido ? (
                  <span className="text-green-600">{c.respuesta}</span>
                ) : (
                  <div className="flex gap-2">
                    <input
                      className="border p-2 rounded-lg"
                      value={respuesta}
                      onChange={(e) => setRespuesta(e.target.value)}
                      placeholder="Escribe respuesta…"
                    />
                    <button
                      className="bg-orange-400 text-white px-3 rounded-lg"
                      onClick={() => responder(c.id)}
                    >
                      Enviar
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
