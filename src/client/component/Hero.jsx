import React from 'react'
import {FaArrowRight} from "react-icons/fa";
import {Link} from "react-router-dom";
import {FaArrowRightLong} from "react-icons/fa6";

function Hero() {
    return (
        <>
            <section className="pt-32 flex justify-center">
                <div className={'max-w-7xl w-full lg:flex md:flex justify-between hidden px-2'}>
                    <div className={'flex flex-col w-1/2'}>
                        <div>
                            <div className={'bg-[#FEF4E3] rounded-full flex items-center w-96'}>
                                <div className={'bg-[#F7A313] rounded-bl-3xl rounded-tl-3xl p-2 rounded-br-[50px]'}>
                                    🍰🎂🍫🍬🍭🕯️🎉
                                </div>
                                <span className={'px-2'}>
                                    Eat delicious foods
                                </span>
                            </div>
                        </div>

                        <span className={'lg:text-7xl font-bold leading-tight text-[#000F20] mt-6 md:text-5xl'}>Be The <span
                            className={'text-[#F7A313]'}>First</span><br/> Delivery &<br/> Easy Pick Up</span>
                        <p className={'mt-4'}>We will deliver your food within 45 minutes in your town,If
                            we would fail,we will give the food free.</p>
                        <Link to={'/'}
                              className={'flex items-center gap-2 bg-[#F7A313] text-white rounded-bl-3xl rounded-tr-3xl justify-center px-6 py-3 mt-4 w-56'}>
                            Order Now <FaArrowRightLong/>
                        </Link>

                    </div>
                    <div className={'w-1/2'}>
                        <img src="../../../public/hero/herolg.webp" alt="hero" className={'w-full'}/>
                    </div>
                </div>
                <div className={'p-2  lg:hidden md:hidden w-full'}>
                    <div className="w-full  rounded-3xl shadow-lg overflow-hidden">
                        <div className="relative">
                            <img
                                src="../../../public/hero/home%20back.webp"
                                alt="Chocolate Cake"
                                className="w-full h-[250px] object-cover rounded-3xl"
                            />
                            <div
                                className="absolute top-8 right-8 bg-white p-2 rounded-lg shadow-md text-sm font-semibold text-gray-700">
                                <div
                                    className="absolute -top-3 -right-3 stamp text-white text-xs p-4  rounded-full font-bold">
                                    %
                                </div>
                                <span className="text-2xl font-bold text-[#F7A313]">10%</span>
                                <p className="text-sm font-medium">Discount <br/>for 2 Orders</p>
                            </div>
                            <div
                                className="absolute bottom-4 left-4 p-2 rounded-lg shadow-md text-sm font-semibold text-gray-700">
                                <span className={'font-bold leading-tight text-white mt-6 text-2xl'}>Be The <span
                                    className={'text-[#F7A313]'}>First</span><br/> Delivery &<br/> Easy Pick Up</span>
                            </div>
                            <Link to={'/'}
                                className="absolute bottom-4 right-4 bg-[#F7A313] p-2 px-4 rounded-tl-3xl text-sm rounded-br-3xl text-white flex items-center gap-2">

                                Order Now <FaArrowRightLong/>
                            </Link>
                        </div>

                    </div>

                </div>
            </section>
        </>
    )
}

export default Hero

