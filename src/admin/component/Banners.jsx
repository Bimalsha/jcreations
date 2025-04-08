import React from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
import { IoDownloadOutline } from 'react-icons/io5'

function Banners() {
    return (
        <>
            <div className={'flex flex-col'}>
                <div className={'bg-[#F2EFE7] w-full h-[100px]'}>
                    <div className={'flex justify-between items-center px-8 pt-8'}>
                        <span className={'text-2xl font-medium'}>Banners</span>
                        <span className={'text-sm'}>March 28, 2025 | 08:30:02 | Good Morning! </span>
                    </div>
                </div>
                <div className={'px-8 pt-8'}>
                    <span className={'text-sm'}>Current Banner</span>
                </div>

                <div className={'pl-8 pt-3'}>
                    <img src="../../../public/dashboard/cake_bg.jpg" className='rounded-2xl w-[400px] h-[220px]' alt="" />
                    <div className='absolute  pl-2 mt-[-100px] text-white'>
                        <span className=' text-2xl font-semibold'>Be The</span>
                        <span className=' text-2xl font-semibold text-[#F7A313]'> First</span><br />
                        <span className=' text-2xl font-semibold text-white'>Delivery & </span><br />
                        <span className=' text-2xl font-semibold text-white'>Easy Pick Up </span>
                    </div>

                    <div className='absolute pl-2 mt-[-55px] ml-[223px]'>
                        <div className={'flex items-center gap-2 bg-[#F7A313] text-white rounded-tl-2xl rounded-br-2xl justify-center px-3 py-1 mt-4 w-40'}>
                            Order Now
                            <div>
                                <FaArrowRightLong />
                            </div>
                        </div>
                    </div>

                    <div className='absolute pl-2 mt-[-215px] ml-[280px]'>
                        <div className={'flex items-center gap-2 bg-white rounded-2xl w-[90px] h-[70px]  px-3 py-1 mt-4'}>
                            <div className='flex flex-col'>
                                <div>
                                    <img src="../../../public/dashboard/image.png" className='w-[30px] absolute ml-[54px] mt-[-22px]' alt="" />
                                    <span className='absolute ml-[63px] mt-[-20px] text-white'>%</span>
                                </div>
                                <span className='text-[#F7A313] text-xl'>10%</span>
                                <span className='text-[8px] font-semibold'>Discount</span>
                                <span className='text-[8px] font-semibold'>for 2 Orders</span>
                            </div>
                        </div>
                    </div>

                </div>

                <div className={'pt-10 pl-8'}>
                    <div className='rounded-2xl w-[400px] h-[220px] border border-[#9F9A9ABF] items-center flex-col flex justify-center'>
                        <span><svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_380_1583)">
                                <path d="M10.8333 45.5C9.64167 45.5 8.62153 45.0757 7.77292 44.2271C6.92431 43.3785 6.5 42.3583 6.5 41.1667V19.5C6.5 18.3083 6.92431 17.2882 7.77292 16.4396C8.62153 15.591 9.64167 15.1667 10.8333 15.1667H19.5V19.5H10.8333V41.1667H41.1667V19.5H32.5V15.1667H41.1667C42.3583 15.1667 43.3785 15.591 44.2271 16.4396C45.0757 17.2882 45.5 18.3083 45.5 19.5V41.1667C45.5 42.3583 45.0757 43.3785 44.2271 44.2271C43.3785 45.0757 42.3583 45.5 41.1667 45.5H10.8333ZM26 34.6667L17.3333 26L20.3667 22.9667L23.8333 26.3792V0H28.1667V26.3792L31.6333 22.9667L34.6667 26L26 34.6667Z" fill="#9F9A9A" fill-opacity="0.75" />
                            </g>
                            <defs>
                                <clipPath id="clip0_380_1583">
                                    <rect width="52" height="52" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        </span>
                        <span className='text-lg'>Drag and drop your new banner</span>
                        <span className='text-sm'>Recommended size: 1200x400px</span>
                    </div>
                    <div className='flex gap-2 mt-3 justify-end w-[400px]'>
                        <button className='px-5 py-1 border rounded-2xl font-semibold'>Cancel</button>
                        <button className='px-8 py-1 bg-black border text-white font-semibold rounded-2xl'>Save</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banners
