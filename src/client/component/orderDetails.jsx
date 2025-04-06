import '../../index.css';
import {motion} from 'framer-motion';
import {Link} from "react-router-dom";
import {FaArrowRightLong} from "react-icons/fa6";
import Orders from "./Orders.jsx";
import React from "react";
import ItemOrdered from "./utils/itemOrdered.jsx";

function OrderDetails() {
    return (
        <section className="pt-16 lg:pt-12 flex justify-center">
            <div className={' max-w-7xl px-2 w-full'}>
                <div>
                    <span className={'text-2xl font-semibold'}>Order details #123456</span>
                    <h6>Date: March 28, 2025</h6>
                </div>
                <br/>

                <div>
                    <span className={'text-xl font-semibold'}>Delivery Information</span>
                    <h6>Name: Sahan Kavinda</h6>
                    <h6>Contact: 0777 1232121</h6>
                    <h6>Address: No57, Colombo</h6>
                    <h6>Date & Time for Delivery: March 30, 2025 </h6>
                </div>
                <br/>
                <div>
                    <span className={'text-xl font-semibold'}>Payment Method</span>
                    <h6>Cash On Delivery</h6>
                </div>
                <br/>
                <div>
                    <span className={'text-xl font-semibold'}>Item Ordered</span>
                    <ItemOrdered/>
                </div>
                <br/>
                <div className={'justify-items-end'}>
                    <div className={"w-1/4"}>
                        <div className={"flex justify-between"}>
                            <span className={''}>Total Amount</span>
                            <span className={''}>LKR.7000.00</span>
                        </div>
                        <div className={"flex justify-between"}>
                            <span className={''}>Total Amount</span>
                            <span className={''}>LKR.400.00</span>
                        </div>
                        <hr className={'my-2'}/>
                        <div className={"flex justify-between"}>
                            <span className={''}>Total </span>
                            <span className={''}>LKR.7400.00</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default OrderDetails