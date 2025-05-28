import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { cookies } from 'next/headers'
import { registerHooks } from "module"

type Region = {
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
        Nuestras Bodegas
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {(regiones || []).map((region: Region) => (
          <Card key={region.cp} className="overflow-hidden border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <Link href={`/bodega/${region.cp}`} className="block">
              <div className="relative h-64 w-full bg-gray-200">
                <Image
                  src={`/bodegas/${region.cp}.jpg`}
                  alt={region.nombre}
                  title={region.nombre}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://placehold.co/300x400/E0E0E0/B0B0B0?text=${encodeURIComponent(region.nombre)}`
                  }}
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                  <span className="truncate">{region.pais}</span>
                </div>
                <h3 className="font-semibold text-lg mb-1 truncate h-7" title={region.nombre}>
                  {region.nombre}
                </h3>
                <div className="text-sm text-gray-500">
                  CP: {region.cp}
                </div>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}