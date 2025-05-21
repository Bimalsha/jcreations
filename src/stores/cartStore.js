import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) => set((state) => ({
                items: [...state.items, item]
            })),
            removeItem: (itemId) => set((state) => ({
                items: state.items.filter(item => item.id !== itemId)
            })),
            updateQuantity: (itemId, quantity) => set((state) => ({
                items: state.items.map(item =>
                    item.id === itemId ? {...item, quantity} : item
                )
            })),
            clearCart: () => set({ items: [] }),
            getTotal: () => {
                return get().items.reduce((total, item) =>
                    total + (item.price * (item.quantity || 1)), 0);
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);

export default useCartStore;