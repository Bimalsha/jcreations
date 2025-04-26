import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { LuCodesandbox } from "react-icons/lu";
import { FaMoneyBillWave, FaRegWindowClose, FaTags } from "react-icons/fa";
import { BsCash, BsThreeDots } from "react-icons/bs";
import { AiOutlineReload } from "react-icons/ai";
import { IoPricetagOutline } from "react-icons/io5";
import OrderDetailsModal from './utils/OrderDetailsModal';
import useAuthStore from '../../stores/authStore';

function DashboardMain() {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    useEffect(() => {
        // Check if user exists and has admin role
        if (!user || !user.roles || !user.roles.includes('admin')) {
            navigate('/adminlogin');
        }
    }, [user, navigate]);

    const products = [
        {
            id: '0145',
            name: 'Prabath Bandarae',
            category: '0771223321',
            price: '5th lane, colombo',
            image: 'March 28, 18:30', // Replace with actual image
            status: 'COD',
        },
    ];

    const handleRowClick = (orderId) => {
        setSelectedOrderId(orderId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const statusClasses = {
        Active: 'bg-green-100 text-green-700',
        Deactivate: 'bg-red-100 text-red-700',
    };

    return (
        <div className={'flex flex-col'}>
            <div className="bg-[#F2EFE7] w-full h-[200px] px-6 pt-6">
                <div className="flex items-center justify-between px-6 pt-6 mb-6">
                    <h2 className="text-2xl font-semibold text-[#333333] mt-[-10px] ml-[-20px]">Dashboard</h2>
                    <span className="text-sm text-gray-500 mt-[-10px] absolute right-8">March 28, 2025 | 08:30:02 | Good Morning!</span>
                </div>

                <div className="flex gap-6 b-8">
                    <div className="flex items-center gap-4 p-4 bg-white shadow-md rounded-xl w-60">
                        <div className="p-3 text-purple-600 bg-purple-100 rounded-full">
                            <FaMoneyBillWave size={20}/>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Sales</p>
                            <p className="text-lg font-semibold">LKR 52,000.00</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-white shadow-md rounded-xl w-60">
                        <div className="p-3 text-green-600 bg-green-100 rounded-full">
                            <FaTags size={20}/>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Orders</p>
                            <p className="text-lg font-semibold">336</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'h-full w-full bg-white rounded-b-2xl'}>
                <div className={'px-8 pt-4 flex justify-between'}>
                    <span className={'text-lg font-semibold'}>Pending Orders</span>
                </div>
                <div className={'px-8 pt-8 '}>
                    <div className="overflow-x-auto ">
                        <table
                            className="min-w-full bg-white rounded-lg shadow-sm text-sm text-left">
                            <thead className="text-gray-600 font-semibold">
                            <tr>
                                <th className="px-4 py-2">OrderID</th>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Contact</th>
                                <th className="px-4 py-2">Address</th>
                                <th className="px-4 py-2">Date</th>
                                <th className="px-4 py-2">Payment Method</th>
                                <th className="px-4 py-2"></th>
                                <th className="px-4 py-2"></th>
                                <th className="px-4 py-2"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map((product) => (
                                <tr
                                    key={product.id}
                                    className="border-t hover:bg-gray-50 cursor-pointer"
                                    onClick={() => handleRowClick(product.id)}
                                >
                                    <td className="px-4 py-2">{product.id}</td>
                                    <td className="px-4 py-2">{product.name}</td>
                                    <td className="px-4 py-2">{product.category}</td>
                                    <td className="px-4 py-2">{product.price}</td>
                                    <td className="px-4 py-2">{product.image}</td>
                                    <td className="px-4 py-2">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                product.status === 'COD'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                            }`}
                                        >
                                          {product.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2" onClick={(e) => e.stopPropagation()}>
                                        <button
                                            className="bg-yellow-500 text-white text-xs px-3 py-1 rounded flex items-center gap-1"
                                        >
                                            Deliver
                                        </button>
                                    </td>
                                    <td className="px-4 py-2" onClick={(e) => e.stopPropagation()}>
                                        <AiOutlineReload className="text-blue-500 text-lg cursor-pointer"/>
                                    </td>
                                    <td className="px-4 py-2" onClick={(e) => e.stopPropagation()}>
                                        <FaRegWindowClose className="text-red-500 text-lg cursor-pointer"/>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Order Details Modal */}
            <OrderDetailsModal
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </div>
    )
}

export default DashboardMain