import { createClient } from "@/lib/supabase/server";
import { cookies } from 'next/headers';
import TiposCliente from "./TipoCliente";
import type { Tipo } from "./types";

export default async function TiposAdminPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let { data: TiposFromDB } = await supabase
    .from('tipo')
    .select('*')

  // Mapea los datos al tipo Vino.
  const tiposData: Tipo[] = (TiposFromDB || []).map(t => ({
    nombre: t.nombre,
    descripcion: t.descripcion
  }));


  return (
    <TiposCliente initialTipos={tiposData} />
  );
}