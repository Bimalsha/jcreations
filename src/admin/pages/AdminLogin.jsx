import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import useAuthStore from '../../stores/authStore';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import api from '../../utils/axios.js';

function AdminLogin() {
    const navigate = useNavigate();
    const { login, user } = useAuthStore();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        // Check if user is already logged in and has admin role
        if (user && user.roles && user.roles.includes('admin')) {
            navigate('/dashboard');
            return;
        }

        // Disable scrolling
        document.body.style.overflow = 'hidden';

        // Re-enable scrolling when component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [user, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error('Please enter both email and password');
            return;
        }

        setLoading(true);
        const loadingToast = toast.loading('Logging in...');

        try {
            // Using axios instance from utils/axios.js
            const response = await api.post('/admin/login', formData);

            // Extract data from response
            const { message, user, token } = response.data;

            // Check if user has admin role
            if (!user.roles || !user.roles.includes('admin')) {
                throw new Error('You do not have admin privileges');
            }

            toast.success(message || 'Login successful!', { id: loadingToast });
            console.log('Login successful:', response.data);

            // Save to localStorage
            localStorage.setItem('authUser', JSON.stringify(user));
            localStorage.setItem('authToken', token);

            // Update auth store
            login(user, token);

            // Wait a moment to show success message then redirect to dashboard
            setTimeout(() => navigate('/dashboard'), 500);

        } catch (error) {
            console.error('Login error:', error);

            let errorMessage;
            if (!error.response) {
                errorMessage = 'Network error. Please check your connection.';
            } else if (error.response.status === 401) {
                errorMessage = 'Invalid email or password';
            } else if (error.response.status === 403) {
                errorMessage = 'You do not have permission to access the admin area';
            } else {
                errorMessage = error.response?.data?.message || error.message || 'Login failed. Please try again.';
            }

            toast.error(errorMessage, { id: loadingToast });
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">


            <div className="mb-10 text-center">
                <motion.img
                    src="/logo.png"
                    alt="JCreations Logo"
                    className="h-16 mx-auto"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />
                <h1 className="text-xl font-semibold mt-2">JCreations</h1>
            </div>

            <motion.div
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <h2 className="text-lg font-medium text-gray-800 mb-6">
                    What's your admin email and password?
                </h2>
                <form className="space-y-4" onSubmit={handleLogin}>
                    <motion.input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="enter your email"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        required
                    />
                    <div className="relative">
                        <motion.input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="enter your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black pr-10"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? (
                                <AiOutlineEyeInvisible className="w-5 h-5" />
                            ) : (
                                <AiOutlineEye className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                    <motion.button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 transition cursor-pointer disabled:opacity-50"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                <span>Logging in...</span>
                            </div>
                        ) : 'Login'}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}

export default AdminLogin;