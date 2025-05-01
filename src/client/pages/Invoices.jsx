import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/axios.js';

function Invoices() {
    const [invoice, setInvoice] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        api.get(`/orders/${id}`)
            .then(response => setInvoice(response.data))
            .catch(error => console.error('Error fetching invoice:', error));
    }, [id]);

    if (!invoice) return <div>Loading...</div>;

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="max-w-7xl w-full">
                {/* Header */}
                <div className="flex flex-col lg:flex-row w-full justify-between gap-4 lg:gap-0 mt-10">
                    <div className="bg-black text-white text-3xl lg:text-5xl lg:w-1/2 p-4 lg:p-5">INVOICE</div>
                    <div className="lg:w-1/2 flex flex-col items-start lg:items-end justify-center text-lg lg:text-xl">
                        <div className="font-semibold">I N V O I C E #</div>
                        <div>{invoice.id}</div>
                    </div>
                </div>

                {/* Billing Info */}
                <div className="text-lg lg:text-xl mt-5 w-full lg:w-1/4">
                    <div className="font-semibold">BILLING TO :</div>
                    <div>{invoice.customer_name}</div>
                    <div className="break-words">{invoice.address}</div>
                    <div>{new Date(invoice.created_at).toLocaleString()}</div>
                </div>

                {/* Table Header - Desktop */}
                <div className="hidden lg:flex bg-black text-white text-xl text-center mt-10">
                    <div className="w-4/12 p-3">PRODUCT</div>
                    <div className="w-3/12 p-3">PRICE</div>
                    <div className="w-2/12 p-3">QTY</div>
                    <div className="w-3/12 p-3">TOTAL</div>
                </div>

                {/* Items List */}
                {invoice.order_items.map(item => (
                    <div key={item.id} className="mt-6 lg:mt-10">
                        {/* Mobile View */}
                        <div className="lg:hidden bg-gray-100 p-4 rounded-lg">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="font-semibold">Product:</div>
                                <div>{item.product_name}</div>
                                <div className="font-semibold">Price:</div>
                                <div>Rs. {item.unit_price}</div>
                                <div className="font-semibold">Quantity:</div>
                                <div>{item.quantity}</div>
                                <div className="font-semibold">Total:</div>
                                <div>Rs. {item.total_price}</div>
                            </div>
                        </div>

                        {/* Desktop View */}
                        <div className="hidden lg:flex text-center text-xl border-b border-gray-300">
                            <div className="w-4/12 p-1">{item.product_name}</div>
                            <div className="w-3/12 p-1">Rs. {item.unit_price}</div>
                            <div className="w-2/12 p-1">{item.quantity}</div>
                            <div className="w-3/12 p-1 text-end">Rs. {item.total_price}</div>
                        </div>
                    </div>
                ))}

                {/* Totals Section */}
                <div className="flex flex-col items-end mt-8 lg:mt-10">
                    <div className="w-full lg:w-3/12 space-y-2">
                        <div className="flex justify-between text-lg">
                            <div>Subtotal:</div>
                            <div>Rs. {invoice.order_items.reduce((sum, item) =>
                                sum + parseFloat(item.total_price), 0).toFixed(2)}</div>
                        </div>
                        <div className="flex justify-between text-lg">
                            <div>Shipping:</div>
                            <div>Rs. {parseFloat(invoice.shipping_charge).toFixed(2)}</div>
                        </div>
                        <div className="flex justify-between text-lg lg:text-xl font-bold pt-2 border-t border-gray-300">
                            <div>TOTAL:</div>
                            <div>Rs. {(invoice.order_items.reduce((sum, item) =>
                                    sum + parseFloat(item.total_price), 0) +
                                parseFloat(invoice.shipping_charge)).toFixed(2)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Invoices;