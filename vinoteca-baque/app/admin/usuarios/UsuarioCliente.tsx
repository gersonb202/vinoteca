"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { UserPlus, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import type { Usuario } from "./types";



interface UsuarioClienteProps {
  initialUsuarios: Usuario[];
  errorMessage?: string;
}

export default function UsuarioCliente({ initialUsuarios, errorMessage }: UsuarioClienteProps) {
  const [usuarios, setUsuarios] = useState<Usuario[]>(initialUsuarios);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Estado del formulario, muy simplificado.
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
  });

  useEffect(() => {
    if (errorMessage) {
      toast({ title: "Error al cargar usuarios", description: errorMessage, variant: "destructive" });
    }
  }, [errorMessage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ nombre: "", email: "" });
  };


  const handleEditUser = async () => {
    if (!currentUser) return;
    setIsLoading(true);

    // La acción de servidor solo necesitaría el `user_id` y el nuevo `nombre`.
    // El email no se actualiza aquí.
    // TODO: Reemplazar con `actualizarPerfilAction({ user_id: currentUser.user_id, nombre: formData.nombre })`

    // Simulación:
    const updatedUser: Usuario = {
      ...currentUser,
      nombre: formData.nombre,
    };
    setUsuarios(prev => prev.map(u => (u.id === currentUser.id ? updatedUser : u)));
    toast({ title: "Usuario actualizado (Simulación)", description: "El nombre ha sido actualizado." });
    setIsEditUserOpen(false);
    resetForm();
    setCurrentUser(null);
    // Fin simulación

    setIsLoading(false);
  };

  const handleDeleteUser = async () => {
    if (!currentUser) return;
    setIsLoading(true);

    // La server action usaría el `user_id` para eliminar al usuario.
    // TODO: Reemplazar con `eliminarUsuarioAction(currentUser.user_id)`
    
    // Simulación:
    setUsuarios(prev => prev.filter(u => u.id !== currentUser.id));
    toast({ title: "Usuario eliminado (Simulación)", description: "El usuario ha sido eliminado." });
    setIsDeleteUserOpen(false);
    setCurrentUser(null);
    // Fin simulación
    setIsLoading(false);
  };

  const openEditModal = (user: Usuario) => {
    setCurrentUser(user);
    setFormData({
      nombre: user.nombre || "",
      email: user.email,
    });
    setIsEditUserOpen(true);
  };

  const openDeleteModal = (user: Usuario) => {
    setCurrentUser(user);
    setIsDeleteUserOpen(true);
  };

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Gestión de Usuarios</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            {/* TABLA SIMPLIFICADA */}
            <div className="grid grid-cols-[2fr_2fr_auto] p-4 font-medium border-b">
              <div>Nombre</div><div>Email</div><div>Acciones</div>
            </div>
            {usuarios.map((user) => (
              <div key={user.id} className="grid grid-cols-[2fr_2fr_auto] p-4 border-b last:border-0 items-center">
                <div>{user.nombre || 'N/D'}</div>
                <div>{user.email}</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEditModal(user)}>Editar</Button>
                  <Button variant="destructive" size="sm" onClick={() => openDeleteModal(user)}>Eliminar</Button>
                </div>
              </div>
            ))}
            {usuarios.length === 0 && <div className="p-4 text-center text-muted-foreground">No hay usuarios para mostrar.</div>}
          </div>
        </CardContent>
      </Card>

      {/* Parte de edición */}
      {currentUser && (
        <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader><DialogTitle>Editar Perfil</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-nombre">Nombre</Label>
                <Input id="edit-nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email (no editable)</Label>
                <Input id="edit-email" name="email" type="email" value={formData.email} disabled />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditUserOpen(false)} disabled={isLoading}>Cancelar</Button>
              <Button onClick={handleEditUser} disabled={isLoading}>{isLoading ? "Actualizando..." : "Actualizar Nombre"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal de Eliminación (sin cambios en su estructura) */}
      {currentUser && (
        <Dialog open={isDeleteUserOpen} onOpenChange={setIsDeleteUserOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader><DialogTitle>Eliminar Usuario</DialogTitle>
              <DialogDescription>¿Seguro que quieres eliminar a {currentUser.nombre || currentUser.email}? Esta acción es irreversible.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteUserOpen(false)} disabled={isLoading}>Cancelar</Button>
              <Button variant="destructive" onClick={handleDeleteUser} disabled={isLoading}>{isLoading ? "Eliminando..." : "Eliminar"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}