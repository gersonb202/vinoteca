import { createClient } from "@/lib/supabase/server"
import { cookies } from 'next/headers'
import CatalogoCliente from "./CatalogoCliente"

export type Vino = {  
  id: number
  nombre: string
  precio?: number
  anhaje?: number
  grado?: number
  bodega?: string
  tipo?: string
}

export default async function CatalogoPage() {
   const cookieStore = cookies()
   const supabase = createClient(cookieStore)

   let { data: vinos, error } = await supabase.from('vino').select("*")
   let { data: bodegas} = await supabase.from("bodega").select("nombre")

   if (error){
    console.error("Error al obtener los vinos: ", error)
   }

  return (

    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">
        Catálogo de Vinos
      </h1>
      <CatalogoCliente vinosIniciales={vinos || []} bodegas={bodegas || []} />
    </div>
  )
}
