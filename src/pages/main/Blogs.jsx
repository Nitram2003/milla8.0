import { Link } from 'react-router-dom'
const posts = [
  { slug: 'cuidado-peluches', title: 'Cómo cuidar tus peluches favoritos', excerpt: 'Consejos simples para que duren más.' },
  { slug: 'elige-el-peluche-perfecto', title: 'Elige el peluche perfecto', excerpt: 'Qué considerar al momento de regalar.' },
  { slug: 'materiales-suaves', title: 'Materiales suaves y seguros', excerpt: 'Conoce nuestras telas favoritas.' },
]
export default function Blogs() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Blogs</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map(p => (
          <article key={p.slug} className="card p-5">
            <h2 className="text-xl font-semibold mb-2">{p.title}</h2>
            <p className="opacity-90 mb-4">{p.excerpt}</p>
            <Link to={`/blog/${p.slug}`} className="btn-ghost">Leer más</Link>
          </article>
        ))}
      </div>
    </section>
  )
}
