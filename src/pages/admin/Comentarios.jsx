import React, { useEffect, useState } from "react";
import "./Comentarios.css";

const Comentarios = () => {
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("comentarios")) || [];
    setComentarios(data);
  }, []);

  return (
    <div className="comentarios-container">
      <h2>Comentarios de Usuarios</h2>
      {comentarios.length === 0 ? (
        <p>No hay comentarios aún.</p>
      ) : (
        <table className="tabla-comentarios">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Mensaje</th>
            </tr>
          </thead>
          <tbody>
            {comentarios.map((c, i) => (
              <tr key={i}>
                <td>{c.nombre}</td>
                <td>{c.tipo}</td>
                <td>{c.mensaje}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Comentarios;
