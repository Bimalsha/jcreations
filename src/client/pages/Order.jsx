// src/client/pages/Order.jsx
import React, { useState, useEffect } from 'react';
import Orders from "../component/Orders.jsx";
import OrderDetails from "../component/orderDetails.jsx";
import { motion } from 'framer-motion';

function Order() {
    const [showDetails, setShowDetails] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    // Enhanced sample order data with more realistic values
    const sampleOrders = [
        {
            "id": 1001,
            "customer_name": "Bimalsha Weerasinghe",
            "contact_number": "0771234567",
            "delivery_location_id": 5,
            "address": "123 Temple Road, Colombo 05",
            "firebase_uid": "user123",
            "status": "delivered",
            "payment_type": "cash_on_delivery",
            "payment_status": "completed",
            "total_amount": 2850.00,
            "shipping_charge": 350.00,
            "order_datetime": "2023-07-15T14:30:00Z",
            "req_datetime": "2023-07-16T12:00:00Z",
            "orderItems": [
                {
                    "id": 2001,
                    "order_id": 1001,
                    "product_name": "Spicy Chicken Burger",
                    "quantity": 2,
                    "unit_price": 750.00,
                    "total_price": 1500.00
                },
                {
                    "id": 2002,
                    "order_id": 1001,
                    "product_name": "French Fries Large",
                    "quantity": 1,
                    "unit_price": 450.00,
                    "total_price": 450.00
                },
                {
                    "id": 2003,
                    "order_id": 1001,
                    "product_name": "Chocolate Milkshake",
                    "quantity": 2,
                    "unit_price": 450.00,
                    "total_price": 900.00
                }
            ]
        },
        {
            "id": 1002,
            "customer_name": "Bimalsha Weerasinghe",
            "contact_number": "0771234567",
            "delivery_location_id": 6,
            "address": "123 Temple Road, Colombo 05",
            "firebase_uid": "user123",
            "status": "pending",
            "payment_type": "online_payment",
            "payment_status": "pending",
            "total_amount": 3200.00,
            "shipping_charge": 400.00,
            "order_datetime": "2023-08-20T10:15:00Z",
            "req_datetime": "2023-08-20T18:30:00Z",
            "orderItems": [
                {
                    "id": 2004,
                    "order_id": 1002,
                    "product_name": "Family Meal Deal",
                    "quantity": 1,
                    "unit_price": 3200.00,
                    "total_price": 3200.00
                }
            ]
        },
        {
            "id": 1003,
            "customer_name": "Bimalsha Weerasinghe",
            "contact_number": "0771234567",
            "delivery_location_id": 7,
            "address": "123 Temple Road, Colombo 05",
            "firebase_uid": "user123",
            "status": "processing",
            "payment_type": "card_payment",
            "payment_status": "completed",
            "total_amount": 1950.00,
            "shipping_charge": 350.00,
            "order_datetime": "2023-09-05T19:45:00Z",
            "req_datetime": "2023-09-05T20:30:00Z",
            "orderItems": [
                {
                    "id": 2005,
                    "order_id": 1003,
                    "product_name": "Grilled Chicken Sandwich",
                    "quantity": 1,
                    "unit_price": 650.00,
                    "total_price": 650.00
                },
                {
                    "id": 2006,
                    "order_id": 1003,
                    "product_name": "Caesar Salad",
                    "quantity": 1,
                    "unit_price": 550.00,
                    "total_price": 550.00
                },
                {
                    "id": 2007,
                    "order_id": 1003,
                    "product_name": "Iced Coffee",
                    "quantity": 2,
                    "unit_price": 375.00,
                    "total_price": 750.00
                }
            ]
        }
    ];

    // Load sample orders directly without API
    useEffect(() => {
        window.scrollTo(0, 0);

        // Simulate API loading delay
        const timer = setTimeout(() => {
            setOrders(sampleOrders);
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleViewDetails = (orderId) => {
        const order = orders.find(order => order.id === orderId);
        setSelectedOrderId(orderId);
        setSelectedOrder(order);
        setShowDetails(true);
    };

    const handleBackToOrders = () => {
        setShowDetails(false);
    };

    if (isLoading) {
        return (
            <div className="pt-20 flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F7A313]"></div>
            </div>
        );
    }

    return (
        <section className="pt-16 lg:pt-12 flex justify-center">
            <div className="max-w-7xl w-full px-4 lg:px-2">
                {!showDetails ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="mb-6">
                            <h1 className="text-2xl font-semibold">Orders</h1>
                            <h6 className="text-gray-600">Check out what you've ordered before and reorder your favorites!</h6>
                        </div>

                        {orders.length > 0 ? (
                            <Orders orders={orders} onViewDetails={handleViewDetails} />
                        ) : (
                            <motion.div
                                className="text-center py-10 min-h-[40vh] flex flex-col items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="text-gray-400 mb-2 text-xl">No orders found</div>
                                <p className="text-gray-500">You haven't placed any orders yet</p>
                            </motion.div>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button
                            onClick={handleBackToOrders}
                            className="mb-4 text-[#F7A313] font-medium flex items-center"
                        >
                            ← Back to Orders
                        </button>
                        <OrderDetails orderId={selectedOrderId} order={selectedOrder} />
                    </motion.div>
                )}
            </div>
        </section>
    );
}

export default Order;