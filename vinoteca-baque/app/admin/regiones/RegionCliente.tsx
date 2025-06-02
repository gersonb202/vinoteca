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
import { toast } from "@/components/ui/use-toast";
import type { Region } from "./types";
import { actualizarRegionAction, eliminarRegionAction, crearRegionAction } from './actions';

interface RegionesClienteProps {
  initialRegiones: Region[];
}

const initialNewRegionForm: Region = { // CP es parte del formulario inicial
  cp: "",
  nombre: "",
  pais: "",
};

// Para el formulario de edición, solo nombre y país. CP se obtiene de currentRegion.
const initialEditRegionForm = {
    nombre: "",
    pais: "",
}

export default function RegionesCliente({
  initialRegiones
}: RegionesClienteProps) {
  const [regiones, setRegiones] = useState<Region[]>(initialRegiones);
  const [isEditRegionOpen, setIsEditRegionOpen] = useState(false);
  const [isDeleteRegionOpen, setIsDeleteRegionOpen] = useState(false);
  const [isNewRegionOpen, setIsNewRegionOpen] = useState(false);
  const [currentRegion, setCurrentRegion] = useState<Region | null>(null);
  const [isPending, startTransition] = useTransition();

  const [editFormData, setEditFormData] = useState(initialEditRegionForm);
  const [newRegionFormData, setNewRegionFormData] = useState<Region>(initialNewRegionForm);


  useEffect(() => {
    setRegiones(initialRegiones);
  }, [initialRegiones]);

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRegionFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetEditForm = () => {
    setEditFormData(initialEditRegionForm);
  };

  const resetNewForm = () => {
    setNewRegionFormData(initialNewRegionForm);
  };

  const handleCreateRegion = async () => {
    if (!newRegionFormData.cp || !newRegionFormData.nombre || !newRegionFormData.pais) {
      toast({ title: "Error", description: "CP, Nombre y País son requeridos para crear una región.", variant: "destructive" });
      return;
    }

    startTransition(async () => {
      const result = await crearRegionAction(newRegionFormData); // newRegionFormData ya es del tipo Region

      if (result?.error) {
        toast({ title: "Error al crear región", description: result.error, variant: "destructive" });
      } else if (result?.data) {
        toast({ title: "Región Creada", description: `La región "${result.data.nombre}" (CP: ${result.data.cp}) ha sido creada.` });
        setIsNewRegionOpen(false);
        resetNewForm();
        // El useEffect [initialRegiones] actualizará la lista debido a revalidatePath
      }
    });
  };


  const handleEditRegion = async () => {
    if (!currentRegion) {
      toast({ title: "Error", description: "No se ha seleccionado una región válida.", variant: "destructive" });
      return;
    }

    // Solo se envían nombre y país para actualizar. CP se usa para identificar.
    const payload = {
      cp: currentRegion.cp, // PK para la cláusula WHERE
      nombre: editFormData.nombre,
      pais: editFormData.pais,
    };

    startTransition(async () => {
      const result = await actualizarRegionAction(payload);

      if (result?.error) {
        toast({ title: "Error al actualizar", description: result.error, variant: "destructive" });
      } else if (result?.data) {
        toast({ title: "Región actualizada", description: `La región "${result.data.nombre}" (CP: ${result.data.cp}) ha sido modificada.` });
        setIsEditRegionOpen(false);
        resetEditForm();
        setCurrentRegion(null);
      }
    });
  };

  const handleDeleteRegion = async () => {
    if (!currentRegion) {
      toast({ title: "Error", description: "No se ha seleccionado una región válida.", variant: "destructive" });
      return;
    }

    startTransition(async () => {
      // eliminarRegionAction ahora espera el CP (string) como argumento
      const result = await eliminarRegionAction(currentRegion.cp);

      if (result?.error) {
        toast({ title: "Error al eliminar", description: result.error, variant: "destructive" });
      } else if (result?.data) {
        toast({ title: "Región eliminada", description: `La región "${result.data.nombre}" (CP: ${result.data.cp}) ha sido eliminada.` });
        setIsDeleteRegionOpen(false);
        setCurrentRegion(null);
      }
    });
  };

  const openEditModal = (region: Region) => {
    setCurrentRegion(region);
    setEditFormData({ // Solo nombre y país son editables
      nombre: region.nombre || "",
      pais: region.pais || "",
    });
    setIsEditRegionOpen(true);
  };

  const openDeleteModal = (region: Region) => {
    setCurrentRegion(region);
    setIsDeleteRegionOpen(true);
  };

  const openNewModal = () => {
    resetNewForm();
    setIsNewRegionOpen(true);
  };

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Gestión de Regiones</CardTitle>
            <CardDescription>Administra las regiones disponibles.</CardDescription>
          </div>
          <Button onClick={openNewModal} disabled={isPending}>
            Nueva Región
          </Button>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <div className="hidden md:grid md:grid-cols-[1fr_1fr_1fr_auto] p-4 font-medium border-b items-center gap-x-4">
              <div>CP</div> {/* Cambiado de Nombre a CP como primera columna para destacar la PK */}
              <div>Nombre</div>
              <div>País</div>
              <div className="text-right">Acciones</div>
            </div>
            <div className="md:hidden p-4 font-medium border-b">Lista de Regiones</div>

            {regiones.map((region) => (
              <div
                key={region.cp} // Usar cp como key
                className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_1fr_1fr_auto] p-3 md:p-4 border-b last:border-0 items-center gap-3 md:gap-x-4"
              >
                {/* Columnas de datos */}
                <div className="truncate">
                  <span className="font-semibold">{region.cp}</span>
                  <div className="text-xs text-muted-foreground md:hidden space-y-1 mt-1">
                    <div>Nombre: {region.nombre || 'N/A'}</div>
                    <div>País: {region.pais || 'N/A'}</div>
                  </div>
                </div>

                <div className="hidden md:block text-sm text-muted-foreground truncate">
                  {region.nombre || 'N/A'}
                </div>
                <div className="hidden md:block text-sm text-muted-foreground truncate">
                  {region.pais || 'N/A'}
                </div>

                {/* Columna Acciones */}
                <div className="flex gap-2 flex-col md:flex-row items-end md:items-center col-start-2 md:col-auto">
                  <Button variant="outline" size="sm" onClick={() => openEditModal(region)} disabled={isPending}>Editar</Button>
                  <Button variant="destructive" size="sm" onClick={() => openDeleteModal(region)} disabled={isPending}>Eliminar</Button>
                </div>
              </div>
            ))}
            {regiones.length === 0 && <div className="p-4 text-center text-muted-foreground">No hay regiones para mostrar.</div>}
          </div>
        </CardContent>
      </Card>

      {/* Modal de Nueva Región */}
      <Dialog open={isNewRegionOpen} onOpenChange={(isOpen) => { if (!isPending) setIsNewRegionOpen(isOpen); }}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Crear Nueva Región</DialogTitle>
            <DialogDescription>Ingresa los detalles de la nueva región. El CP es la clave única.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 overflow-y-auto px-1">
            <div className="grid gap-1.5">
              <Label htmlFor="new-cp">Código Postal (CP)</Label>
              <Input id="new-cp" name="cp" value={newRegionFormData.cp} onChange={handleNewInputChange} placeholder="CP (Ej: 28001)" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="new-nombre">Nombre</Label>
              <Input id="new-nombre" name="nombre" value={newRegionFormData.nombre} onChange={handleNewInputChange} placeholder="Nombre de la región" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="new-pais">País</Label>
              <Input id="new-pais" name="pais" value={newRegionFormData.pais} onChange={handleNewInputChange} placeholder="País de la región" />
            </div>
          </div>
          <DialogFooter className="mt-auto pt-4 border-t">
            <Button variant="outline" onClick={() => { setIsNewRegionOpen(false); resetNewForm(); }} disabled={isPending}>Cancelar</Button>
            <Button onClick={handleCreateRegion} disabled={isPending}>{isPending ? "Creando..." : "Crear Región"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Edición */}
      {currentRegion && (
        <Dialog open={isEditRegionOpen} onOpenChange={(isOpen) => { if (!isPending) setIsEditRegionOpen(isOpen); }}>
          <DialogContent className="sm:max-w-lg max-h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>Editar Región: {currentRegion.nombre} (CP: {currentRegion.cp})</DialogTitle>
              <DialogDescription>Modifica nombre y país. El CP no es editable.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 overflow-y-auto px-1">
               <div className="grid gap-1.5">
                <Label htmlFor="edit-cp-display">Código Postal (CP)</Label>
                <Input id="edit-cp-display" name="cp" value={currentRegion.cp} disabled readOnly />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="edit-nombre">Nombre</Label>
                <Input id="edit-nombre" name="nombre" value={editFormData.nombre} onChange={handleEditInputChange} />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="edit-pais">País</Label>
                <Input id="edit-pais" name="pais" value={editFormData.pais} onChange={handleEditInputChange} />
              </div>
            </div>
            <DialogFooter className="mt-auto pt-4 border-t">
              <Button variant="outline" onClick={() => { setIsEditRegionOpen(false); resetEditForm(); }} disabled={isPending}>Cancelar</Button>
              <Button onClick={handleEditRegion} disabled={isPending}>{isPending ? "Actualizando..." : "Actualizar Región"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal de Eliminación */}
      {currentRegion && (
        <Dialog open={isDeleteRegionOpen} onOpenChange={(isOpen) => { if (!isPending) setIsDeleteRegionOpen(isOpen); }}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Eliminar Región</DialogTitle>
              <DialogDescription>
                ¿Seguro que quieres eliminar la región "{currentRegion.nombre}" (CP: {currentRegion.cp})? Esta acción es irreversible.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteRegionOpen(false)} disabled={isPending}>Cancelar</Button>
              <Button variant="destructive" onClick={handleDeleteRegion} disabled={isPending}>
                {isPending ? "Eliminando..." : "Eliminar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}