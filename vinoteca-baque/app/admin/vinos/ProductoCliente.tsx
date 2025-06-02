"use client";

import type React from "react";
import { useState, useEffect } from "react";
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
// import { actualizarVinoAction, eliminarVinoAction } from './actions';

interface ProductoClienteProps {
  initialVinos: Vino[];
  errorMessage?: string;
}

const formatCurrency = (amount?: number) => {
  if (typeof amount !== 'number') return 'N/D';
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);
};

const placeholderImage = (id: number, nombre?: string) => `https://placehold.co/60x60/E0E0E0/B0B0B0?text=${encodeURIComponent(nombre ? nombre.substring(0,1) : id.toString())}`;
const getImageUrl = (id: number) => `/fvinos/${id}.jpg`; // Ajusta la extensión si es necesario (e.g., .png)

export default function ProductoCliente({
  initialVinos,
  errorMessage,
}: ProductoClienteProps) {
  const [productos, setProductos] = useState<Vino[]>(initialVinos);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [isDeleteProductOpen, setIsDeleteProductOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Vino | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    anhaje: "", // Añadido para edición
    grado: "",   // Añadido para edición
  });

  useEffect(() => {
    if (errorMessage) {
      toast({ title: "Error al cargar vinos", description: errorMessage, variant: "destructive" });
    }
  }, [errorMessage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      nombre: "",
      precio: "",
      descripcion: "",
      anhaje: "",
      grado: "",
    });
  };

  const getFormDataPayload = () => ({
    nombre: formData.nombre,
    precio: formData.precio ? parseFloat(formData.precio) : undefined,
    descripcion: formData.descripcion || undefined,
    anhaje: formData.anhaje ? parseInt(formData.anhaje) : undefined, // Añadido
    grado: formData.grado ? parseFloat(formData.grado) : undefined,   // Añadido
  });

  const handleEditProduct = async () => {
    if (!currentProduct || !formData.nombre) {
      toast({ title: "Error", description: "El nombre es requerido.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    const payload = { id: currentProduct.id, ...getFormDataPayload() };
    
    // TODO: Reemplazar con Server Action
    // const result = await actualizarVinoAction(payload);
    // if (result?.error) { /* ... */ } else if (result?.data) { /* ... */ }
    
    // Simulación:
    const updatedProduct: Vino = { 
      ...currentProduct, 
      ...payload,
      // Aseguramos que los campos que no se editan (como bodega, tipo) se mantengan del producto original
      bodega: currentProduct.bodega,
      tipo: currentProduct.tipo,
     };
    setProductos(prev => prev.map(p => p.id === currentProduct.id ? updatedProduct : p));
    toast({ title: "Vino actualizado (Simulación)" });
    setIsEditProductOpen(false); resetForm(); setCurrentProduct(null);
    // Fin simulación
    setIsLoading(false);
  };

  const handleDeleteProduct = async () => {
    if (!currentProduct) return;
    setIsLoading(true);
    // TODO: Reemplazar con Server Action
    // const result = await eliminarVinoAction(currentProduct.id);
    // if (result?.error) { /* ... */ } else { /* ... */ }
    
    // Simulación:
    setProductos(prev => prev.filter(p => p.id !== currentProduct.id));
    toast({ title: "Vino eliminado (Simulación)" });
    setIsDeleteProductOpen(false); setCurrentProduct(null);
    // Fin simulación
    setIsLoading(false);
  };

  const openEditModal = (product: Vino) => {
    setCurrentProduct(product);
    setFormData({
      nombre: product.nombre,
      precio: product.precio?.toString() || "",
      descripcion: product.descripcion || "",
      anhaje: product.anio?.toString() || "", // Añadido
      grado: product.grado?.toString() || "",   // Añadido
    });
    setIsEditProductOpen(true);
  };

  const openDeleteModal = (product: Vino) => {
    setCurrentProduct(product);
    setIsDeleteProductOpen(true);
  };
  
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Vinos</CardTitle>
          <CardDescription>Administra el catálogo de vinos existentes.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <div className="hidden md:grid md:grid-cols-[60px_2fr_1fr_0.7fr_0.7fr_1fr_1fr_auto] p-4 font-medium border-b items-center gap-x-4">
              <div>Imagen</div>
              <div>Nombre</div>
              <div className="text-right">Precio</div>
              <div className="text-center">Añaje</div>
              <div className="text-center">Grado</div>
              <div>Bodega</div>
              <div>Tipo</div>
              <div className="text-right">Acciones</div>
            </div>
            <div className="md:hidden p-4 font-medium border-b">Lista de Vinos</div>

            {productos.map((product) => (
              <div 
                key={product.id} 
                className="grid grid-cols-[60px_1fr_auto] md:grid-cols-[60px_2fr_1fr_0.7fr_0.7fr_1fr_1fr_auto] p-3 md:p-4 border-b last:border-0 items-center gap-3 md:gap-x-4"
              >
                {/* Columna Imagen */}
                <div className="relative h-12 w-12 md:h-10 md:w-10 bg-gray-100 rounded overflow-hidden">
                  <Image
                    src={getImageUrl(product.id)}
                    alt={product.nombre} 
                    fill 
                    sizes="60px" 
                    className="object-cover"
                    onError={(e) => { e.currentTarget.src = placeholderImage(product.id, product.nombre); }}
                  />
                </div>
                
                {/* Columna Nombre (y datos adicionales para móvil) */}
                <div className="truncate">
                  <span className="font-semibold">{product.nombre}</span>
                  <div className="text-xs text-muted-foreground md:hidden space-y-1 mt-1">
                    <div>{formatCurrency(product.precio)}</div>
                    <div>Añaje: {product.anio || 'N/D'} - Grado: {product.grado ? `${product.grado}%` : 'N/D'}</div>
                    <div>Bodega: {product.bodega || 'N/D'} - Tipo: {product.tipo || 'N/D'}</div>
                  </div>
                </div>

                {/* Columnas para Desktop */}
                <div className="hidden md:block text-right">{formatCurrency(product.precio)}</div>
                <div className="hidden md:block text-center">{product.anio || 'N/D'}</div>
                <div className="hidden md:block text-center">{product.grado ? `${product.grado}%` : 'N/D'}</div>
                <div className="hidden md:block truncate">{product.bodega || 'N/D'}</div>
                <div className="hidden md:block truncate">{product.tipo || 'N/D'}</div>
                
                {/* Columna Acciones */}
                <div className="flex gap-2 flex-col md:flex-row items-end md:items-center col-start-3 md:col-auto">
                  <Button variant="outline" size="sm" onClick={() => openEditModal(product)}>Editar</Button>
                  <Button variant="destructive" size="sm" onClick={() => openDeleteModal(product)}>Eliminar</Button>
                </div>
              </div>
            ))}
            {productos.length === 0 && <div className="p-4 text-center text-muted-foreground">No hay vinos para mostrar.</div>}
          </div>
        </CardContent>
      </Card>

      {/* Modal de Edición Actualizado */}
      {currentProduct && (
        <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
          <DialogContent className="sm:max-w-lg max-h-[90vh] flex flex-col"> {/* Aumentado un poco el ancho para más campos */}
            <DialogHeader><DialogTitle>Editar Vino: {currentProduct.nombre}</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-4 overflow-y-auto px-1">
              <div className="grid gap-1.5">
                <Label htmlFor="edit-nombre">Nombre</Label>
                <Input id="edit-nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="edit-precio">Precio</Label>
                  <Input id="edit-precio" name="precio" type="number" value={formData.precio} onChange={handleInputChange} placeholder="Ej: 15000" />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="edit-anhaje">Añaje</Label>
                  <Input id="edit-anhaje" name="anhaje" type="number" value={formData.anhaje} onChange={handleInputChange} placeholder="Ej: 2020" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="edit-grado">Grado Alcohólico (%)</Label>
                  <Input id="edit-grado" name="grado" type="number" step="0.1" value={formData.grado} onChange={handleInputChange} placeholder="Ej: 13.5" />
                </div>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="edit-descripcion">Descripción</Label>
                <Textarea id="edit-descripcion" name="descripcion" value={formData.descripcion} onChange={handleInputChange} rows={3} />
              </div>
            </div>
            <DialogFooter className="mt-auto pt-4 border-t">
              <Button variant="outline" onClick={() => { setIsEditProductOpen(false); resetForm();}} disabled={isLoading}>Cancelar</Button>
              <Button onClick={handleEditProduct} disabled={isLoading}>{isLoading ? "Actualizando..." : "Actualizar"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal de Eliminación */}
      {currentProduct && (
        <Dialog open={isDeleteProductOpen} onOpenChange={setIsDeleteProductOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Eliminar Vino</DialogTitle>
              <DialogDescription>
                ¿Seguro que quieres eliminar "{currentProduct.nombre}"? Esta acción es irreversible.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteProductOpen(false)} disabled={isLoading}>Cancelar</Button>
              <Button variant="destructive" onClick={handleDeleteProduct} disabled={isLoading}>
                {isLoading ? "Eliminando..." : "Eliminar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}