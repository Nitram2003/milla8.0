import axios from 'axios'
import { useEffect, useState } from 'react'

const API = 'http://localhost:5000/productos'

export default function ProductosAdmin() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ nombre: '', descripcion: '', precio: 0, stock: 0, imagen: '' })
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
    await axios.post(API, { ...form, precio: Number(form.precio), stock: Number(form.stock) })
    setForm({ nombre: '', descripcion: '', precio: 0, stock: 0, imagen: '' })
    load()
  }
  async function update() {
    await axios.put(`${API}/${editing}`, { ...form, precio: Number(form.precio), stock: Number(form.stock) })
    setEditing(null)
    setForm({ nombre: '', descripcion: '', precio: 0, stock: 0, imagen: '' })
    load()
  }
  async function edit(it) {
    setEditing(it.id)
    setForm({ nombre: it.nombre, descripcion: it.descripcion, precio: it.precio, stock: it.stock, imagen: it.imagen || '' })
  }
  async function remove(id) {
    await axios.delete(`${API}/${id}`)
    load()
  }

  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">Productos</h1>
      <div className="card p-4 mb-6">
        <div className="grid md:grid-cols-5 gap-3">
          <input name="nombre" value={form.nombre} onChange={onChange} placeholder="Nombre" className="rounded-xl border p-2" />
          <input name="descripcion" value={form.descripcion} onChange={onChange} placeholder="Descripción" className="rounded-xl border p-2" />
          <input name="precio" value={form.precio} onChange={onChange} placeholder="Precio" type="number" className="rounded-xl border p-2" />
          <input name="stock" value={form.stock} onChange={onChange} placeholder="Stock" type="number" className="rounded-xl border p-2" />
          <input name="imagen" value={form.imagen} onChange={onChange} placeholder="URL Imagen" className="rounded-xl border p-2" />
        </div>
        <div className="mt-3">
          {!editing ? (
            <button className="btn-primary" onClick={add}>Agregar producto</button>
          ) : (
            <div className="flex gap-2">
              <button className="btn-primary" onClick={update}>Guardar cambios</button>
              <button className="btn-ghost" onClick={() => { setEditing(null); setForm({ nombre:'', descripcion:'', precio:0, stock:0, imagen:'' })}}>Cancelar</button>
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
              <th className="p-3">Precio</th>
              <th className="p-3">Stock</th>
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
                <td className="p-3">${it.precio}</td>
                <td className="p-3">{it.stock}</td>
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
