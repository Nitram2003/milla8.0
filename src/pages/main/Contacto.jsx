import React, { useState } from "react";
import "./Contacto.css";

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
    <div className="contacto-container">
      <h2>Contáctanos</h2>
      <form className="contacto-form" onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label>Tipo:</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="reclamo">Reclamo</option>
          <option value="sugerencia">Sugerencia</option>
          <option value="otro">Otro</option>
        </select>

        <label>Mensaje:</label>
        <textarea
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          rows="5"
          required
        ></textarea>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Contacto;
