import React from 'react'
import BottomNavigator from "../component/BottomNavigator.jsx";
import Header from "../component/Header.jsx";
import { IoIosArrowForward } from 'react-icons/io';


function Account() {
    return (
        <>
            <section className="pt-10 flex justify-center">
                <div className={'max-w-7xl w-full mt-10 lg:mt-0 justify-between px-5 lg:px-2'}>
                    <span className='font-semibold text-2xl'>Personal info</span>

                    <div className='mt-5 flex flex-col '>
                        <div>
                            <span className='text-l'>Name</span>
                            <div className='flex lg:w-2/4 justify-between items-center mt-2  rounded-lg p-4 border-b-2 border-b-gray-300'>
                                <span className='text-[#9F9A9AD6]'>shanila dilnayan</span>
                                <span><IoIosArrowForward /></span>
                            </div>
                        </div>
                        <div className='mt-5'>
                            <span className='text-l'>Phon Number</span>
                            <div className='flex lg:w-2/4 justify-between items-center mt-2  rounded-lg p-4 border-b-2 border-b-gray-300'>
                                <span className='text-[#9F9A9AD6]'>Add your phon number</span>
                                <span><IoIosArrowForward /></span>
                            </div>
                        </div>
                        <div className='mt-5'>
                            <span className='text-l'>Email</span>
                            <div className='flex lg:w-2/4 justify-between items-center mt-2  rounded-lg p-4 border-b-2 border-b-gray-300'>
                                <span className='text-[#9F9A9AD6]'>example@gmail.com</span>
                                <span><IoIosArrowForward /></span>
                            </div>
                        </div>
                    </div>

                    <div className='mt-10'>
                        <span className='font-semibold text-2xl'>Security</span>
                        <div className='mt-5 flex flex-col '>

                            <div className='flex lg:w-2/4 justify-between items-center  rounded-lg p-4 border-b-2 border-b-gray-300'>
                                <span>Password</span>
                                <span><IoIosArrowForward /></span>
                            </div>

                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Account
