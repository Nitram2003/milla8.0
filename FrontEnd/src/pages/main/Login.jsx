import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

export default function Login() {
  const nav = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const URL_LOGIN = "/api/personas/login";

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    // Si ya existe token guardado → dejar entrar automáticamente
    if (storedUser && token) {
      if (storedUser.rol === "admin") nav("/admin");
      else nav("/");
    }
  }, [nav]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 🔥 Login al backend usando axiosClient
      const response = await axiosClient.post(URL_LOGIN, {
        username: user.trim(),
        password: pass.trim(),
      });

      const userData = response.data;

      // 🔥 Guardar token JWT
      localStorage.setItem("token", userData.token);

      // 🔥 Guardar usuario completo (incluye rol)
      localStorage.setItem("user", JSON.stringify(userData));

      // 🔥 Redirección según rol
      if (userData.rol === "admin") nav("/admin");
      else nav("/");

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Credenciales inválidas. Inténtalo nuevamente."
      );
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
