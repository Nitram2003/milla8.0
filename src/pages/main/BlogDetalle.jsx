import { useParams, Link } from 'react-router-dom'
export default function BlogDetalle() {
  const { slug } = useParams()
  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <div className="card p-6">
        <h1 className="text-3xl font-bold mb-3">Entrada: {slug}</h1>
        <p className="opacity-90 mb-4 font-bold">  Acontinuación, unas breves recomendaciones para el cuidado
              y preservación de sus preciados peluches <strong>{slug}</strong>.</p>
        <article className="font-bold text-xl">
          <p className="mb-2">
              Paso 1: Limpieza Regular
              Sacude el peluche suavemente para remover el polvo suelto. 
              Usa un cepillo suave o una aspiradora con boquilla de 
              cepillo a baja potencia para limpiar la superficie. 
              Si está sucio, lava a mano con agua tibia y jabón suave, 
              enjuaga bien y deja secar al aire en un lugar sombreado, 
              sin exprimir para evitar deformaciones.
          </p>
          <img className="scale-75 rounded-xl" src="/images/1.jpg" alt="limpieza de peluches" />
          <p className="mb-4">
            Paso 2: Almacenamiento Adecuado
            Guarda los peluches en un lugar fresco, seco y oscuro,
            como un armario o caja de plástico con ventilación. 
            Evita apilarlos pesadamente para no aplastarlos, y usa 
            bolsas de tela transpirable
            si los guardas por mucho tiempo para prevenir el moho.
          </p>
          <img className="scale-75 rounded-xl" src="/images/2.jpg" alt="almacenamiento de peluches" />
          <p className="mb-4">
            Paso 3: Manejo Cuidadoso
            Manipula los peluches por el cuerpo principal, 
            no por orejas o extremidades, para evitar rasgaduras. 
            Manténlos alejados de niños pequeños o mascotas que 
            puedan morderlos. Si los usas como decoración, 
            rota su posición para que no se desgasten en un solo lado.
          </p>
          <img className="scale-75 rounded-xl" src="/images/3.jpg" alt="manejo de peluches" />
          <p className="mb-4">
            Paso 4: Protección contra Daños
            Aleja los peluches de la luz solar directa para prevenir 
            decoloración, y de fuentes de calor como 
            radiadores. Usa repelentes naturales como bolsitas de
            lavanda para ahuyentar insectos, y verifica periódicamente 
            por signos de desgaste como costuras sueltas.
          </p>
          <img className="scale-75 rounded-xl" src="/images/4.jpg" alt="Protección de peluches" />
          <p className="mb-4">
            Paso 5: Reparaciones Básicas
            Si hay un rasgado pequeño, cose con hilo del mismo color 
            usando puntadas simples y firmes. Para pelusa apelmazada, 
            cepilla suavemente con un peine de dientes anchos. Si el 
            relleno se sale, rellena con material similar y cose. 
            Consulta a un profesional para daños mayores.
          </p>
          <img className="scale-75 rounded-xl" src="/public/images/5.jpg" alt="reparacion de peluches" />
        </article>
        <Link to="/blogs" className="btn-ghost">← Volver a Blogs</Link>
      </div>
    </section>
  )
}
