import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { LoginForm } from "@/components/login-form"
import { Wine, Star, Award, Truck } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Viñedos Vinoteca Baque"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Descubre el Arte del Vino</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Selección premium de vinos de las mejores bodegas y regiones vinícolas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-black">
              <Link href="/catalogo">Explorar Catálogo</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Link href="/bodegas">Conocer Bodegas</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Introducción */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Bienvenido a Vinoteca Baque</h2>
            <p className="text-lg text-gray-700 mb-8">
              En Vinoteca Baque nos dedicamos a seleccionar los mejores vinos de las regiones vinícolas más
              prestigiosas. Cada botella cuenta una historia única sobre su origen, su bodega y las personas que lo
              elaboran con pasión.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              <div className="flex flex-col items-center">
                <Wine className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Selección Premium</h3>
                <p className="text-sm text-gray-600 text-center">Vinos cuidadosamente seleccionados</p>
              </div>
              <div className="flex flex-col items-center">
                <Star className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Calidad Garantizada</h3>
                <p className="text-sm text-gray-600 text-center">Solo los mejores vinos en nuestra tienda</p>
              </div>
              <div className="flex flex-col items-center">
                <Award className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Expertos en Vinos</h3>
                <p className="text-sm text-gray-600 text-center">Asesoramiento personalizado</p>
              </div>
              <div className="flex flex-col items-center">
                <Truck className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Envío Seguro</h3>
                <p className="text-sm text-gray-600 text-center">Entrega cuidadosa a domicilio</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vinos Destacados */}
      <section className="py-16 bg-background-light">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Vinos Destacados</h2>

          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <Link href={`/vino/${index + 1}`} className="block">
                        <div className="relative h-64 bg-gray-100">
                          <Image
                            src="/placeholder.svg?height=400&width=300"
                            alt={`Vino destacado ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          {index % 2 === 0 && (
                            <div className="absolute top-2 right-2 bg-secondary text-black text-xs font-bold px-2 py-1 rounded">
                              Destacado
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex items-center gap-1 text-secondary mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-current" />
                            ))}
                          </div>
                          <h3 className="font-semibold text-lg mb-1">Reserva Especial {index + 2020}</h3>
                          <p className="text-sm text-gray-600 mb-2">Bodega Ejemplo</p>
                          <div className="flex justify-between items-center mt-4">
                            <span className="font-bold text-lg">€{(19.99 + index * 5).toFixed(2)}</span>
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

          <div className="text-center mt-10">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/catalogo">Ver todo el catálogo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Bodegas Destacadas */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Bodegas Destacadas</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
                <Link href={`/bodega/${index + 1}`}>
                  <div className="relative h-48">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt={`Bodega ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">Bodega {index + 1}</h3>
                    <p className="text-sm text-gray-600 mb-4">Región vinícola, España</p>
                    <p className="text-sm text-gray-700 mb-4">
                      Una bodega con tradición centenaria que combina métodos tradicionales con tecnología moderna para
                      crear vinos excepcionales.
                    </p>
                    <Button
                      variant="outline"
                      className="w-full text-primary border-primary hover:bg-primary hover:text-white"
                    >
                      Descubrir bodega
                    </Button>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/bodegas">Ver todas las bodegas</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Regiones Vinícolas */}
      <section className="py-16 bg-background-light">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Regiones Vinícolas</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Rioja", "Ribera del Duero", "Priorat", "Rías Baixas"].map((region, index) => (
              <Card key={index} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
                <Link href={`/region/${region.toLowerCase().replace(/ /g, "-")}`}>
                  <div className="relative h-40">
                    <Image src="/placeholder.svg?height=200&width=300" alt={region} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <h3 className="text-white text-xl font-bold">{region}</h3>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/regiones">Explorar todas las regiones</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-primary text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Únete a nuestra comunidad</h2>
            <p className="text-lg mb-8">
              Suscríbete para recibir noticias sobre nuevos vinos, ofertas exclusivas y eventos.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="px-4 py-3 rounded-md flex-1 text-black"
                required
              />
              <Button className="bg-secondary hover:bg-secondary/90 text-black">Suscribirse</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
