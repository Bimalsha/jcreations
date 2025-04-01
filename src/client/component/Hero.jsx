import React from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

function Hero() {
    // Define animation variants
    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <>
            <section className="pt-32 flex justify-center">
                <motion.div
                    className={'max-w-7xl w-full lg:flex md:flex justify-between hidden px-2'}
                    initial="hidden"
                    animate="visible"
                    variants={container}
                >
                    <div className={'flex flex-col w-1/2'}>
                        <motion.div variants={item}>
                            <div className={'bg-[#FEF4E3] rounded-full flex items-center w-96'}>
                                <motion.div
                                    className={'bg-[#F7A313] rounded-bl-3xl rounded-tl-3xl p-2 rounded-br-[50px]'}
                                    animate={{
                                        scale: [1, 1.05, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    🍰🎂🍫🍬🍭🕯️🎉
                                </motion.div>
                                <span className={'px-2'}>
                                    Eat delicious foods
                                </span>
                            </div>
                        </motion.div>

                        <motion.span
                            className={'lg:text-7xl font-bold leading-tight text-[#000F20] mt-6 md:text-5xl'}
                            variants={item}
                        >
                            Be The <motion.span
                            className={'text-[#F7A313]'}
                            animate={{
                                color: ["#F7A313", "#e69200", "#F7A313"]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >First</motion.span><br/> Delivery &<br/> Easy Pick Up
                        </motion.span>

                        <motion.p
                            className={'mt-4'}
                            variants={item}
                        >
                            We will deliver your food within 45 minutes in your town,If
                            we would fail,we will give the food free.
                        </motion.p>

                        <motion.div variants={item}>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link to={'/'}
                                      className={'flex items-center gap-2 bg-[#F7A313] text-white rounded-bl-3xl rounded-tr-3xl justify-center px-6 py-3 mt-4 w-56'}>
                                    Order Now
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
                            </motion.div>
                        </motion.div>
                    </div>

                    <motion.div
                        className={'w-1/2'}
                        variants={item}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.img
                            src="../../../public/hero/herolg.webp"
                            alt="hero"
                            className={'w-full'}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7 }}
                        />
                    </motion.div>
                </motion.div>
            </section>
        </>
    )
}

export default Hero