import React, { useState, useEffect, useRef } from 'react';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import OTPInput from "../component/utils/OTPInput.jsx";
import { BsArrowRight } from "react-icons/bs";
import { auth } from "../../utils/firebase.js";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    fetchSignInMethodsForEmail
} from "firebase/auth";
import toast from "react-hot-toast";
import api from "../../utils/axios.js";

function SignIn() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState("email");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [loading, setLoading] = useState(false);

    const [generatedOtp, setGeneratedOtp] = useState("");
    const [countdown, setCountdown] = useState(30);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [otp, setOtp] = useState("");
    const otpInputRef = useRef("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // Countdown timer effect
    useEffect(() => {
        let timer;
        if (isTimerActive && countdown > 0) {
            timer = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
        } else if (countdown === 0) {
            setIsTimerActive(false);
        }

        return () => clearInterval(timer);
    }, [isTimerActive, countdown]);

    const handleGoBack = () => {
        if (currentStep === "otp") {
            setCurrentStep("email");
            setEmailError("");
        } else if (currentStep === "names") {
            setCurrentStep("otp");
        } else if (currentStep === "password") {
            setCurrentStep("names");
        } else {
            navigate(-1);
        }
    };

    // Validate email function
    const validateEmail = (email) => {
        if (!email.trim()) {
            return "Email address is required";
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return "Please enter a valid email address";
        }

        return "";
    };

    // Generate random 4-digit OTP
    const generateOTP = () => {
        return Math.floor(1000 + Math.random() * 9000).toString();
    };

    const handleLogin = async () => {
        // Validate email
        const error = validateEmail(email);
        if (error) {
            setEmailError(error);
            toast.error(error);
            return;
        }

        if (!password) {
            toast.error("Password is required");
            return;
        }

        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem("jcreations_user_uid", result.user.uid);
            toast.success("Successfully logged in!");
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error.message || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };
    const handleRegister = async () => {
        // Validate email first
        const error = validateEmail(email);
        if (error) {
            setEmailError(error);
            toast.error(error);
            return;
        }

        setLoading(true);

        try {
            // Check if user already exists in Firebase
            console.log("Checking if email already exists in Firebase:", email);
            const methods = await fetchSignInMethodsForEmail(auth, email);

            if (methods.length > 0) {
                console.log("User already exists with email:", email);
                toast.error("You are already registered. Please log in instead.");
                setShowPassword(true); // Show password field for login
                setLoading(false);
                return;
            }

            // User doesn't exist, proceed with OTP generation
            console.log("Email not found in Firebase, proceeding with registration");
            const newOtp = generateOTP();
            setGeneratedOtp(newOtp);

            // Maximum of 2 retry attempts for sending OTP
            let attempts = 0;
            let success = false;
            let errorResponse = null;

            while (attempts < 2 && !success) {
                try {
                    // Send verification code via API
                    const response = await api.post('/send-verification-code', {
                        email: email,
                        code: newOtp
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        timeout: 10000 // 10 second timeout
                    });

                    if (response.data && response.data.success) {
                        success = true;
                        // Reset and start countdown
                        setCountdown(30);
                        setIsTimerActive(true);
                        setCurrentStep("otp");
                        toast.success(response.data.message || 'Verification code sent to your email');
                    } else {
                        errorResponse = new Error('API response indicates failure');
                        attempts++;
                    }
                } catch (err) {
                    errorResponse = err;
                    attempts++;
                    await new Promise(r => setTimeout(r, 1000)); // Wait 1 second before retry
                }
            }

            if (!success) throw errorResponse;

        } catch (error) {
            console.error("Error in registration process:", error);

            if (error.response) {
                toast.error(error.response.data?.message || `Server error: ${error.response.status}`);
            } else if (error.request) {
                toast.error("Network connection issue. Using local verification mode.");
                // Continue with verification process despite network error
                setCountdown(30);
                setIsTimerActive(true);
                setCurrentStep("otp");
            } else {
                toast.error(error.message || "Failed to send verification code");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        if (isTimerActive) {
            return; // Prevent resending if timer is active
        }

        setLoading(true);

        // Generate a new 4-digit OTP upfront
        const newOtp = generateOTP();

        setGeneratedOtp(newOtp);

        try {
            // Maximum of 2 retry attempts
            let attempts = 0;
            let success = false;
            let errorResponse = null;

            while (attempts < 2 && !success) {
                try {
                    // Send verification code via API without the X-Mail-API-Key header
                    const response = await api.post('/send-verification-code', {
                        email: email,
                        code: newOtp
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        timeout: 10000 // 10 second timeout
                    });



                    if (response.data && response.data.success) {
                        success = true;
                        setCountdown(30);
                        setIsTimerActive(true);
                        toast.success(response.data.message || 'New verification code sent to your email');
                    } else {
                        errorResponse = new Error('API response indicates failure');
                        attempts++;
                    }
                } catch (err) {
                    errorResponse = err;
                    attempts++;
                    await new Promise(r => setTimeout(r, 1000)); // Wait 1 second before retry
                }
            }

            if (!success) throw errorResponse;

        } catch (error) {


            if (error.response) {
                toast.error(error.response.data?.message || `Server error: ${error.response.status}`);
            } else if (error.request) {
                toast.error("Network connection issue. Using local verification mode.");
                // Continue with verification process despite network error
                setCountdown(30);
                setIsTimerActive(true);
            } else {
                toast.error(error.message || "Failed to resend verification code");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            // Store Firebase UID in localStorage
            localStorage.setItem("jcreations_user_uid", result.user.uid);

            toast.success("Successfully signed in with Google!");
            navigate("/");
        } catch (error) {

            toast.error(error.message || "Failed to sign in with Google");
        } finally {
            setLoading(false);
        }
    };

    const handleOtpVerification = () => {
        // Get OTP value from both state and ref (ref as backup)
        const otpValue = otp || otpInputRef.current;
        const generatedOtpString = String(generatedOtp);


        // Check for valid OTP
        if (!otpValue || otpValue.length !== 4) {
            toast.error("Please enter a valid 4-digit verification code");
            return;
        }

        // Compare with generated OTP
        if (otpValue === generatedOtpString) {
            toast.success("Email verified successfully!");
            setCurrentStep("names");
        } else {
            toast.error("Invalid verification code. Please try again.");
        }
    };

    const handleNameSubmit = () => {
        if (!firstName || !lastName) {
            toast.error("Please enter both first and last name");
            return;
        }

        setCurrentStep("password");
    };
    const handlePasswordSubmit = async () => {
        // Basic validation
        if (!password) {
            setPasswordError("Password is required");
            toast.error("Password is required");
            return;
        }

        if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters");
            toast.error("Password must be at least 8 characters");
            return;
        }

        if (password !== confirmPassword) {
            setPasswordError("Passwords don't match");
            toast.error("Passwords don't match");
            return;
        }

        setLoading(true);
        console.log("Starting account creation process for:", email);

        try {
            // Verify Firebase auth is initialized properly
            if (!auth) {
                throw new Error("Firebase authentication not initialized");
            }

            console.log("Creating user account with Firebase Auth...");

            // Verify email and password are valid before sending to Firebase
            if (!email || !email.includes('@')) {
                throw new Error("Invalid email format");
            }

            // Log sanitized attempt details (no passwords)
            console.log("Attempting createUserWithEmailAndPassword with:", {
                email,
                auth: !!auth,
                passwordLength: password.length
            });

            // Create user with explicit error handling
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email.trim(),
                password
            );

            if (!userCredential || !userCredential.user) {
                throw new Error("Failed to create user - no user credential returned");
            }

            console.log("Account created successfully. User details:", {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                emailVerified: userCredential.user.emailVerified
            });

            // Update profile with retry mechanism
            let profileUpdateSuccess = false;
            const profileData = { displayName: `${firstName} ${lastName}` };

            for (let attempt = 0; attempt < 3 && !profileUpdateSuccess; attempt++) {
                try {
                    console.log(`Updating profile, attempt ${attempt + 1}`);
                    await updateProfile(userCredential.user, profileData);
                    profileUpdateSuccess = true;
                    console.log("Profile updated successfully");
                } catch (profileError) {
                    console.warn(`Profile update attempt ${attempt + 1} failed:`, profileError);
                    // Wait before retry
                    if (attempt < 2) await new Promise(r => setTimeout(r, 1000));
                }
            }

            if (!profileUpdateSuccess) {
                console.warn("Could not update profile after multiple attempts, but account was created");
            }

            // Save user data to localStorage
            localStorage.setItem("jcreations_user_uid", userCredential.user.uid);
            console.log("User UID saved to localStorage:", userCredential.user.uid);

            toast.success("Account created successfully!");
            navigate("/");
        } catch (error) {
            console.error("Firebase error details:", {
                code: error.code,
                message: error.message,
                stack: error.stack,
                name: error.name
            });

            // Handle common Firebase Auth errors
            switch(error.code) {
                case 'auth/email-already-in-use':
                    toast.error("This email address is already in use");
                    break;
                case 'auth/invalid-email':
                    toast.error("Invalid email address format");
                    break;
                case 'auth/operation-not-allowed':
                    toast.error("Email/password accounts are not enabled in Firebase");
                    break;
                case 'auth/weak-password':
                    toast.error("Password is too weak - use a stronger password");
                    break;
                case 'auth/network-request-failed':
                    toast.error("Network connection error - check your internet connection");
                    break;
                case 'auth/too-many-requests':
                    toast.error("Too many attempts - please try again later");
                    break;
                case 'auth/internal-error':
                    toast.error("Firebase internal error - please try again");
                    break;
                default:
                    toast.error(error.message || "Account creation failed");
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <motion.section
                className="flex justify-center flex-col items-center h-screen bg-[#F8F8F8] fixed inset-0 overflow-hidden"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.4}}
            >
                <motion.div
                    className="max-w-[500px] w-full px-4"
                    initial={{y: 20}}
                    animate={{y: 0}}
                    transition={{duration: 0.5, delay: 0.1}}
                >
                    <motion.div
                        className="bg-white p-6 sm:p-10 rounded-lg shadow-md w-full"
                        initial={{scale: 0.95, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        transition={{duration: 0.3, delay: 0.2}}
                    >
                        <motion.button
                            onClick={handleGoBack}
                            className="flex items-center mb-6 cursor-pointer"
                            whileHover={{scale: 1.05, color: "#F7A313"}}
                            whileTap={{scale: 0.95}}
                            disabled={loading}
                        >
                            <IoArrowBackCircleOutline className="text-4xl"/>
                        </motion.button>

                        {currentStep === "email" && (
                            <motion.div
                                id="email"
                                initial={{y: 10, opacity: 0}}
                                animate={{y: 0, opacity: 1}}
                                transition={{delay: 0.3}}
                            >
                                <span className="text-lg font-medium">
                                    What's your email?
                                </span>
                                <div className="mt-3">
                                    <motion.input
                                        type="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setEmailError("");
                                        }}
                                        className={`w-full border-2 h-12 rounded-lg px-3 focus:outline-none focus:ring-1 focus:ring-[#F7A313] ${
                                            emailError ? 'border-red-500 focus:border-red-500' : 'border-[#000F20] focus:border-[#F7A313]'
                                        }`}
                                        initial={{x: -10, opacity: 0}}
                                        animate={{x: 0, opacity: 1}}
                                        transition={{delay: 0.4}}
                                        disabled={loading}
                                        placeholder="your.email@example.com"
                                    />
                                    {emailError && (
                                        <motion.p
                                            className="text-red-500 text-xs mt-1"
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                        >
                                            {emailError}
                                        </motion.p>
                                    )}
                                </div>

                                {showPassword && (
                                    <motion.div
                                        className="mt-3"
                                        initial={{opacity: 0, height: 0}}
                                        animate={{opacity: 1, height: "auto"}}
                                        transition={{duration: 0.3}}
                                    >
                                        <motion.input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full border-2 border-[#000F20] h-12 rounded-lg px-3 focus:outline-none focus:border-[#F7A313] focus:ring-1 focus:ring-[#F7A313]"
                                            placeholder="Password"
                                            disabled={loading}
                                        />
                                    </motion.div>
                                )}

                                <motion.div
                                    className="mt-4 flex gap-2"
                                    initial={{y: 10, opacity: 0}}
                                    animate={{y: 0, opacity: 1}}
                                    transition={{delay: 0.5}}
                                >
                                    <motion.button
                                        onClick={() => {
                                            setShowPassword(true);
                                            if (showPassword) handleLogin();
                                        }}
                                        className={`bg-[#000F20] flex-1 p-3 rounded-lg text-center text-white font-medium cursor-pointer ${loading ? 'opacity-70' : ''}`}
                                        whileHover={{backgroundColor: "#1a253a"}}
                                        whileTap={{scale: 0.98}}
                                        disabled={loading}
                                    >
                                        {loading && showPassword ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Signing in...
                                            </span>
                                        ) : "Login"}
                                    </motion.button>

                                    <motion.button
                                        onClick={handleRegister}
                                        className={`bg-[#F7A313] flex-1 p-3 rounded-lg text-center text-white font-medium cursor-pointer ${loading ? 'opacity-70' : ''}`}
                                        whileHover={{backgroundColor: "#e69200"}}
                                        whileTap={{scale: 0.98}}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending code...
                                            </span>
                                        ) : "Register"}
                                    </motion.button>
                                </motion.div>

                                <div className="flex items-center justify-center my-6">
                                    <div className="border-t border-gray-300 flex-grow"></div>
                                    <span className="mx-4 text-gray-500 text-sm">OR</span>
                                    <div className="border-t border-gray-300 flex-grow"></div>
                                </div>

                                <motion.div
                                    className="mt-4"
                                    initial={{y: 10, opacity: 0}}
                                    animate={{y: 0, opacity: 1}}
                                    transition={{delay: 0.6}}
                                >
                                    <motion.button
                                        onClick={handleGoogleSignIn}
                                        className={`bg-[#F0F0F0] w-full p-3 rounded-lg text-center text-[#000F20] flex items-center justify-center gap-2 font-medium cursor-pointer ${loading ? 'opacity-70' : ''}`}
                                        whileHover={{backgroundColor: "#e8e8e8"}}
                                        whileTap={{scale: 0.98}}
                                        disabled={loading}
                                    >
                                        <img src="/icon/google.svg" alt="Google" className="w-5 h-5"/>
                                        Continue with Google
                                    </motion.button>
                                </motion.div>

                                <motion.div
                                    className="mt-4"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 0.8}}
                                    transition={{delay: 0.7}}
                                >
                                    <p className="text-xs text-gray-400">
                                        By proceeding, you consent to get calls, WhatsApp or SMS/RCS messages, including
                                        by automated means, from JCreations to the number provided.
                                    </p>
                                </motion.div>
                            </motion.div>
                        )}

                        {currentStep === "otp" && (
                            <motion.div
                                id="otp"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.5, delay: 0.3}}
                            >
                                <motion.div
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: 0.4}}
                                >
                                    <span className="block">Enter the 4-digit code sent to you at:</span>
                                    <span className="block font-medium mb-2">{email}</span>
                                </motion.div>

                                <motion.div
                                    className="mt-4"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: 0.5}}
                                >
                                    <OTPInput
                                        onChange={(value) => {


                                            // Handle all possible value formats
                                            let formattedOtp;
                                            if (typeof value === 'object' && value !== null) {
                                                // Handle event object case
                                                formattedOtp = value.target?.value || '';
                                            } else if (Array.isArray(value)) {
                                                // Handle array of characters
                                                formattedOtp = value.join('');
                                            } else {
                                                // String or other format
                                                formattedOtp = String(value || '');
                                            }

                                            // Clean the value
                                            formattedOtp = formattedOtp.replace(/\D/g, '');

                                            // Store in both state and ref for redundancy
                                            setOtp(formattedOtp);
                                            otpInputRef.current = formattedOtp;

                                            console.log("Processed OTP value:", formattedOtp, "Length:", formattedOtp.length);
                                        }}
                                    />
                                </motion.div>

                                <motion.div
                                    className="flex items-center justify-between mt-3"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: 0.6}}
                                >
                                    <span className="text-[#B7B3B3] text-xs">
                                        Check your email for the verification code
                                    </span>
                                    <span className={`text-xs font-medium ${countdown <= 10 ? 'text-red-500' : 'text-gray-700'}`}>
                                        {isTimerActive ? `${countdown}s` : 'Expired'}
                                    </span>
                                </motion.div>

                                <motion.div
                                    className="mt-2 mb-4"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: 0.65}}
                                >
                                    <motion.button
                                        onClick={() => setCurrentStep("email")}
                                        className="text-xs text-blue-600 hover:underline"
                                    >
                                        Wrong email address? Go back
                                    </motion.button>
                                </motion.div>

                                <motion.div
                                    className="flex justify-between mt-6"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: 0.7}}
                                >
                                    <motion.button
                                        onClick={handleResendOTP}
                                        className={`bg-[#DEDDDD] rounded-full py-2 px-6 cursor-pointer ${loading || isTimerActive ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        whileHover={{scale: isTimerActive ? 1 : 1.05}}
                                        whileTap={{scale: isTimerActive ? 1 : 0.95}}
                                        disabled={loading || isTimerActive}
                                    >
                                        Resend
                                    </motion.button>
                                    <motion.button
                                        onClick={handleOtpVerification}
                                        className={`bg-[#000F20] rounded-full py-2 px-6 cursor-pointer text-white flex items-center gap-2 ${loading ? 'opacity-70' : ''}`}
                                        whileHover={{scale: 1.05}}
                                        whileTap={{scale: 0.95}}
                                        disabled={loading}
                                    >
                                        Next <BsArrowRight/>
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        )}

                        {currentStep === "names" && (
                            <motion.div
                                id="names"
                                className="flex flex-col"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.5, delay: 0.3}}
                            >
                                <motion.span
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: 0.4}}
                                >
                                    What's your name?
                                </motion.span>
                                <motion.span
                                    className="text-xs text-[#B7B3B3]"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: 0.5}}
                                >
                                    Let us know how to properly address you.
                                </motion.span>
                                <motion.div
                                    className="mt-3"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: 0.6}}
                                >
                                    <label htmlFor="fname" className="text-xs">First Name</label>
                                    <motion.input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full border-[#000F20] border-2 h-12 rounded-lg px-3 focus:outline-none focus:border-[#F7A313] focus:ring-1 focus:ring-[#F7A313]"
                                        initial={{x: -10, opacity: 0}}
                                        animate={{x: 0, opacity: 1}}
                                        transition={{delay: 0.7}}
                                        name="fname"
                                        disabled={loading}
                                    />
                                </motion.div>
                                <motion.div
                                    className="mt-3"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: 0.8}}
                                >
                                    <label htmlFor="lname" className="text-xs">Last Name</label>
                                    <motion.input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="w-full border-[#000F20] border-2 h-12 rounded-lg px-3 focus:outline-none focus:border-[#F7A313] focus:ring-1 focus:ring-[#F7A313]"
                                        initial={{x: -10, opacity: 0}}
                                        animate={{x: 0, opacity: 1}}
                                        transition={{delay: 0.9}}
                                        name="lname"
                                        disabled={loading}
                                    />
                                </motion.div>
                                <motion.div
                                    className="flex justify-end mt-4"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: 1.0}}
                                >
                                    <motion.button
                                        onClick={handleNameSubmit}
                                        className={`bg-[#000F20] rounded-full py-2 px-6 cursor-pointer text-white flex items-center gap-2 ${loading ? 'opacity-70' : ''}`}
                                        whileHover={{scale: 1.05}}
                                        whileTap={{scale: 0.95}}
                                        disabled={loading}
                                    >
                                        {loading ? "Creating..." : "Next"} <BsArrowRight/>
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        )}
                        {currentStep === "password" && (
                            <motion.div
                                id="password"
                                className="flex flex-col"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.5, delay: 0.3}}
                            >
                                <motion.span
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: 0.4}}
                                >
                                    Create a password
                                </motion.span>
                                <motion.span
                                    className="text-xs text-[#B7B3B3]"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: 0.5}}
                                >
                                    Your password must be at least 8 characters long.
                                </motion.span>
                                <motion.div
                                    className="mt-3"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: 0.6}}
                                >
                                    <label htmlFor="password" className="text-xs">Password</label>
                                    <motion.input
                                        type="password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setPasswordError("");
                                        }}
                                        className={`w-full border-2 h-12 rounded-lg px-3 focus:outline-none focus:ring-1 focus:ring-[#F7A313] ${
                                            passwordError ? 'border-red-500 focus:border-red-500' : 'border-[#000F20] focus:border-[#F7A313]'
                                        }`}
                                        initial={{x: -10, opacity: 0}}
                                        animate={{x: 0, opacity: 1}}
                                        transition={{delay: 0.7}}
                                        name="password"
                                        disabled={loading}
                                    />
                                </motion.div>
                                <motion.div
                                    className="mt-3"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: 0.8}}
                                >
                                    <label htmlFor="confirmPassword" className="text-xs">Confirm Password</label>
                                    <motion.input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                            setPasswordError("");
                                        }}
                                        className={`w-full border-2 h-12 rounded-lg px-3 focus:outline-none focus:ring-1 focus:ring-[#F7A313] ${
                                            passwordError ? 'border-red-500 focus:border-red-500' : 'border-[#000F20] focus:border-[#F7A313]'
                                        }`}
                                        initial={{x: -10, opacity: 0}}
                                        animate={{x: 0, opacity: 1}}
                                        transition={{delay: 0.9}}
                                        name="confirmPassword"
                                        disabled={loading}
                                    />
                                    {passwordError && (
                                        <motion.p
                                            className="text-red-500 text-xs mt-1"
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                        >
                                            {passwordError}
                                        </motion.p>
                                    )}
                                </motion.div>
                                <motion.div
                                    className="flex justify-end mt-4"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: 1.0}}
                                >
                                    <motion.button
                                        onClick={handlePasswordSubmit}
                                        className={`bg-[#000F20] rounded-full py-2 px-6 cursor-pointer text-white flex items-center gap-2 ${loading ? 'opacity-70' : ''}`}
                                        whileHover={{scale: 1.05}}
                                        whileTap={{scale: 0.95}}
                                        disabled={loading}
                                    >
                                        {loading ? "Creating..." : "Complete"} <BsArrowRight/>
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            </motion.section>
        </>
    );
}

export default SignIn;