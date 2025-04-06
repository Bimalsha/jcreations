import React from 'react'
import {LuCodesandbox} from "react-icons/lu";
import {FaRegWindowClose} from "react-icons/fa";
import {AiOutlineReload} from "react-icons/ai";
import {BsThreeDots} from "react-icons/bs";

function Products() {
    const products = [
        {
            id: '01',
            name: 'Special Birthday Cake',
            category: 'Cake',
            price: '3500.00',
            image: 'https://i.imgur.com/WvEu0cO.png', // Replace with actual image
            status: 'Active',
        },
        {
            id: '02',
            name: 'Chocolate Cake',
            category: 'Cake',
            price: '4000.00',
            image: 'https://i.imgur.com/WvEu0cO.png', // Replace with actual image
            status: 'Deactivate',
        },
    ];

    const statusClasses = {
        Active: 'bg-green-100 text-green-700',
        Deactivate: 'bg-red-100 text-red-700',
    };
    return (
        <div className={'flex flex-col'}>
            <div className={'bg-[#F2EFE7] w-full h-[200px]'}>
                <div className={'flex justify-between items-center px-8 pt-8'}>
                    <span className={'text-2xl font-medium'}>Products</span>
                    <span className={'text-sm'}>March 28, 2025 | 08:30:02 </span>
                </div>
                <div className={'px-8 pt-4 grid grid-cols-4 gap-4'}>
                    <div className={'bg-white rounded-xl w-full h-[100px] flex items-center'}>
                        <div className={'p-4 flex items-center gap-4'}>
                            <div className={'bg-[#E4CEFF] rounded-full h-10 w-10 flex items-center justify-center'}>
                                <LuCodesandbox className={'text-[#A962FF] text-xl'}/>
                            </div>
                            <div className={'flex flex-col'}>
                                <span className={'text-[#C6C6C6] text-lg'}>Products</span>
                                <span className={' text-4xl font-semibold'}>33</span>
                            </div>
                        </div>
                    </div>
                    <div className={'bg-white rounded-xl w-full h-[100px] flex items-center'}>
                        <div className={'p-4 flex items-center gap-4'}>
                            <div className={'bg-[#FDB6B6] rounded-full h-10 w-10 flex items-center justify-center'}>
                                <FaRegWindowClose className={'text-[#FF0000] text-xl'}/>
                            </div>
                            <div className={'flex flex-col'}>
                                <span className={'text-[#C6C6C6] text-lg'}>Disable Products</span>
                                <span className={' text-4xl font-semibold'}>05</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'h-full w-full bg-white rounded-b-2xl'}>
                <div className={'px-8 pt-4 flex justify-between'}>
                    <button className={'bg-[#FDE3B6] p-2 flex justify-center items-center rounded-lg cursor-pointer'}>+ Add New Product</button>
                    <div className={'flex items-center gap-2'}>
                        <div>
                            <span className={'text-sm text-[#C6C6C6]'}>Sort By:</span>
                            <select className={'border border-[#C6C6C6] rounded-lg p-2 ml-2 focus:outline-none focus:ring-2 focus:ring-[#F7A313]'}>
                                <option value="name">Name</option>
                                <option value="date">Date</option>
                            </select>
                        </div>
                        <div className="relative ">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7A313] focus:border-transparent"
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
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
                                <th className="px-4 py-2">Product#</th>
                                <th className="px-4 py-2">Product Name</th>
                                <th className="px-4 py-2">Category</th>
                                <th className="px-4 py-2">Price</th>
                                <th className="px-4 py-2">Image</th>
                                <th className="px-4 py-2">More</th>
                                <th className="px-4 py-2">Update</th>
                                <th className="px-4 py-2">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-2">{product.id}</td>
                                    <td className="px-4 py-2">{product.name}</td>
                                    <td className="px-4 py-2">{product.category}</td>
                                    <td className="px-4 py-2">{product.price}</td>
                                    <td className="px-4 py-2">
                                        <img
                                            src={product.image}
                                            alt="cake"
                                            className="w-6 h-6 object-cover rounded"
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                        <BsThreeDots className="text-blue-400 text-lg cursor-pointer"/>
                                    </td>
                                    <td className="px-4 py-2">
                                        <AiOutlineReload className="text-yellow-500 text-lg cursor-pointer"/>
                                    </td>
                                    <td className="px-4 py-2">
                <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[product.status]}`}
                >
                  {product.status}
                </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products
