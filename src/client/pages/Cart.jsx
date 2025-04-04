import React, { useState } from 'react'
import BottomNavigator from "../component/BottomNavigator.jsx";
import Header from "../component/Header.jsx";
import CartNavigator from '../component/utils/CartNavigator.jsx';
import CartItemDemo from '../component/CartItemDemo.jsx';
import OrderSummary from '../component/OrderSummery.jsx';
import Additionalnotes from '../component/AdditionalNotes.jsx';
import DeliveryInfo from '../component/DeliveryInfo.jsx';
import PaymentMethodSelector from '../component/PaymentMethodSelector.jsx';

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
    
    // Add state to track whether to show cart items
    const [showCartItems, setShowCartItems] = useState(true);

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
        if (showCartItems) {
            // Hide cart items when proceeding to checkout
            setShowCartItems(false);
            console.log("Proceeding to checkout with items:", cartItems);
        } else {
            // Handle the confirm order action
            console.log("Order confirmed:", cartItems);
            // Add order confirmation logic here
        }
    };

    const handleBackToCart = () => {
        setShowCartItems(true);
    };

    return (
        <div>
            <main>
                <CartNavigator currentStep={showCartItems ? 1 : 2} />
                {showCartItems ? (
                    // Original layout for cart view
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 p-4">
                        <div className="md:w-3/5 transition-all duration-300 ease-in-out">
                            <CartItemDemo 
                                cartItems={cartItems}
                                onRemove={handleRemove}
                                onIncreaseQuantity={handleIncreaseQuantity}
                                onDecreaseQuantity={handleDecreaseQuantity}
                            />
                        </div>
                        <div className="md:w-2/5">
                            <OrderSummary 
                                subtotal={subtotal}
                                shipping={shipping}
                                total={total}
                                onCheckout={handleCheckout}
                                isCheckout={!showCartItems}
                            />
                        </div>
                    </div>
                ) : (
                    // Restructured layout for checkout view
                    <div className="max-w-6xl mx-auto p-4 transition-all duration-300 ease-in-out">
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
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="md:w-3/5 space-y-4">
                                <DeliveryInfo />
                                <PaymentMethodSelector />
                                <Additionalnotes />
                            </div>
                            <div className="md:w-2/5">
                                <OrderSummary 
                                    subtotal={subtotal}
                                    shipping={shipping}
                                    total={total}
                                    onCheckout={handleCheckout}
                                    isCheckout={!showCartItems}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

export default Cart
