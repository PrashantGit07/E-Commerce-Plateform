import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import ProductLoader from '../../utils/ProductLoader';

import { NavLink, useNavigate } from 'react-router-dom';
const Products = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading status

    const getAllProducts = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/product/get-product");
            if (response.status === 200) {
                console.log("Products fetched successfully");
                console.log(response?.data); // Log response data to verify structure
                setProducts(response?.data?.products || []); // Ensure data is an array
            } else {
                console.error("Failed to fetch products:", response.statusText);
            }
        } catch (e) {
            console.error("Error fetching products:", e);
        } finally {
            setLoading(false); // Stop loading once the request is complete
        }
    }, []);

    useEffect(() => {
        getAllProducts();
    }, [getAllProducts]);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Products</h1>
            {loading ? (
                <ProductLoader /> // Show loader while loading is true
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products?.map((p) => (
                        <div key={p._id} className="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
                            <img
                                src={`http://localhost:8000/api/product/product-photo/${p._id}`}
                                alt={p.name}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h2 className="text-xl font-semibold mb-2">{p.name}</h2>
                            <p className="text-gray-700 mb-2">{p.description}</p>
                            <p className="text-lg font-bold mb-2">${p.price}</p>
                            <p className="text-gray-600 mb-4">Category: {p.category?.name || 'N/A'}</p>

                            <div className="flex items-center space-x-4">
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 focus:outline-none"
                                    onClick={() => {
                                        // Handle quantity decrease here
                                    }}
                                >
                                    -
                                </button>
                                <span className="text-xl font-semibold">{p.quantity || 0}</span>
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 focus:outline-none"
                                    onClick={() => {
                                        // Handle quantity increase here
                                    }}
                                >
                                    +
                                </button>
                            </div>
                            <NavLink to="/dashboard/admin/update-product">
                                <button className="mt-4 px-6 py-2 font-semibold text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 
                                 hover:from-purple-500 hover:to-red-500 transform hover:scale-105 transition duration-500 ease-in-out">
                                    Update Product
                                </button>

                            </NavLink>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
};

export default Products;
