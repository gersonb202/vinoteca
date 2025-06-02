import { createClient } from "@/lib/supabase/server";
import { cookies } from 'next/headers';

import type { Tipo } from "./types";

export default async function ProductosAdminPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let { data: Tipos } = await supabase
    .from('tipo')
    .select('*')

  // Mapea los datos al tipo Vino.
  const tipos: Tipo[] = (Tipos || []).map(t => ({
    nombre: t.nombre,
    descripcion: t.descripccion
  }));


  return (
    
  );
}