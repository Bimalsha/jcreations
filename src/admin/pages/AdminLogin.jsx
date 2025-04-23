import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import useAuthStore from '../../stores/authStore';
import axios from 'axios';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import api from "../../utils/axios.js";

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const login = useAuthStore(state => state.login);

    useEffect(() => {
        // Disable scrolling
        document.body.style.overflow = 'hidden';

        // Re-enable scrolling when component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Please enter both email and password');
            return;
        }

        setLoading(true);
        const loadingToast = toast.loading('Logging in...');

        try {
            // Make direct API call to ensure correct endpoint
            const response = await api.get('/admin/login', {
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            // Check status code explicitly
            if (response.status === 200) {
                toast.success('Login successful!', { id: loadingToast });
console.log('Login successful:', response.data);
                // Extract token and user data from response
                const { token, user } = response.data;

                // Update auth store
                login(token, user);

                // Wait a moment to show success message
                setTimeout(() => navigate('/dashboard'), 500);
            } else {
                toast.error('Unexpected response from server', { id: loadingToast });
            }
        } catch (error) {
            console.error('Login error:', error);

            let errorMessage;

            if (error.response) {
                if (error.response.status === 404) {
                    errorMessage = 'API endpoint not found. Please check server configuration.';
                } else {
                    errorMessage = error.response.data?.message ||
                        `Server error: ${error.response.status}`;
                }
            } else if (error.request) {
                errorMessage = 'No response from server. Please check your connection.';
            } else {
                errorMessage = error.message || 'An error occurred during login.';
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
            <Toaster position="top-center" />

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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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