import { Link } from 'react-router-dom'
const posts = [

  { slug: 'El cuidado de los peluches', title:'Como cuidar tus pelcuches favoritos',Image:<img className="rounded-xl" src="https://i.pinimg.com/736x/b8/29/8c/b8298c280342b61895b76b9e941f8798.jpg" alt="Cómo cuidar tus peluches favoritos" />, excerpt: 'Consejos simples para que duren más.' },
  { slug: 'elige-el-peluche-perfecto', title:'Elige tu peluche perfecto', Image:<img className="rounded-xl" src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt7sao9onTCiqRRDM-jTxMtAv-k9HCuJUV1Q&s" alt="Elige el peluche perfecto" />, excerpt: 'Qué considerar al momento de regalar.' },
  { slug: 'materiales-suaves', title: 'Materiales suaves y seguros', Image:<img className="rounded-xl" src="https://i5.walmartimages.com/seo/Pou-Plush-Toy-Doll-Cute-Hugging-Pillow-Plush-Stuffed-7-9-inch-20CM_4f48896e-fc4a-4d45-8830-95391069a58d.e265a16d123dbe7bfcf90d911ac26221.jpeg" alt="Materiales suaves y seguros" />, excerpt: 'Conoce nuestras telas favoritas.' },
]
export default function Blogs() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 ">
      <h1 className="text-3xl font-bold mb-6">Blogs</h1>
      <div className="grid md:grid-cols-3 gap-6 ">
        {posts.map(p => (
          <article key={p.slug} className="card p-5 hover:shadow-gray-700 transition-all hover:scale-[1.02]">
            <h2 className="text-xl font-semibold mb-2 ">{p.title}</h2>
            <article className="mb-4 justify-items-center">{p.Image}</article>
            <p className="opacity-90 mb-4">{p.excerpt}</p>
            <Link to={`/blog/${p.slug}`} className="btn-ghost">Leer más</Link>
          </article>
        ))}
      </div>
    </section>
  )
}
