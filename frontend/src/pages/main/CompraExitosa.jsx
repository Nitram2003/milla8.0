import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CompraExitosa() {
  const [pedido, setPedido] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const id =
      "MP-" +
      new Date().toISOString().slice(0, 10).replace(/-/g, "") +
      "-" +
      Math.floor(1000 + Math.random() * 9000);
    setPedido(id);

    const t = setTimeout(() => nav("/"), 6000);
    return () => clearTimeout(t);
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
