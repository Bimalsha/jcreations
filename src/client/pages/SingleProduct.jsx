import React, { useState } from 'react';
import { FaArrowLeft, FaMinus, FaPlus } from "react-icons/fa";
import Productitem from '../component/utils/Productitem.jsx';

function SingleProduct() {
    const [quantity, setQuantity] = useState(1);

    const handleIncrease = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrease = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    return (
        <>
            <section className="pt-10 flex justify-center">
                <div className="max-w-7xl w-full mt-10 lg:mt-0 px-5 lg:px-2">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.history.back()}>
                        <span className="font-semibold text-sm text-gray-500"><FaArrowLeft /></span>
                        <span className="font-semibold text-sm text-gray-500">Back to Home</span>
                    </div>

                    <div className="bg-white rounded-2xl overflow-hidden mt-3 lg:flex">
                        <div className="relative w-full lg:w-1/3">
                            <div className="absolute top-0 left-0 bg-yellow-500 text-white py-1 px-6 rounded-br-2xl text-sm w-1/3 text-center font-semibold">
                                15% OFF
                            </div>
                            <div className="w-full h-full flex justify-center items-center">
                                <img
                                    src="../../../../public/cake.jpg"
                                    alt="Chocolate Cake"
                                    className="w-full h-full max-w-xs lg:max-w-md object-cover rounded-2xl"
                                />
                            </div>
                        </div>

                        <div className="p-2 lg:pl-15 w-full lg:w-2/3">
                            <h2 className="text-lg lg:text-xl font-semibold text-gray-800">
                                Chocolate Cake 1 kg
                            </h2>
                            <h3 className="font-semibold text-gray-600 mb-2">
                                LKR.3500.00
                            </h3>
                            <p className="text-gray-400 text-sm mb-4 w-full lg:w-3/4">
                                Savor the irresistible taste of our rich, moist chocolate cake, layered with velvety
                                chocolate ganache and topped with a delicate drizzle of chocolate syrup. A
                                heavenly delight for every dessert lover!
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