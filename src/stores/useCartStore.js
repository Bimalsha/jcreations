// In src/stores/useCartStore.js
import { create } from 'zustand';

// Remove toFixed from calculation, keep subtotal as a number
const getSubtotal = (items) => {
    return items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
};

const useCartStore = create((set, get) => ({
    items: [],
    itemCount: 0,
    subtotal: 0, // Initialize as number, not string
    loading: false,
    error: null,

    fetchCart: async () => {
        set({ loading: true, error: null });
        try {
            // Replace with your actual API call
            const response = await fetch('/api/cart');
            if (!response.ok) {
                throw new Error('Failed to fetch cart');
            }
            const data = await response.json();
            const cartItems = data.items || [];

            set({
                items: cartItems,
                itemCount: cartItems.length,
                subtotal: getSubtotal(cartItems)
            });
        } catch (error) {
            console.error("Error fetching cart:", error);
            set({ error: "Failed to load cart" });
        } finally {
            set({ loading: false });
        }
    },

    addToCart: async (product, quantity) => {
        // Your existing logic
        // After updating items
        const updatedItems = [...get().items];
        // Add your logic for updating items

        set({
            items: updatedItems,
            itemCount: updatedItems.length,
            subtotal: getSubtotal(updatedItems)
        });
    },

    // Update other methods similarly...
}));

export default useCartStore;