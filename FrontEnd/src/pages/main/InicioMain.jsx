import { Link } from 'react-router-dom'
import logo from "/images/LOGO.png";


export default function InicioMain() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7">
          <div className="inline-flex items-center gap-2 bg-orange-200 rounded-full px-3 py-1 mb-4 text-sm">
            <span>🧸</span><span>Peluches que abrazan con el corazón</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Bienvenido a <span className="text-orange-600">Millapeluche</span>
          </h1>
          <p className="text-lg opacity-90 mb-6">
            Descubre nuestra colección de peluches con diseños tiernos y acabados de calidad.
          </p>
          <div className="flex gap-3">
            <Link to="/productos" className="btn-primary">Ver productos</Link>
            <Link to="/nosotros" className="btn-ghost">Conócenos</Link>
          </div>
        </div>
        <div className="md:col-span-5">
          <div className="card p-6 flex items-center justify-center hover:shadow-gray-700 transition-all hover:scale-[1.02]">
            <img src={logo} alt="Millapeluche" className="w-56 h-56 object-contain" />
          </div>
        </div>
      </div>
    </section>
  )
}
