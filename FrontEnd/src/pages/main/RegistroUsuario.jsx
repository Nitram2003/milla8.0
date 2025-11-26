import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

export default function Registro() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const URL_API ="http://localhost:8080/api/personas/save"


  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password || !email) {
      setError("Por favor completa todos los campos.");
      return;
    }
     // VALIDACIÓN DE DOMINIO
  const emailLower = email.toLowerCase();
  const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

  const dominioValido = dominiosPermitidos.some((dominio) =>
    emailLower.endsWith(dominio)
  );

  if (!dominioValido) {
    setError("El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com");
    return;
  }
    // VALIDACIÓN DE CONTRASEÑA (4-10 CARACTERES)
  if (password.length < 4 || password.length > 10) {
    setError("La contraseña debe tener entre 4 y 10 caracteres.");
    return;
  }
  // VALIDACIÓN: Contraseñas iguales
if (password !== confirmPassword) {
  setError("Las contraseñas no coinciden.");
  return;
}


    try {
  const response = await axios.post(URL_API, {
    username: username,
    email: email,
    password: password,
    rol: "user"
  });

  alert("Registro exitoso. Ahora puedes iniciar sesión.");
  nav("/login");

} catch (error) {
  console.error("Error al registrar el usuario", error);
  setError(error.response?.data?.message || "Error al registrar. Nombre de usuario en uso.");
}
  };

  return (
    <section className="mx-auto max-w-md px-4 py-12">
      <div className="card p-6">
        <h1 className="text-3xl font-bold mb-4">Registrarse</h1>
        <form className="space-y-3" onSubmit={handleRegister}>
          <input
            className="w-full rounded-xl border p-3"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="w-full rounded-xl border p-3"
            placeholder="Correo electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full rounded-xl border p-3"
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
  className="w-full rounded-xl border p-3"
  placeholder="Confirmar contraseña"
  type="password"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
/>

          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button className="btn-primary w-full" type="submit">
            Crear cuenta
          </button>
        </form>

        <p className="text-sm mt-4 opacity-80">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="link">
            Inicia sesión
          </Link>
        </p>
      </div>
    </section>
  );
}
