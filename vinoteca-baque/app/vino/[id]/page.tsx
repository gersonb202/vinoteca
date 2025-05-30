import { CardContent } from "@/components/ui/card"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Star, Minus, Plus, Heart, Share2, Wine, Grape, MapPin, Calendar, Award } from "lucide-react"
import Cantidad from "./Cantidad"
import { createClient } from "@/lib/supabase/server"
import { cookies } from 'next/headers'
import ClienteVino from "@/app/ClienteVino" // Asegúrate de que esta ruta sea correcta

export default async function VinoDetallePage({ params }: { params: { id: string } }) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // Aquí es donde aplicas el filtro por ID
  const { data: vino, error } = await supabase
    .from('vino')
    .select("*")
    .eq('id', params.id) // <--- Filtra por el 'id' de los parámetros de la URL
    .single(); // <--- Usa .single() si esperas un solo resultado

  if (error) {
    console.error("Error al obtener el vino:", error);
    // Aquí puedes manejar el error, por ejemplo, redirigir a una página 404
    // o mostrar un mensaje al usuario.
    // return <div>Error: Vino no encontrado</div>;
  }

  if (!vino) {
    // Si no se encontró ningún vino con ese ID
    return <div>Vino no encontrado.</div>;
  }

  // Si necesitas otros vinos relacionados para "También te puede interesar"
  // puedes hacer otra consulta aquí. Por ejemplo, vinos del mismo tipo o bodega.
  const { data: vinosRelacionados } = await supabase
    .from('vino')
    .select("*")
    .limit(5)
    // Puedes añadir un filtro para vinos relacionados, por ejemplo:
    // .neq('id', params.id) // Excluir el vino actual
    // .eq('tipo', vino.tipo) // Si tienes una columna 'tipo' en tu tabla
    ;

  return (
    <div className="container py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/catalogo">Catálogo</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/catalogo?tipo=tinto">Vinos {vino.tipo}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {/* Usa el nombre real del vino aquí */}
            <BreadcrumbLink>{vino.nombre}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Imágenes del producto */}
        <div>
          <div className="relative aspect-square bg-white rounded-lg overflow-hidden mb-4">
            <Image
              src={`/fvinos/${vino.id}.jpg`} // Usa la URL de la imagen de tu vino
              alt={vino.nombre}
              fill
              className="object-contain p-4"
            />
          </div>
        </div>

        {/* Información del producto */}
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <Wine className="h-4 w-4" />
            {/* Asegúrate de que 'tipo' sea una columna en tu tabla 'vino' */}
            <span>{vino.tipo}</span>
          </div>

          <h1 className="text-3xl font-bold mb-2">{vino.nombre}</h1> {/* Usa el nombre del vino */}

          <Link href={`/bodegas`} className="text-lg text-primary hover:underline mb-4 inline-block">
            {/* Aquí deberías cargar el nombre de la bodega, tal vez con otra consulta o join si tienes la tabla de bodegas */}
            {vino.bodega}
          </Link>

          <div className="flex items-center gap-2 mb-6">
            {/* ... (tu código de valoraciones) ... */}
          </div>
          <Cantidad />
          <div className="mb-6">
            <div className="text-3xl font-bold mb-2">€{vino.precio.toFixed(2)}</div> {/* Usa el precio del vino */}
          </div>

          <div className="space-y-6 mb-8">
            {/* Otros detalles que quieras mostrar */}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button className="bg-primary hover:bg-primary/90 flex-1">Añadir al carrito</Button>
            {/* 
            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Añadir a favoritos</span>
            </Button>
            */}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex items-start gap-2">
              <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium">Añada</h3>
                <p className="text-sm text-gray-600">{vino.anio}</p> {/* Usa la añada del vino */}
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium">Bodega</h3>
                {/* De nuevo, aquí iría el nombre de la bodega */}
                <p className="text-sm text-gray-600">{vino.nombre}</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Tabs defaultValue="descripcion" className="mt-12">
        <TabsList className="w-full justify-start border-b rounded-none">
          <TabsTrigger value="descripcion">Descripción</TabsTrigger>
          <TabsTrigger value="caracteristicas">Características</TabsTrigger>
        </TabsList>
        <TabsContent value="descripcion" className="pt-6">
          <div className="prose max-w-none">
            <p>{vino.descripcion}</p> {/* Usa la descripción del vino */}
          </div>
        </TabsContent>
        <TabsContent value="caracteristicas" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Ficha técnica</h3>
              <ul className="space-y-2">
                <li className="flex justify-between pb-2 border-b">
                  <span className="font-medium">Tipo de vino</span>
                  <span>{vino.tipo}</span>
                </li>
                <li className="flex justify-between pb-2 border-b">
                  <span className="font-medium">Añada</span>
                  <span>{vino.anio}</span>
                </li>
                <li className="flex justify-between pb-2 border-b">
                  <span className="font-medium">Bodega</span>
                  <span>{vino.bodega}</span>
                </li>
                <li className="flex justify-between pb-2 border-b">
                  <span className="font-medium">Graduación</span>
                  <span>{vino.grado}% vol.</span>
                </li>
              </ul>
            </div>
            
          </div>
        </TabsContent>
      </Tabs>

      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-8">También te puede interesar</h2>
        {/* Pasa los vinos relacionados a ClienteVino */}
        <ClienteVino vinos={vinosRelacionados || []} />
      </section>
    </div>
  )
}