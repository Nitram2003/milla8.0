import App from './App'
import ProtectedRoute from './pages/admin/ProtectedRoute.jsx'

import InicioMain from './pages/main/InicioMain.jsx'
import Productos from './pages/main/Productos.jsx'
import ProductoDetalle from './pages/main/ProductoDetalle.jsx'
import Blogs from './pages/main/Blogs.jsx'
import BlogDetalle from './pages/main/BlogDetalle.jsx'
import Nosotros from './pages/main/Nosotros.jsx'
import Contacto from './pages/main/Contacto.jsx'
import Login from './pages/main/Login.jsx'
import RegistroUsuario from './pages/main/RegistroUsuario.jsx'
import Carrito from './pages/main/Carrito.jsx'
import CompraExitosa from './pages/main/CompraExitosa.jsx';
import Pago from './pages/main/Pago.jsx';





import AdminLayout from './pages/admin/AdminLayout.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import ProductosAdmin from './pages/admin/ProductosAdmin.jsx'
import UsuariosAdmin from './pages/admin/UsuariosAdmin.jsx'
import InformesAdmin from './pages/admin/InformesAdmin.jsx'
import VentasAdmin from './pages/admin/VentasAdmin.jsx';
import Comentarios from './pages/admin/Comentarios.jsx';
import UsuariosActivos from './pages/admin/UsuariosActivos.jsx';


function RouteError() {
  return (
    <section className="mx-auto max-w-xl px-4 py-20 text-center">
      <div className="card p-8">
        <div className="text-6xl mb-3">🧸</div>
        <h1 className="text-3xl font-bold text-orange-800 mb-2">Página no encontrada</h1>
        <p className="opacity-80 mb-4">La página no existe o ocurrió un error inesperado.</p>
        <a href="/" className="btn-primary">Volver al inicio</a>
      </div>
    </section>
  );
}

const routes = [
  {
    element: <App />,
    errorElement: <RouteError />,
    children: [
      { path: '/', element: <InicioMain /> },
      { path: '/productos', element: <Productos /> },
      { path: '/producto', element: <ProductoDetalle /> },
      { path: '/blogs', element: <Blogs /> },
      { path: '/blog/:slug', element: <BlogDetalle /> },
      { path: '/nosotros', element: <Nosotros /> },
      { path: '/contacto', element: <Contacto /> },
      { path: '/login', element: <Login /> },
      { path: '/registro', element: <RegistroUsuario /> },
      { path: '/carrito', element: <Carrito /> },
      { path: '/compra-exitosa', element: <CompraExitosa /> },
      { path: '/pago', element: <Pago /> },
      



      // Admin protected
      {
        path: '/admin',
        element: (
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: '/admin', element: <Dashboard /> },
          { path: '/admin/productos', element: <ProductosAdmin /> },
          { path: '/admin/usuarios', element: <UsuariosAdmin /> },
          { path: '/admin/informes', element: <InformesAdmin /> },
          { path: '/admin/ventas', element: <VentasAdmin /> },
          { path: '/admin/comentarios', element: <Comentarios />},
          {path: '/admin/usuarios-activos', element: <UsuariosActivos />}

        ]
      },
    ]
  }
]

export default routes