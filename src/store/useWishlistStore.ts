import { create } from 'zustand';

interface WishlistStore {
  items: string[];
  toggleItem: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],
  toggleItem: (productId) => set((state) => ({
    items: state.items.includes(productId)
      ? state.items.filter(id => id !== productId)
      : [...state.items, productId],
  })),
  isWishlisted: (productId) => get().items.includes(productId),
}));
