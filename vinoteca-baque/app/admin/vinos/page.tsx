import { createClient } from "@/lib/supabase/server";
import { cookies } from 'next/headers';
import VinosCliente from "./ProductoCliente";
import type { Vino } from "./types";

export const revalidate = 0; // O 'force-dynamic'

export default async function ProductosAdminPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let { data: vinosData } = await supabase
    .from('vino')
    .select('*')

  // Mapea los datos al tipo Vino.
  const vinos: Vino[] = (vinosData || []).map(v => ({
    id: v.id,
    nombre: v.nombre,
    tipo: v.tipo,
    precio: v.precio,
    anio: v.anio,
    grado: v.grado,
    descripcion: v.descripcion,
    bodega: v.bodega
  }));


  return (
    <VinosCliente initialVinos={vinos} />
  );
}