"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"

type Vino = {
    id: number
    nombre: string
    precio?: number
    anhaje?: number
    grado?: number
    bodega?: string
    tipo?: string
}

interface FiltrarProps {
    vinos: Vino[]
    onFiltrar: (filtradoVinos: Vino[]) => void
}

export default function FiltrarProducto({ vinos, onFiltrar}: FiltrarProps) {
  // Valores iniciales para los rangos
  const inicialPrecio = [10, 720]
  const inicialAnhaje = [0, 2025]
  const inicialGrado = [0, 21]

  const searchParams = useSearchParams()

    //Parte de useState
    const [tipo, setTipo] = useState<string[]>([])
    const [precio, setPrecio] = useState<number[]>(inicialPrecio)
    const [bodega, setBodega] = useState<string[]>([])
    const [anhaje, setAnhaje] = useState<number[]>(inicialAnhaje)
    const [grado, setGrado] = useState<number[]>(inicialGrado)

    // Efecto para aplicar el filtro inicial cuando cambia tipoInicial
    useEffect(() => {
      const tipoFromUrl = searchParams.get("tipo")
      if(tipoFromUrl){
        // El .slice(1) elimina el primer caracter de la cadena "/catalogo"
        const capitalizarTipo = tipoFromUrl.charAt(0).toLocaleUpperCase() + tipoFromUrl.slice(1)
        if(!tipo.includes(capitalizarTipo) && ["Tinto", "Blanco", "Rosado", "Espumoso", "Seco"]){
          setTipo([capitalizarTipo])
        }
      }
    }, [searchParams])

    // Handle checkBox, tratar de entender
    const handleTipoChange = (value: string) => {
        setTipo(current =>
            current.includes(value)
            ? current.filter(t => t !== value)
            : [...current, value]
        )
    }
    const handleBodegaChange = (value: string) => {
        setBodega(current =>
            current.includes(value)
            ? current.filter(b => b !== value)
            : [...current, value]
        )
    }
    const handlePrecioChange = (newValues: number[]) => {
        setPrecio(newValues)
    }

    //Lógica para filtrar los vinos
    const filtrarVinos = () => {
        return vinos.filter((vino) => {
            const tipoMatch = tipo.length === 0 || (vino.tipo && tipo.includes(vino.tipo))
            const bodegaMatch = bodega.length === 0 || (vino.bodega && bodega.includes(vino.bodega))
            const precioMatch = vino.precio
            ? vino.precio >= precio[0] && vino.precio <= precio[1]
            : true
            const anhajeMatch = vino.anhaje
            ? vino.anhaje >= anhaje[0] && vino.anhaje <= anhaje[1]
            : true
            const gradoMatch = vino.grado
            ? vino.grado >= grado[0] && vino.grado <= grado[1]
            : true

            return tipoMatch && bodegaMatch && precioMatch && anhajeMatch && gradoMatch
        })
    }

    // Actualizar los vinos filtrados
    useEffect(() => {
        const filtradoResults = filtrarVinos()
        onFiltrar(filtradoResults)
    }, [tipo, bodega, precio, anhaje, grado])

    const limpiarFiltros = () => {
        setTipo([])
        setBodega([])
        setPrecio(inicialPrecio)
        setAnhaje(inicialAnhaje)
        setGrado(inicialGrado)
    }

    return (
        <div className="sticky top-24 space-y-6">
      <Accordion type="single" collapsible defaultValue="tipo" className="w-full">
        <AccordionItem value="tipo">
          <AccordionTrigger className="text-base font-medium">Tipo de vino</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["Tinto", "Blanco", "Rosado", "Espumoso", "Seco"].map((tipoVino) => (
                <div key={tipoVino} className="flex items-center space-x-2">
                  <Checkbox 
                    id={tipoVino.toLowerCase()}
                    checked={tipo.includes(tipoVino)}
                    onCheckedChange={() => handleTipoChange(tipoVino)}
                  />
                  <Label htmlFor={tipoVino.toLowerCase()}>{tipoVino}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="precio">
          <AccordionTrigger className="text-base font-medium">Precio</AccordionTrigger>
          <AccordionContent>
            <div className="p-4">
              <Slider
                value={precio}
                onValueChange={handlePrecioChange}
                min={0}
                max={750}
                step={1}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
                <span>€{precio[0]}</span>
                <span>€{precio[1]}</span>
              </div>
              
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Add similar accordion items for other filters */}
      </Accordion>

      <Button variant="outline" className="w-full" onClick={limpiarFiltros}>
        Limpiar filtros
      </Button>
    </div>
    )

}
