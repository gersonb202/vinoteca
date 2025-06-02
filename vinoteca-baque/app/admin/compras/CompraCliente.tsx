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
import type { Compra, CompraNuevaForm } from "./types";
import { crearCompraAction } from './actions'; 

interface ComprasClienteProps {
  initialCompras: Compra[];
}

const initialNewCompraForm: CompraNuevaForm = {
  clienteId: "",
  vinoId: "",
};

export default function ComprasCliente({
  initialCompras
}: ComprasClienteProps) {
  const [compras, setCompras] = useState<Compra[]>(initialCompras);
  const [isNewCompraOpen, setIsNewCompraOpen] = useState(false);
  const [newCompraFormData, setNewCompraFormData] = useState<CompraNuevaForm>(initialNewCompraForm);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setCompras(initialCompras);
  }, [initialCompras]);

  const handleNewCompraInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCompraFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetNewCompraForm = () => {
    setNewCompraFormData(initialNewCompraForm);
  };

  const handleCreateCompra = async () => {
    if (!newCompraFormData.clienteId || !newCompraFormData.vinoId) {
      toast({ title: "Error", description: "Los IDs de cliente y vino son requeridos.", variant: "destructive" });
      return;
    }

    startTransition(async () => {
      const result = await crearCompraAction(newCompraFormData);

      if (result?.error) {
        toast({ title: "Error al crear compra", description: result.error, variant: "destructive" });
      } else if (result?.data) {
        
        setIsNewCompraOpen(false);
        resetNewCompraForm();
      }
    });
  };

  const openNewCompraModal = () => {
    resetNewCompraForm();
    setIsNewCompraOpen(true);
  };

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Listado de Compras</CardTitle>
            <CardDescription>Visualización de todas las compras registradas.</CardDescription>
          </div>
          <Button onClick={openNewCompraModal} disabled={isPending}>
            Nueva Compra
          </Button>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <div className="hidden md:grid md:grid-cols-4 p-4 font-medium border-b items-center gap-x-4">
              <div>ID Compra</div>
              <div>Cliente</div>
              <div>Vino</div>
              <div>Fecha</div>
            </div>
            <div className="md:hidden p-4 font-medium border-b">Lista de Compras</div>

            {compras.map((compra) => (
              <div
                key={compra.idcompra}
                className="grid grid-cols-1 md:grid-cols-4 p-3 md:p-4 border-b last:border-0 items-center gap-3 md:gap-x-4"
              >
                <div className="truncate">
                  <span className="font-semibold md:hidden">ID Compra: </span>
                  {compra.idcompra}
                </div>
                <div className="truncate">
                  <span className="font-semibold md:hidden">Cliente: </span>
                  {compra.cliente?.nombre || `ID: ${compra.cliente}`} {/* Fallback por si no hay nombre */}
                </div>
                <div className="truncate">
                  <span className="font-semibold md:hidden">Vino: </span>
                  {compra.vino?.nombre || `ID: ${compra.vino}`} {/* Fallback por si no hay nombre */}
                </div>
                <div className="text-sm text-muted-foreground truncate">
                  <span className="font-semibold md:hidden text-primary">Fecha: </span>
                  {new Date(compra.fecha).toLocaleDateString()}
                </div>
              </div>
            ))}
            {compras.length === 0 && <div className="p-4 text-center text-muted-foreground">No hay compras para mostrar.</div>}
          </div>
        </CardContent>
      </Card>

      {/* Modal de Nueva Compra */}
      <Dialog open={isNewCompraOpen} onOpenChange={(isOpen) => { if (!isPending) setIsNewCompraOpen(isOpen); }}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Registrar Nueva Compra</DialogTitle>
            <DialogDescription>Ingresa los IDs del cliente y del vino.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 overflow-y-auto px-1">
            <div className="grid gap-1.5">
              <Label htmlFor="new-clienteId">ID Cliente</Label>
              <Input 
                id="new-clienteId" 
                name="clienteId" 
                type="number" // Para mejor UX, aunque el valor sigue siendo string en el estado
                value={newCompraFormData.clienteId} 
                onChange={handleNewCompraInputChange} 
                placeholder="ID numérico del cliente" 
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="new-vinoId">ID Vino</Label>
              <Input 
                id="new-vinoId" 
                name="vinoId" 
                type="number" // Para mejor UX
                value={newCompraFormData.vinoId} 
                onChange={handleNewCompraInputChange} 
                placeholder="ID numérico del vino" 
              />
            </div>
          </div>
          <DialogFooter className="mt-auto pt-4 border-t">
            <Button variant="outline" onClick={() => { setIsNewCompraOpen(false); resetNewCompraForm(); }} disabled={isPending}>Cancelar</Button>
            <Button onClick={handleCreateCompra} disabled={isPending}>{isPending ? "Registrando..." : "Registrar Compra"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}