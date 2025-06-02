"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import type { Vino } from "./types";

export type ActualizarVinoPayload = {
  id: number;
  nombre?: string;
  precio?: number;
  anio?: number;
  grado?: number;
  descripcion?: string;
};

export type CrearVinoPayload = Omit<Vino, "id"> & { id?: never };

export async function actualizarVinoAction(payload: ActualizarVinoPayload) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { id, ...datosActualizar } = payload;

  Object.keys(datosActualizar).forEach(key => {
    const k = key as keyof typeof datosActualizar;
    if (datosActualizar[k] === undefined) {
      delete datosActualizar[k];
    }
  });

  if (Object.keys(datosActualizar).length === 0) {
    return { error: "No hay datos para actualizar." };
  }

  const { data, error } = await supabase
    .from("vino")
    .update(datosActualizar)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error al actualizar vino:", error);
    return { error: error.message };
  }
  revalidatePath("/vinos");
  return { data };
}

export async function eliminarVinoAction(id: number) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: vinoPrevio, error: fetchError } = await supabase
    .from("vino").select("nombre").eq("id", id).single();

  if (fetchError && fetchError.code !== 'PGRST116') { /* ... */ }

  const { error } = await supabase.from("vino").delete().eq("id", id);

  if (error) {
    console.error("Error al eliminar vino:", error);
    return { error: error.message };
  }
  revalidatePath("/vinos");
  return { data: { id, nombre: vinoPrevio?.nombre || `ID ${id}` } };
}


export async function crearVinoAction(payload: CrearVinoPayload) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  Object.keys(payload).forEach(key => {
    const k = key as keyof typeof payload;
    if (payload[k] === undefined || payload[k] === null || (typeof payload[k] === 'number' && isNaN(payload[k])) ) {
         
        if (typeof payload[k] === 'number' && isNaN(payload[k])) {
            // @ts-ignore
            payload[k] = undefined;
        } else if (payload[k] === null) {
            
        } else {
            delete payload[k];
        }
    }
  });

  const { data, error } = await supabase.from("vino").insert(payload).select().single();
  if (error) { /* ... */ return { error: error.message }; }
  revalidatePath("/vinos");
  return { data };
}