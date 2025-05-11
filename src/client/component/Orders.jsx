// src/client/component/Orders.jsx
import React, { useEffect } from 'react';
import Orderitem from "./utils/Orderitem.jsx";

function Orders({ orders = [], onViewDetails }) {
    useEffect(() => {
        // Scroll to top when component loads
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="my-6 space-y-4">
            {orders.map((order) => (
                <Orderitem
                    key={order.id}
                    order={order}
                    onViewDetails={() => onViewDetails(order.id)}
                />
            ))}
        </div>
    );
}

export default Orders;