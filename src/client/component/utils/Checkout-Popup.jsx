import React from "react";
import { RxCross2 } from "react-icons/rx";

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-4 lg:px-6">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 sm:rounded-2xl sm:px-4 shadow-[5px_5px_15px_-3px_rgba(247,163,19,0.3)]">
          <div className="flex justify-between items-start mb-4">
            <div className="w-8"></div>
            <div className="flex items-center justify-center">
              <img src="/bulbletter.svg" alt="Bulb Letter Icon" />
            </div>
            <div>
              <RxCross2 className="cursor-pointer" size={24} />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <button
                className="w-full flex justify-center py-4 px-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[#000F20] hover:bg-[#F7A313] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Login for the Best Experience
              </button>
            </div>

            <div>
              <button
                className="w-full flex justify-center py-4 px-2 border border-yellow-500 rounded-xl shadow-sm text-sm font-medium text-yellow-500 bg-none hover:bg-yellow-500 hover:text-white focus:outline-yellow-500 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Checkout without login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
