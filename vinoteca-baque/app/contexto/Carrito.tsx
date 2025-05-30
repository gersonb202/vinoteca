"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define la interfaz para un ítem del carrito
interface CartItem {
  id: string; // Cambiado a string para coincidir con el id de Supabase
  name: string;
  price: number;
  quantity: number;
  image: string;
  type: string;
  bodega: string;
}

// Define la interfaz para el contexto del carrito
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity: number) => void;
  updateQuantity: (id: string, newQuantity: number) => void;
  removeItem: (id: string) => void;
}

// Crea el contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// Define el proveedor del contexto
export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Inicializa el estado del carrito desde localStorage (para persistencia)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // Guarda el carrito en localStorage cada vez que cambia
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Función para añadir un ítem al carrito
  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        // Si el ítem ya existe, actualiza la cantidad
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      } else {
        // Si el ítem no existe, añádelo al carrito
        return [...prevItems, { ...item, quantity }];
      }
    });
  };

  // Función para actualizar la cantidad de un ítem existente
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id); // Si la cantidad es menor a 1, eliminar el ítem
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  // Función para eliminar un ítem del carrito
  const removeItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el contexto del carrito
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};