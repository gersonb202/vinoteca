"use client";

import type React from "react";
import { useState, useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"; // Input podría no ser necesario para editar, pero sí para el nombre en el formulario de creación (si lo tuvieras)
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import type { Tipo } from "./types";
import { actualizarTipoAction, eliminarTipoAction } from './actions';

interface TiposClienteProps {
  initialTipos: Tipo[];
}

export default function TiposCliente({
  initialTipos
}: TiposClienteProps) {
  const [tipos, setTipos] = useState<Tipo[]>(initialTipos);
  const [isEditTipoOpen, setIsEditTipoOpen] = useState(false);
  const [isDeleteTipoOpen, setIsDeleteTipoOpen] = useState(false);
  const [currentTipo, setCurrentTipo] = useState<Tipo | null>(null);
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    descripcion: "",
  });

  useEffect(() => {
    setTipos(initialTipos);
  }, [initialTipos]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      descripcion: "",
    });
  };

  const handleEditTipo = async () => {
    if (!currentTipo || !currentTipo.nombre) { // Asegurarse que currentTipo y su nombre existen
      toast({ title: "Error", description: "No se ha seleccionado un tipo válido.", variant: "destructive" });
      return;
    }

    const payload = {
      nombre: currentTipo.nombre, // <--- CAMBIO: Usar currentTipo.nombre
      descripcion: formData.descripcion,
    };

    startTransition(async () => {
      const result = await actualizarTipoAction(payload);

      if (result?.error) {
        toast({ title: "Error al actualizar", description: result.error, variant: "destructive" });
      } else if (result?.data) {
        toast({ title: "Tipo actualizado", description: `"${result.data.nombre}" ha sido modificado.` });
        setIsEditTipoOpen(false);
        resetForm();
        setCurrentTipo(null);
        // El useEffect [initialTipos] se encargará de actualizar la lista debido a revalidatePath
      }
    });
  };

  const handleDeleteTipo = async () => {
    if (!currentTipo || !currentTipo.nombre) { // Asegurarse que currentTipo y su nombre existen
      toast({ title: "Error", description: "No se ha seleccionado un tipo válido.", variant: "destructive" });
      return;
    }


    startTransition(async () => {
      const result = await eliminarTipoAction(currentTipo.nombre); // <--- CAMBIO: Pasar currentTipo.nombre

      if (result?.error) {
        toast({ title: "Error al eliminar", description: result.error, variant: "destructive" });
      } else if (result?.data) { // Comprobar si data existe, aunque solo contenga el nombre
        toast({ title: "Tipo eliminado", description: `El tipo "${result.data.nombre}" ha sido eliminado.` });
        setIsDeleteTipoOpen(false);
        setCurrentTipo(null);
        // El useEffect [initialTipos] se encargará de actualizar la lista debido a revalidatePath
      }
    });
  };

  const openEditModal = (tipo: Tipo) => {
    setCurrentTipo(tipo);
    setFormData({
      descripcion: tipo.descripcion || "",
    });
    setIsEditTipoOpen(true);
  };

  const openDeleteModal = (tipo: Tipo) => {
    setCurrentTipo(tipo);
    setIsDeleteTipoOpen(true);
  };

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Tipos</CardTitle>
          <CardDescription>Administra los tipos disponibles.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <div className="hidden md:grid md:grid-cols-[2fr_3fr_auto] p-4 font-medium border-b items-center gap-x-4">
              <div>Nombre</div>
              <div>Descripción</div>
              <div className="text-right">Acciones</div>
            </div>
            <div className="md:hidden p-4 font-medium border-b">Lista de Tipos</div>

            {tipos.map((tipo) => (
              <div
                key={tipo.nombre} // <--- CAMBIO: Usar tipo.nombre como key
                className="grid grid-cols-[1fr_auto] md:grid-cols-[2fr_3fr_auto] p-3 md:p-4 border-b last:border-0 items-center gap-3 md:gap-x-4"
              >
                {/* Columna Nombre (y descripción para móvil) */}
                <div className="truncate">
                  <span className="font-semibold">{tipo.nombre}</span>
                  <div className="text-xs text-muted-foreground md:hidden space-y-1 mt-1">
                    <div>{tipo.descripcion || 'Sin descripción'}</div>
                  </div>
                </div>

                {/* Columna Descripción para Desktop */}
                <div className="hidden md:block text-sm text-muted-foreground truncate">
                  {tipo.descripcion || 'Sin descripción'}
                </div>

                {/* Columna Acciones */}
                <div className="flex gap-2 flex-col md:flex-row items-end md:items-center col-start-2 md:col-auto">
                  <Button variant="outline" size="sm" onClick={() => openEditModal(tipo)} disabled={isPending}>Editar</Button>
                  <Button variant="destructive" size="sm" onClick={() => openDeleteModal(tipo)} disabled={isPending}>Eliminar</Button>
                </div>
              </div>
            ))}
            {tipos.length === 0 && <div className="p-4 text-center text-muted-foreground">No hay tipos para mostrar.</div>}
          </div>
        </CardContent>
      </Card>

      {/* Modal de Edición */}
      {currentTipo && (
        <Dialog open={isEditTipoOpen} onOpenChange={(isOpen) => { if (!isPending) setIsEditTipoOpen(isOpen); }}>
          <DialogContent className="sm:max-w-lg max-h-[90vh] flex flex-col">
             <DialogHeader>
                 <DialogTitle>Editar Tipo: {currentTipo.nombre}</DialogTitle>
                 <DialogDescription>Modifica la descripción del tipo.</DialogDescription>
             </DialogHeader>
            <div className="grid gap-4 py-4 overflow-y-auto px-1">
              <div className="grid gap-1.5">
                <Label htmlFor="edit-descripcion">Descripción</Label>
                <Textarea
                  id="edit-descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Describe el tipo..."
                />
              </div>
            </div>
            <DialogFooter className="mt-auto pt-4 border-t">
              <Button variant="outline" onClick={() => { setIsEditTipoOpen(false); resetForm();}} disabled={isPending}>Cancelar</Button>
              <Button onClick={handleEditTipo} disabled={isPending}>{isPending ? "Actualizando..." : "Actualizar Descripción"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal de Eliminación */}
      {currentTipo && (
        <Dialog open={isDeleteTipoOpen} onOpenChange={(isOpen) => { if (!isPending) setIsDeleteTipoOpen(isOpen); }}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Eliminar Tipo</DialogTitle>
              <DialogDescription>
                ¿Seguro que quieres eliminar el tipo "{currentTipo.nombre}"? Esta acción es irreversible.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteTipoOpen(false)} disabled={isPending}>Cancelar</Button>
              <Button variant="destructive" onClick={handleDeleteTipo} disabled={isPending}>
                {isPending ? "Eliminando..." : "Eliminar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}