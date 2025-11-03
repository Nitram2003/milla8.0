import axios from 'axios'
import { useEffect, useState } from 'react'

const API = 'http://localhost:5000/usuarios'

export default function UsuariosAdmin() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ nombre: '', correo: '', rol: 'cliente' })
  const [editing, setEditing] = useState(null)

  async function load() {
    setLoading(true)
    const { data } = await axios.get(API)
    setItems(data)
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  function onChange(e) { setForm(prev => ({ ...prev, [e.target.name]: e.target.value })) }

  async function add() {
    await axios.post(API, { ...form })
    setForm({ nombre: '', correo: '', rol: 'cliente' })
    load()
  }
  async function update() {
    await axios.put(`${API}/${editing}`, { ...form })
    setEditing(null)
    setForm({ nombre: '', correo: '', rol: 'cliente' })
    load()
  }
  function edit(it) {
    setEditing(it.id)
    setForm({ nombre: it.nombre, correo: it.correo, rol: it.rol })
  }
  async function remove(id) {
    await axios.delete(`${API}/${id}`)
    load()
  }

  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">Usuarios</h1>
      <div className="card p-4 mb-6">
        <div className="grid md:grid-cols-4 gap-3">
          <input name="nombre" value={form.nombre} onChange={onChange} placeholder="Nombre" className="rounded-xl border p-2" />
          <input name="correo" value={form.correo} onChange={onChange} placeholder="Correo" type="email" className="rounded-xl border p-2" />
          <select name="rol" value={form.rol} onChange={onChange} className="rounded-xl border p-2">
            <option value="cliente">Cliente</option>
            <option value="admin">Admin</option>
          </select>
          {!editing ? (
            <button className="btn-primary" onClick={add}>Agregar usuario</button>
          ) : (
            <div className="flex gap-2">
              <button className="btn-primary" onClick={update}>Guardar cambios</button>
              <button className="btn-ghost" onClick={() => { setEditing(null); setForm({ nombre:'', correo:'', rol:'cliente' })}}>Cancelar</button>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-2xl overflow-hidden">
          <thead className="bg-orange-200 text-left">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Nombre</th>
              <th className="p-3">Correo</th>
              <th className="p-3">Rol</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="p-3" colSpan="5">Cargando...</td></tr>
            ) : items.map(it => (
              <tr key={it.id} className="border-t">
                <td className="p-3">{it.id}</td>
                <td className="p-3">{it.nombre}</td>
                <td className="p-3">{it.correo}</td>
                <td className="p-3">{it.rol}</td>
                <td className="p-3 space-x-2">
                  <button className="btn-ghost" onClick={() => edit(it)}>Editar</button>
                  <button className="btn-ghost" onClick={() => remove(it.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
