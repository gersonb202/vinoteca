import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { cookies } from 'next/headers'

type Bodega = {
  cp: number
  nombre: string
  telefono: number
  region: string
  pais: string
}

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {(bodegas || []).map((bodega: Bodega) => (
          <Card key={bodega.cp} className="overflow-hidden border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <Link href={`/bodega/${bodega.cp}`} className="block">
              <div className="relative h-64 w-full bg-gray-200">
                <Image
                  src={`/bodegas/${bodega.cp}.jpg`}
                  alt={bodega.nombre}
                  title={bodega.nombre}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://placehold.co/300x400/E0E0E0/B0B0B0?text=${encodeURIComponent(bodega.nombre)}`
                  }}
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                  <span className="truncate">{bodega.pais}</span>
                </div>
                <h3 className="font-semibold text-lg mb-1 truncate h-7" title={bodega.nombre}>
                  {bodega.nombre}
                </h3>
                <div className="text-sm text-gray-500">
                  CP: {bodega.cp}
                </div>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}