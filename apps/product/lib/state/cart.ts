import { atom, useAtom } from "jotai";

const isServer = typeof window === "undefined";
const cartAtom = atom<number[]>([]);

// ensure that we keep only one reference of this state across apps
if (!isServer && !window.__cartAtom__) {
  window.__cartAtom__ = cartAtom;
}

export const useCart = () => {
  const [cart, setCart] = useAtom(!isServer ? window.__cartAtom__ : cartAtom);
  return {
    cart,
    addToCart: (productId: number) => {
      setCart((prev) => [...prev, productId]);
    },
    removeFromCart: (productId: number) => {
      setCart((prev) => prev.filter((id) => id !== productId));
    },
  };
};

declare global {
  interface Window {
    __cartAtom__: typeof cartAtom;
  }
}
