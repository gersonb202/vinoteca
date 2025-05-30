import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { LoginForm } from "@/components/login-form"
import { Wine, Star, Award, Truck } from "lucide-react"
import BodegaCliente from "./bodegas/BodegaCliente"
import { createClient } from "@/lib/supabase/server"
import { cookies } from 'next/headers'
import ClienteVino from "./ClienteVino"
import RegionCliente from "./regiones/RegionCliente"

export default async function Home() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  let { data: vinos } = await supabase.from('vino').select("*").limit(5)
  let { data: bodegas } = await supabase.from('bodega').select("*").limit(3)
  let { data: regiones } = await supabase.from('region').select("*").limit(3)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/vinedo.jpg?height=1080&width=1920"
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
            <Button asChild variant="outline" size="lg" className="border-white text-white bg-primary hover:bg-white/10 hover:text-secondary">
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

          <ClienteVino vinos={vinos || []} />

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

          <BodegaCliente bodegas={bodegas || []} />

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

          <RegionCliente regiones={regiones || []} />

          <div className="text-center mt-10">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/regiones">Explorar todas las regiones</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
