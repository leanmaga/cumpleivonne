import AdminDashboard from "@/components/dashboard/AdminDashboard";

// Panel de administración para el Baby Shower
const eventName = "Baby Shower";

export default function AdminPage() {
  return <AdminDashboard />;
}

export const metadata = {
  title: `Panel de Administración - ${eventName}`,
  description: "Dashboard para gestionar confirmaciones de asistencia",
  robots: "noindex, nofollow", // Evita que Google indexe esta página
};
