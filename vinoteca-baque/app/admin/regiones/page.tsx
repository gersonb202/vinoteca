import { createClient } from "@/lib/supabase/server";
import { cookies } from 'next/headers';
import RegionesCliente from "./RegionCliente";

import type { Region } from "./types";

export default async function BodegasAdminPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let { data: Regiones } = await supabase
    .from('region')
    .select('*')

  // Mapea los datos al tipo Vino.
  const regiones: Region[] = (Regiones || []).map(r => ({
    cp: r.cp,
    nombre: r.nombre,
    pais: r.pais,
  }));


  return (
    <RegionesCliente initialRegiones={regiones} />
  );
}