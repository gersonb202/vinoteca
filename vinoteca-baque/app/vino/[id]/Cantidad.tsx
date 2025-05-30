"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

import { Star, Minus, Plus, Heart, Share2, Wine, Grape, MapPin, Calendar, Award } from "lucide-react"

function QuantityInput() {
  const [quantity, setQuantity] = useState(1)
  return (
    <div className="flex items-center space-x-2">
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => setQuantity(q => Math.max(1, q - 1))}
        aria-label="Disminuir cantidad"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <input
        type="number"
        min={1}
        value={quantity}
        onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
        className="w-12 text-center border rounded"
        aria-label="Cantidad"
      />
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => setQuantity(q => q + 1)}
        aria-label="Aumentar cantidad"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default function Cantidad(){
    return(
        <div className="flex flex-col space-y-2">
              <label htmlFor="quantity" className="font-medium">
              Cantidad
              </label>
              <div className="flex items-center">
              {/* Cantidad controlada por estado */}
              <QuantityInput />
              </div>
    </div>
    )
    
}