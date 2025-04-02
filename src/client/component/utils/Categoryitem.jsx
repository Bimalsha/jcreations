import React from 'react';

const categories = [
    { icon: '/category/cake.svg', label: 'Cake' },
    { icon: '/category/chocolate.svg', label: 'Chocolate' },
    { icon: '/category/candle.svg', label: 'Candles' },
    { icon: '/category/basket.svg', label: 'Groceries' },
    { icon: '/category/sale.svg', label: 'Gift Items' },
    { icon: '/category/menu.svg', label: 'Restaurant Menu' },
];

function Categoryitem() {
    return (
        <div className="mt-12 flex gap-10 justify-center w-7xl mb-5">
            {categories.map((category, index) => (
                <div
                    key={index}
                    className="rounded-full flex flex-col items-center w-36 h-36 shadow-xl shadow-gray-400 bg-[#FFF7E6] p-6 transition-transform transform hover:scale-110"
                >
                    <img
                        src={category.icon}
                        alt={category.label}
                        className="w-16 h-16"
                    />
                    <span className="mt-2 text-sm font-medium text-gray-700 text-center">
                        {category.label}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default Categoryitem;
