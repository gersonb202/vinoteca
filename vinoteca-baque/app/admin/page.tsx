import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Bienvenido al Panel de Administración</CardTitle>
          <CardDescription>
            Gestiona los usuarios y productos de tu eCommerce.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Selecciona una sección del menú lateral para comenzar.</p>
        </CardContent>
      </Card>
    </div>
  );
}