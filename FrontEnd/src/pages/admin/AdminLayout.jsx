import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[#fff9f4] text-[#3a2d28]">
      
      {/* Sidebar */}
      <AdminSidebar />

      {/* Contenido del panel */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
