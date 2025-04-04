import React, { useState } from 'react'
import BottomNavigator from "../component/BottomNavigator.jsx";
import Header from "../component/Header.jsx";
import CartNavigator from '../component/utils/CartNavigator.jsx';
import CartItemDemo from '../component/CartItemDemo.jsx';
import OrderSummary from '../component/OrderSummery.jsx';

function Cart() {
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
        // Placeholder for checkout logic
        console.log("Proceeding to checkout with items:", cartItems);
        // Add navigation or checkout modal here
    };

    return (
        <div>
            <main>
                <CartNavigator />
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 p-4">
                    <div className="md:w-3/5">
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
                        />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Cart
