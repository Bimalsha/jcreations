import { create } from 'zustand';

import api from '../utils/axios.js';

const useCartStore = create((set, get) => ({
  cartItems: [],
  itemCount: 0,
  
  // Fetch cart data from API
  fetchCart: async () => {
    try {
      const cartId = localStorage.getItem('jcreations_cart_id');
      if (cartId) {
        const response = await api.get(`/cart/${cartId}`);
        if (response.data && response.data.items) {
          set({ 
            cartItems: response.data.items,
            itemCount: response.data.items.length 
          });
          return response.data;
          console.log('Cart API response:');
        }
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  },
  
  // Increase item quantity - local state only
  increaseItemQuantity: (itemId) => {
    const updatedItems = get().cartItems.map(item => 
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    
    set({ cartItems: updatedItems });
  },
  
  // Decrease item quantity - local state only
  decreaseItemQuantity: (itemId) => {
    const currentItem = get().cartItems.find(item => item.id === itemId);
    if (!currentItem) return;
    
    // If quantity is 1, remove the item
    if (currentItem.quantity === 1) {
      const updatedItems = get().cartItems.filter(item => item.id !== itemId);
      set({ 
        cartItems: updatedItems,
        itemCount: updatedItems.length 
      });
    } else {
      // Just decrease the quantity
      const updatedItems = get().cartItems.map(item => 
        item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
      );
      
      set({ cartItems: updatedItems });
    }
  }
}));


export default useCartStore;