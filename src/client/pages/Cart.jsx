import React, { useState } from 'react'
import BottomNavigator from "../component/BottomNavigator.jsx";
import Header from "../component/Header.jsx";
import CartNavigator from '../component/utils/CartNavigator.jsx';
import CartItemDemo from '../component/utils/CartItemDemo.jsx';
import OrderSummary from '../component/utils/OrderSummery.jsx';
import Additionalnotes from '../component/utils/AdditionalNotes.jsx';
import DeliveryInfo from '../component/utils/DeliveryInfo.jsx';
import PaymentMethodSelector from '../component/utils/PaymentMethodSelector.jsx';
import OrderConfirmed from '../component/utils/OrderConfirmed.jsx';

function Cart() {

    // Sample cart items
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Chocolate Cake 1kg",
            price: 1000,
            quantity: 2,
            image: "/public/category/cake.svg",
        },
        {
            id: 2,
            name: "Vanilla Cupcakes",
            price: 750,
            quantity: 1,
            image: "/public/category/candle.svg",
        },
        {
            id: 3,
            name: "Birthday Cake Special 1kg",
            price: 1800,
            quantity: 1,
            image: "/public/category/chocolate.svg",
        },
        {
            id: 4,
            name: "Chocolate Brownies",
            price: 600,
            quantity: 3,
            image: "/public/category/basket.svg",
        },
    ]);
    
    // Replace showCartItems with currentStep to track all three stages
    const [currentStep, setCurrentStep] = useState(1);
    
    // Add state for login status and popup
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);

    const handleRemove = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    const handleIncreaseQuantity = (id) => {
        setCartItems(
            cartItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const handleDecreaseQuantity = (id) => {
        setCartItems(
            cartItems.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 } 
                    : item
            )
        );
    };

    // Calculate order summary values
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = 300; // Fixed shipping cost
    const total = subtotal + shipping;

    const handleCheckout = () => {
        if (currentStep === 1) {
            // Check if user is logged in
            if (!isLoggedIn) {
                setShowLoginPopup(true);
                return;
            }
            // Move from cart to check out
            setCurrentStep(2);
            console.log("Proceeding to checkout with items:", cartItems);
        } else if (currentStep === 2) {
            // Move from checkout to order confirmation
            setCurrentStep(3);
            console.log("Order confirmed:", cartItems);
            // Add order confirmation logic here
        }
    };

    const handleBackToCart = () => {
        setCurrentStep(1);
    };
    
    const handleLoginRedirect = () => {
        // Redirect to login page
        console.log("Redirecting to login page");
        // Implementation would depend on your routing setup
        // window.location.href = '/login';
        setShowLoginPopup(false);
    };
    
    const handleContinueAsGuest = () => {
        setShowLoginPopup(false);
        setCurrentStep(2);
        console.log("Continuing as guest");
    };
    
    const handleClosePopup = () => {
        setShowLoginPopup(false);
    };

    return (
        <div>
            <main className="w-full">
                <CartNavigator currentStep={currentStep} />
                {currentStep === 1 && (
                    // Original layout for cart view 
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 md:gap-6 px-4 py-6 pt-28 md:p-28">
                        <div className="w-full md:w-3/5 transition-all duration-300 ease-in-out">
                            <CartItemDemo 
                                cartItems={cartItems}
                                onRemove={handleRemove}
                                onIncreaseQuantity={handleIncreaseQuantity}
                                onDecreaseQuantity={handleDecreaseQuantity}
                            />
                        </div>
                        <div className="w-full md:w-2/5">
                            <OrderSummary 
                                subtotal={subtotal}
                                shipping={shipping}
                                total={total}
                                onCheckout={handleCheckout}
                                isCheckout={false}
                            />
                        </div>
                    </div>
                )}
                
                {currentStep === 2 && (
                    // Restructured layout for checkout 
                    <div className="max-w-7xl mx-auto px-4 py-6 pt-28 md:p-28 transition-all duration-300 ease-in-out">
                        <div className="flex justify-start items-center mb-4">
                            <button 
                                onClick={handleBackToCart}
                                className="text-amber-500 hover:text-amber-300 flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Back to Cart
                            </button>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                            <div className="w-full md:w-3/5 space-y-4">
                                <DeliveryInfo />
                                <PaymentMethodSelector />
                                <Additionalnotes />
                            </div>
                            <div className="w-full md:w-2/5 mt-4 md:mt-0">
                                <OrderSummary 
                                    subtotal={subtotal}
                                    shipping={shipping}
                                    total={total}
                                    onCheckout={handleCheckout}
                                    isCheckout={true}
                                />
                            </div>
                        </div>
                    </div>
                )}
                
                {currentStep === 3 && (
                    // Order confirmation hih
                    <div className="max-w-7xl mx-auto px-4 py-10 pt-20 md:p-20 transition-all duration-300 ease-in-out">
                        <OrderConfirmed />
                    </div>
                )}
                
                {/* Login Popup */}
                {showLoginPopup && (
                    <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-3 md:p-4">
                        <div className="bg-white rounded-2xl shadow-2xl shadow-amber-400 p-4 md:p-6 w-full max-w-md animate-fade-in border border-gray-200 relative">
                            <button 
                                onClick={handleClosePopup}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-400 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <div className="mb-4 md:mb-6 mt-2 md:mt-4">
                                <img src="public/carticons/Good Idea Icon.png" className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4" alt="Idea Icon" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={handleLoginRedirect}
                                    className="w-full bg-black hover:bg-amber-500 hover:text-black text-white font-medium py-3 md:py-4 px-3 md:px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300 text-sm md:text-base"
                                >
                                    Log In for Best Experience
                                </button>
                                <button
                                    onClick={handleContinueAsGuest}
                                    className="w-full bg-white hover:bg-amber-500 hover:text-black text-amber-500 border-2 border-amber-500 font-medium py-3 md:py-4 px-3 md:px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm md:text-base"
                                >
                                    Checkout without Logging In
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

export default Cart
