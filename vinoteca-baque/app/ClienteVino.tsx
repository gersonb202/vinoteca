import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Wine, Star, Award, Truck } from "lucide-react"

type Vino = {
    id: number
    nombre: string
    precio?: number
    anhaje?: number
    grado?: number
    bodega: string
    tipo?: string
    imagen?: string
}

interface VinoClienteProps {
    vinos: Vino[]
}

export default function ClienteVino({ vinos }: VinoClienteProps){
    return(
        <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {vinos.map((vino: Vino) => (
                <CarouselItem key={vino.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <Link href={`/vino/${vino.id}`} className="block">
                        <div className="relative h-64 bg-gray-100">
                          <Image
                            src={`/fvinos/${vino.id}.jpg`}
                            alt={`Vino destacado ${vino.id + 1}`}
                            fill
                            className="object-cover"
                          />
                          {vino.id % 2 === 0 && (
                            <div className="absolute top-2 right-2 bg-secondary text-black text-xs font-bold px-2 py-1 rounded">
                              Destacado
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-lg mb-1">{vino.nombre}</h3>
                          <p className="text-sm text-gray-600 mb-2">{vino.bodega}</p>
                          <div className="flex justify-between items-center mt-4">
                            <span className="font-bold text-lg">€{vino.precio}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-primary border-primary hover:bg-primary hover:text-white"
                            >
                              Ver detalle
                            </Button>
                          </div>
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
    )
}