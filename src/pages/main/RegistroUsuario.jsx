export default function RegistroUsuario() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-12">
      <div className="card p-6">
        <h1 className="text-3xl font-bold mb-4">Registro de Usuario</h1>
        <form className="grid grid-cols-1 gap-3">
          <input className="rounded-xl border p-3" placeholder="RUN" />
          <div className="grid grid-cols-2 gap-3">
            <input className="rounded-xl border p-3" placeholder="Nombres" />
            <input className="rounded-xl border p-3" placeholder="Apellidos" />
          </div>
          <input className="rounded-xl border p-3" placeholder="Correo" type="email" />
          <div className="grid grid-cols-2 gap-3">
            <input className="rounded-xl border p-3" placeholder="Contraseña" type="password" />
            <input className="rounded-xl border p-3" placeholder="Confirmar contraseña" type="password" />
          </div>
          <button className="btn-primary" type="button">Registrarse</button>
        </form>
      </div>
    </section>
  )
}
