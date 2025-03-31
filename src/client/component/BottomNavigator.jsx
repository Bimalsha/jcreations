import React from 'react'
import { Link, useLocation } from "react-router-dom";

function BottomNavigator() {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div className="fixed bottom-0 left-0 z-50 w-full h-20">
            <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium bg-[#000F20] rounded-t-3xl">
                <Link to={'/'} type="button"
                      className="inline-flex flex-col items-center justify-center px-5 group">
                    <img
                        src={currentPath === '/' ? "../../../public/bottomicon/homeselect.svg" : "../../../public/bottomicon/home.svg"}
                        alt="home"
                        className={'w-8'}
                        onMouseOver={e => e.currentTarget.src = '../../../public/bottomicon/homeselect.svg'}
                        onMouseOut={e => currentPath === '/' ? e.currentTarget.src = '../../../public/bottomicon/homeselect.svg' : e.currentTarget.src = '../../../public/bottomicon/home.svg'}
                    />
                    <span
                        className={`text-sm ${currentPath === '/' ? 'text-[#F7A313]' : 'text-white'} group-hover:text-[#F7A313]`}>Home</span>
                </Link>
                <Link to={'/cart'} type="button"
                      className="inline-flex flex-col items-center justify-center px-5 group">
                    <img
                        src={currentPath === '/cart' ? "../../../public/bottomicon/cartselect.svg" : "../../../public/bottomicon/cart.svg"}
                        alt="cart"
                        className={'w-8'}
                        onMouseOver={e => e.currentTarget.src = '../../../public/bottomicon/cartselect.svg'}
                        onMouseOut={e => currentPath === '/cart' ? e.currentTarget.src = '../../../public/bottomicon/cartselect.svg' : e.currentTarget.src = '../../../public/bottomicon/cart.svg'}
                    />
                    <span
                        className={`text-sm ${currentPath === '/cart' ? 'text-[#F7A313]' : 'text-white'} group-hover:text-[#F7A313]`}>Cart</span>
                </Link>
                <Link to={'/order'} type="button"
                      className="inline-flex flex-col items-center justify-center px-5 group">
                    <img
                        src={currentPath === '/order' ? "../../../public/bottomicon/orderselect.svg" : "../../../public/bottomicon/order.svg"}
                        alt="order"
                        className={'w-8'}
                        onMouseOver={e => e.currentTarget.src = '../../../public/bottomicon/orderselect.svg'}
                        onMouseOut={e => currentPath === '/order' ? e.currentTarget.src = '../../../public/bottomicon/orderselect.svg' : e.currentTarget.src = '../../../public/bottomicon/order.svg'}
                    />
                    <span
                        className={`text-sm ${currentPath === '/order' ? 'text-[#F7A313]' : 'text-white'} group-hover:text-[#F7A313]`}>Order</span>
                </Link>
                <Link to={'/account'} type="button"
                      className="inline-flex flex-col items-center justify-center px-5 group">
                    <img
                        src={currentPath === '/account' ? "../../../public/bottomicon/userselect.svg" : "../../../public/bottomicon/user.svg"}
                        alt="account"
                        className={'w-8'}
                        onMouseOver={e => e.currentTarget.src = '../../../public/bottomicon/userselect.svg'}
                        onMouseOut={e => currentPath === '/account' ? e.currentTarget.src = '../../../public/bottomicon/userselect.svg' : e.currentTarget.src = '../../../public/bottomicon/user.svg'}
                    />
                    <span
                        className={`text-sm ${currentPath === '/account' ? 'text-[#F7A313]' : 'text-white'} group-hover:text-[#F7A313]`}>Account</span>
                </Link>
            </div>
        </div>
    )
}

export default BottomNavigator