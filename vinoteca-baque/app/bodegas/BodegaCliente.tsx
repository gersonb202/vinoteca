"use client"

import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"

type Bodega = {
    id?: number
    nombre: string
    telefono: number
    region: string
}

interface BodegaProps {
    bodegas: Bodega[]
}

export default function BodegaCliente({bodegas}: BodegaProps){

    return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {(bodegas || []).map((bodega: Bodega, index) => (
          <Card key={index} className="overflow-hidden border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <Link href={`/bodega/${bodega.id}`} className="block">
              <div className="relative h-64 w-full bg-gray-200">
                <Image
                  src={`/bodegas/${bodega.id}.jpg`}
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
                  <span className="truncate">
                    <Link href={`../regiones`} className="hover:underline">
                        {bodega.region}
                    </Link>
                    </span>
                </div>
                <h3 className="font-semibold text-lg mb-1 truncate h-7" title={bodega.nombre}>
                  {bodega.nombre}
                </h3>
                <div className="text-sm text-gray-500">
                  tel: {bodega.telefono}
                </div>
              </div>
            </Link>
          </Card>
        ))}
    </div>
  )

}