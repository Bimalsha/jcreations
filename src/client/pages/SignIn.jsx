import React, { useState } from 'react';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import OTPInput from "../component/utils/OTPInput.jsx";
import { BsArrowRight } from "react-icons/bs";

function SignIn() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState("email"); // "email", "otp", or "names"
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleGoBack = () => {
        if (currentStep === "otp") {
            setCurrentStep("email");
        } else if (currentStep === "names") {
            setCurrentStep("otp");
        } else {
            navigate(-1);
        }
    };

    const handleContinue = () => {
        setCurrentStep("otp");
    };

    const handleOtpNext = () => {
        setCurrentStep("names");
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
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full border-[#000F20] border-2 h-12 rounded-lg px-3 focus:outline-none focus:border-[#F7A313] focus:ring-1 focus:ring-[#F7A313]"
                                        initial={{x: -10, opacity: 0}}
                                        animate={{x: 0, opacity: 1}}
                                        transition={{delay: 0.4}}
                                    />
                                </div>

                                <motion.div
                                    className="mt-4"
                                    initial={{y: 10, opacity: 0}}
                                    animate={{y: 0, opacity: 1}}
                                    transition={{delay: 0.5}}
                                >
                                    <motion.button
                                        onClick={handleContinue}
                                        className="bg-[#000F20] w-full p-3 rounded-lg text-center text-white font-medium cursor-pointer"
                                        whileHover={{backgroundColor: "#1a253a"}}
                                        whileTap={{scale: 0.98}}
                                    >
                                        Continue
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
                                        className="bg-[#F0F0F0] w-full p-3 rounded-lg text-center text-[#000F20] flex items-center justify-center gap-2 font-medium cursor-pointer"
                                        whileHover={{backgroundColor: "#e8e8e8"}}
                                        whileTap={{scale: 0.98}}
                                    >
                                        <img src="../../../public/icon/google.svg" alt="Google" className="w-5 h-5"/>
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
                                        by
                                        automated means, from JCreations to the number provided.
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
                                    <span className="block font-medium mb-2">{email || "example@gmail.com"}</span>
                                </motion.div>

                                <motion.div
                                    className="mt-4"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: 0.5}}
                                >
                                    <OTPInput/>
                                </motion.div>

                                <motion.span
                                    className="text-[#B7B3B3] text-xs block mt-3"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: 0.6}}
                                >
                                    Tip: Make sure to check your inbox and spam folders
                                </motion.span>

                                <motion.div
                                    className="flex justify-between mt-4"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: 0.7}}
                                >
                                    <motion.button
                                        className="bg-[#DEDDDD] rounded-full py-2 px-6 cursor-pointer"
                                        whileHover={{scale: 1.05}}
                                        whileTap={{scale: 0.95}}
                                    >
                                        Resend
                                    </motion.button>
                                    <motion.button
                                        onClick={handleOtpNext}
                                        className="bg-[#000F20] rounded-full py-2 px-6 cursor-pointer text-white flex items-center gap-2"
                                        whileHover={{scale: 1.05}}
                                        whileTap={{scale: 0.95}}
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
                                    />
                                </motion.div>
                                <motion.div
                                    className="flex justify-end mt-4"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: 1.0}}
                                >
                                    <motion.button
                                        className="bg-[#000F20] rounded-full py-2 px-6 cursor-pointer text-white flex items-center gap-2"
                                        whileHover={{scale: 1.05}}
                                        whileTap={{scale: 0.95}}
                                    >
                                        Next <BsArrowRight/>
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