"use server";

import { createClient } from "@/lib/supabase/server"; // Asumo que tienes una instancia para server actions
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import type { CompraNuevaForm } from "./types"; // Necesitaremos este tipo

// Función para crear una nueva compra
export async function crearCompraAction(formData: CompraNuevaForm) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    
    if (!formData.clienteId || !formData.vinoId) {
      return { error: "Los IDs de cliente y vino son requeridos." };
    }

    const clienteIdNum = parseInt(formData.clienteId, 10);
    const vinoIdNum = parseInt(formData.vinoId, 10);

    if (isNaN(clienteIdNum) || isNaN(vinoIdNum)) {
        return { error: "Los IDs de cliente y vino deben ser números válidos." };
    }

    const { data, error } = await supabase
      .from("compra")
      .insert([
        {
          cliente: clienteIdNum, 
          vino: vinoIdNum,   
          fecha: new Date().toISOString(),
        },
      ])
      .select(
        `
        idcompra,
        fecha,
        clientes ( nombre ), 
        vino ( nombre )
        `
      ) 
      .single();

    if (error) {
      console.error("Error al crear compra:", error);
      return { error: error.message };
    }

    revalidatePath("/compras");
    return { data };
  } catch (e: any) {
    console.error("Excepción al crear compra:", e);
    return { error: "Ocurrió un error inesperado." };
  }
}