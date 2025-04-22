// src/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from "./stores/authStore.js";

// Protects dashboard routes - requires authentication
export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#F7A313]"></div>
        </div>
    );
  }

  // If not authenticated, redirect to login page
  return isAuthenticated ? <Outlet /> : <Navigate to="/adminlogin" replace />;
};

// Redirects authenticated users away from login page
export const AdminLoginRoute = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#F7A313]"></div>
        </div>
    );
  }

  // If already authenticated, redirect to dashboard
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default ProtectedRoute;