import axios from "axios";
import { useEffect, useState } from "react";

const API = "http://localhost:8080/api/personas";

export default function UsuariosAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    rol: "user"
  });

  const [editing, setEditing] = useState(null);

  // =============================
  // 🔥 Cargar usuarios desde BD
  // =============================
  async function load() {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/all`);
      setItems(res.data);
    } catch (err) {
      console.error("Error cargando usuarios:", err);
    } finally {
      setLoading(false);
    }
  }

  // Cargar la tabla al entrar
  useEffect(() => {
    load();
  }, []);

  function onChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // =============================
  // 🔥 Crear usuario en BD
  // =============================
  async function add() {
    try {
      await axios.post(`${API}/save`, { ...form });
      setForm({ username: "", email: "", password: "", rol: "user" });
      await load();  // <-- recargar tabla desde BD
    } catch (err) {
      alert(err.response?.data?.message || "Error al crear usuario");
    }
  }

  // =============================
  // 🔥 Actualizar usuario en BD
  // =============================
  async function update() {
    try {
      await axios.put(`${API}/update/${editing}`, { ...form });
      setEditing(null);
      setForm({ username: "", email: "", password: "", rol: "user" });
      await load();  // <-- recargar tabla desde BD
    } catch (err) {
      alert(err.response?.data?.message || "Error al actualizar usuario");
    }
  }

  // Cargar datos al formulario
  function edit(it) {
    setEditing(it.id);
    setForm({
      username: it.username,
      email: it.email,
      password: "",
      rol: it.rol
    });
  }

  // =============================
  // 🔥 Eliminar usuario en BD
  // =============================
  async function remove(id) {
    if (!confirm("¿Eliminar usuario?")) return;
    await axios.delete(`${API}/delete/${id}`);
    await load();  // <-- recargar tabla desde BD
  }

  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">Usuarios</h1>

      {/* FORMULARIO */}
      <div className="card p-4 mb-6">
        <div className="grid md:grid-cols-5 gap-3">
          <input
            name="username"
            value={form.username}
            onChange={onChange}
            placeholder="Nombre de usuario"
            className="rounded-xl border p-2"
          />
          <input
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="Correo"
            type="email"
            className="rounded-xl border p-2"
          />
          <input
            name="password"
            value={form.password}
            onChange={onChange}
            placeholder="Contraseña"
            type="password"
            className="rounded-xl border p-2"
          />

          <select
            name="rol"
            value={form.rol}
            onChange={onChange}
            className="rounded-xl border p-2"
          >
            <option value="user">Cliente / User</option>
            <option value="admin">Administrador</option>
          </select>

          {!editing ? (
            <button className="btn-primary" onClick={add}>
              Agregar usuario
            </button>
          ) : (
            <div className="flex gap-2">
              <button className="btn-primary" onClick={update}>
                Guardar cambios
              </button>
              <button
                className="btn-ghost"
                onClick={() => {
                  setEditing(null);
                  setForm({
                    username: "",
                    email: "",
                    password: "",
                    rol: "user"
                  });
                }}
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* TABLA */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-2xl overflow-hidden">
          <thead className="bg-orange-200 text-left">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Usuario</th>
              <th className="p-3">Correo</th>
              <th className="p-3">Rol</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td className="p-3" colSpan="5">Cargando...</td>
              </tr>
            ) : (
              items.map(it => (
                <tr key={it.id} className="border-t">
                  <td className="p-3">{it.id}</td>
                  <td className="p-3">{it.username}</td>
                  <td className="p-3">{it.email}</td>
                  <td className="p-3">{it.rol}</td>
                  <td className="p-3 space-x-2">
                    <button className="btn-ghost" onClick={() => edit(it)}>
                      Editar
                    </button>
                    <button className="btn-ghost" onClick={() => remove(it.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
