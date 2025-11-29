import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function CompraExitosa() {
  const nav = useNavigate();
  const location = useLocation();

  // Obtiene el código del pedido desde navigate()
  const pedido = location.state?.pedido || "SIN-CODIGO";

  useEffect(() => {
    const timer = setTimeout(() => {
      nav("/");
    }, 3000); // 5 segundos

    return () => clearTimeout(timer);
  }, [nav]);

  return (
    <section className="mx-auto max-w-2xl px-4 py-16 text-center">
      <div className="card p-8">
        <div className="text-6xl mb-4">🧸</div>

        <h1 className="text-3xl font-bold text-orange-800 mb-2">
          ¡Compra realizada con éxito!
        </h1>

        <p className="opacity-90 mb-4">
          Gracias por confiar en <strong>Millapeluche</strong>.
        </p>

        <div className="bg-orange-100 border border-orange-300 rounded-xl p-4 inline-block mb-4">
          <p className="text-sm opacity-80">Número de pedido:</p>
          <p className="text-lg font-bold text-orange-700">{pedido}</p>
        </div>

        <p className="text-sm opacity-70">
          Serás redirigido al inicio en unos segundos…
        </p>
      </div>
    </section>
  );
}
