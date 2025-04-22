import React, { useState } from 'react'
import Orders from "../component/Orders.jsx";
import OrderDetails from "../component/orderDetails.jsx";

function Order() {
    const [showDetails, setShowDetails] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const handleViewDetails = (orderId) => {
        setSelectedOrderId(orderId);
        setShowDetails(true);
    };

    const handleBackToOrders = () => {
        setShowDetails(false);
    };

    return (
        <section className="pt-16 lg:pt-12 flex justify-center">
            <div className={'max-w-7xl px-2 w-full'}>
                {!showDetails ? (
                    <>
                        <div>
                            <h1 className={'text-2xl font-semibold'}>Orders</h1>
                            <h6>Check out what you've ordered before and reorder your favorites!</h6>
                        </div>
                        <Orders onViewDetails={handleViewDetails} />
                    </>
                ) : (
                    <>
                        <button
                            onClick={handleBackToOrders}
                            className="mb-4 text-[#F7A313] font-medium flex items-center"
                        >
                            ← Back to Orders
                        </button>
                        <OrderDetails orderId={selectedOrderId} />
                    </>
                )}
            </div>
        </section>
    )
}

export default Order