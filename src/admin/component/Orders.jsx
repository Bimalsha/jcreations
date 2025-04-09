import React from 'react'
import { AiOutlineReload } from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'
import { FaRegWindowClose } from 'react-icons/fa'
import { LuCodesandbox } from 'react-icons/lu'

function Orders() {
    const orders = [
        { id: 1, name: 'shanila', contact: '0769772391', address: 'Colombo', date: 'March 28, 18:30', status: 'Deliverd' }
    ];

    const statusClasses = {
        Deliverd: 'bg-green-100 text-green-800',
        Received: 'bg-yellow-100 text-yellow-800',
        cancelled: 'bg-red-100 text-red-800'
    };

    return (
        <>
            <div className={'flex flex-col'}>
                <div className={'bg-[#F2EFE7] w-full h-[200px]'}>
                    <div className={'flex justify-between items-center px-8 pt-8'}>
                        <span className={'text-2xl font-medium'}>Orders</span>
                        <span className={'text-sm'}>March 28, 2025 | 08:30:02 | Good Morning! </span>
                    </div>
                    <div className={'px-8 pt-4 grid grid-cols-4 gap-4'}>
                        <div className={'bg-white rounded-xl w-full h-[100px] flex items-center'}>
                            <div className={'p-4 flex items-center gap-4'}>
                                <div className={'bg-[#E4CEFF] rounded-full h-10 w-10 flex items-center justify-center'}>
                                    <LuCodesandbox className={'text-[#A962FF] text-xl'} />
                                </div>
                                <div className={'flex flex-col'}>
                                    <span className={'text-[#C6C6C6] text-lg'}>Today Orders </span>
                                    <span className={' text-4xl font-semibold'}>5</span>
                                </div>
                            </div>
                        </div>
                        <div className={'bg-white rounded-xl w-full h-[100px] flex items-center'}>
                            <div className={'p-4 flex items-center gap-4'}>
                                <div className={'bg-[#E4CEFF] rounded-full h-10 w-10 flex items-center justify-center'}>
                                    <LuCodesandbox className={'text-[#A962FF] text-xl'} />
                                </div>
                                <div className={'flex flex-col'}>
                                    <span className={'text-[#C6C6C6] text-lg'}>Pending Orders </span>
                                    <span className={' text-4xl font-semibold'}>10</span>
                                </div>
                            </div>
                        </div>
                        <div className={'bg-white rounded-xl w-full h-[100px] flex items-center'}>
                            <div className={'p-4 flex items-center gap-4'}>
                                <div className={'bg-[#E4CEFF] rounded-full h-10 w-10 flex items-center justify-center'}>
                                    <LuCodesandbox className={'text-[#A962FF] text-xl'} />
                                </div>
                                <div className={'flex flex-col'}>
                                    <span className={'text-[#C6C6C6] text-lg'}>All Orders </span>
                                    <span className={' text-4xl font-semibold'}>300</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'h-full w-full bg-white rounded-b-2xl'}>
                    <div className={'px-8 pt-4 flex justify-end'}>
                        <div className={'flex items-center gap-2'}>
                            <div>
                                <select className={'border border-[#C6C6C6] rounded-2xl bg-[#9F9A9A57] p-2 px-3  mx-2 focus:outline-none focus:ring-2 focus:ring-[#F7A313]'}>
                                    <option value="name">All</option>
                                    <option value="date">Date</option>
                                </select>
                            </div>
                            <div className="relative ">
                                <input
                                    type="text"
                                    placeholder=""
                                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F7A313] focus:border-transparent"
                                />
                                <div className="absolute left-56 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={'px-8 pt-8 '}>
                        <div className="overflow-x-auto ">
                            <table
                                className="min-w-full bg-white  rounded-lg shadow-sm text-sm text-left">
                                <thead className="text-gray-600 font-semibold">
                                    <tr>
                                        <th className="px-4 py-2">OrderID</th>
                                        <th className="px-4 py-2">Customer Name</th>
                                        <th className="px-4 py-2">Contact</th>
                                        <th className="px-4 py-2">Address</th>
                                        <th className="px-4 py-2">Date</th>
                                        <th className="px-4 py-2">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order.id} className="border-t hover:bg-gray-50">
                                            <td className="px-4 py-2">{order.id}</td>
                                            <td className="px-4 py-2">{order.name}</td>
                                            <td className="px-4 py-2">{order.contact}</td>
                                            <td className="px-4 py-2">{order.address}</td>
                                            <td className="px-4 py-2">{order.date}</td>

                                            <td className="px-4 py-2">
                                                <span
                                                    className={`py-1 rounded-full text-xs px-7 font-medium ${statusClasses[order.status]}`}
                                                >
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                <div className="w-[30px] flex justify-center items-center rounded-full h-[30px] bg-blue-200">
                                                    <BsThreeDots className="text-[#1363F7] text-lg cursor-pointer" />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </>

    )
}

export default Orders
