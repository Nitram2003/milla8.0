import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Nav";
import Footer from "./components/Footer";

export default function App() {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/admin"); // ✅ detecta modo admin

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbar && <Navbar />} {/* solo se muestra fuera del admin */}
      <main className="flex-1">
        <Outlet />
      </main>
      {!hideNavbar && <Footer />}
    </div>
  );
}
