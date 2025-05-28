import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Car, Star, Wine } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { cookies } from 'next/headers'
import FiltrarProducto from "./FiltrarProducto"
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

   if (error){
    console.error("Error al obtener los vinos: ", error)
   }

  return (

    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">
        Catálogo de Vinos
      </h1>
      <CatalogoCliente vinosIniciales={vinos || []} />
    </div>
  )
}
