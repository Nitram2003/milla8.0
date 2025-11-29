import React, { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";

export default function Contacto() {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("reclamo");
  const [mensaje, setMensaje] = useState("");

  const [ultimoComentario, setUltimoComentario] = useState(null);
  const [respuestaAdmin, setRespuestaAdmin] = useState(null);

  // =============================
  // 🧡 AUTOCOMPLETAR NOMBRE SI ESTÁ LOGUEADO
  // =============================
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.username) {
      setNombre(user.username);
    }
  }, []);

  // =============================
  // 🧡 CARGAR ÚLTIMO COMENTARIO Y RESPUESTA
  // =============================
  useEffect(() => {
    if (!nombre) return;

    axiosClient.get("http://localhost:8080/api/comentarios/all")
      .then((res) => {
        const comentariosUsuario = res.data.filter(c => c.nombre === nombre);

        if (comentariosUsuario.length > 0) {
          const ultimo = comentariosUsuario[comentariosUsuario.length - 1];
          setUltimoComentario(ultimo);

          if (ultimo.respondido && ultimo.respuesta) {
            setRespuestaAdmin(ultimo.respuesta);
          } else {
            setRespuestaAdmin(null);
          }
        }
      })
      .catch(err => console.error("Error cargando comentarios:", err));
  }, [nombre]);

  // =============================
  // 🧡 ENVIAR COMENTARIO
  // =============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axiosClient.post("http://localhost:8080/api/comentarios/save", {
      nombre,
      tipo,
      mensaje
    });

    alert("Comentario enviado correctamente");

    setMensaje("");

    // refrescar burbujas
    setTimeout(() => {
      axiosClient.get("http://localhost:8080/api/comentarios/all")
        .then((res) => {
          const comentariosUsuario = res.data.filter(c => c.nombre === nombre);
          const ultimo = comentariosUsuario[comentariosUsuario.length - 1];
          setUltimoComentario(ultimo);
        });
    }, 500);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#fff8f3] px-4 py-12">
      <div className="w-full max-w-md bg-white border border-[#ffd6b0] rounded-xl shadow-lg p-8">

        <h2 className="text-2xl font-semibold text-[#7a3b17] mb-6 text-center">
          Contáctanos
        </h2>

        {/* ============================== */}
        {/* 💬 BURBUJA DEL USUARIO */}
        {/* ============================== */}
        {ultimoComentario && (
          <div className="mb-6">
            <div className="bg-gray-100 border border-gray-300 rounded-xl p-4 text-sm shadow w-fit max-w-xs">
              <p className="font-semibold text-gray-700">{ultimoComentario.nombre}</p>
              <p className="italic opacity-80">(Tu último mensaje enviado)</p>
              <p className="mt-1">{ultimoComentario.mensaje}</p>
            </div>
          </div>
        )}

        {/* ============================== */}
        {/* 💚 BURBUJA DEL ADMIN */}
        {/* ============================== */}
        {respuestaAdmin && (
  <div className="mb-6 flex justify-end">
    <div className="bg-green-100 border border-green-400 rounded-xl p-4 shadow w-fit max-w-xs relative">

      <p className="font-semibold text-green-700">
  {ultimoComentario?.adminNombre 
      ? `${ultimoComentario.adminNombre} (admin)` 
      : "Administrador (admin)"}
</p>


      <p className="mt-1">{respuestaAdmin}</p>

      {/* PUNTA DE LA BURBUJA */}
      <div className="absolute bottom-0 right-2 translate-y-3 w-0 h-0 
                      border-l-8 border-l-transparent 
                      border-t-8 border-t-green-400 
                      border-r-8 border-r-transparent"></div>
    </div>
  </div>
)}


        {/* ============================== */}
        {/* FORMULARIO */}
        {/* ============================== */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-[#7a3b17] font-medium text-sm">
            Nombre:
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              readOnly
              className="w-full mt-1 p-3 rounded-lg border border-[#f0c8a4] bg-gray-100 text-[#5a2e1f]"
            />
          </label>

          <label className="text-[#7a3b17] font-medium text-sm">
            Tipo:
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg border border-[#f0c8a4]"
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
              className="w-full mt-1 p-3 rounded-lg border border-[#f0c8a4] resize-none"
            ></textarea>
          </label>

          <button
            type="submit"
            className="mt-3 bg-[#f48c42] hover:bg-[#e6782c] text-white font-semibold py-3 rounded-lg"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
