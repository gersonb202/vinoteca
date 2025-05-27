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

type Vino = {  
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

   let { data: vinos, error } = await supabase.from('vino').select("*").limit(9)


  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Catálogo de Vinos</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filtros */}
        
        <div className="w-full lg:w-64 shrink-0">
          {vinos && <FiltrarProducto vinos={vinos} onFiltrar={(filtradoVinos) => {
            console.log("Vinos filtrados:", filtradoVinos)
          }} />}
        </div>

        {/* Productos */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <p className="text-sm text-gray-500">Mostrando 24 de 120 productos</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm whitespace-nowrap">Ordenar por:</span>
              <Select defaultValue="relevancia">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Relevancia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevancia">Relevancia</SelectItem>
                  <SelectItem value="precio-asc">Precio: menor a mayor</SelectItem>
                  <SelectItem value="precio-desc">Precio: mayor a menor</SelectItem>
                  <SelectItem value="nombre-asc">Nombre: A-Z</SelectItem>
                  <SelectItem value="nombre-desc">Nombre: Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

         {/* Listado de vinos */}

         <div className="container mx-auto py-8 px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-8">Catálogo de Vinos</h1>
          {vinos && vinos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {vinos.map((vino: Vino) => (
                <Card key={vino.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
                  <Link href={`/vino/${vino.nombre}`}>
                  <div className="relative h-64 bg-gray-200">
                    <Image src="/placeholder.svg?height=400&width=300" alt={vino.nombre} fill className="object-cover"/>
                    { /* para las ofertas */}
                    {/*{(vino.precio || index % 5 === 0) && ( // Ejemplo: si vino.en_oferta es true O como fallback, usa el index
                    <div className="absolute top-2 right-2 bg-secondary text-black text-xs font-bold px-2 py-1 rounded">
                      Oferta
                    </div>
                    )}*/}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                    {vino.tipo && <Wine className="h-3 w-3" />}
                    {vino.tipo && <span>{vino.tipo}</span>}
                    {vino.tipo && <span>•</span>}
                    {vino.bodega && <span>{vino.bodega}</span>}
                  </div>
                  <h3 className="font-semibold text-lg mb-1 truncate" title={vino.nombre}>
                    {vino.nombre || `Vino Desconocido`}
                  </h3>
                  {vino.bodega && (
                    <p className="text-sm text-gray-600 mb-2">{vino.bodega}</p>
                  )}
                  <div className="flex justify-between items-center mt-4">
                    <span className="font-bold text-lg">
                      {vino.precio ? `€${vino.precio}` : "Precio no disponible"}
                    </span>
                  </div>
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <p>No hay vinos disponibles en el catálogooo.</p>
          )}
         </div>

          <div className="flex justify-center mt-10">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" disabled>
                &lt;
              </Button>
              <Button variant="outline" size="sm" className="bg-primary text-white">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                4
              </Button>
              <Button variant="outline" size="sm">
                5
              </Button>
              <Button variant="outline" size="icon">
                &gt;
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
