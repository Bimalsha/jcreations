import React, { useState } from 'react'
import { LuCodesandbox } from "react-icons/lu";
import { FaRegWindowClose } from "react-icons/fa";
import { AiOutlineReload } from "react-icons/ai";
import { BsThreeDots, BsArrowLeft } from "react-icons/bs";
import AddProductForm from './utils/AddProductForm .jsx';
import UpdateProductForm from './utils/UpdateProductForm .jsx';
import ProductPreviewModal from './utils/ProductPreviewModal.jsx';

function Products() {
    const [showAddForm, setShowAddForm] = useState(false);
    const [updateProduct, setUpdateProduct] = useState(null);
    const [previewProduct, setPreviewProduct] = useState(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const handleAddProductClick = () => {
        setShowAddForm(true);
        setUpdateProduct(null);
    };

    const handleUpdateProductClick = (product) => {
        console.log("Update clicked for product:", product.id);
        setUpdateProduct(product);
        setShowAddForm(false);
    };

    const handlePreviewClick = (product) => {
        setPreviewProduct({
            ...product,
            description: "Delicious cake with premium ingredients.",
            offerPrice: product.price * 0.85,
            discountPrice: product.price * 0.85,
            discount: "15",
            listDate: "2024-05-21"
        });
        setIsPreviewOpen(true);
    };

    const handleClosePreview = () => {
        setIsPreviewOpen(false);
    };

    const handleBackToProducts = () => {
        setShowAddForm(false);
        setUpdateProduct(null);
    };

    const products = [
        {
            id: '01',
            name: 'Special Birthday Cake',
            category: 'Cake',
            price: '3500.00',
            image: 'https://i.imgur.com/WvEu0cO.png',
            status: 'Active',
        },
        {
            id: '02',
            name: 'Chocolate Cake',
            category: 'Cake',
            price: '4000.00',
            image: 'https://i.imgur.com/WvEu0cO.png',
            status: 'Deactivate',
        },
    ];

    const statusClasses = {
        Active: 'bg-green-100 text-green-700',
        Deactivate: 'bg-red-100 text-red-700',
    };

    return (
        <div className={'flex flex-col'}>
            {!showAddForm && !updateProduct && (
                <div className="bg-[#F2EFE7] w-full h-[200px] px-6 pt-6">
                    <div className="flex items-center justify-between px-6 pt-6 mb-6">
                        <h2 className="text-2xl font-semibold text-[#333333] mt-[-10px] ml-[-20px]">
                            Products
                        </h2>
                        <span className="text-sm text-gray-500 mt-[-10px] absolute right-8">March 28, 2025 | 08:30:02 | Good Morning!</span>
                    </div>

                    <div className="flex gap-6 b-8">
                        <div className="flex items-center gap-4 p-4 bg-white shadow-md rounded-xl w-60">
                            <div className="p-3 text-purple-600 bg-purple-100 rounded-full">
                                <LuCodesandbox size={20} className={'text-[#A962FF] text-xl'}/>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Products</p>
                                <p className="text-lg font-semibold">33</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-white shadow-md rounded-xl w-60">
                            <div className="p-3  bg-red-100 rounded-full">
                                <FaRegWindowClose size={20} className={'text-[#FF0000] text-xl'}/>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Disable Products</p>
                                <p className="text-lg font-semibold">05</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className={`h-full w-full ${(!showAddForm && !updateProduct) ? 'bg-white rounded-b-2xl' : 'rounded-2xl'}`}>
                {showAddForm ? (
                    <div className="w-full pt-4 px-4">
                        <button
                            onClick={handleBackToProducts}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 cursor-pointer ml-4"
                        >
                            <BsArrowLeft /> Back to Products
                        </button>
                        <AddProductForm />
                    </div>
                ) : updateProduct ? (
                    <div className="w-full pt-4 px-4">
                        <button
                            onClick={handleBackToProducts}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 cursor-pointer ml-4"
                        >
                            <BsArrowLeft /> Back to Products
                        </button>
                        <UpdateProductForm product={updateProduct} />
                    </div>
                ) : (
                    <>
                        <div className={'px-8 pt-4 flex justify-between'}>
                            <button
                                onClick={handleAddProductClick}
                                className={'bg-[#FDE3B6] p-2 flex justify-center items-center rounded-lg cursor-pointer'}
                            >
                                + Add New Product
                            </button>
                            <div className={'flex items-center gap-2'}>
                                <div>
                                    <span className={'text-sm text-[#C6C6C6]'}>Sort By:</span>
                                    <select
                                        className={'border border-[#C6C6C6] rounded-lg p-2 ml-2 focus:outline-none focus:ring-2 focus:ring-[#F7A313]'}>
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
                                    className="min-w-full bg-white rounded-lg shadow-sm text-sm text-left">
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
                                                <button
                                                    onClick={() => handlePreviewClick(product)}
                                                    className="w-full h-full flex justify-center items-center cursor-pointer"
                                                    aria-label={`View details of ${product.name}`}
                                                >
                                                    <BsThreeDots className="text-blue-400 text-lg hover:text-blue-600"/>
                                                </button>
                                            </td>
                                            <td className="px-4 py-2">
                                                <button
                                                    onClick={() => handleUpdateProductClick(product)}
                                                    className="w-full h-full flex justify-center items-center cursor-pointer"
                                                    aria-label={`Update ${product.name}`}
                                                >
                                                    <AiOutlineReload className="text-yellow-500 text-lg hover:text-yellow-600"/>
                                                </button>
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
                    </>
                )}
            </div>

            {/* Product Preview Modal */}
            <ProductPreviewModal
                isOpen={isPreviewOpen}
                onClose={handleClosePreview}
                product={previewProduct || {}}
            />
        </div>
    )
}

export default Products