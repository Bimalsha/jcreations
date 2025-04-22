import React from 'react';

const OrderDetails = () => {
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Orders</h1>

            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Order details #123456</h2>
                <p className="text-gray-600 mb-6">Date: March 28, 2025</p>

                <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-700 mb-3">Delivery Information</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Name: Sutton Koutruba</li>
                        <li>Contact: 0777 135281</li>
                        <li>Address No.: 07, Cedmore</li>
                        <li>Date: 8.1me for Delivery March 30, 2025</li>
                        <li>Payment Method: Cash On Delivery</li>
                    </ul>
                </div>

                <div className="mb-6 overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead>
                        <tr className="border-b">
                            <th className="text-left py-2 px-4 font-medium text-gray-700">Product#</th>
                            <th className="text-left py-2 px-4 font-medium text-gray-700">Product Name</th>
                            <th className="text-left py-2 px-4 font-medium text-gray-700">Qty</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="border-b">
                            <td className="py-2 px-4 font-semibold">123</td>
                            <td className="py-2 px-4">Chocolate Cake</td>
                            <td className="py-2 px-4">02</td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-2 px-4 font-semibold">235</td>
                            <td className="py-2 px-4">Birthday Coke</td>
                            <td className="py-2 px-4">01</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Selected</h3>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                        <p className="text-gray-600">Moved</p>
                        <p className="text-gray-600">Price</p>
                        <p className="text-gray-600">7000LK$</p>
                        <p className="text-gray-600">3000LK$</p>
                    </div>

                    <div className="space-y-2 text-right">
                        <p className="text-gray-600">$usbouti</p>
                        <p className="text-gray-600">LK$ 10000.00</p>
                        <p className="text-gray-600">Shipping</p>
                        <p className="text-gray-600">LK$ 400.00</p>
                    </div>
                </div>

                <div className="flex justify-between border-t pt-4">
                    <p className="font-medium text-gray-700">Total</p>
                    <p className="font-medium text-gray-700">LK$ 10400.00</p>
                </div>
            </div>

            <div className="mt-8 pt-4 border-t text-center text-gray-600">
                Order details #123456
            </div>
        </div>
    );
};

export default OrderDetails;