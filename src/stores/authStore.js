import { create } from 'zustand';
import api from "../utils/axios";

const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('authUser')) || null,
  token: localStorage.getItem('authToken') || null,
  isAuthenticated: !!localStorage.getItem('authToken'),
  isLoading: false,
  lastValidated: localStorage.getItem('lastValidated') ? parseInt(localStorage.getItem('lastValidated')) : 0,
  
  login: (user, token) => {
    localStorage.setItem('authUser', JSON.stringify(user));
    set({ user, token, isAuthenticated: true });
  },
  
  logout: () => {
    localStorage.removeItem('authUser');
    localStorage.removeItem('lastValidated');
    set({ user: null, token: null, isAuthenticated: false });
  },
  
  validateToken: async (force = false) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return false;
      
      // Check if we've validated recently
      const now = Date.now();
      const lastValidated = get().lastValidated;
      const validationInterval = 5 * 60 * 1000; // 30 minutes
      
      if (!force && (now - lastValidated < validationInterval)) {
        console.log('Using cached validation, skipping API call');
        return true; // Use cached validation
      }
      
      console.log('Verifying token');
      
      // Use the dedicated verify endpoint with correct API path
      const response = await api.get('/verify', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      });
      
      // Handle the actual API response format
      if (response.data && response.data.authenticated === true) {
        // If verification API returns user data
        if (response.data.user) {
          set({ user: response.data.user, lastValidated: now });
          localStorage.setItem('authUser', JSON.stringify(response.data.user));
        } else {
          // Only update timestamp if no user data was returned
          set({ lastValidated: now });
        }
        localStorage.setItem('lastValidated', now.toString());
        return true;
      }
      
      // Only clear auth if the server explicitly says not authenticated
      if (response.data && response.data.authenticated === false) {
        set({ user: null, token: null, isAuthenticated: false });
        localStorage.removeItem('authUser');
        localStorage.removeItem('authToken');
        localStorage.removeItem('lastValidated');
      }
      return false;
    } catch (error) {
      console.error('Token validation error:', error);
      
      // Don't automatically log out on network errors
      // Only log out for 401/403 responses which indicate authentication issues
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        set({ user: null, token: null, isAuthenticated: false });
        localStorage.removeItem('authUser');
        localStorage.removeItem('authToken');
        localStorage.removeItem('lastValidated');
      }
      return get().isAuthenticated; // Maintain current auth state on network errors
    }
  },
  
  initAuth: async () => {
    set({ isLoading: true });
    const token = localStorage.getItem('authToken');
    if (token) {
      const isValid = await useAuthStore.getState().validateToken();
      set({ isAuthenticated: isValid, isLoading: false });
    } else {
      set({ isAuthenticated: false, isLoading: false });
    }
  }
}));

export default useAuthStore;