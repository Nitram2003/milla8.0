import { useParams, Link } from 'react-router-dom'
export default function BlogDetalle() {
  const { slug } = useParams()
  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <div className="card p-6">
        <h1 className="text-3xl font-bold mb-3">Entrada: {slug}</h1>
        <p className="opacity-90 mb-4">Detalle del blog para <strong>{slug}</strong>. Aquí iría el contenido real.</p>
        <Link to="/blogs" className="btn-ghost">← Volver a Blogs</Link>
      </div>
    </section>
  )
}
