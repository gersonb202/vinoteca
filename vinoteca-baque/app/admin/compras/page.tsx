import { createClient } from "@/lib/supabase/server";
import { cookies } from 'next/headers';
import ComprasCliente from "./CompraCliente";
import type { Compra } from "./types";

export default async function ComprasAdminPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let { data: Compras } = await supabase
    .from('compra')
    .select('idcompra, fecha, clientes ( nombre ), vino ( nombre )')

  // Mapea los datos al tipo Compra.
  const compras: Compra[] = (Compras || []).map(c => {
    
    return {
      idcompra: c.idcompra,
      cliente: c.clientes ? { nombre: (c.clientes as any).nombre } : null,
      vino: c.vino ? { nombre: (c.vino as any).nombre } : null,
      fecha: new Date(c.fecha),
    };
  });

  return (
    <div className="container mx-auto py-8">
      <ComprasCliente initialCompras={compras} />
    </div>
  );
}