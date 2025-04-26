import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaMinus, FaPlus } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import api from '../../utils/axios';
import Productitem from '../component/utils/Productitem.jsx';

function SingleProduct() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const res = await api.get(`/products/${productId}`);
                setProduct(res.data);
            } catch (err) {
                setError("Failed to load product.");
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [productId]);

    const handleIncrease = () => setQuantity(q => q + 1);
    const handleDecrease = () => setQuantity(q => (q > 1 ? q - 1 : 1));

    if (loading) return <div className="p-10 text-center">Loading product...</div>;
    if (error) return <div className="p-10 text-center text-red-500">{error}</div>;
    if (!product) return null;

    return (
        <>
            <section className="pt-10 flex justify-center">
                <div className="max-w-7xl w-full mt-10 lg:mt-0 px-5 lg:px-2">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(-1)}>
                        <span className="font-semibold text-sm text-gray-500"><FaArrowLeft /></span>
                        <span className="font-semibold text-sm text-gray-500">Back to Home</span>
                    </div>

                    <div className="bg-white rounded-2xl overflow-hidden mt-3 lg:flex">
                        <div className="relative w-full lg:w-1/3">
                            {product.discount_percentage > 0 && (
                                <div className="absolute top-0 left-0 bg-yellow-500 text-white py-1 px-6 rounded-br-2xl text-sm w-1/3 text-center font-semibold">
                                    {product.discount_percentage}% OFF
                                </div>
                            )}
                            <div className="w-full h-full flex justify-center items-center">
                                <img
                                    src={`https://jcreations.1000dtechnology.com/storage/${product.images[0]}`}
                                    alt={product.name}
                                    className="w-full h-full max-w-xs lg:max-w-md object-cover rounded-2xl"
                                />
                            </div>
                        </div>

                        <div className="p-2 lg:pl-15 w-full lg:w-2/3">
                            <h2 className="text-lg lg:text-xl font-semibold text-gray-800">
                                {product.name}
                            </h2>
                            <h3 className="font-semibold text-gray-600 mb-2">
                                LKR.{product.price.toFixed(2)}
                            </h3>
                            <p className="text-gray-400 text-sm mb-4 w-full lg:w-3/4">
                                {product.description}
                            </p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1 lg:mt-10">
                                    <button
                                        className="bg-black text-white font-bold p-2 rounded-full cursor-pointer"
                                        onClick={handleDecrease}
                                    >
                                        <FaMinus />
                                    </button>
                                    <p className="px-2 font-bold text-lg">{quantity}</p>
                                    <button
                                        className="bg-yellow-500 text-white font-bold p-2 rounded-full cursor-pointer"
                                        onClick={handleIncrease}
                                    >
                                        <FaPlus />
                                    </button>
                                </div>
                            </div>
                            <button
                                className="bg-black text-white font-semibold p-2 w-full lg:w-3/4 rounded-lg mt-5 lg:mt-10 text-sm cursor-pointer"
                            >
                                Add to Order
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col mt-5 lg:mt-10">
                        <span className="px-2 text-xl my-5 font-semibold">
                            Frequently bought together
                        </span>

                        <div className="grid lg:grid-cols-2 mt-4 gap-4">
                            {Array(2).fill().map((_, index) => (
                                <Productitem key={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default SingleProduct;