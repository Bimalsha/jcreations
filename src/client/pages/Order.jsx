import React from 'react'
import BottomNavigator from "../component/BottomNavigator.jsx";
import Header from "../component/Header.jsx";
import OrderConfirmation from '../component/OrderConfirmation.jsx';

function Order() {
    return (
        <div>


            <div>Order</div>
            <main>
                <OrderConfirmation/>
            </main>
        </div>
    )
}

export default Order
