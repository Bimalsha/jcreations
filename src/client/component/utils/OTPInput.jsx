import { useState, useRef, useEffect } from "react";

export default function OTPInput({ onChange }) {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputRefs = useRef([]);

    // Send OTP value to parent component whenever it changes
    useEffect(() => {
        if (onChange) {
            const otpString = otp.join('');
            onChange(otpString);
        }
    }, [otp, onChange]);

    const handleChange = (index, value) => {
        if (!/^\d*$/.test(value)) return; // Only allow numbers

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            if (inputRefs.current[index + 1]) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            if (inputRefs.current[index - 1]) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    return (
        <div className="flex gap-4">
            {otp.map((digit, index) => (
                <input
                    key={index}
                    ref={(el) => {
                        inputRefs.current[index] = el;
                    }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-[#000F20] bg-[#F0F0F0]"
                />
            ))}
        </div>
    );
}