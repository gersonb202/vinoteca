import { createClient } from "@/lib/supabase/server"
import { cookies } from 'next/headers'
import BodegaCliente from "./BodegaCliente"

export default async function BodegasPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  let { data: bodegas, error } = await supabase.from('bodega').select("*")

  if (error) {
    console.error("Error al obtener las bodegas:", error)
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">
        Nuestras Bodegas
      </h1>
      <BodegaCliente bodegas={bodegas || []} />
    </div>
  )
}