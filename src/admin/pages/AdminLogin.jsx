import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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
        setLoading(true);
    
        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log('Login successful:', data.message);
                window.location.href = '/admin/dashboard';
            }else{
                console.log('Login failed:', data.message);
            }
    
        } catch (err) {
            console.error('Login error:', err.message);
        } finally {
            setLoading(false);
        }
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="enter your email"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    />
                    <motion.input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="enter your password"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    />
                    <motion.button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 transition cursor-pointer disabled:opacity-50"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}

export default AdminLogin;