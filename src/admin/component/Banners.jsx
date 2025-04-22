import React, { useState } from 'react';
import { FaMoneyBillWave, FaTags, FaTrash } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { FiUpload } from 'react-icons/fi';

const Banners = () => {
  const [ setNewBanner] = useState(null);
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setNewBanner(URL.createObjectURL(file));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewBanner(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div>
      <div className="bg-[#F2EFE7] w-full pb-6 px-6 pt-6">
        <div className="flex items-center justify-between px-6 pt-6 mb-6">
          <h2 className="text-2xl font-semibold text-[#333333] mt-[-10px] ml-[-20px]">Banners</h2>
          <span className="text-sm text-gray-500 mt-[-10px] absolute right-8">
            March 28, 2025 | 08:30:02 | Good Morning!
          </span>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 px-6 text-lg font-light text-[#333333]">Current Banner</h3>
        
        {/* Current Banner Display */}
        <div className="px-6 mb-6">
          <div className="relative rounded-lg overflow-hidden w-full max-w-md">
            <div className="relative">
              <img 
                src="/hero/home back.webp" 
                alt="Current Banner" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
        
        {/* Upload New Banner Section */}
        <div className="px-6 mb-6">
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center w-full max-w-md h-36"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="banner-upload"
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
            <label htmlFor="banner-upload" className="cursor-pointer">
              <div className="flex flex-col items-center">
                <FiUpload size={42} className="text-gray-400 mb-2" />
                <p className="text-sm text-gray-700 font-medium">Drag and drop your new banner</p>
                <p className="text-xs text-gray-500 mt-1">Recommended size: 1200x400px</p>
              </div>
            </label>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="px-6 mt-4 flex">
          <button className="border border-gray-300 rounded-lg px-6 py-2 mr-3 font-medium">
            Cancel
          </button>
          <button className="bg-black text-white rounded-lg px-8 py-2 font-medium">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banners;