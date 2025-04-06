import React from 'react'
import '../../../index.css';
import {motion} from 'framer-motion';
import {Link} from "react-router-dom";
import {FaArrowRightLong} from "react-icons/fa6";


function Orderitem() {
    return (
        <motion.div
            className="bg-white shadow-lg rounded-3xl cursor-pointer hover:shadow-xl transition-shadow"
            whileHover={{
                scale: 1.03,
                transition: {duration: 0.3}
            }}
        >
            <div className="relative  px-8 pt-4 pb-4 flex justify-between">
                <motion.div className="flex">
                    <motion.img
                        src="../../../../public/pngtree-chocolate-cake-png-image_17407867.png"
                        alt="Product"
                        className="h-[100px] w-[100px] object-cover"
                        whileHover={{scale: 1.05}}
                        transition={{duration: 0.2}}
                    />
                    <motion.dev className={"px-8"}>
                        <div className={"font-bold"}>Order#: <span>123456</span></div>
                        <div className={""}>Date: <span>March 28,2025</span></div>
                        <br/>
                        <div className={""}>Status: <span>Delivered</span></div>
                    </motion.dev>
                </motion.div>
                <motion.dev className={"justify-items-end"}>
                    <div className={"font-bold text-2xl"}>Rs.<span>7400</span>.00</div>
                    <Link to={'/'}
                          className={'flex items-center gap-2 bg-[#F7A313] text-white rounded-3xl justify-center px-6 py-3 mt-4 w-46'}>
                        View Details
                        <motion.div
                            animate={{
                                x: [0, 5, 0]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <FaArrowRightLong/>
                        </motion.div>
                    </Link>
                </motion.dev>
            </div>
        </motion.div>
    )
}

export default Orderitem