import React from 'react'
import BottomNavigator from "../component/BottomNavigator.jsx";
import Header from "../component/Header.jsx";
import CartNavigator from '../component/utils/CartNavigator.jsx';
function Cart() {
    return (
        <div>
            <main>
                <CartNavigator />
            </main>
        </div>
    )
}

export default Cart
