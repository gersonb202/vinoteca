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

export default function VinoDetallePage({ params }: { params: { id: string } }) {
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
            <BreadcrumbLink href="/catalogo?tipo=tinto">Vinos Tintos</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Reserva Especial 2018</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Imágenes del producto */}
        <div>
          <div className="relative aspect-square bg-white rounded-lg overflow-hidden mb-4">
            <Image
              src="/placeholder.svg?height=600&width=600"
              alt="Reserva Especial 2018"
              fill
              className="object-contain p-4"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="relative aspect-square bg-white rounded-lg overflow-hidden border-2 border-transparent hover:border-primary cursor-pointer"
              >
                <Image
                  src="/placeholder.svg?height=150&width=150"
                  alt={`Vista ${index + 1}`}
                  fill
                  className="object-contain p-2"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Información del producto */}
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <Wine className="h-4 w-4" />
            <span>Vino Tinto</span>
            <span>•</span>
            <Link href="/region/rioja" className="hover:text-primary">
              D.O.Ca. Rioja
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-2">Reserva Especial 2018</h1>

          <Link href="/bodega/1" className="text-lg text-primary hover:underline mb-4 inline-block">
            Bodega Ejemplo
          </Link>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < 4 ? "text-secondary fill-current" : "text-gray-300"}`} />
              ))}
            </div>
            <span className="text-sm text-gray-600">(24 valoraciones)</span>
          </div>

          <div className="mb-6">
            <div className="text-3xl font-bold mb-2">€38,50</div>
            <div className="text-sm text-gray-600">Impuestos incluidos. Gastos de envío calculados en el checkout.</div>
          </div>

          <div className="space-y-6 mb-8">
            <div className="flex flex-col space-y-2">
              <label htmlFor="quantity" className="font-medium">
                Cantidad
              </label>
              <div className="flex items-center">
                <Button variant="outline" size="icon" className="rounded-r-none">
                  <Minus className="h-4 w-4" />
                </Button>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value="1"
                  className="w-16 h-10 text-center border-y border-input"
                  readOnly
                />
                <Button variant="outline" size="icon" className="rounded-l-none">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button className="bg-primary hover:bg-primary/90 flex-1">Añadir al carrito</Button>
            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Añadir a favoritos</span>
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-5 w-5" />
              <span className="sr-only">Compartir</span>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex items-start gap-2">
              <Grape className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium">Variedad</h3>
                <p className="text-sm text-gray-600">100% Tempranillo</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium">Añada</h3>
                <p className="text-sm text-gray-600">2018</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium">Región</h3>
                <p className="text-sm text-gray-600">D.O.Ca. Rioja, España</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Award className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium">Premios</h3>
                <p className="text-sm text-gray-600">92 puntos Parker</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-700 mb-4">
            Este vino ha sido elaborado con uvas Tempranillo de viñedos viejos situados en la Rioja Alta. Envejecido
            durante 18 meses en barricas de roble francés y americano, seguido de un mínimo de 18 meses en botella.
          </p>
        </div>
      </div>

      <Tabs defaultValue="descripcion" className="mt-12">
        <TabsList className="w-full justify-start border-b rounded-none">
          <TabsTrigger value="descripcion">Descripción</TabsTrigger>
          <TabsTrigger value="caracteristicas">Características</TabsTrigger>
          <TabsTrigger value="maridaje">Maridaje</TabsTrigger>
          <TabsTrigger value="valoraciones">Valoraciones</TabsTrigger>
        </TabsList>
        <TabsContent value="descripcion" className="pt-6">
          <div className="prose max-w-none">
            <p>
              El Reserva Especial 2018 es un vino tinto elegante y complejo, elaborado con uvas Tempranillo de viñedos
              viejos situados en la Rioja Alta. Las uvas son vendimiadas a mano y seleccionadas meticulosamente para
              garantizar la máxima calidad.
            </p>
            <p>
              Tras la fermentación, el vino envejece durante 18 meses en barricas de roble francés y americano, seguido
              de un mínimo de 18 meses en botella antes de salir al mercado. Este proceso le confiere una estructura
              tánica equilibrada y una complejidad aromática excepcional.
            </p>
            <p>
              En nariz, presenta aromas intensos de frutos rojos maduros, especias, vainilla y ligeras notas de cuero y
              tabaco. En boca es elegante, con taninos pulidos, buena acidez y un final largo y persistente.
            </p>
            <p>
              Un vino ideal para ocasiones especiales, que puede disfrutarse ahora o guardarse durante los próximos 8-10
              años.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="caracteristicas" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Ficha técnica</h3>
              <ul className="space-y-2">
                <li className="flex justify-between pb-2 border-b">
                  <span className="font-medium">Tipo de vino</span>
                  <span>Tinto</span>
                </li>
                <li className="flex justify-between pb-2 border-b">
                  <span className="font-medium">Variedad</span>
                  <span>100% Tempranillo</span>
                </li>
                <li className="flex justify-between pb-2 border-b">
                  <span className="font-medium">Añada</span>
                  <span>2018</span>
                </li>
                <li className="flex justify-between pb-2 border-b">
                  <span className="font-medium">Denominación</span>
                  <span>D.O.Ca. Rioja</span>
                </li>
                <li className="flex justify-between pb-2 border-b">
                  <span className="font-medium">Crianza</span>
                  <span>18 meses en barrica</span>
                </li>
                <li className="flex justify-between pb-2 border-b">
                  <span className="font-medium">Graduación</span>
                  <span>14% vol.</span>
                </li>
                <li className="flex justify-between pb-2 border-b">
                  <span className="font-medium">Temperatura de servicio</span>
                  <span>16-18°C</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Nota de cata</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Vista</h4>
                  <p className="text-gray-700">Color rojo cereza intenso con ribete granate, limpio y brillante.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Nariz</h4>
                  <p className="text-gray-700">
                    Aromas intensos de frutos rojos maduros, especias, vainilla y ligeras notas de cuero y tabaco.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Boca</h4>
                  <p className="text-gray-700">
                    Entrada suave y elegante, con taninos pulidos, buena acidez y un final largo y persistente. Notas de
                    fruta madura, especias y toques balsámicos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="maridaje" className="pt-6">
          <div className="prose max-w-none">
            <p>
              El Reserva Especial 2018 es un vino versátil que marida perfectamente con una amplia variedad de platos:
            </p>
            <ul>
              <li>Carnes rojas a la parrilla o asadas</li>
              <li>Cordero al horno con hierbas aromáticas</li>
              <li>Estofados y guisos tradicionales</li>
              <li>Caza menor como perdiz o codorniz</li>
              <li>Quesos curados y semicurados</li>
              <li>Jamón ibérico</li>
            </ul>
            <p>
              Su estructura y complejidad lo convierten en un excelente acompañante para platos con cierta intensidad de
              sabor, permitiendo que tanto el vino como la comida se complementen mutuamente.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="valoraciones" className="pt-6">
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">4.2</div>
                  <div className="flex justify-center mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < 4 ? "text-secondary fill-current" : "text-gray-300"}`} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">Basado en 24 valoraciones</p>
                </div>

                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm w-8">5★</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-secondary h-full" style={{ width: "65%" }}></div>
                    </div>
                    <span className="text-sm w-8">65%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm w-8">4★</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-secondary h-full" style={{ width: "20%" }}></div>
                    </div>
                    <span className="text-sm w-8">20%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm w-8">3★</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-secondary h-full" style={{ width: "10%" }}></div>
                    </div>
                    <span className="text-sm w-8">10%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm w-8">2★</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-secondary h-full" style={{ width: "3%" }}></div>
                    </div>
                    <span className="text-sm w-8">3%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm w-8">1★</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-secondary h-full" style={{ width: "2%" }}></div>
                    </div>
                    <span className="text-sm w-8">2%</span>
                  </div>
                </div>
              </div>

              <div className="md:w-2/3">
                <h3 className="text-lg font-semibold mb-4">Opiniones de clientes</h3>
                <div className="space-y-6">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="border-b pb-6">
                      <div className="flex justify-between mb-2">
                        <div className="font-medium">Cliente {index + 1}</div>
                        <div className="text-sm text-gray-500">
                          Hace {index + 1} {index === 0 ? "día" : "días"}
                        </div>
                      </div>
                      <div className="flex mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < 5 - index ? "text-secondary fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700">
                        {index === 0
                          ? "Un vino excepcional con un equilibrio perfecto entre fruta y madera. Taninos suaves y final largo. Perfecto para ocasiones especiales."
                          : index === 1
                            ? "Muy buen vino, aunque esperaba un poco más por el precio. Buen equilibrio y complejidad, pero le falta un poco de carácter."
                            : "Buena relación calidad-precio. Un Rioja clásico con buena estructura y potencial de guarda. Recomendable."}
                      </p>
                    </div>
                  ))}
                </div>

                <Button className="mt-6 bg-primary hover:bg-primary/90">Ver todas las valoraciones</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-8">También te puede interesar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
              <Link href={`/vino/${index + 10}`}>
                <div className="relative h-64 bg-gray-100">
                  <Image
                    src="/placeholder.svg?height=400&width=300"
                    alt={`Vino relacionado ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-1 text-secondary mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < 4 ? "fill-current" : ""}`} />
                    ))}
                  </div>
                  <h3 className="font-semibold text-lg mb-1">Vino Similar {index + 1}</h3>
                  <p className="text-sm text-gray-600 mb-2">Bodega {(index % 3) + 2}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="font-bold text-lg">€{(29.99 + index * 3).toFixed(2)}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-primary border-primary hover:bg-primary hover:text-white"
                    >
                      Ver detalle
                    </Button>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
