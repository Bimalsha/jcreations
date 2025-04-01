import React from 'react'
import BottomNavigator from "../component/BottomNavigator.jsx";
import Header from "../component/Header.jsx";
import CheckoutPopup from "../component/utils/checkout-popup.jsx";

function Cart() {
    return (
        <div>
            <Header/>
            <BottomNavigator/>
            <CheckoutPopup/>
            <div>Cart</div>
        </div>
    )
}

export default Cart
