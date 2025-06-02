"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import type { Bodega } from "./types"; // Asegúrate que la ruta a types.ts sea correcta

// Payload para actualizar una bodega
export type ActualizarBodegaPayload = {
  id: number;
  nombre?: string;
  telefono?: string;
  region?: string;
};

export async function actualizarBodegaAction(payload: ActualizarBodegaPayload) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { id, ...datosActualizar } = payload;

  if (Object.keys(datosActualizar).length === 0) {
    return { error: "No hay datos para actualizar." };
  }

  const { data, error } = await supabase
    .from("bodega")
    .update(datosActualizar)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error al actualizar bodega:", error);
    return { error: error.message };
  }

  revalidatePath("/bodegas");
  return { data };
}

export async function eliminarBodegaAction(id: number) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: bodegaPrevia, error: fetchError } = await supabase
    .from("bodega")
    .select("nombre")
    .eq("id", id)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') { 
    console.error("Error al buscar bodega para eliminar:", fetchError);
  }

  const { error } = await supabase
    .from("bodega")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error al eliminar bodega:", error);
    return { error: error.message };
  }

  revalidatePath("/bodegas"); 
  return { data: { id, nombre: bodegaPrevia?.nombre || `ID ${id}` } }; 
}

// Opcional: Acción para crear una nueva bodega
export type CrearBodegaPayload = {
  nombre: string;
  telefono: string;
  region: string;
};

export async function crearBodegaAction(payload: CrearBodegaPayload) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("bodega")
    .insert(payload)
    .select()
    .single();

  if (error) {
    console.error("Error al crear bodega:", error);
    return { error: error.message };
  }
  revalidatePath("/bodegas");
  return { data };
}