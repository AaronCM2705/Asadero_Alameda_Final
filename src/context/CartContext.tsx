import React, { createContext, useState, useEffect } from 'react';
import type { OrderItem } from '../types';

interface CartContextType {
  cart: OrderItem[];
  addToCart: (item: OrderItem) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  total: number;
  cartCount: number;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<OrderItem[]>(() => {
    const savedCart = localStorage.getItem('asadero_cart');
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (e) {
        console.error("Error cargando carrito", e);
        return [];
      }
    }
    return [];
  });


  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('asadero_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (newItem: OrderItem) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        item => item.product_id === newItem.product_id && item.variant_id === newItem.variant_id
      );

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += newItem.quantity;
        return updatedCart;
      }
      return [...prevCart, newItem];
    });
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    setCart(prevCart => prevCart.filter(
      item => !(item.product_id === productId && item.variant_id === variantId)
    ));
  };

  const updateQuantity = (productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setCart(prevCart => prevCart.map(item => 
      (item.product_id === productId && item.variant_id === variantId)
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};


