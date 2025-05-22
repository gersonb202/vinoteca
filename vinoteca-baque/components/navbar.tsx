"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, ShoppingCart, User, Menu, Wine, LogIn } from "lucide-react"
import { useAuth } from "./auth-provider"

export function Navbar() {
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)

  const { isLoggedIn, logout } = useAuth()
  const handleLogout = () => {
    logout()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background-light/80 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background-light/60 transition-colors">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg font-medium">
                  Inicio
                </Link>
                <Link href="/catalogo" className="text-lg font-medium">
                  Catálogo
                </Link>
                <Link href="/bodegas" className="text-lg font-medium">
                  Bodegas
                </Link>
                <Link href="/regiones" className="text-lg font-medium">
                  Regiones
                </Link>
                <Link href="/cuenta" className="text-lg font-medium">
                  Mi cuenta
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <Link href="/" className="flex items-center gap-2">
          <Wine className="h-6 w-6 text-primary transition duration-200 ease-in-out hover:rotate-12 hover:scale-110" />
          <span className="font-playfair text-xl font-bold">Vinoteca Baque</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Inicio</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger><Link href={"/catalogo"}>Catálogo</Link></NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/catalogo?tipo=tinto"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Vinos Tintos</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Descubre nuestra selección de vinos tintos
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/catalogo?tipo=blanco"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Vinos Blancos</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Explora nuestros vinos blancos de alta calidad
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/catalogo?tipo=rosado"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Vinos Rosados</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Refrescantes vinos rosados para todas las ocasiones
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/catalogo"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Ver todo el catálogo</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Explora toda nuestra selección de vinos premium
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/bodegas" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Bodegas</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/regiones" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Regiones</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="flex items-center gap-2">
          {searchOpen ? (
            <div className="flex items-center">
              <Input type="search" placeholder="Buscar vinos..." className="w-[200px] md:w-[300px]" />
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)}>
                <span className="sr-only">Cerrar búsqueda</span>
                &times;
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Buscar</span>
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                {isLoggedIn ? <User className="h-5 w-5" /> : <LogIn className="h-5 w-5" />}
                <span className="sr-only">Abrir menú</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isLoggedIn ? (
                <>
                <DropdownMenuItem>
                <Link href="/cuenta" className="w-full">
                  Mi cuenta
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/cuenta/pedidos" className="w-full">
                  Mis pedidos
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/cuenta/favoritos" className="w-full">
                  Favoritos
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/auth/login" className="w-full">
                  Cerrar sesión
                </Link>
              </DropdownMenuItem>
                </>
              ) : (
                <>
                <DropdownMenuItem>
                <Link href="/cuenta" className="w-full">
                  Mi cuenta
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/sesion" className="w-full">
                  Mis pedidos
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/sesion" className="w-full">
                  Favoritos
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/sesion" className="w-full">
                  Iniciar sesión
                </Link>
              </DropdownMenuItem>
                </>
              )}
              
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" asChild>
            <Link href="/carrito">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Carrito</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
