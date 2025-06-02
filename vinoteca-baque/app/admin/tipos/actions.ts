"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import type { Tipo } from "./types";

interface UpdateTipoPayload {
  nombre: string; // El nombre (PK) del tipo a actualizar
  descripcion?: string;
}

interface ActionResult<T> {
  data?: T;
  error?: string;
}

export async function actualizarTipoAction(
  payload: UpdateTipoPayload
): Promise<ActionResult<Tipo>> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  if (!payload.nombre) {
    return { error: "El nombre del tipo es requerido." };
  }

  const updateData: { descripcion?: string } = {};
  if (payload.descripcion !== undefined) {
    // Asegúrate que 'descripccion' sea el nombre de la columna en tu BD
    updateData.descripcion = payload.descripcion;
  }

  if (Object.keys(updateData).length === 0) {
    // O podrías optar por devolver el tipo sin cambios si la descripción es la misma
    // y no se proporciona nada más para actualizar.
    // Para este caso, si no hay descripción para actualizar, podrías retornar un error o el objeto original.
    return { error: "No hay datos para actualizar." };
  }

  const { data, error } = await supabase
    .from("tipo")
    .update(updateData)
    .eq("nombre", payload.nombre) // <--- CAMBIO: Usar 'nombre' para la condición .eq()
    .select() // Devuelve 'nombre' y 'descripccion' (y cualquier otra columna que tenga la tabla)
    .single();

  if (error) {
    console.error("Error al actualizar tipo en Supabase:", error);
    return { error: `Error al actualizar tipo: ${error.message}` };
  }

  if (!data) {
    return { error: "No se pudo actualizar el tipo o no se encontró." };
  }

  revalidatePath("/admin/tipos"); // Ajusta esta ruta si es diferente

  const tipoActualizado: Tipo = {
    nombre: data.nombre, // data.nombre debería existir ya que es PK
    descripcion: data.descripcion, // Asegúrate que esta columna existe y es seleccionada
  };

  return { data: tipoActualizado };
}

export async function eliminarTipoAction(
  tipoNombre: string // <--- CAMBIO: Recibe el nombre del tipo (string)
): Promise<ActionResult<{ nombre: string }>> { // Devuelve el nombre del tipo eliminado
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  if (!tipoNombre) {
    return { error: "El nombre del tipo es requerido para eliminar." };
  }

  const { error, count } = await supabase
    .from("tipo")
    .delete()
    .eq("nombre", tipoNombre); // <--- CAMBIO: Usar 'nombre' para la condición .eq()

  if (error) {
    console.error("Error al eliminar tipo en Supabase:", error);
    return { error: `Error al eliminar tipo: ${error.message}` };
  }

  if (count === 0) {
    console.warn(`Intento de eliminar tipo con nombre "${tipoNombre}" pero no se encontró.`);
    // Podrías considerar esto un error o no, dependiendo de la lógica de tu app.
    // return { error: `Tipo con nombre "${tipoNombre}" no encontrado.` };
  }

  revalidatePath("/admin/tipos"); // Ajusta esta ruta

  return { data: { nombre: tipoNombre } }; // Éxito, devuelve el nombre
}