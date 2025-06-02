import { createClient } from "@/lib/supabase/server"; 
import { cookies } from 'next/headers';
import UsuarioCliente from "./UsuarioCliente";
import type { Usuario } from "./types";

export const revalidate = 0;

export default async function UsuariosAdminPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let errorMessage: string | undefined = undefined;
  let usuariosFinales: Usuario[] = [];

  const { data: clientesData } = await supabase
      .from('clientes')
      .select('*');

    if (!clientesData || clientesData.length === 0) {
      console.log("No se encontraron perfiles en la tabla 'clientes'.");
    }

    let authUsersMap = new Map<string, { email: string }>();

    usuariosFinales = (clientesData || []).map(cliente => {
      const authUserInfo = cliente.user_id ? authUsersMap.get(cliente.user_id) : undefined;
      return {
        id: cliente.id, 
        nombre: cliente.nombre || 'N/A',
        user_id: cliente.user_id,
        email: authUserInfo?.email || 'Email no disponible',
      };
    });

  return (
    <UsuarioCliente initialUsuarios={usuariosFinales} errorMessage={errorMessage} />
  );
}