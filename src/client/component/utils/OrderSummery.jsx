import React from "react";

const OrderSummary = ({ subtotal, shipping, total, onCheckout, isCheckout = false, isEmpty = false }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6 w-full mx-auto ">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Subtotal</span>
                <span className="text-sm font-medium text-gray-800">LKR {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Shipping</span>
                <span className="text-sm font-medium text-gray-800">LKR {shipping.toFixed(2)}</span>
            </div>
            <hr className="my-4 text-gray-300" />
            <div className="flex justify-between items-center mb-4">
                <span className="text-base font-semibold text-gray-800">Total</span>
                <span className="text-base font-bold text-amber-500">LKR {total.toFixed(2)}</span>
            </div>
            <button
                onClick={onCheckout}
                disabled={isEmpty}
                className={`w-full text-sm font-medium py-2 px-4 rounded-4xl transition ${
                    isEmpty
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-amber-500 text-black hover:bg-amber-600"
                }`}
            >
                {isCheckout ? "Confirm Order" : "Proceed to checkout"}
            </button>

            {isEmpty && (
                <p className="text-red-500 text-xs mt-2 text-center">
                    Your cart is empty. Add items to proceed.
                </p>
            )}
        </div>
    );
};

export default OrderSummary;