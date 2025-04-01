import React from 'react'
import Newitem from "./utils/Newitem.jsx";


function Newarrivals() {
    return (
        <>
            <section className="pt-10 flex justify-center">
                <div className={'max-w-7xl w-full lg:flex justify-between px-2'}>
                    <div className={'flex flex-col '}>
                        <span className={'px-2 text-2xl'}>
                            New Arrivals
                        </span>
                        <div
                            className={'flex overflow-x-auto gap-4 mt-4 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent lg:grid lg:grid-cols-4 lg:overflow-x-visible lg:gap-6'}>
                            {[...Array(8)].map((_, index) => (
                                <div key={index} className="flex-shrink-0 w-[280px] lg:w-full">
                                    <Newitem/>
                                </div>
                            ))}
                        </div>


                    </div>
                </div>
            </section>
        </>
    )
}

export default Newarrivals
