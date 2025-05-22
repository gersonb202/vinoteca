"use client"

import Link from "next/link"
import { Wine, Home, Search, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Icono decorativo */}
        <div className="mb-8">
          <div className="relative inline-block">
            <Wine className="w-24 h-24 sm:w-32 sm:h-32 text-amber-600/20 mx-auto" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl sm:text-8xl font-bold text-amber-800 font-playfair">
                404
              </span>
            </div>
          </div>
        </div>

        {/* Mensaje principal */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-playfair">
            Página no encontrada
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-2">
            Parece que esta botella se ha perdido en nuestra bodega
          </p>
          <p className="text-base text-gray-500">
            La página que buscas no existe o ha sido movida
          </p>
        </div>

        {/* Decoración visual */}
        <div className="mb-12 flex justify-center items-center space-x-2">
          <div className="w-2 h-2 bg-amber-600 rounded-full animate-pulse"></div>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
          <Wine className="w-5 h-5 text-amber-600" />
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
          <div className="w-2 h-2 bg-amber-600 rounded-full animate-pulse delay-300"></div>
        </div>

        {/* Botones de navegación */}
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <Home className="w-5 h-5 mr-2" />
            Volver al inicio
          </Link>
          
          <Link 
            href="/productos"
            className="inline-flex items-center px-6 py-3 bg-white text-amber-600 font-medium rounded-lg border-2 border-amber-600 hover:bg-amber-50 transition-colors duration-200"
          >
            <Search className="w-5 h-5 mr-2" />
            Ver nuestros vinos
          </Link>
        </div>

        {/* Sugerencias adicionales */}
        <div className="mt-12 p-6 bg-amber-50 rounded-lg border border-amber-200">
          <h3 className="text-lg font-semibold text-amber-800 mb-3 font-playfair">
            ¿Qué puedes hacer?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-amber-700">
            <div className="flex items-start space-x-2">
              <ArrowLeft className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>Usa el botón "atrás" de tu navegador</span>
            </div>
            <div className="flex items-start space-x-2">
              <Home className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>Visita nuestra página principal</span>
            </div>
            <div className="flex items-start space-x-2">
              <Search className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>Explora nuestro catálogo de vinos</span>
            </div>
          </div>
        </div>

        {/* Enlaces adicionales */}
        <div className="mt-8 text-sm text-gray-500">
          <p>
            ¿Necesitas ayuda? Visita nuestra{" "}
            <Link href="/contacto" className="text-amber-600 hover:text-amber-700 underline">
              página de contacto
            </Link>
            {" "}o explora nuestras{" "}
            <Link href="/categorias" className="text-amber-600 hover:text-amber-700 underline">
              categorías de vino
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}