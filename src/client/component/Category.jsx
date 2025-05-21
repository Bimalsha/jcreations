import React from 'react'
import Categoryitem from './utils/Categoryitem'

function Category({ onCategoryClick }) {
    return (
        <>
            <section className="pt-15 flex justify-center">
                <div className={'max-w-7xl w-full lg:flex justify-between px-2'}>
                    <div className={'flex flex-col w-full'}>
                        <span className={'px-2 text-2xl'}>
                            Categories
                        </span>

                        <div className={'w-full flex justify-center'}>
                            <Categoryitem onCategoryClick={onCategoryClick} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Category