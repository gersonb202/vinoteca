"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wine } from "lucide-react"
import FiltrarProducto from "./FiltrarProducto"

type Vino = {
    id: number
    nombre: string
    precio?: number
    anhaje?: number
    grado?: number
    bodega: string
    tipo?: string
}

interface CatalogoClienteProps {
    vinosIniciales: Vino[]
}

const vinos_por_pagina = 9

export default function CatalogoCliente({ vinosIniciales }: CatalogoClienteProps){
    const [vinosFiltrados, setVinosFiltrados] = useState<Vino[]>(vinosIniciales)
    // const bodegasMap = new Map(bodegas.map(bodegas => [bodegas.id, bodegas]))

    // Pasar el tipo inicial desde la URL al componente de filtros

    const [paginaActual, setPaginaActual] = useState<number>(1)
    const [ordenSeleccionado, setOrdenSeleccionado] = useState<string>("relevancia")

    // Funcuón que se pasa a FiltrarProducto para actualizar el estado
    const handleFiltrar = (nuevosVinosFiltrados: Vino[]) => {
        setVinosFiltrados(nuevosVinosFiltrados)
        // Resetear a la primera pçagina cuando los filtros cambian
        setPaginaActual(1)
    }

    // Lógica de ordenación
    const ordenarVinos = (vinos: Vino[], orden: string): Vino[] => {
        // Se crea una copia para no mutar el estado original
        const vinosCopiados = [...vinos]
        switch (orden) {
            case "precio-asc":
                return vinosCopiados.sort((a, b) => (a.precio || 0) - (b.precio || 0))
            case "precio-desc":
                return vinosCopiados.sort((a, b) => (b.precio || 0) - (a.precio || 0))
            case "nombre-asc":
                return vinosCopiados.sort((a, b) => a.nombre.localeCompare(b.nombre))
            case "precio-desc":
                return vinosCopiados.sort((a, b) => b.nombre.localeCompare(a.nombre))
            default:
                // Se podría hacer una ordenación más compleja en esta parte, por el momento lo dejamos así
                return vinosCopiados
        }
    }

        const vinosOrdenados = ordenarVinos(vinosFiltrados, ordenSeleccionado)
        // Calcular vinos para la página actual
        const indiceUltimoVino = paginaActual * vinos_por_pagina
        const indicePrimerVino = indiceUltimoVino - vinos_por_pagina
        const vinosPaginaActual = vinosOrdenados.slice(indicePrimerVino, indiceUltimoVino)

        const totalPaginas = Math.ceil(vinosOrdenados.length / vinos_por_pagina)

        const cambiarPagina = (numeroPagina: number) => {
            setPaginaActual(numeroPagina)
            // Opcional, para volver al inicio de la página en scroll
            window.scrollTo(0, 0)
        }

        const botonesPaginacion = []
        for (let i = 1; i <= totalPaginas; i++){
            botonesPaginacion.push(
                <Button key={i} 
                variant={paginaActual === i ? "default" : "outline"} 
                size="sm"
                onClick={() => cambiarPagina(i)}
                className={paginaActual === i ? "bg-primary text-white" : ""} >
                    {i}
                </Button>
            )
        }

        // Efecto para resetear la página si los vinos iniciales cambian
        useEffect(() => {
            setVinosFiltrados(vinosIniciales)
            setPaginaActual(1)
        }, [vinosIniciales])

        return (

        <>
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Filtros */}
                <div className="w-full lg:w-64 shrink-0">
                    <FiltrarProducto vinos={vinosIniciales} onFiltrar={handleFiltrar} />
                </div>

                {/* Productos */}
                <div className="flex-1">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">
                                {/* Mostrando {vinosPaginaActual.length} de {vinosFiltrados.length} productos */}
                                {vinosFiltrados.length > 0 
                                    ? `Mostrando ${indicePrimerVino + 1}-${Math.min(indiceUltimoVino, vinosFiltrados.length)} de ${vinosFiltrados.length} vinos`
                                    : "No hay vinos que mostrar"
                                }
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm whitespace-nowrap">Ordenar por:</span>
                            <Select 
                                value={ordenSeleccionado}
                                onValueChange={(value) => {
                                    setOrdenSeleccionado(value);
                                    setPaginaActual(1); // Resetear página al cambiar orden
                                }}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Relevancia" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="relevancia">Relevancia</SelectItem>
                                    <SelectItem value="precio-asc">Precio: menor a mayor</SelectItem>
                                    <SelectItem value="precio-desc">Precio: mayor a menor</SelectItem>
                                    <SelectItem value="nombre-asc">Nombre: A-Z</SelectItem>
                                    <SelectItem value="nombre-desc">Nombre: Z-A</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Listado de vinos */}
                    {vinosPaginaActual.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {vinosPaginaActual.map((vino: Vino) => (
                                <Card key={vino.id} className="overflow-hidden border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                                    <Link href={`/vino/${vino.id}`} className="block"> {/* Idealmente el link es por ID o slug único */}
                                        <div className="relative h-64 w-full bg-gray-200">
                                            <Image 
                                                // src={vino.imagen_url || `/placeholder.svg?height=400&width=300&text=${encodeURIComponent(vino.nombre)}`}
                                                src={`/fvinos/${vino.id}.jpg`}
                                                alt={vino.nombre} 
                                                title={vino.nombre}
                                                fill 
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                className="object-cover"
                                                onError={(e) => {
                                                    // Fallback por si la imagen no carga
                                                    e.currentTarget.src = `https://placehold.co/300x400/E0E0E0/B0B0B0?text=Error`;
                                                }}
                                            />
                                            {/* Ejemplo de tag de oferta, necesitarías un campo 'en_oferta' o similar en tus datos
                                            {vino.en_oferta && (
                                                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                                    OFERTA
                                                </div>
                                            )}
                                            */}
                                        </div>
                                        <div className="p-4">
                                            <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                                                {vino.tipo && <Wine className="h-3 w-3 text-gray-400" />}
                                                {vino.tipo && <span>{vino.tipo}</span>}
                                                {vino.bodega && vino.tipo && <span className="mx-1">•</span>}
                                                {vino.bodega && <span className="truncate" title={vino.bodega}>{vino.bodega}</span>}
                                            </div>
                                            <h3 className="font-semibold text-lg mb-1 truncate h-7" title={vino.nombre}>
                                                {vino.nombre || `Vino Desconocido`}
                                            </h3>
                                            {/* Podrías mostrar la añada si la tienes
                                            {vino.anhaje && (
                                                <p className="text-sm text-gray-500 mb-1">Añada: {vino.anhaje}</p>
                                            )}
                                            */}
                                            <div className="flex justify-between items-center mt-3">
                                                <span className="font-bold text-xl text-gray-800">
                                                    {vino.precio ? `€${vino.precio.toFixed(2)}` : "N/A"}
                                                </span>
                                                {/* Podrías añadir un botón de "Añadir al carrito" aquí */}
                                            </div>
                                        </div>
                                    </Link>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-xl text-gray-600">No hay vinos que coincidan con tu búsqueda o filtros.</p>
                            {/* Podrías sugerir limpiar filtros si hay filtros activos */}
                        </div>
                    )}

                    {/* Paginación */}
                    {totalPaginas > 1 && (
                        <div className="flex justify-center items-center mt-10 space-x-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => cambiarPagina(paginaActual - 1)}
                                disabled={paginaActual === 1}
                                aria-label="Página anterior"
                            >
                                &lt;
                            </Button>
                            {botonesPaginacion}
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => cambiarPagina(paginaActual + 1)}
                                disabled={paginaActual === totalPaginas}
                                aria-label="Página siguiente"
                            >
                                &gt;
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
        
    )

    
}
