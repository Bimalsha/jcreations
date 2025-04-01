import React from 'react'
import Productitem from './utils/Productitem'

function Allproducts() {
    return (
        <>
            <section className="pt-10 flex justify-center">
                <div className={'max-w-7xl w-full lg:flex justify-between hidden px-2'}>
                    <div className={'flex flex-col '}>
                        <span className={'px-2 text-2xl'}>
                            All Products
                        </span>

                        <Productitem />

                    </div>
                </div>
            </section>
        </>
    )
}

export default Allproducts
