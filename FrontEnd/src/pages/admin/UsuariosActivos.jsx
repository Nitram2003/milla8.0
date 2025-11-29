import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

const API = "http://localhost:8080/api/personas/all";

export default function Usuarios() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar usuarios desde BD
  async function loadUsers() {
    try {
      setLoading(true);
      const res = await axiosClient.get(API);
      setUsers(res.data);
    } catch (err) {
      console.error("Error cargando usuarios:", err);
    } finally {
      setLoading(false);
    }
  }

  // Ejecutar al entrar a la página
  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">👥 Usuarios registrados</h2>

      {loading ? (
        <p>Cargando usuarios...</p>
      ) : users.length === 0 ? (
        <p>No hay usuarios registrados aún.</p>
      ) : (
        <table className="w-full border border-orange-300 bg-white shadow-md rounded-lg">
          <thead className="bg-orange-200">
            <tr>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Correo</th>
              <th className="p-3 text-left">Rol</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t hover:bg-orange-50">
                <td className="p-3">{u.username}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.rol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
