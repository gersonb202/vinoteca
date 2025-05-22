"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  type: string
  bodega: string
}

export default function CarritoPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
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
  ])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 7.95
  const total = subtotal + shipping

  if (cartItems.length === 0) {
    return (
      <div className="container py-16">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="h-16 w-16 mx-auto mb-6 text-gray-300" />
          <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
          <p className="text-gray-600 mb-8">Parece que aún no has añadido ningún vino a tu carrito.</p>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/catalogo">Explorar catálogo</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Tu carrito</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="hidden md:grid grid-cols-12 gap-4 mb-4 text-sm font-medium text-gray-500">
              <div className="col-span-6">Producto</div>
              <div className="col-span-2 text-center">Precio</div>
              <div className="col-span-2 text-center">Cantidad</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            <Separator className="mb-6" />

            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="col-span-6 flex items-center gap-4">
                    <div className="relative w-16 h-24 bg-gray-100 rounded">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        <Link href={`/vino/${item.id}`} className="hover:text-primary">
                          {item.name}
                        </Link>
                      </h3>
                      <div className="text-sm text-gray-500 mt-1">
                        {item.type} • {item.bodega}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1 mt-2 md:hidden"
                      >
                        <Trash2 className="h-4 w-4" />
                        Eliminar
                      </button>
                    </div>
                  </div>

                  <div className="col-span-2 text-center">
                    <div className="md:hidden text-sm text-gray-500 mb-1">Precio:</div>
                    <div>€{item.price.toFixed(2)}</div>
                  </div>

                  <div className="col-span-2">
                    <div className="md:hidden text-sm text-gray-500 mb-1">Cantidad:</div>
                    <div className="flex items-center justify-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-r-none"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                        className="h-8 w-12 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-l-none"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="col-span-2 text-right">
                    <div className="md:hidden text-sm text-gray-500 mb-1">Total:</div>
                    <div className="font-medium">€{(item.price * item.quantity).toFixed(2)}</div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-sm text-red-600 hover:text-red-800 hidden md:flex items-center gap-1 justify-end mt-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Eliminar
                    </button>
                  </div>

                  <div className="col-span-12">
                    <Separator />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/catalogo" className="text-primary hover:text-primary/80 flex items-center gap-1">
                <ArrowRight className="h-4 w-4 rotate-180" />
                Continuar comprando
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-bold mb-4">Resumen del pedido</h2>

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

            <div className="space-y-4">
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link href="/checkout">Finalizar compra</Link>
              </Button>

              <div className="text-xs text-gray-500 text-center">Envío gratis en pedidos superiores a €100</div>
            </div>

            <div className="mt-6 space-y-2">
              <h3 className="text-sm font-medium">Aceptamos</h3>
              <div className="flex gap-2">
                <div className="w-10 h-6 bg-gray-200 rounded"></div>
                <div className="w-10 h-6 bg-gray-200 rounded"></div>
                <div className="w-10 h-6 bg-gray-200 rounded"></div>
                <div className="w-10 h-6 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
