import React from 'react'
import BottomNavigator from "../component/BottomNavigator.jsx";
import Header from "../component/Header.jsx";
import { FaArrowLeft } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import Allproducts from '../component/Allproducts.jsx';
import Productitem from '../component/utils/Productitem.jsx';


function SingleProduct() {
    return (
        <>
            <section className="pt-10 flex justify-center">
                <div className={'max-w-7xl w-full mt-10 lg:mt-0 justify-between px-5 lg:px-2'}>
                    <div className='flex items-center gap-2'>
                        <span className='font-semibold text-sm text-[#4C4C4C57]'><FaArrowLeft /></span>
                        <span className='font-semibold text-sm text-[#4C4C4C57]'>Back to Home</span>
                    </div>

                    <div
                        className="bg-white rounded-2xl overflow-hidden mt-3 lg:flex"

                    >

                        <div className="relative w-full lg:w-1/3">
                            <div
                                className="absolute top-0 left-0 bg-[#F7A313] text-white py-1 px-6 rounded-br-2xl text-sm w-1/3 text-center font-semibold"

                            >
                                15% OFF
                            </div>
                            <div className={'w-full h-full flex justify-center items-center'}>
                                <img
                                    src="../../../../public/pngtree-chocolate-cake-png-image_17407867.png"
                                    alt="Chocolate Cake"
                                    className="lg:w-[350px] lg:h-[350px] w-[200px] lg:mt-5 h-[200px] object-cover"

                                />
                            </div>
                        </div>
                       
                        <div className="p-4 lg:pl-15 w-full lg:w-2/3">
                            <h2
                                className="lg:text-xl font-semibold text-gray-800"

                            >
                                Chocolate Cake 1 kg
                            </h2>
                            <h3 className="font-semibold text-[#6B6B6B] mb-2">
                                LKR.3500.00
                            </h3>
                            <p className="text-[#A5A0A0] text-sm mb-4 w-full lg:w-3/4 text-[10px]">
                                Savor the irresistible taste of our rich, moist chocolate cake, layered with velvety
                                chocolate ganache and topped with a delicate drizzle of chocolate syrup. A
                                heavenly delight for every dessert lover!
                            </p>
                            <div className="flex items-center justify-between ">
                                <div
                                    className={'flex items-center gap-1 lg:mt-10'}

                                >
                                    <button
                                        className="bg-black text-white font-bold p-2 rounded-full"

                                    >
                                        <FaMinus />
                                    </button>
                                    <p className="px-2 font-bold text-lg">2</p>
                                    <button
                                        className="bg-[#F7A313] text-white font-bold p-2 rounded-full"

                                    >
                                        <FaPlus />
                                    </button>
                                </div>

                            </div>
                            <button
                                className="bg-black text-white font-semibold p-2 w-full lg:w-3/4 rounded-[8px] mt-5 lg:mt-10 text-sm"

                            >
                               Add to Order
                            </button>
                        </div>
                    </div>

                    <div className={'flex flex-col mt-5 lg:mt-10'}>
                        <span className={'px-2 text-xl my-5 font-semibold'}>
                        Frequently bought together
                        </span>

                        <div className={'grid lg:grid-cols-2 mt-4 gap-4'}>
                            {Array(2).fill().map((_, index) => (
                                <Productitem key={index} />
                            ))}
                        </div>


                    </div>

                </div>
            </section>
        </>
    )
}

export default SingleProduct
