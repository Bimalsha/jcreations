import React, {useEffect, useState} from 'react'
import BottomNavigator from "../component/BottomNavigator.jsx";
import Header from "../component/Header.jsx";
import { IoIosArrowForward } from 'react-icons/io';
import { IoMdClose } from 'react-icons/io';
import { IoMdCheckmark } from 'react-icons/io';
import { motion, AnimatePresence } from 'motion/react';

function Account() {
    useEffect(() => {
        // Scroll to top when cart page loads
        window.scrollTo(0, 0);
    }, []);

    // Add authentication state
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [isEditingName, setIsEditingName] = useState(false);
    const [name, setName] = useState('shanila dilnayan');
    const [tempName, setTempName] = useState('');

    const [isEditingContact, setIsEditingContact] = useState(false);
    const [contact, setContact] = useState('Add your contact number');
    const [tempContact, setTempContact] = useState('');

    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Check authentication status on component mount
    useEffect(() => {
        // Replace this with your actual authentication check
        const checkAuthStatus = () => {
            // Example: Check if token exists in localStorage
            const token = localStorage.getItem('auth_token');
            setIsLoggedIn(!!token);
        };

        checkAuthStatus();
    }, []);

    const handleLogin = () => {
        // Redirect to login page
        window.location.href = '/signin';
    };

    const handleNameClick = () => {
        setTempName(name);
        setIsEditingName(true);
    };

    const handleSaveName = () => {
        setName(tempName);
        setIsEditingName(false);
    };

    const handleCancelName = () => {
        setIsEditingName(false);
    };

    const handleContactClick = () => {
        setTempContact(contact);
        setIsEditingContact(true);
    };

    const handleSaveContact = () => {
        setContact(tempContact);
        setIsEditingContact(false);
    };

    const handleCancelContact = () => {
        setIsEditingContact(false);
    };

    const handlePasswordClick = () => {
        setIsPasswordModalOpen(true);
    };

    const handleClosePasswordModal = () => {
        setIsPasswordModalOpen(false);
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleSavePassword = () => {
        // Here you would add validation and API call to save password
        setIsPasswordModalOpen(false);
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <>
            <section className="pt-10 flex justify-center">
                {!isLoggedIn ? (
                    // Show login message if user is not logged in
                    <div className="max-w-7xl w-full mt-10 lg:mt-0 px-5 lg:px-2 flex flex-col items-center text-center py-10">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white p-8 rounded-lg shadow-lg shadow-[#FEF3E0] max-w-md w-full"
                        >
                            <div className="mb-6 flex justify-center">
                                <div className="w-20 h-20 bg-[#FEF3E0] rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#F7A313]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>
                            <h2 className="text-xl font-medium mb-3">Please log in to manage your account</h2>
                            <p className="text-gray-600 mb-6">Sign in to view and update your personal information, track orders, and manage your preferences.</p>
                            <motion.button
                                onClick={handleLogin}
                                className="w-full px-4 py-3 bg-[#000F20] text-white rounded-full hover:bg-[#1a253a] cursor-pointer"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Log In
                            </motion.button>
                        </motion.div>
                    </div>
                ) : (
                    // Show account management UI if user is logged in
                    <div className={'max-w-7xl w-full mt-10 lg:mt-0 justify-between px-5 lg:px-2'}>
                        <span className='font-medium text-2xl'>Personal info</span>

                        <div className='mt-5 flex flex-col '>
                            <div>
                                <span className='text-lg'>Name</span>
                                <AnimatePresence mode="wait">
                                    {!isEditingName ? (
                                        <motion.div
                                            key="nameView"
                                            onClick={handleNameClick}
                                            className='flex lg:w-2/4 justify-between items-center pb-2 border-b-2 border-[#F0F0F0] cursor-pointer text-[#9F9A9AD6]'
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <span className='text-sm'>{name}</span>
                                            <IoIosArrowForward />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="nameEdit"
                                            className='flex lg:w-2/4 justify-between items-center pb-2 border-b-2 border-[#F0F0F0]'
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <input
                                                type="text"
                                                value={tempName}
                                                onChange={(e) => setTempName(e.target.value)}
                                                className='text-sm focus:outline-none w-full'
                                                autoFocus
                                            />
                                            <div className='flex gap-2'>
                                                <motion.button
                                                    onClick={handleCancelName}
                                                    className='p-1 rounded-full hover:bg-gray-100'
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <IoMdClose className='text-red-500' />
                                                </motion.button>
                                                <motion.button
                                                    onClick={handleSaveName}
                                                    className='p-1 rounded-full hover:bg-gray-100'
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <IoMdCheckmark className='text-green-500' />
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div className={'mt-4'}>
                                <span className='text-lg'>Contact Number</span>
                                <AnimatePresence mode="wait">
                                    {!isEditingContact ? (
                                        <motion.div
                                            key="contactView"
                                            onClick={handleContactClick}
                                            className='flex lg:w-2/4 justify-between items-center pb-2 border-b-2 border-[#F0F0F0] cursor-pointer text-[#9F9A9AD6]'
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <span className='text-sm'>{contact}</span>
                                            <IoIosArrowForward />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="contactEdit"
                                            className='flex lg:w-2/4 justify-between items-center pb-2 border-b-2 border-[#F0F0F0]'
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <input
                                                type="tel"
                                                value={tempContact}
                                                onChange={(e) => setTempContact(e.target.value)}
                                                className='text-sm focus:outline-none w-full'
                                                autoFocus
                                                placeholder="Enter your phone number"
                                            />
                                            <div className='flex gap-2'>
                                                <motion.button
                                                    onClick={handleCancelContact}
                                                    className='p-1 rounded-full hover:bg-gray-100'
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <IoMdClose className='text-red-500' />
                                                </motion.button>
                                                <motion.button
                                                    onClick={handleSaveContact}
                                                    className='p-1 rounded-full hover:bg-gray-100'
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <IoMdCheckmark className='text-green-500' />
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div className={'mt-4'}>
                                <span className='text-lg'>Email</span>
                                <div className='flex lg:w-2/4 justify-between items-center pb-2 border-b-2 border-[#F0F0F0] cursor-pointer text-[#9F9A9AD6]'>
                                    <span className='text-sm'>example@gmail.com</span>
                                    <IoIosArrowForward />
                                </div>
                            </div>
                        </div>

                        <div className='mt-10 flex flex-col '>
                            <span className='font-medium text-2xl'>Security</span>

                            <div className={'mt-5'}>
                                <motion.div
                                    onClick={handlePasswordClick}
                                    className='flex lg:w-2/4 justify-between items-center pb-2 cursor-pointer'
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <span>Password</span>
                                    <IoIosArrowForward className={'text-[#9F9A9AD6]'}/>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {/* Password Modal */}
            <AnimatePresence>
                {isPasswordModalOpen && (
                    <motion.div
                        className="fixed inset-0 backdrop-filter backdrop-blur-md bg-white/20 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className="bg-white shadow-lg shadow-[#FEF3E0] rounded-lg p-6 w-full max-w-md"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-medium">Password</h2>
                                <motion.button
                                    onClick={handleClosePasswordModal}
                                    className="text-gray-500 hover:text-gray-700"
                                    whileHover={{ rotate: 90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <IoMdClose size={24} className={'cursor-pointer'}/>
                                </motion.button>
                            </div>

                            <p className="text-sm text-gray-600 mb-4">
                                Your password must be at least 8 characters long, and contain at least one digit and one
                                non-digit character
                            </p>

                            <motion.div
                                className="mb-4"
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#F7A313]"
                                    placeholder="Enter new password"
                                />
                            </motion.div>

                            <motion.div
                                className="mb-6"
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#F7A313]"
                                    placeholder="Confirm new password"
                                />
                            </motion.div>

                            <motion.div
                                className="flex justify-end space-x-2"
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <motion.button
                                    onClick={handleSavePassword}
                                    className="px-4 py-2 bg-[#000F20] text-white rounded-full hover:bg-[#1a253a] cursor-pointer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Update
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Account