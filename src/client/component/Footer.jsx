import React from 'react';

function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
            <div className="container max-w-7xl w-full mx-auto px-4 pb-20">
                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-6">
                    {/* Left Section */}
                    <div className="text-center md:text-left mb-4 md:mb-0">
                        <p>Copyrights &copy;{new Date().getFullYear()} JCreations.</p>
                    </div>

                    {/* Right Section */}
                    <div className="text-center md:text-right">
                        <p>
                            Developed By: <a href="https://www.1000dtechnology.com/" target="_blank" rel="noopener noreferrer">1000<span className="text-red-500 font-semibold">D </span>Technology</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
