import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils" // Asegúrate de que esta ruta sea correcta

// --- Componente Slider ---
// Este componente parece estar bien definido, basado en shadcn/ui.
// Permite renderizar uno o dos 'Thumbs' dependiendo si 'value' o 'defaultValue' es un número o un array.
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    {/* Pista del slider (la barra gris de fondo) */}
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      {/* Rango seleccionado (la barra de color principal) */}
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    {/* Pulgar(es) del slider. Radix renderizará uno o dos según el valor. */}
    {/* Si 'value' es [10, 100], renderizará dos. */}
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    {/* Radix necesita un segundo Thumb explícito si quieres un rango */}
    {/* Si solo proporcionas un valor (array), Radix asume que quieres dos thumbs, */}
    {/* pero es más explícito y a veces necesario añadir ambos: */}
     <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }