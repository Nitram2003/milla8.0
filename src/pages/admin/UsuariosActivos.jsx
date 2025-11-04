import { useEffect, useState } from "react";

export default function Usuarios() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(allUsers);
  }, []);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">👥 Usuarios registrados</h2>

      {users.length === 0 ? (
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
            {users.map((u, i) => (
              <tr key={i} className="border-t hover:bg-orange-50">
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