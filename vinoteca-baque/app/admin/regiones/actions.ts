"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import type { Region } from "./types";

// Helper para crear una instancia de Supabase
function getSupabaseClient() {
  const cookieStore = cookies();
  return createClient(cookieStore);
}

// Tipo para el payload de creación. 'cp' es requerido y es la PK.
type CrearRegionPayload = Region; // Todos los campos de Region son necesarios para crear

// Tipo para el payload de actualización. 'cp' identifica, 'nombre' y 'pais' se actualizan.
type ActualizarRegionPayload = {
  cp: string; // PK para identificar la región
  nombre?: string;
  pais?: string;
};


export async function crearRegionAction(payload: CrearRegionPayload) {
  const supabase = getSupabaseClient();
  try {
    // Verificar si ya existe una región con ese CP
    const { data: existingRegion, error: fetchError } = await supabase
      .from("region")
      .select("cp")
      .eq("cp", payload.cp)
      .maybeSingle(); // No debería fallar si no existe

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 es "No rows found"
        console.error("Error checking existing region:", fetchError);
        return { error: "Error al verificar la región: " + fetchError.message };
    }
    if (existingRegion) {
      return { error: `Ya existe una región con el CP: ${payload.cp}` };
    }

    const { data, error } = await supabase
      .from("region")
      .insert([payload]) // payload ya tiene cp, nombre, pais
      .select()
      .single();

    if (error) {
      console.error("Error creating region:", error);
      // Capturar error de PK duplicada si la verificación anterior falla por alguna razón
      if (error.code === '23505') { // Código de error para violación de unicidad en PostgreSQL
        return { error: `Ya existe una región con el CP: ${payload.cp}` };
      }
      return { error: "Error al crear la región: " + error.message };
    }
    revalidatePath("/admin/regiones"); // CAMBIA ESTA RUTA por la correcta
    return { data };
  } catch (e: any) {
    return { error: e.message };
  }
}

export async function actualizarRegionAction(payload: ActualizarRegionPayload) {
  const supabase = getSupabaseClient();
  const { cp, ...updateData } = payload;

  if (Object.keys(updateData).length === 0) {
    return { error: "No hay datos para actualizar." };
  }
  // No permitimos cambiar el CP aquí, ya que es la PK.
  // Si se necesitara cambiar la PK, la lógica sería más compleja (borrar y crear, o un UPDATE especial si la DB lo soporta bien).

  try {
    const { data, error } = await supabase
      .from("region")
      .update(updateData) // Solo actualiza nombre y/o pais
      .eq("cp", cp)       // Condición por PK
      .select()
      .single();

    if (error) {
      console.error("Error updating region:", error);
      if (error.code === 'PGRST116') { // No rows found
        return { error: `No se encontró una región con el CP: ${cp}` };
      }
      return { error: "Error al actualizar la región: " + error.message };
    }
    revalidatePath("/admin/regiones"); // CAMBIA ESTA RUTA por la correcta
    return { data };
  } catch (e: any) {
    return { error: e.message };
  }
}

export async function eliminarRegionAction(cp: string) { // El identificador ahora es cp (string)
  const supabase = getSupabaseClient();
  try {
    const { data: regionExistente, error: fetchError } = await supabase
      .from("region")
      .select("nombre, cp")
      .eq("cp", cp)
      .single(); // Esperamos que exista para dar un buen mensaje

    if (fetchError) {
        console.error("Error fetching region before delete:", fetchError);
        if (fetchError.code === 'PGRST116') { // No rows found
             return { error: `No se encontró una región con el CP: ${cp} para eliminar.` };
        }
        return { error: "Error al buscar la región para eliminar: " + fetchError.message };
    }

    const { error: deleteError } = await supabase
      .from("region")
      .delete()
      .eq("cp", cp); // Condición por PK

    if (deleteError) {
      console.error("Error deleting region:", deleteError);
      return { error: "Error al eliminar la región: " + deleteError.message };
    }
    revalidatePath("/admin/regiones"); // CAMBIA ESTA RUTA por la correcta
    return { data: { cp: regionExistente.cp, nombre: regionExistente.nombre } }; // Devolvemos los datos de la región eliminada
  } catch (e: any) {
    return { error: e.message };
  }
}