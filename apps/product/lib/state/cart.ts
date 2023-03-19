import { create } from "zustand";

interface CartActions {
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
}

interface CartState {
  cart: number[];
}

export const useCart = create<CartActions & CartState>((set, get) => {
  return {
    cart: [],
    addToCart(productId) {
      if (get().cart.includes(productId)) {
        return;
      }
      set((state) => ({ ...state, cart: [...state.cart, productId] }));
    },
    removeFromCart(productId) {
      if (!get().cart.includes(productId)) {
        return;
      }
      set((state) => ({
        ...state,
        cart: state.cart.filter((id) => id !== productId),
      }));
    },
  };
});
