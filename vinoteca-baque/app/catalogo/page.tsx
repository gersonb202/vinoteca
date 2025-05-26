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

type Vino = {  
  nombre: string
  precio?: number
  bodega?: string
  tipo?: string
}

export default async function CatalogoPage() {
   const cookieStore = cookies()
   const supabase = createClient(cookieStore)

   let { data: vinos, error } = await supabase.from("vino").select("*")

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Catálogo de Vinos</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filtros */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="sticky top-24 space-y-6">
            <div className="lg:hidden flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filtros</h2>
              <Button variant="outline" size="sm">
                Limpiar filtros
              </Button>
            </div>

            <Accordion type="single" collapsible defaultValue="tipo" className="w-full">
              <AccordionItem value="tipo">
                <AccordionTrigger className="text-base font-medium">Tipo de vino</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="tinto" />
                      <Label htmlFor="tinto">Tinto</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="blanco" />
                      <Label htmlFor="blanco">Blanco</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="rosado" />
                      <Label htmlFor="rosado">Rosado</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="espumoso" />
                      <Label htmlFor="espumoso">Espumoso</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="dulce" />
                      <Label htmlFor="dulce">Dulce</Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="region">
                <AccordionTrigger className="text-base font-medium">Región</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="rioja" />
                      <Label htmlFor="rioja">Rioja</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="ribera" />
                      <Label htmlFor="ribera">Ribera del Duero</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="priorat" />
                      <Label htmlFor="priorat">Priorat</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="rias" />
                      <Label htmlFor="rias">Rías Baixas</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="penedes" />
                      <Label htmlFor="penedes">Penedés</Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="bodega">
                <AccordionTrigger className="text-base font-medium">Bodega</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="bodega1" />
                      <Label htmlFor="bodega1">Bodega 1</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="bodega2" />
                      <Label htmlFor="bodega2">Bodega 2</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="bodega3" />
                      <Label htmlFor="bodega3">Bodega 3</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="bodega4" />
                      <Label htmlFor="bodega4">Bodega 4</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="bodega5" />
                      <Label htmlFor="bodega5">Bodega 5</Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="precio">
                <AccordionTrigger className="text-base font-medium">Precio</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6">
                    <Slider defaultValue={[10, 100]} min={0} max={200} step={1} />
                    <div className="flex items-center justify-between">
                      <span>€10</span>
                      <span>€100</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="uva">
                <AccordionTrigger className="text-base font-medium">Variedad de uva</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="tempranillo" />
                      <Label htmlFor="tempranillo">Tempranillo</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="garnacha" />
                      <Label htmlFor="garnacha">Garnacha</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="verdejo" />
                      <Label htmlFor="verdejo">Verdejo</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="albarino" />
                      <Label htmlFor="albarino">Albariño</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mencia" />
                      <Label htmlFor="mencia">Mencía</Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="hidden lg:block">
              <Button variant="outline" className="w-full">
                Limpiar filtros
              </Button>
            </div>
          </div>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {vinos.map((vino: Vino, index) => (
                <Card key={vino.nombre} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
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
                    {vino.nombre || `Vino Desconocido ${vino.nombre}`}
                  </h3>
                  {vino.bodega && (
                    <p className="text-sm text-gray-600 mb-2">{vino.bodega}</p>
                  )}
                  <div className="flex justify-between items-center mt-4">
                    <span className="font-bold text-lg">
                      {vino.precio ? `€${vino.precio.toFixed(2)}` : "Precio no disponible"}
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
