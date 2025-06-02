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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Podrías usar Input también para región
import { toast } from "@/components/ui/use-toast";
import type { Bodega } from "./types"; // Asegúrate que la ruta a types.ts sea correcta
import { actualizarBodegaAction, eliminarBodegaAction, crearBodegaAction } from './actions'; // Asegúrate que la ruta a actions.ts sea correcta

interface BodegasClienteProps {
  initialBodegas: Bodega[];
}

// Estado inicial para el formulario de nueva bodega
const initialNewBodegaForm = {
  nombre: "",
  telefono: "",
  region: "",
};

export default function BodegasCliente({
  initialBodegas
}: BodegasClienteProps) {
  const [bodegas, setBodegas] = useState<Bodega[]>(initialBodegas);
  const [isEditBodegaOpen, setIsEditBodegaOpen] = useState(false);
  const [isDeleteBodegaOpen, setIsDeleteBodegaOpen] = useState(false);
  const [isNewBodegaOpen, setIsNewBodegaOpen] = useState(false); // Para el modal de nueva bodega
  const [currentBodega, setCurrentBodega] = useState<Bodega | null>(null);
  const [isPending, startTransition] = useTransition();

  // Estado para el formulario de edición
  const [editFormData, setEditFormData] = useState({
    nombre: "",
    telefono: "",
  });

  // Estado para el formulario de nueva bodega
  const [newBodegaFormData, setNewBodegaFormData] = useState(initialNewBodegaForm);


  useEffect(() => {
    // Cuando initialBodegas cambie (por ejemplo, después de una acción y revalidatePath),
    // actualizamos el estado local de bodegas.
    setBodegas(initialBodegas);
  }, [initialBodegas]);

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewBodegaFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetEditForm = () => {
    setEditFormData({
      nombre: "",
      telefono: "",
    });
  };

  const resetNewForm = () => {
    setNewBodegaFormData(initialNewBodegaForm);
  };

  const handleCreateBodega = async () => {
    if (!newBodegaFormData.nombre || !newBodegaFormData.telefono || !newBodegaFormData.region) {
      toast({ title: "Error", description: "Todos los campos son requeridos para crear una bodega.", variant: "destructive" });
      return;
    }

    startTransition(async () => {
      const result = await crearBodegaAction(newBodegaFormData);

      if (result?.error) {
        toast({ title: "Error al crear bodega", description: result.error, variant: "destructive" });
      } else if (result?.data) {
        toast({ title: "Bodega Creada", description: `La bodega "${result.data.nombre}" ha sido creada.` });
        setIsNewBodegaOpen(false);
        resetNewForm();
        // El useEffect [initialBodegas] se encargará de actualizar la lista debido a revalidatePath
      }
    });
  };


  const handleEditBodega = async () => {
    if (!currentBodega) {
      toast({ title: "Error", description: "No se ha seleccionado una bodega válida.", variant: "destructive" });
      return;
    }

    const payload = {
      id: currentBodega.id,
      ...editFormData,
    };

    startTransition(async () => {
      const result = await actualizarBodegaAction(payload);

      if (result?.error) {
        toast({ title: "Error al actualizar", description: result.error, variant: "destructive" });
      } else if (result?.data) {
        toast({ title: "Bodega actualizada", description: `La bodega "${result.data.nombre}" ha sido modificada.` });
        setIsEditBodegaOpen(false);
        resetEditForm();
        setCurrentBodega(null);
        // El useEffect [initialBodegas] se encargará de actualizar la lista debido a revalidatePath
      }
    });
  };

  const handleDeleteBodega = async () => {
    if (!currentBodega) {
      toast({ title: "Error", description: "No se ha seleccionado una bodega válida.", variant: "destructive" });
      return;
    }

    startTransition(async () => {
      const result = await eliminarBodegaAction(currentBodega.id);

      if (result?.error) {
        toast({ title: "Error al eliminar", description: result.error, variant: "destructive" });
      } else if (result?.data) {
        toast({ title: "Bodega eliminada", description: `La bodega "${result.data.nombre || `ID ${result.data.id}`}" ha sido eliminada.` });
        setIsDeleteBodegaOpen(false);
        setCurrentBodega(null);
        // El useEffect [initialBodegas] se encargará de actualizar la lista debido a revalidatePath
      }
    });
  };

  const openEditModal = (bodega: Bodega) => {
    setCurrentBodega(bodega);
    setEditFormData({
      nombre: bodega.nombre || "",
      telefono: bodega.telefono || "",
    });
    setIsEditBodegaOpen(true);
  };

  const openDeleteModal = (bodega: Bodega) => {
    setCurrentBodega(bodega);
    setIsDeleteBodegaOpen(true);
  };

  const openNewModal = () => {
    resetNewForm();
    setIsNewBodegaOpen(true);
  };

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Gestión de Bodegas</CardTitle>
            <CardDescription>Administra las bodegas disponibles.</CardDescription>
          </div>
          <Button onClick={openNewModal} disabled={isPending}>
            Nueva Bodega
          </Button>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <div className="hidden md:grid md:grid-cols-[1fr_1fr_1fr_auto] p-4 font-medium border-b items-center gap-x-4">
              <div>Nombre</div>
              <div>Teléfono</div>
              <div>Región</div>
              <div className="text-right">Acciones</div>
            </div>
            <div className="md:hidden p-4 font-medium border-b">Lista de Bodegas</div>

            {bodegas.map((bodega) => (
              <div
                key={bodega.id}
                className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_1fr_1fr_auto] p-3 md:p-4 border-b last:border-0 items-center gap-3 md:gap-x-4"
              >
                {/* Columnas de datos */}
                <div className="truncate">
                  <span className="font-semibold">{bodega.nombre}</span>
                  <div className="text-xs text-muted-foreground md:hidden space-y-1 mt-1">
                    <div>Tel: {bodega.telefono || 'N/A'}</div>
                    <div>Reg: {bodega.region || 'N/A'}</div>
                  </div>
                </div>

                <div className="hidden md:block text-sm text-muted-foreground truncate">
                  {bodega.telefono || 'N/A'}
                </div>
                <div className="hidden md:block text-sm text-muted-foreground truncate">
                  {bodega.region || 'N/A'}
                </div>

                {/* Columna Acciones */}
                <div className="flex gap-2 flex-col md:flex-row items-end md:items-center col-start-2 md:col-auto">
                  <Button variant="outline" size="sm" onClick={() => openEditModal(bodega)} disabled={isPending}>Editar</Button>
                  <Button variant="destructive" size="sm" onClick={() => openDeleteModal(bodega)} disabled={isPending}>Eliminar</Button>
                </div>
              </div>
            ))}
            {bodegas.length === 0 && <div className="p-4 text-center text-muted-foreground">No hay bodegas para mostrar.</div>}
          </div>
        </CardContent>
      </Card>

      {/* Modal de Nueva Bodega */}
      <Dialog open={isNewBodegaOpen} onOpenChange={(isOpen) => { if (!isPending) setIsNewBodegaOpen(isOpen); }}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Crear Nueva Bodega</DialogTitle>
            <DialogDescription>Ingresa los detalles de la nueva bodega.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 overflow-y-auto px-1">
            <div className="grid gap-1.5">
              <Label htmlFor="new-nombre">Nombre</Label>
              <Input id="new-nombre" name="nombre" value={newBodegaFormData.nombre} onChange={handleNewInputChange} placeholder="Nombre de la bodega" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="new-telefono">Teléfono</Label>
              <Input id="new-telefono" name="telefono" value={newBodegaFormData.telefono} onChange={handleNewInputChange} placeholder="Número de teléfono" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="new-region">Región</Label>
              <Input id="new-region" name="region" value={newBodegaFormData.region} onChange={handleNewInputChange} placeholder="Región vinícola" />
              {/* O podrías usar Textarea si la región puede ser más larga */}
              {/* <Textarea id="new-region" name="region" value={newBodegaFormData.region} onChange={handleNewInputChange} placeholder="Región vinícola" rows={2} /> */}
            </div>
          </div>
          <DialogFooter className="mt-auto pt-4 border-t">
            <Button variant="outline" onClick={() => { setIsNewBodegaOpen(false); resetNewForm(); }} disabled={isPending}>Cancelar</Button>
            <Button onClick={handleCreateBodega} disabled={isPending}>{isPending ? "Creando..." : "Crear Bodega"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Edición */}
      {currentBodega && (
        <Dialog open={isEditBodegaOpen} onOpenChange={(isOpen) => { if (!isPending) setIsEditBodegaOpen(isOpen); }}>
          <DialogContent className="sm:max-w-lg max-h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>Editar Bodega: {currentBodega.nombre}</DialogTitle>
              <DialogDescription>Modifica los detalles de la bodega.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 overflow-y-auto px-1">
              <div className="grid gap-1.5">
                <Label htmlFor="edit-nombre">Nombre</Label>
                <Input id="edit-nombre" name="nombre" value={editFormData.nombre} onChange={handleEditInputChange} />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="edit-telefono">Teléfono</Label>
                <Input id="edit-telefono" name="telefono" value={editFormData.telefono} onChange={handleEditInputChange} />
              </div>
            </div>
            <DialogFooter className="mt-auto pt-4 border-t">
              <Button variant="outline" onClick={() => { setIsEditBodegaOpen(false); resetEditForm(); }} disabled={isPending}>Cancelar</Button>
              <Button onClick={handleEditBodega} disabled={isPending}>{isPending ? "Actualizando..." : "Actualizar Bodega"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal de Eliminación */}
      {currentBodega && (
        <Dialog open={isDeleteBodegaOpen} onOpenChange={(isOpen) => { if (!isPending) setIsDeleteBodegaOpen(isOpen); }}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Eliminar Bodega</DialogTitle>
              <DialogDescription>
                ¿Seguro que quieres eliminar la bodega "{currentBodega.nombre}" (ID: {currentBodega.id})? Esta acción es irreversible.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteBodegaOpen(false)} disabled={isPending}>Cancelar</Button>
              <Button variant="destructive" onClick={handleDeleteBodega} disabled={isPending}>
                {isPending ? "Eliminando..." : "Eliminar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}