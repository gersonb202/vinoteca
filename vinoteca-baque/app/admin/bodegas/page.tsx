import { createClient } from "@/lib/supabase/server";
import { cookies } from 'next/headers';
import BodegasCliente from "./BodegaCliente";

import type { Bodega } from "./types";

export default async function BodegasAdminPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let { data: Bodegas } = await supabase
    .from('bodega')
    .select('*')

  // Mapea los datos al tipo Vino.
  const bodegas: Bodega[] = (Bodegas || []).map(b => ({
    nombre: b.nombre,
    id: b.id,
    telefono: b.telefono, 
    region: b.region
  }));


  return (
    <BodegasCliente initialBodegas={bodegas} />
  );
}