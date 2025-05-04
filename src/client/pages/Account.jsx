import React, {useEffect, useState} from 'react'
import BottomNavigator from "../component/BottomNavigator.jsx";
import Header from "../component/Header.jsx";
import { IoIosArrowForward } from 'react-icons/io';
import { IoMdClose } from 'react-icons/io';
import { IoMdCheckmark } from 'react-icons/io';
import { motion, AnimatePresence } from 'motion/react';
import { auth } from '../../utils/firebase.js';
import { updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

// Initialize Firestore
const db = getFirestore();

function Account() {
    useEffect(() => {
        // Scroll to top when cart page loads
        window.scrollTo(0, 0);
    }, []);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [isEditingName, setIsEditingName] = useState(false);
    const [name, setName] = useState('');
    const [tempName, setTempName] = useState('');

    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // Check authentication status on component mount
    useEffect(() => {
        const checkAuthStatus = async () => {
            setIsLoading(true);
            // Use the correct localStorage key
            const uid = localStorage.getItem('jcreations_user_uid');
            console.log("UID from localStorage:", uid);

            if (uid) {
                setIsLoggedIn(true);

                // Get current user from Firebase
                const currentUser = auth.currentUser;

                if (currentUser) {
                    console.log("Current user found:", currentUser.uid);
                    setUser(currentUser);
                    setName(currentUser.displayName || currentUser.email.split('@')[0]);
                } else {
                    console.log("Auth.currentUser not available yet");
                    // If Firebase auth state isn't ready yet, set placeholder name
                    setName('User');
                }
            } else {
                console.log("No UID in localStorage");
                setIsLoggedIn(false);
            }
            setIsLoading(false);
        };

        checkAuthStatus();

        // Set up auth state listener
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("Auth state changed - user signed in:", user.uid);
                setUser(user);
                setName(user.displayName || user.email.split('@')[0]);
                setIsLoggedIn(true);
            } else {
                console.log("Auth state changed - user signed out");
                setIsLoggedIn(false);
                setUser(null);
            }
            setIsLoading(false);
        });

        // Clean up subscription
        return () => unsubscribe();
    }, []);

    const handleLogin = () => {
        window.location.href = '/signin';
    };

    const handleNameClick = () => {
        setTempName(name);
        setIsEditingName(true);
    };

    const handleSaveName = async () => {
        try {
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, {
                    displayName: tempName
                });

                // Also update in Firestore for consistency
                const userDocRef = doc(db, "users", auth.currentUser.uid);
                await setDoc(userDocRef, {
                    displayName: tempName
                }, { merge: true });

                setName(tempName);
                setIsEditingName(false);
            }
        } catch (error) {
            console.error("Error updating name:", error);
            alert("Failed to update name. Please try again.");
        }
    };

    const handleCancelName = () => {
        setIsEditingName(false);
    };

    const handlePasswordClick = () => {
        setIsPasswordModalOpen(true);
        setPasswordError('');
    };

    const handleClosePasswordModal = () => {
        setIsPasswordModalOpen(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setPasswordError('');
    };

    const handleSavePassword = async () => {
        // Reset error
        setPasswordError('');

        // Validation
        if (!currentPassword) {
            setPasswordError("Current password is required");
            return;
        }

        if (newPassword.length < 8) {
            setPasswordError("Password must be at least 8 characters");
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError("New passwords don't match");
            return;
        }

        try {
            // Re-authenticate user first
            const currentUser = auth.currentUser;
            if (!currentUser || !currentUser.email) {
                throw new Error("User not found or email missing");
            }

            const credential = EmailAuthProvider.credential(
                currentUser.email,
                currentPassword
            );

            await reauthenticateWithCredential(currentUser, credential);

            // Update password
            await updatePassword(currentUser, newPassword);

            // Success
            handleClosePasswordModal();
            alert("Password updated successfully!");
        } catch (error) {
            console.error("Error updating password:", error);

            if (error.code === 'auth/wrong-password') {
                setPasswordError("Current password is incorrect");
            } else if (error.code === 'auth/weak-password') {
                setPasswordError("Please choose a stronger password");
            } else {
                setPasswordError("Failed to update password: " + error.message);
            }
        }
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
            localStorage.removeItem('jcreations_user_uid');
            setIsLoggedIn(false);
            setUser(null);
            window.location.href = '/';
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    if (isLoading) {
        return (
            <div className="pt-20 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F7A313]"></div>
            </div>
        );
    }

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
                        <div className="flex justify-between items-center mb-5">
                            <span className='font-medium text-2xl'>Personal info</span>
                            <motion.button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Logout
                            </motion.button>
                        </div>

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
                                                className="flex-1 focus:outline-none"
                                                placeholder="Enter your name"
                                            />
                                            <div className='flex gap-2'>
                                                <IoMdCheckmark
                                                    onClick={handleSaveName}
                                                    className="text-green-500 text-xl cursor-pointer"
                                                />
                                                <IoMdClose
                                                    onClick={handleCancelName}
                                                    className="text-red-500 text-xl cursor-pointer"
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className={'mt-4'}>
                                <span className='text-lg'>Email</span>
                                <div className='flex lg:w-2/4 justify-between items-center pb-2 border-b-2 border-[#F0F0F0] text-[#9F9A9AD6]'>
                                    <span className='text-sm'>{user?.email || 'loading@example.com'}</span>
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
                                <h2 className="text-xl font-medium">Change Password</h2>
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
                                Your password must be at least 8 characters long
                            </p>

                            {passwordError && (
                                <motion.div
                                    className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    {passwordError}
                                </motion.div>
                            )}

                            <motion.div
                                className="mb-4"
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#F7A313]"
                                    placeholder="Enter current password"
                                />
                            </motion.div>

                            <motion.div
                                className="mb-4"
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
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
                                transition={{ delay: 0.3 }}
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