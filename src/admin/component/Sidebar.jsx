// Sidebar.jsx
import React from 'react';
import {LuLayoutDashboard} from "react-icons/lu";
import {FaOpencart} from "react-icons/fa";
import {CiImageOn} from "react-icons/ci";
import {IoSettingsOutline} from "react-icons/io5";
import {AiOutlineProduct} from "react-icons/ai";
import {IoIosLogOut} from "react-icons/io";


export default function Sidebar() {
    return (
        <div className="w-64 h-screen bg-white border-r flex flex-col justify-between">
            {/* Logo and Menu */}
            <div>
                <div className="flex items-center px-6 py-6">
                    <img src="/logo.png" alt="Logo" className="h-10 mr-3" />
                    <span className="font-bold text-lg">JCreations</span>
                </div>
                <nav className="mt-4 flex flex-col space-y-2 px-4">
                    <SidebarItem active icon={<LuLayoutDashboard className="w-5 h-5" />} label="Dashboard" />
                    <SidebarItem icon={<AiOutlineProduct className="w-5 h-5" />} label="Products" />
                    <SidebarItem icon={<FaOpencart className="w-5 h-5" />} label="Orders" />
                    <SidebarItem icon={<CiImageOn className="w-5 h-5" />} label="Banners" />
                    <SidebarItem icon={<IoSettingsOutline className="w-5 h-5" />} label="Settings" />
                </nav>
            </div>

            {/* Logout */}
            <div className="px-4 py-6">
                <button className="flex items-center text-red-500 hover:text-red-600 cursor-pointer">
                    <IoIosLogOut  className="w-5 h-5 mr-2 " />
                    Logout
                </button>
            </div>
        </div>
    );
}

function SidebarItem({ icon, label, active }) {
    return (
        <button
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium cursor-pointer ${
                active
                    ? 'bg-gray-100 text-black'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-black'
            }`}
        >
            {icon}
            <span className="ml-3">{label}</span>
        </button>
    );
}