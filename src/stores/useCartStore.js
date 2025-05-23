import { create } from 'zustand';
import api from '../utils/axios.js';

// Helper function to calculate subtotal
const calculateSubtotal = (items) => {
    if (!items || !Array.isArray(items) || items.length === 0) return 0;

    return items.reduce((total, item) => {
        const itemPrice = parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity) || 1;
        return total + itemPrice * quantity;
    }, 0);
};

const useCartStore = create((set, get) => ({
    cartItems: [],
    itemCount: 0,
    subtotal: 0,
    loading: false,
    error: null,

    // Fetch cart data from API
    fetchCart: async () => {
        set({ loading: true, error: null });
        try {
            const cartId = localStorage.getItem('jcreations_cart_id');
            if (cartId) {
                const response = await api.get(`/cart/${cartId}`);
                if (response.data && response.data.items) {
                    const items = response.data.items;
                    const itemCount = items.reduce((count, item) => count + (parseInt(item.quantity) || 1), 0);
                    const subtotal = calculateSubtotal(items);

                    set({
                        cartItems: items,
                        itemCount: itemCount,
                        subtotal: subtotal,
                        loading: false,
                    });

                    console.log('Cart fetched successfully:', { items, itemCount, subtotal });
                    return response.data;
                } else {
                    set({ cartItems: [], itemCount: 0, subtotal: 0, loading: false });
                }
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
            set({ error: 'Failed to load cart', loading: false });
        }
    },

    // Increase item quantity
    increaseItemQuantity: (itemId) => {
        const updatedItems = get().cartItems.map((item) =>
            item.id === itemId ? { ...item, quantity: parseInt(item.quantity) + 1 } : item
        );
        const newSubtotal = calculateSubtotal(updatedItems);
        const newItemCount = updatedItems.reduce((count, item) => count + parseInt(item.quantity || 1), 0);

        set({
            cartItems: updatedItems,
            itemCount: newItemCount,
            subtotal: newSubtotal,
        });
    },

    // Decrease item quantity
    decreaseItemQuantity: (itemId) => {
        const currentItem = get().cartItems.find((item) => item.id === itemId);
        if (!currentItem) return;

        let updatedItems;
        if (parseInt(currentItem.quantity) <= 1) {
            updatedItems = get().cartItems.filter((item) => item.id !== itemId);
        } else {
            updatedItems = get().cartItems.map((item) =>
                item.id === itemId ? { ...item, quantity: parseInt(item.quantity) - 1 } : item
            );
        }

        const newSubtotal = calculateSubtotal(updatedItems);
        const newItemCount = updatedItems.reduce((count, item) => count + parseInt(item.quantity || 1), 0);

        set({
            cartItems: updatedItems,
            itemCount: newItemCount,
            subtotal: newSubtotal,
        });
    },
}));

export default useCartStore;