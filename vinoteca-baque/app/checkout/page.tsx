"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, CreditCard, Truck, ShieldCheck } from "lucide-react"

export default function CheckoutPage() {
  const [step, setStep] = useState<"shipping" | "payment" | "review">("shipping")

  const cartItems = [
    {
      id: 1,
      name: "Reserva Especial 2018",
      price: 38.5,
      quantity: 2,
      image: "/placeholder.svg?height=150&width=100",
      type: "Tinto",
      bodega: "Bodega Ejemplo",
    },
    {
      id: 2,
      name: "Verdejo 2022",
      price: 14.95,
      quantity: 1,
      image: "/placeholder.svg?height=150&width=100",
      type: "Blanco",
      bodega: "Bodega Ejemplo 2",
    },
    {
      id: 3,
      name: "Gran Reserva 2015",
      price: 45.0,
      quantity: 1,
      image: "/placeholder.svg?height=150&width=100",
      type: "Tinto",
      bodega: "Bodega Ejemplo 3",
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 7.95
  const total = subtotal + shipping

  return (
    <div className="container py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <Link href="/carrito" className="text-primary hover:text-primary/80">
            Volver al carrito
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center mb-6">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "shipping" ? "bg-primary text-white" : "bg-gray-200 text-gray-600"}`}
                >
                  1
                </div>
                <div className={`h-1 flex-1 ${step === "shipping" ? "bg-primary" : "bg-gray-200"}`}></div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "payment" ? "bg-primary text-white" : "bg-gray-200 text-gray-600"}`}
                >
                  2
                </div>
                <div className={`h-1 flex-1 ${step === "review" ? "bg-primary" : "bg-gray-200"}`}></div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "review" ? "bg-primary text-white" : "bg-gray-200 text-gray-600"}`}
                >
                  3
                </div>
              </div>

              {step === "shipping" && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Información de envío</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label htmlFor="firstName">Nombre</Label>
                      <Input id="firstName" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Apellidos</Label>
                      <Input id="lastName" className="mt-1" />
                    </div>
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" className="mt-1" />
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" type="tel" className="mt-1" />
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="address">Dirección</Label>
                    <Input id="address" className="mt-1" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <Label htmlFor="postalCode">Código postal</Label>
                      <Input id="postalCode" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="city">Ciudad</Label>
                      <Input id="city" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="country">País</Label>
                      <Select defaultValue="es">
                        <SelectTrigger id="country" className="mt-1">
                          <SelectValue placeholder="Seleccionar país" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="es">España</SelectItem>
                          <SelectItem value="fr">Francia</SelectItem>
                          <SelectItem value="pt">Portugal</SelectItem>
                          <SelectItem value="it">Italia</SelectItem>
                          <SelectItem value="de">Alemania</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <Label htmlFor="notes">Notas de entrega (opcional)</Label>
                    <Textarea id="notes" className="mt-1" placeholder="Instrucciones especiales para la entrega" />
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={() => setStep("payment")} className="bg-primary hover:bg-primary/90">
                      Continuar al pago
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === "payment" && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Método de pago</h2>

                  <RadioGroup defaultValue="card" className="mb-6">
                    <div className="flex items-center space-x-2 border rounded-md p-4 mb-3">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        <div className="flex items-center">
                          <CreditCard className="h-5 w-5 mr-2 text-primary" />
                          Tarjeta de crédito/débito
                        </div>
                      </Label>
                      <div className="flex gap-2">
                        <div className="w-10 h-6 bg-gray-200 rounded"></div>
                        <div className="w-10 h-6 bg-gray-200 rounded"></div>
                        <div className="w-10 h-6 bg-gray-200 rounded"></div>
                      </div>
                    </div>

                    <div className="border rounded-md p-4 mb-3">
                      <Accordion type="single" collapsible>
                        <AccordionItem value="card-details" className="border-none">
                          <AccordionTrigger className="p-0">
                            <div className="flex items-center">
                              <CreditCard className="h-5 w-5 mr-2 text-primary" />
                              Detalles de la tarjeta
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="pt-4 space-y-4">
                              <div>
                                <Label htmlFor="cardNumber">Número de tarjeta</Label>
                                <Input id="cardNumber" className="mt-1" placeholder="1234 5678 9012 3456" />
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="expiry">Fecha de expiración</Label>
                                  <Input id="expiry" className="mt-1" placeholder="MM/AA" />
                                </div>
                                <div>
                                  <Label htmlFor="cvc">CVC</Label>
                                  <Input id="cvc" className="mt-1" placeholder="123" />
                                </div>
                              </div>

                              <div>
                                <Label htmlFor="nameOnCard">Nombre en la tarjeta</Label>
                                <Input id="nameOnCard" className="mt-1" />
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>

                    <div className="flex items-center space-x-2 border rounded-md p-4 mb-3">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                        <div className="flex items-center">
                          <div className="w-5 h-5 mr-2 bg-gray-200 rounded"></div>
                          PayPal
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 border rounded-md p-4">
                      <RadioGroupItem value="transfer" id="transfer" />
                      <Label htmlFor="transfer" className="flex-1 cursor-pointer">
                        <div className="flex items-center">
                          <div className="w-5 h-5 mr-2 bg-gray-200 rounded"></div>
                          Transferencia bancaria
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="flex items-center space-x-2 mb-6">
                    <Checkbox id="savePayment" />
                    <Label htmlFor="savePayment">Guardar información de pago para futuras compras</Label>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep("shipping")}>
                      Volver
                    </Button>
                    <Button onClick={() => setStep("review")} className="bg-primary hover:bg-primary/90">
                      Revisar pedido
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === "review" && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Revisar y confirmar</h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Dirección de envío</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p>Juan Pérez</p>
                        <p>Calle Ejemplo 123</p>
                        <p>28001 Madrid, España</p>
                        <p>+34 612 345 678</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Método de pago</h3>
                      <div className="bg-gray-50 p-4 rounded-md flex items-center">
                        <CreditCard className="h-5 w-5 mr-2 text-primary" />
                        <span>Visa terminada en 4242</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Productos</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="space-y-4">
                          {cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4">
                              <div className="relative w-12 h-16 bg-white rounded">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">{item.name}</h4>
                                <div className="text-sm text-gray-500">
                                  {item.type} • {item.bodega}
                                </div>
                                <div className="text-sm">
                                  {item.quantity} x €{item.price.toFixed(2)}
                                </div>
                              </div>
                              <div className="font-medium">€{(item.price * item.quantity).toFixed(2)}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-6 mb-6">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms">
                      He leído y acepto los{" "}
                      <Link href="/terminos" className="text-primary hover:underline">
                        términos y condiciones
                      </Link>{" "}
                      y la{" "}
                      <Link href="/privacidad" className="text-primary hover:underline">
                        política de privacidad
                      </Link>
                    </Label>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep("payment")}>
                      Volver
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90">Confirmar y pagar</Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-4">Resumen del pedido</h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-12 h-16 bg-gray-100 rounded shrink-0">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">{item.name}</h3>
                      <p className="text-xs text-gray-500">{item.type}</p>
                    </div>
                    <div className="text-sm font-medium">€{(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <Separator className="mb-4" />

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío</span>
                  <span>{shipping === 0 ? "Gratis" : `€${shipping.toFixed(2)}`}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
                <div className="text-xs text-gray-500 text-right">Impuestos incluidos</div>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-2">
                  <Truck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Envío gratuito</h3>
                    <p className="text-gray-600">En pedidos superiores a €100</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Pago seguro</h3>
                    <p className="text-gray-600">Tus datos están protegidos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
