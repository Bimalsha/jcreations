// src/admin/component/ProtectedAdminRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../../stores/authStore';

function ProtectedAdminRoute() {
    const { user } = useAuthStore();

    // Check if user exists and has admin role
    if (!user || !user.roles || !user.roles.includes('admin')) {
        // Redirect to admin login if not authorized
        return <Navigate to="/adminlogin" replace />;
    }

    // Render child routes if authorized
    return <Outlet />;
}

export default ProtectedAdminRoute;