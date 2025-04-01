import React from 'react'
import Categoryitem from './utils/Categoryitem'

function Category() {
    return (

        <>
            <section className="pt-15 flex justify-center">
                <div className={'max-w-7xl w-full lg:flex justify-between hidden px-2'}>

                    <div className={'flex flex-col '}>
                        <span className={'px-2 text-2xl'}>
                            Categories
                        </span>

                        <Categoryitem />

                    </div>
                </div>
            </section>

        </>
    )
}

export default Category
