import React, { useState, useEffect } from 'react'
import Newitem from "./utils/Newitem.jsx";
import api from '../../utils/axios.js';

function Newarrivals() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                // Fetch 10 products from the API
                const response = await api.get('/products/8');
                console.log('New arrivals data:', response.data);
                setProducts(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching new arrivals:', err);
                setError('Failed to load new products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section className="pt-10 flex justify-center">
            <div className="max-w-7xl w-full lg:flex justify-between px-2">
                <div className="flex flex-col w-full">
                    <span className="px-2 text-2xl">
                        New Arrivals
                    </span>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F7A313]"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center py-10 text-red-500">{error}</div>
                    ) : (
                        <div className="flex overflow-x-auto gap-4 mt-4 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent lg:grid lg:grid-cols-4 lg:overflow-x-visible lg:gap-6">
                            {products.map((product) => (
                                <div key={product.id} className="flex-shrink-0 w-[280px] lg:w-full">
                                    <Newitem product={product} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Newarrivals