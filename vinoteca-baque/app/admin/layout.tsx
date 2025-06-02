"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, ShoppingCart, Users } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar"; // Ajusta esta ruta si es necesario

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const getActiveSection = () => {
    if (pathname.startsWith("/admin/usuarios")) return "usuarios";
    if (pathname.startsWith("/admin/productos")) return "productos";
    return "dashboard"; // Página principal /admin
  };

  const activeSection = getActiveSection();

  return (
    <SidebarProvider>
      <div className="flex flex-1 w-full bg-muted/40" style={{ minHeight: 'calc(100vh - 0rem)' }}> {/* Asume que no hay navbar global o ajústalo */}
        <Sidebar>
          <SidebarHeader className="flex h-14 items-center border-b px-6">
            <Link href="/admin" className="flex items-center gap-2 font-semibold">
              <ShoppingCart className="h-6 w-6" />
              <span>Admin Panel</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/admin/usuarios" passHref legacyBehavior>
                  <SidebarMenuButton isActive={activeSection === "usuarios"}>
                    <Users className="mr-2 h-4 w-4" />
                    <span>Usuarios</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/admin/vinos" passHref legacyBehavior>
                  <SidebarMenuButton isActive={activeSection === "productos"}>
                    <Package className="mr-2 h-4 w-4" />
                    <span>Vinos</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}