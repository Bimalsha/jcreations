import React from 'react'
import BottomNavigator from "../component/BottomNavigator.jsx";
import Header from "../component/Header.jsx";
import Orders from "../component/Orders.jsx";

function Order() {
    return (
        <section className="pt-16 px-32 lg:pt12">
            <div>
                <h1 className={'text-2xl'}>Orders</h1>
                <h6>Check out what you’ve ordered before and reorder your favorites!</h6>
            </div>
            <Orders/>
        </section>
    )
}

export default Order
