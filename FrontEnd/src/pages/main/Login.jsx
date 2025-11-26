import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      if (storedUser.rol === "admin") nav("/admin");
      else nav("/");
    }
  }, [nav]);

  const onSubmit = (e) => {
    e.preventDefault();

    // Credenciales admin
    if (user === "admin" && pass === "admin") {
      localStorage.setItem(
        "user",
        JSON.stringify({ username: "admin", rol: "admin" })
      );
      nav("/admin");
      return;
    }

    // Buscar usuario registrado
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find((u) => u.username === user && u.password === pass);

    if (found) {
      localStorage.setItem("user", JSON.stringify(found));
      nav("/");
    } else {
      setError("Credenciales inválidas. Inténtalo nuevamente.");
    }
  };

  return (
    <section className="mx-auto max-w-md px-4 py-12">
      <div className="card p-6">
        <h1 className="text-3xl font-bold mb-4">Iniciar sesión</h1>
        <form className="space-y-3" onSubmit={onSubmit}>
          <input
            className="w-full rounded-xl border p-3"
            placeholder="Usuario"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            className="w-full rounded-xl border p-3"
            placeholder="Contraseña"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button className="btn-primary w-full" type="submit">
            Entrar
          </button>
        </form>
        <p className="text-sm mt-4 opacity-80">
          ¿No tienes cuenta?{" "}
          <Link to="/registro" className="link">
            Regístrate
          </Link>
        </p>
      </div>
    </section>
  );
}
