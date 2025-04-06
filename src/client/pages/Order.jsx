import React from 'react'
import BottomNavigator from "../component/BottomNavigator.jsx";
import Header from "../component/Header.jsx";
import Orders from "../component/Orders.jsx";

function Order() {
    return (
        <section className="pt-16 lg:pt-12 flex justify-center">
            <div className={' max-w-7xl px-2 w-full'}>
            <div>
                <h1 className={'text-2xl'}>Orders</h1>
                <h6>Check out what you’ve ordered before and reorder your favorites!</h6>
            </div>
            <Orders/>
            </div>
        </section>
    )
}

export default Order
