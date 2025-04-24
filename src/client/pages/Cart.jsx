import React, { useState, useEffect } from 'react';
import BottomNavigator from "../component/BottomNavigator.jsx";
import Header from "../component/Header.jsx";
import CartNavigator from '../component/utils/CartNavigator.jsx';
import CartItemDemo from '../component/utils/CartItemDemo.jsx';
import OrderSummary from '../component/utils/OrderSummery.jsx';
import Additionalnotes from '../component/utils/AdditionalNotes.jsx';
import DeliveryInfo from '../component/utils/DeliveryInfo.jsx';
import PaymentMethodSelector from '../component/utils/PaymentMethodSelector.jsx';
import OrderConfirmed from '../component/utils/OrderConfirmed.jsx';
import api from "../../utils/axios";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                // Get cart ID from localStorage if it exists
                const cartId = localStorage.getItem("jcreations_cart_id");
                
                if (!cartId) {
                    // Handle case where no cart exists yet
                    setCartItems([]);
                    return;
                }
                
                // Make the API request with cartId in the path
                const response = await api.get(`/cart/${cartId}`);
                const data = response.data;
                
                console.log("Cart data:", data);
                
                // Transform the cart items for display
                const transformedItems = data.items.map(item => ({
                    id: item.product.id,
                    itemId: item.id, // Store the cart item ID for updates/removal
                    name: item.product.name,
                    price: item.product.price,
                    quantity: item.quantity,
                    image: `https://jcreations.1000dtechnology.com/storage/${item.product.images[0]}`,
                    description: item.product.description
                }));

                setCartItems(transformedItems);
            } catch (err) {
                console.error('Error fetching cart:', err);
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    const handleRemove = async (itemId) => {
        try {
            const cartId = localStorage.getItem("jcreations_cart_id");
            if (!cartId) {
                throw new Error("No cart ID found");
            }
            
            await api.delete(`/cart/${cartId}/items/${itemId}`);
            setCartItems(prevItems => prevItems.filter(item => item.itemId !== itemId));
        } catch (err) {
            console.error('Error removing item:', err);
            setError(err.response?.data?.message || 'Failed to remove item');
        }
    };

    const handleQuantityChange = async (itemId, newQuantity) => {

        console.log("Updating quantity for item:", itemId, "to", newQuantity);
        try {
            const cartId = localStorage.getItem("jcreations_cart_id");
            if (!cartId) {
                throw new Error("No cart ID found");
            }
            
            await api.put(`/cart/items/${itemId}`, { 
                quantity: newQuantity,
                cart_id: cartId
            });

            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.itemId === itemId ? { ...item, quantity: newQuantity } : item
                )
            );
        } catch (err) {
            console.error('Error updating quantity:', err);
            setError(err.response?.data?.message || 'Failed to update quantity');
        }
    };

    const handleIncreaseQuantity = (itemId) => {
        const item = cartItems.find(item => item.itemId === itemId);
        if (item) {
            handleQuantityChange(itemId, item.quantity + 1);
        }
    };

    const handleDecreaseQuantity = (itemId) => {
        const item = cartItems.find(item => item.itemId === itemId);
        if (item && item.quantity > 1) {
            handleQuantityChange(itemId, item.quantity - 1);
        }
    };

    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = 300;
    const total = subtotal + shipping;

    const handleCheckout = () => {
        if (currentStep === 1) {
            if (!isLoggedIn) {
                setShowLoginPopup(true);
                return;
            }
            setCurrentStep(2);
            console.log("Proceeding to checkout with items:", cartItems);
        } else if (currentStep === 2) {
            setCurrentStep(3);
            console.log("Order confirmed:", cartItems);
        }
    };

    const handleBackToCart = () => {
        setCurrentStep(1);
    };
    
    const handleLoginRedirect = () => {
        console.log("Redirecting to login page");
        setShowLoginPopup(false);
        // Add your login redirect logic here
        // window.location.href = '/login';
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
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 md:gap-6 px-4 py-6 pt-28 md:p-28">
                        <div className="w-full md:w-3/5 transition-all duration-300 ease-in-out">
                            {loading ? (
                                <div className="flex items-center justify-center h-40">
                                    <p>Loading cart...</p>
                                </div>
                            ) : error ? (
                                <div className="text-red-500 text-center">
                                    {error}
                                </div>
                            ) : cartItems.length === 0 ? (
                                <div className="text-center py-8">
                                    <p>Your cart is empty</p>
                                </div>
                            ) : (
                                <CartItemDemo 
                                    cartItems={cartItems}
                                    onRemove={handleRemove}
                                    onIncreaseQuantity={handleIncreaseQuantity}
                                    onDecreaseQuantity={handleDecreaseQuantity}
                                />
                            )}
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
                    <div className="max-w-7xl mx-auto px-4 py-10 pt-20 md:p-20">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full md:w-3/5">
                                <DeliveryInfo />
                                <Additionalnotes />
                                <PaymentMethodSelector />
                            </div>
                            <div className="w-full md:w-2/5">
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
                    <div className="max-w-7xl mx-auto px-4 py-10 pt-20 md:p-20 transition-all duration-300 ease-in-out">
                        <OrderConfirmed />
                    </div>
                )}

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
                                <img src="/carticons/Good Idea Icon.png" className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4" alt="Idea Icon" />
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
            <BottomNavigator />
        </div>
    );
}

export default Cart;