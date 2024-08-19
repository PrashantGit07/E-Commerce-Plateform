import React, { useCallback, useEffect, useState } from 'react';
import axios from "axios";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    // Function to fetch products
    const getAllProducts = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/product/get-product");
            if (response.status === 200) {
                console.log("Products fetched successfully");
                setProducts(response?.data?.products || []);
            } else {
                console.error("Failed to fetch products:", response.statusText);
            }
        } catch (e) {
            console.error("Error fetching products:", e);
        }
    }, []);

    // Function to fetch categories
    const getAllCategories = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/category/get-category");
            if (response.status === 200) {
                setCategories(response.data.data);
                console.log("Categories fetched successfully");
            }
        } catch (e) {
            console.error("Error fetching categories:", e);
        }
    };

    // Handler function for filtering products
    const handleCategoryChange = (e) => {
        const selectedId = e.target.value;
        setSelectedCategory(selectedId);
        const filtered = products.filter(product => product.category?._id === selectedId);
        setFilteredProducts(filtered);
    };

    useEffect(() => {
        getAllProducts();
        getAllCategories();
    }, [getAllProducts]);

    const productsToDisplay = selectedCategory ? filteredProducts : products;


    return (
        <div className="flex flex-col md:flex-row gap-8 p-6">
            {/* Categories */}
            <div className="w-full md:w-1/4">
                <h2 className="text-lg font-semibold mb-4">Categories</h2>
                <select
                    className="w-full p-2 border rounded"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                >
                    <option value="">All Categories</option>
                    {categories.map((c) => (
                        <option key={c._id} value={c._id}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Products */}
            <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {productsToDisplay.length > 0 ? (
                    productsToDisplay.map((p) => (
                        <div key={p._id} className="border p-4 rounded shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
                            <img
                                src={`http://localhost:8000/api/product/product-photo/${p._id}`}
                                alt={p.name}
                                className="w-full h-40 object-cover mb-4"
                            />
                            <p className="text-gray-700 mb-2">{p.description}</p>
                            <p className="text-gray-900 font-bold mb-2">Price: ${p.price}</p>
                            <p className="text-gray-700 mb-2">Quantity: {p.quantity}</p>
                            <p className="text-gray-700 mb-2">Shipping: {p.shipping ? 'Yes' : 'No'}</p>
                            <p className="text-gray-700 mb-2">Category: {p.category?.name}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-3xl text-center font-bold font-mono"> This category is under construction. Please be patient while we add more goodies!</p>
                )}
            </div>
        </div>
    );
}

export default Home;
