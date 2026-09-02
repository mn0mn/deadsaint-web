// app/providers/CartProvider.tsx

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCartItem,
} from "@/lib/medusa";

import type { HttpTypes } from "@medusajs/types";

type CartContextValue = {
  cart: HttpTypes.StoreCart | null;
  loading: boolean;
  error: string | null;

  addItem: (variantId: string, quantity?: number) => Promise<void>;
  updateQuantity: (lineItemId: string, quantity: number) => Promise<void>;
  removeItem: (lineItemId: string) => Promise<void>;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const CART_ID_KEY = "deadsaint_cart_id";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<HttpTypes.StoreCart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const cartId = localStorage.getItem(CART_ID_KEY);

      if (!cartId) {
        setCart(null);
        return;
      }

      const existingCart = await getCart(cartId);

      setCart(existingCart);
    } catch (err) {
      console.error("Failed to load cart:", err);

      // The stored cart might no longer exist.
      // Throw the stale ID away so we can create a fresh cart later.
      localStorage.removeItem(CART_ID_KEY);
      setCart(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const ensureCart = useCallback(async () => {
    if (cart) {
      return cart;
    }

    const cartId = localStorage.getItem(CART_ID_KEY);

    if (cartId) {
      try {
        const existingCart = await getCart(cartId);

        setCart(existingCart);

        return existingCart;
      } catch {
        localStorage.removeItem(CART_ID_KEY);
      }
    }

    const newCart = await createCart();

    localStorage.setItem(CART_ID_KEY, newCart.id);
    setCart(newCart);

    return newCart;
  }, [cart]);

  const addItem = useCallback(
    async (variantId: string, quantity = 1) => {
      try {
        setError(null);

        const currentCart = await ensureCart();

        const updatedCart = await addToCart(
          currentCart.id,
          variantId,
          quantity,
        );

        setCart(updatedCart);
      } catch (err) {
        console.error("Failed to add item to cart:", err);
        setError("Failed to add item to cart.");
        throw err;
      }
    },
    [ensureCart],
  );

  const updateQuantity = useCallback(
    async (lineItemId: string, quantity: number) => {
      if (!cart) return;

      if (quantity <= 0) {
        await removeItem(lineItemId);
        return;
      }

      try {
        setError(null);

        const updatedCart = await updateCartItem(
          cart.id,
          lineItemId,
          quantity,
        );

        setCart(updatedCart);
      } catch (err) {
        console.error("Failed to update cart item:", err);
        setError("Failed to update cart item.");
        throw err;
      }
    },
    [cart],
  );

  const removeItem = useCallback(
    async (lineItemId: string) => {
      if (!cart) return;

      try {
        setError(null);

        const updatedCart = await removeFromCart(
          cart.id,
          lineItemId,
        );

        setCart(updatedCart);
      } catch (err) {
        console.error("Failed to remove cart item:", err);
        setError("Failed to remove cart item.");
        throw err;
      }
    },
    [cart],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      loading,
      error,
      addItem,
      updateQuantity,
      removeItem,
    }),
    [
      cart,
      loading,
      error,
      addItem,
      updateQuantity,
      removeItem,
    ],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside a CartProvider",
    );
  }

  return context;
}
