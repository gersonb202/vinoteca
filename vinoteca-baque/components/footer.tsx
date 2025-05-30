import Link from "next/link"
import { Wine, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Wine className="h-6 w-6" />
              <span className="font-playfair text-xl font-bold">Vinoteca Baque</span>
            </div>
            <p className="text-sm text-gray-200 mb-6">
              Descubre nuestra selección de vinos premium de las mejores bodegas y regiones vinícolas.
            </p>
            <div className="flex space-x-4">
              <Link href="https://centronelson.org/" className="text-white hover:text-secondary transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://centronelson.org/" className="text-white hover:text-secondary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://centronelson.org/" className="text-white hover:text-secondary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-playfair text-lg font-semibold mb-4">Navegación</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-200 hover:text-secondary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="text-gray-200 hover:text-secondary transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/bodegas" className="text-gray-200 hover:text-secondary transition-colors">
                  Bodegas
                </Link>
              </li>
              <li>
                <Link href="/regiones" className="text-gray-200 hover:text-secondary transition-colors">
                  Regiones
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-playfair text-lg font-semibold mb-4">Categorías</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/catalogo?tipo=tinto" className="text-gray-200 hover:text-secondary transition-colors">
                  Vinos Tintos
                </Link>
              </li>
              <li>
                <Link href="/catalogo?tipo=blanco" className="text-gray-200 hover:text-secondary transition-colors">
                  Vinos Blancos
                </Link>
              </li>
              <li>
                <Link href="/catalogo?tipo=rosado" className="text-gray-200 hover:text-secondary transition-colors">
                  Vinos Rosados
                </Link>
              </li>
              <li>
                <Link href="/catalogo?tipo=espumoso" className="text-gray-200 hover:text-secondary transition-colors">
                  Espumosos
                </Link>
              </li>
              <li>
                <Link href="/catalogo?tipo=dulce" className="text-gray-200 hover:text-secondary transition-colors">
                  Vinos Secos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-playfair text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-gray-200">Calle Vinoteca 123, 28001 Madrid, España</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-secondary shrink-0" />
                <a href="tel:+34912345678" className="text-gray-200 hover:text-secondary transition-colors">
                  +34 912 345 678
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-secondary shrink-0" />
                <a
                  href="mailto:info@vinotecabaque.com"
                  className="text-gray-200 hover:text-secondary transition-colors"
                >
                  info@vinotecabaque.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} Vinoteca Baque. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
