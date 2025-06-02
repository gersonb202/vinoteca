"use client";

import type React from "react";
import { useState, useEffect, useTransition } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import type { Vino } from "./types";
import { actualizarVinoAction, eliminarVinoAction, crearVinoAction } from './actions';

interface VinosClienteProps {
  initialVinos: Vino[];
  errorMessage?: string;
}

const formatCurrency = (amount?: number) => {
  if (typeof amount !== 'number') return 'N/D';
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);
};

const placeholderImage = (id: number, nombre?: string) => `https://placehold.co/60x60/E0E0E0/B0B0B0?text=${encodeURIComponent(nombre ? nombre.substring(0,1) : id.toString())}`;
const getImageUrl = (id: number) => `/fvinos/${id}.jpg`;

const initialNewVinoForm = {
  nombre: "",
  precio: "",
  anio: "",
  bodega: "",
  tipo: "",
  descripcion: "",
};

const MAX_PRECIO_LENGTH = 8; // Ej: 99,999,999 (sin puntos ni comas)
const MAX_ANIO_LENGTH = 4;   // Ej: 2024

export default function VinosCliente({
  initialVinos,
  errorMessage,
}: VinosClienteProps) {
  const [vinos, setVinos] = useState<Vino[]>(initialVinos);
  const [isEditVinoOpen, setIsEditVinoOpen] = useState(false);
  const [isDeleteVinoOpen, setIsDeleteVinoOpen] = useState(false);
  const [isNewVinoOpen, setIsNewVinoOpen] = useState(false);
  const [currentVino, setCurrentVino] = useState<Vino | null>(null);
  const [isPending, startTransition] = useTransition();

  const [editFormData, setEditFormData] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    anio: "",
    grado: "",
  });

  const [newVinoFormData, setNewVinoFormData] = useState(initialNewVinoForm);

  useEffect(() => {
    setVinos(initialVinos);
  }, [initialVinos]);

  useEffect(() => {
    if (errorMessage) {
      toast({ title: "Error al cargar vinos", description: errorMessage, variant: "destructive" });
    }
  }, [errorMessage]);

  const handleInputChangeWithMaxLength = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    maxLength?: number,
    setter?: React.Dispatch<React.SetStateAction<any>> // Para generalizar si es necesario
  ) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (maxLength && value.length > maxLength) {
      processedValue = value.slice(0, maxLength);
    }
    
    if (setter) { // Si se pasa un setter específico (para edit o new form)
        setter((prev: any) => ({ ...prev, [name]: processedValue }));
    } else { // Lógica genérica si no se pasa setter (no es el caso aquí, pero como ejemplo)
        if (name in editFormData) {
            setEditFormData((prev) => ({ ...prev, [name]: processedValue }));
        } else if (name in newVinoFormData) {
            setNewVinoFormData((prev) => ({ ...prev, [name]: processedValue }));
        }
    }
  };


  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    let maxLength: number | undefined = undefined;
    if (name === "precio") maxLength = MAX_PRECIO_LENGTH;
    if (name === "anio") maxLength = MAX_ANIO_LENGTH;
    
    handleInputChangeWithMaxLength(e, maxLength, setEditFormData);
  };

  const handleNewInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    let maxLength: number | undefined = undefined;
    if (name === "precio") maxLength = MAX_PRECIO_LENGTH;
    if (name === "anio") maxLength = MAX_ANIO_LENGTH;

    handleInputChangeWithMaxLength(e, maxLength, setNewVinoFormData);
  };


  const resetEditForm = () => {
    setEditFormData({ nombre: "", precio: "", descripcion: "", anio: "", grado: "" });
  };

  const resetNewForm = () => {
    setNewVinoFormData(initialNewVinoForm);
  };
  
  const getEditFormDataPayload = () => ({
    nombre: editFormData.nombre || undefined,
    precio: editFormData.precio ? parseFloat(editFormData.precio) : undefined,
    descripcion: editFormData.descripcion || undefined,
    anio: editFormData.anio ? parseInt(editFormData.anio, 10) : undefined,
    grado: editFormData.grado ? parseFloat(editFormData.grado) : undefined,
  });

  const getNewFormDataPayload = () => ({
    nombre: newVinoFormData.nombre,
    precio: newVinoFormData.precio ? parseFloat(newVinoFormData.precio) : undefined,
    anio: newVinoFormData.anio ? parseInt(newVinoFormData.anio, 10) : undefined,
    bodega: newVinoFormData.bodega || undefined,
    tipo: newVinoFormData.tipo || undefined,
    descripcion: newVinoFormData.descripcion || undefined,
  });

  const handleCreateVino = async () => {
    if (!newVinoFormData.nombre) {
      toast({ title: "Error", description: "El nombre del vino es requerido.", variant: "destructive" });
      return;
    }
    // Validación de longitud y rango para año y precio (opcional aquí, ya que el input debería controlarlo)
    if (newVinoFormData.anio && (newVinoFormData.anio.length > MAX_ANIO_LENGTH || parseInt(newVinoFormData.anio, 10) < 1800 || parseInt(newVinoFormData.anio, 10) > new Date().getFullYear() + 5 )) {
        toast({ title: "Error", description: `El año debe tener ${MAX_ANIO_LENGTH} dígitos y ser un año válido.`, variant: "destructive" });
        return;
    }
    if (newVinoFormData.precio && newVinoFormData.precio.length > MAX_PRECIO_LENGTH) {
        toast({ title: "Error", description: `El precio excede la longitud máxima de ${MAX_PRECIO_LENGTH} dígitos.`, variant: "destructive" });
        return;
    }


    const payload = getNewFormDataPayload();
    startTransition(async () => {
      const result = await crearVinoAction(payload);
      if (result?.error) {
        toast({ title: "Error al crear vino", description: result.error, variant: "destructive" });
      } else if (result?.data) {
        toast({ title: "Vino Creado", description: `El vino "${result.data.nombre}" ha sido creado.` });
        setIsNewVinoOpen(false);
        resetNewForm();
      }
    });
  };

  const handleEditVino = async () => {
    if (!currentVino || !editFormData.nombre) {
      toast({ title: "Error", description: "El nombre es requerido.", variant: "destructive" });
      return;
    }
     if (editFormData.anio && (editFormData.anio.length > MAX_ANIO_LENGTH || parseInt(editFormData.anio, 10) < 1800 || parseInt(editFormData.anio, 10) > new Date().getFullYear() + 5 )) {
        toast({ title: "Error", description: `El año debe tener ${MAX_ANIO_LENGTH} dígitos y ser un año válido.`, variant: "destructive" });
        return;
    }
    if (editFormData.precio && editFormData.precio.length > MAX_PRECIO_LENGTH) {
        toast({ title: "Error", description: `El precio excede la longitud máxima de ${MAX_PRECIO_LENGTH} dígitos.`, variant: "destructive" });
        return;
    }

    const payload = { id: currentVino.id, ...getEditFormDataPayload() };
    startTransition(async () => {
      const result = await actualizarVinoAction(payload);
      if (result?.error) {
        toast({ title: "Error al actualizar", description: result.error, variant: "destructive" });
      } else if (result?.data) {
        toast({ title: "Vino Actualizado", description: `El vino "${result.data.nombre}" ha sido modificado.` });
        setIsEditVinoOpen(false);
        resetEditForm();
        setCurrentVino(null);
      }
    });
  };

  const handleDeleteVino = async () => {
    if (!currentVino) return;
    startTransition(async () => {
      const result = await eliminarVinoAction(currentVino.id);
      if (result?.error) {
        toast({ title: "Error al eliminar", description: result.error, variant: "destructive" });
      } else if (result?.data) {
        toast({ title: "Vino Eliminado", description: `El vino "${result.data.nombre || `ID ${result.data.id}`}" ha sido eliminado.` });
        setIsDeleteVinoOpen(false);
        setCurrentVino(null);
      }
    });
  };

  const openEditModal = (vino: Vino) => {
    setCurrentVino(vino);
    setEditFormData({
      nombre: vino.nombre,
      precio: vino.precio?.toString() || "",
      descripcion: vino.descripcion || "",
      anio: vino.anio?.toString() || "",
      grado: vino.grado?.toString() || "",
    });
    setIsEditVinoOpen(true);
  };

  const openDeleteModal = (vino: Vino) => {
    setCurrentVino(vino);
    setIsDeleteVinoOpen(true);
  };

  const openNewModal = () => {
    resetNewForm();
    setIsNewVinoOpen(true);
  };

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Gestión de Vinos</CardTitle>
            <CardDescription>Administra el catálogo de vinos existentes.</CardDescription>
          </div>
          <Button onClick={openNewModal} disabled={isPending}>
            Nuevo Vino
          </Button>
        </CardHeader>
        <CardContent>
          {/* Tabla de vinos */}
          <div className="border rounded-md">
            <div className="hidden md:grid md:grid-cols-[60px_2fr_1fr_0.7fr_0.7fr_1fr_1fr_auto] p-4 font-medium border-b items-center gap-x-4">
              <div>Imagen</div>
              <div>Nombre</div>
              <div className="text-right">Precio</div>
              <div className="text-center">Año</div>
              <div className="text-center">Grado</div>
              <div>Bodega</div>
              <div>Tipo</div>
              <div className="text-right">Acciones</div>
            </div>
            <div className="md:hidden p-4 font-medium border-b">Lista de Vinos</div>

            {vinos.map((vino) => (
              <div
                key={vino.id}
                className="grid grid-cols-[60px_1fr_auto] md:grid-cols-[60px_2fr_1fr_0.7fr_0.7fr_1fr_1fr_auto] p-3 md:p-4 border-b last:border-0 items-center gap-3 md:gap-x-4"
              >
                <div className="relative h-12 w-12 md:h-10 md:w-10 bg-gray-100 rounded overflow-hidden">
                  <Image
                    src={getImageUrl(vino.id)}
                    alt={vino.nombre}
                    fill
                    sizes="60px"
                    className="object-cover"
                    onError={(e) => { e.currentTarget.src = placeholderImage(vino.id, vino.nombre); }}
                  />
                </div>

                <div className="truncate">
                  <span className="font-semibold">{vino.nombre}</span>
                  <div className="text-xs text-muted-foreground md:hidden space-y-1 mt-1">
                    <div>{formatCurrency(vino.precio)}</div>
                    <div>Año: {vino.anio || 'N/D'} - Grado: {vino.grado ? `${vino.grado}%` : 'N/D'}</div>
                    <div>Bodega: {vino.bodega || 'N/D'} - Tipo: {vino.tipo || 'N/D'}</div>
                  </div>
                </div>

                <div className="hidden md:block text-right">{formatCurrency(vino.precio)}</div>
                <div className="hidden md:block text-center">{vino.anio || 'N/D'}</div>
                <div className="hidden md:block text-center">{vino.grado ? `${vino.grado}%` : 'N/D'}</div>
                <div className="hidden md:block truncate">{vino.bodega || 'N/D'}</div>
                <div className="hidden md:block truncate">{vino.tipo || 'N/D'}</div>

                <div className="flex gap-2 flex-col md:flex-row items-end md:items-center col-start-3 md:col-auto">
                  <Button variant="outline" size="sm" onClick={() => openEditModal(vino)} disabled={isPending}>Editar</Button>
                  <Button variant="destructive" size="sm" onClick={() => openDeleteModal(vino)} disabled={isPending}>Eliminar</Button>
                </div>
              </div>
            ))}
            {vinos.length === 0 && <div className="p-4 text-center text-muted-foreground">No hay vinos para mostrar.</div>}
          </div>
        </CardContent>
      </Card>

      {/* Modal de Nuevo Vino */}
      <Dialog open={isNewVinoOpen} onOpenChange={(isOpen) => { if (!isPending) setIsNewVinoOpen(isOpen); }}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Crear Nuevo Vino</DialogTitle>
            <DialogDescription>Ingresa los detalles del nuevo vino.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 overflow-y-auto px-1">
            <div className="grid gap-1.5">
              <Label htmlFor="new-nombre">Nombre</Label>
              <Input id="new-nombre" name="nombre" value={newVinoFormData.nombre} onChange={handleNewInputChange} placeholder="Nombre del vino" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                <Label htmlFor="new-precio">Precio</Label>
                <Input 
                    id="new-precio" 
                    name="precio" 
                    type="number" 
                    value={newVinoFormData.precio} 
                    onChange={handleNewInputChange} 
                    placeholder="Ej: 15000"
                    min="0" // Precio no puede ser negativo
                    // El control de maxLength se hace en handleNewInputChange
                />
                </div>
                <div className="grid gap-1.5">
                <Label htmlFor="new-anio">Año</Label>
                <Input 
                    id="new-anio" 
                    name="anio" 
                    type="number" 
                    value={newVinoFormData.anio} 
                    onChange={handleNewInputChange} 
                    placeholder="Ej: 2020"
                    min="1800" // Año mínimo razonable
                    max={new Date().getFullYear() + 5} // Año máximo razonable (actual + 5)
                    // El control de maxLength se hace en handleNewInputChange
                />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                <Label htmlFor="new-bodega">Bodega</Label>
                <Input id="new-bodega" name="bodega" value={newVinoFormData.bodega} onChange={handleNewInputChange} placeholder="Nombre de la bodega" />
                </div>
                <div className="grid gap-1.5">
                <Label htmlFor="new-tipo">Tipo</Label>
                <Input id="new-tipo" name="tipo" value={newVinoFormData.tipo} onChange={handleNewInputChange} placeholder="Ej: Tinto, Blanco" />
                </div>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="new-descripcion">Descripción</Label>
              <Textarea id="new-descripcion" name="descripcion" value={newVinoFormData.descripcion} onChange={handleNewInputChange} placeholder="Notas de cata, maridaje, etc." rows={3} />
            </div>
          </div>
          <DialogFooter className="mt-auto pt-4 border-t">
            <Button variant="outline" onClick={() => { setIsNewVinoOpen(false); resetNewForm(); }} disabled={isPending}>Cancelar</Button>
            <Button onClick={handleCreateVino} disabled={isPending}>{isPending ? "Creando..." : "Crear Vino"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Edición */}
      {currentVino && (
        <Dialog open={isEditVinoOpen} onOpenChange={(isOpen) => { if (!isPending) setIsEditVinoOpen(isOpen); }}>
          <DialogContent className="sm:max-w-lg max-h-[90vh] flex flex-col">
            <DialogHeader><DialogTitle>Editar Vino: {currentVino.nombre}</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-4 overflow-y-auto px-1">
              <div className="grid gap-1.5">
                <Label htmlFor="edit-nombre">Nombre</Label>
                <Input id="edit-nombre" name="nombre" value={editFormData.nombre} onChange={handleEditInputChange} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="edit-precio">Precio</Label>
                  <Input 
                    id="edit-precio" 
                    name="precio" 
                    type="number" 
                    value={editFormData.precio} 
                    onChange={handleEditInputChange} 
                    placeholder="Ej: 15000"
                    min="0"
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="edit-anio">Año</Label>
                  <Input 
                    id="edit-anio" 
                    name="anio" 
                    type="number" 
                    value={editFormData.anio} 
                    onChange={handleEditInputChange} 
                    placeholder="Ej: 2020"
                    min="1800"
                    max={new Date().getFullYear() + 5}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="edit-grado">Grado Alcohólico (%)</Label>
                  <Input id="edit-grado" name="grado" type="number" step="0.1" value={editFormData.grado} onChange={handleEditInputChange} placeholder="Ej: 13.5" min="0" max="100"/>
                </div>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="edit-descripcion">Descripción</Label>
                <Textarea id="edit-descripcion" name="descripcion" value={editFormData.descripcion} onChange={handleEditInputChange} rows={3} />
              </div>
            </div>
            <DialogFooter className="mt-auto pt-4 border-t">
              <Button variant="outline" onClick={() => { setIsEditVinoOpen(false); resetEditForm();}} disabled={isPending}>Cancelar</Button>
              <Button onClick={handleEditVino} disabled={isPending}>{isPending ? "Actualizando..." : "Actualizar"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal de Eliminación (sin cambios) */}
      {currentVino && (
        <Dialog open={isDeleteVinoOpen} onOpenChange={(isOpen) => { if (!isPending) setIsDeleteVinoOpen(isOpen); }}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Eliminar Vino</DialogTitle>
              <DialogDescription>
                ¿Seguro que quieres eliminar "{currentVino.nombre}"? Esta acción es irreversible.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteVinoOpen(false)} disabled={isPending}>Cancelar</Button>
              <Button variant="destructive" onClick={handleDeleteVino} disabled={isPending}>
                {isPending ? "Eliminando..." : "Eliminar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}