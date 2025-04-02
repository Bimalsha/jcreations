import React from "react";

const CartNavigator = ({ currentStep }) => {
  const steps = [
    { id: 1, label: "Cart", icon: "/bottomicon/cart.svg" },
    { id: 2, label: "Checkout", icon: "/bottomicon/order.svg" },
    { id: 3, label: "Order", icon: "/bottomicon/order.svg" },
  ];

  return (
    <div className="flex flex-row items-center justify-center bg-gray-100 p-2 md:p-4 rounded-full max-w-[90%] md:max-w-2xl mx-auto mt-18 md:mt-4">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center relative mx-0.5 md:mx-2">
          <div className="flex flex-row items-center space-x-1 md:space-x-4">
            <div
              className={`flex items-center justify-center w-6 h-6 md:w-12 md:h-12 rounded-full text-white ${
                currentStep === step.id
                  ? "bg-yellow-500"
                  : currentStep > step.id
                  ? "bg-green-500"
                  : "bg-gray-300"
              }`}
            >
              <img
                src={step.icon}
                alt={step.label}
                className="w-4 h-4 md:w-8 md:h-8"
              />
            </div>
            <div className="text-xs md:text-sm text-gray-700 text-center">
              {step.label}
            </div>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-10 md:w-20 h-1 mx-1 md:mx-6 ${
                currentStep > step.id ? "border-green-500" : "border-gray-300"
              } border-t-2 border-dotted`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CartNavigator;