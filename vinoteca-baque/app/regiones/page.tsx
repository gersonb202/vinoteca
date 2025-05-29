import { createClient } from "@/lib/supabase/server"
import { cookies } from 'next/headers'
import RegionCliente from "./RegionCliente"

export type Region = {
  cp: string
  nombre: string
  pais: string
}

export default async function BodegasPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  let { data: regiones, error } = await supabase.from('region').select("*")

  if (error) {
    console.error("Error al obtener las regiones:", error)
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">
        Nuestras Regiones
      </h1>
      <RegionCliente regiones={regiones || []} />
    </div>
  )
}