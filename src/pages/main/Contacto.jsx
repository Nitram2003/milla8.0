import React, { useState } from "react";

const Contacto = () => {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("reclamo");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoComentario = { nombre, tipo, mensaje };
    const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
    comentarios.push(nuevoComentario);
    localStorage.setItem("comentarios", JSON.stringify(comentarios));
    alert("Comentario enviado correctamente");
    setNombre("");
    setTipo("reclamo");
    setMensaje("");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#fff8f3] bg-[radial-gradient(#f5e4da_1px,transparent_1px)] [background-size:20px_20px] font-poppins text-[#5a2e1f]">
      <div className="w-full max-w-md bg-white border border-[#ffd6b0] rounded-xl shadow-[0_4px_15px_rgba(255,170,120,0.2)] p-8 mx-4">
        <h2 className="text-2xl font-semibold text-[#7a3b17] mb-6 text-center">
          Contáctanos
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-[#7a3b17] font-medium text-sm">
            Nombre:
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="w-full mt-1 p-3 rounded-lg border border-[#f0c8a4] bg-[#fffaf7] text-[#5a2e1f] focus:border-[#f48c42] focus:ring-2 focus:ring-[#f48c42]/30 outline-none transition"
            />
          </label>

          <label className="text-[#7a3b17] font-medium text-sm">
            Tipo:
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg border border-[#f0c8a4] bg-[#fffaf7] text-[#5a2e1f] focus:border-[#f48c42] focus:ring-2 focus:ring-[#f48c42]/30 outline-none transition"
            >
              <option value="reclamo">Reclamo</option>
              <option value="sugerencia">Sugerencia</option>
              <option value="otro">Otro</option>
            </select>
          </label>

          <label className="text-[#7a3b17] font-medium text-sm">
            Mensaje:
            <textarea
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              rows="5"
              required
              className="w-full mt-1 p-3 rounded-lg border border-[#f0c8a4] bg-[#fffaf7] text-[#5a2e1f] focus:border-[#f48c42] focus:ring-2 focus:ring-[#f48c42]/30 outline-none resize-none transition"
            ></textarea>
          </label>

          <button
            type="submit"
            className="mt-3 bg-[#f48c42] hover:bg-[#e6782c] text-white font-semibold py-3 rounded-lg transition-transform duration-300 hover:-translate-y-0.5"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contacto;