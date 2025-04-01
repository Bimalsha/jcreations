import React from 'react'
import {FaArrowRight} from "react-icons/fa";
import {Link} from "react-router-dom";
import {FaArrowRightLong} from "react-icons/fa6";

function Hero() {
    return (
        <>
            <section className="pt-32 flex justify-center">
                <div className={'max-w-7xl w-full lg:flex justify-between hidden px-2'}>
                    <div className={'flex flex-col '}>
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

                        <span className={'text-7xl font-bold leading-tight text-[#000F20] mt-6'}>Be The <span
                            className={'text-[#F7A313]'}>First</span><br/> Delivery &<br/> Easy Pick Up</span>
                        <p className={'mt-4'}>We will deliver your food within 45 minutes in your town,If<br/>
                            we would fail,we will give the food free.</p>
                        <Link to={'/'}
                              className={'flex items-center gap-2 bg-[#F7A313] text-white rounded-bl-3xl rounded-tr-3xl justify-center px-6 py-3 mt-4 w-56'}>
                            Order Now <FaArrowRightLong/>
                        </Link>

                    </div>
                    <div>
                        <img src="../../../public/hero/herolg.webp" alt="hero" className={''}/>
                    </div>
                </div>
                <div className={'p-2 lg:hidden'}>
                    <div className={'rounded-2xl w-full h-[200px]'}>
                        <img src="../../../public/hero/home%20back.webp" alt=""
                             className={'rounded-2xl w-full h-[200px] object-cover'}/>
                    </div>
                    <div className={'rounded-2xl w-full h-[200px]'}>
                    {/*    crete mobile viewe*/}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero
