export default function Nosotros(){
    return(
        <section className="mx-auto max-w-3xl px-4 py-10 ">
            <article className="p-3 bg-amber-500 bg-opacity-50 rounded-lg mb-6">
                <img className="w-full h-auto rounded-lg" src="https://image2url.com/images/1762258690108-dc074600-4e1c-4d3b-b6fe-58066763a1ac.png" alt="" />
            </article>
            <div className="card p-6 border-4">
                <h1 className="text-3xl font-bold mb-3">Nosotros</h1>
                <article>

                    <p>Somos amantes de los peluches y del buen diseño.</p>

                    <br />
                    
                    <p>Creemos en la importancia de crear productos que no solo sean bonitos, sino también funcionales y duraderos.</p>
                    
                    <br />
                    
                    <p>Haz que cada momento sea eterno con un abrazo. En nuestra tienda, transformamos peluches adorables
                        en tesoros con voz, grabando ese mensaje especial, una risa o una cancion directamente en el corazon de tu nuevo
                        compañero. Regala más que un peluche, regala recuerdos que perduran para siempre.
                    </p>

                </article>

            </div>
            <article className="card p-6 mt-6 border-4 flex"> 
                <p className="flex mt-4">Síguenos en Nuestras redes Sociales para ver nuestras últimas creaciones y promociones especiales.</p>
                <img className="mx-auto mt-4 size-10 ml-4 inline-block hover:shadow-gray-700 transition-all hover:scale-[1.3]" src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/instagram.svg" alt="Instagram Icon" />
                <img className="mx-auto mt-4 size-10 ml-4 inline-block hover:shadow-gray-700 transition-all hover:scale-[1.3]" src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/facebook.svg" alt="Facebook Icon" />
                <img className="mx-auto mt-4 size-10 ml-4 inline-block hover:shadow-gray-700 transition-all hover:scale-[1.3]" src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/whatsapp.svg" alt="WhatsApp Icon" />
            </article>
        </section>
    )

}

