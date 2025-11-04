import React, { useEffect, useState } from "react";

const Comentarios = () => {
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("comentarios")) || [];
    setComentarios(data);
  }, []);

  return (
    <div className="max-w-5xl mx-auto my-20 bg-rose-50 border-2 border-rose-200 rounded-2xl shadow-lg p-8 text-rose-900 font-poppins">
      <h2 className="text-center text-2xl font-semibold text-rose-600 mb-6">
        Comentarios de Usuarios
      </h2>

      {comentarios.length === 0 ? (
        <p className="text-center text-rose-700 italic">No hay comentarios aún.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-xl shadow-sm overflow-hidden">
            <thead>
              <tr className="bg-rose-100 text-rose-800 uppercase text-sm">
                <th className="px-4 py-3 border-b border-rose-200 text-left">Nombre</th>
                <th className="px-4 py-3 border-b border-rose-200 text-left">Tipo</th>
                <th className="px-4 py-3 border-b border-rose-200 text-left">Mensaje</th>
              </tr>
            </thead>
            <tbody>
              {comentarios.map((c, i) => (
                <tr
                  key={i}
                  className={`${i % 2 === 0 ? "bg-rose-50" : "bg-rose-100"} hover:bg-rose-200 transition`}
                >
                  <td className="px-4 py-3 border-b border-rose-200">{c.nombre}</td>
                  <td className="px-4 py-3 border-b border-rose-200">{c.tipo}</td>
                  <td className="px-4 py-3 border-b border-rose-200">{c.mensaje}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Comentarios;