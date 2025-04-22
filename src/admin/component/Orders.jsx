import React, { useState } from 'react';
import { FaBoxOpen, FaMoneyBillWave, FaTags, FaTrash } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import OrderDetailsModal from './utils/OrderDetailsModal.jsx';

const Orders = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDetailsClick = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const orders = [
        {
            id: '123456',
            name: 'Prabath Bandara',
            contact: '0771223321',
            address: '5th lane, Colombo',
            date: 'March 28, 18:30',
            payment: 'COD',
        },
        {
            id: '123457',
            name: 'Prabath Bandara',
            contact: '0771223321',
            address: '5th lane, Colombo',
            date: 'March 28, 18:30',
            payment: 'Card Payment',
        },
    ];

    return (
        <div>
            <div className="bg-[#F2EFE7] w-full h-[200px] px-6 pt-6">
                <div className="flex items-center justify-between px-6 pt-6 mb-6">
                    <h2 className="text-2xl font-semibold text-[#333333] mt-[-10px] ml-[-20px]">Orders</h2>
                    <span className="text-sm text-gray-500 mt-[-10px] absolute right-8">March 28, 2025 | 08:30:02 | Good Morning!</span>
                </div>

                <div className="flex gap-6 b-8">
                    <div className="flex items-center gap-4 p-4 bg-white shadow-md rounded-xl w-60">
                        <div className="p-3 text-purple-600 bg-purple-100 rounded-full">
                            <FaBoxOpen size={20} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Today Orders</p>
                            <p className="text-lg font-semibold">123</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-white shadow-md rounded-xl w-60">
                        <div className="p-3 text-green-600 bg-green-100 rounded-full">
                            <FaBoxOpen size={20} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Pending Orders</p>
                            <p className="text-lg font-semibold">336</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white shadow-md rounded-xl w-60">
                        <div className="p-3 text-yellow-600 bg-yellow-100 rounded-full">
                            <FaBoxOpen size={20} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">All Orders</p>
                            <p className="text-lg font-semibold">5326</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 px-8">
                <h3 className="mb-3 text-lg font-semibold text-[#333333]">Pending Orders</h3>

                <table className="min-w-full text-sm text-left bg-white ">
                    <thead>
                    <tr className="text-gray-600 border-b">
                        <th className="p-3 text-left">OrderID</th>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Contact</th>
                        <th className="p-3 text-left">Address</th>
                        <th className="p-3 text-left">Date</th>
                        <th className="p-3 text-left">Payment Method</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} className="border-t hover:bg-gray-100">
                            <td className="p-3">{order.id}</td>
                            <td className="p-3">{order.name}</td>
                            <td className="p-3">{order.contact}</td>
                            <td className="p-3">{order.address}</td>
                            <td className="p-3">{order.date}</td>
                            <td className="p-3">{order.payment}</td>
                            <td className="flex items-center gap-3 p-3">
                                <button className="px-4 py-1 text-sm bg-[#FCE7C5] text-[#D2902C] rounded-full">Deliver
                                </button>
                                <button className="p-2 text-red-600 bg-red-200 rounded-full">
                                    <FaTrash size={16}/>
                                </button>
                                <button
                                    className="p-2 text-blue-600 bg-blue-200 rounded-full hover:bg-blue-300 transition-colors"
                                    onClick={() => handleDetailsClick(order)}
                                    aria-label={`View details for order ${order.id}`}
                                >
                                    <BsThreeDots size={16}/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Order Details Modal with glass effect */}
            <OrderDetailsModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
};

export default Orders;