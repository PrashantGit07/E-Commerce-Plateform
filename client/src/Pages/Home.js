import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Price } from '../Components/Price';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import { debounce } from "lodash"
const Home = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState("")
    const productsPerPage = 6;

    // Fetch products
    const getAllProducts = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/product/get-product");
            if (response.status === 200) {
                console.log("Products fetched successfully");
                const allProducts = response?.data?.products || [];
                setProducts(allProducts);
                setFilteredProducts(allProducts); // Initially show all products
            } else {
                console.error("Failed to fetch products:", response.statusText);
            }
        } catch (e) {
            console.error("Error fetching products:", e);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch categories
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

    // Handle category change
    const handleCategoryChange = (e) => {
        const selectedId = e.target.value;
        setSelectedCategory(selectedId);
    };

    // Handle price change
    const handlePriceChange = (e) => {
        const selectedRange = Price.find(p => p._id.toString() === e.target.value);
        setSelectedPrice(selectedRange);
    };

    const debouncedFilterProducts = useCallback(
        debounce(() => {
            let filtered = products;

            if (selectedCategory) {
                filtered = filtered.filter(p => p.category?._id === selectedCategory);
            }

            if (selectedPrice) {
                filtered = filtered.filter(p =>
                    p.price >= selectedPrice.array[0] && p.price <= selectedPrice.array[1]
                );
            }

            if (searchQuery) {
                filtered = filtered.filter(p =>
                    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.description.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }

            setFilteredProducts(filtered);
        }, 700), // Adjust the debounce delay as needed
        [products, selectedCategory, selectedPrice, searchQuery] // Dependencies
    );

    useEffect(() => {
        debouncedFilterProducts();
    }, [searchQuery, selectedCategory, selectedPrice, products, debouncedFilterProducts]);


    const resetFilters = () => {
        setFilteredProducts(products);
        setSelectedCategory("");
        setSelectedPrice(null);
        setSearchQuery("")
    };

    useEffect(() => {
        getAllProducts();
        getAllCategories();
    }, [getAllProducts]);

    if (loading) {
        return <p className="text-gray-500 text-3xl text-center font-bold font-mono">Loading...</p>;
    }

    // Pagination logic
    const indexOfLastProduct = (currentPage + 1) * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 p-6 mt-16">
            {/* Categories */}
            <div className="w-full md:w-1/5 flex flex-col flex-wrap">

                <p className="text-xl font-semibold mb-4">Search Products</p>
                <input
                    type='text'
                    value={searchQuery}
                    placeholder='Search for products...'
                    className='h-8 w-full border-gray-500 border-2 rounded-lg p-2 mb-2'
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <h2 className="text-xl font-semibold mb-4">Filter by Categories</h2>
                {categories && categories.map((c) => (
                    <div key={c._id} className='mb-2'>
                        <input
                            type='checkbox'
                            value={c._id}
                            checked={selectedCategory === c._id}
                            onChange={handleCategoryChange}
                            className='mr-2'
                        />
                        <label className='font-serif text-gray-600'>{c.name}</label>
                    </div>
                ))}

                <div>
                    <button
                        onClick={resetFilters}
                        className='mt-6 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 focus:outline-none'
                    >Reset</button>
                </div>

                <div className='mt-5'>
                    <p className='text-xl font-semibold mb-2'>Filter by Price</p>
                    {Price && Price.map((p) => (
                        <div key={p._id}>
                            <input
                                type='radio'
                                name="price"
                                value={p._id}
                                checked={selectedPrice?._id === p._id}
                                onChange={handlePriceChange}
                                className='mr-2 mt-3'
                            />
                            <label className='font-serif text-gray-600'>{p.name}</label>
                        </div>
                    ))}
                </div>
            </div>


            {/* Products */}
            <div className="w-full md:w-3/4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentProducts.length > 0 ? (
                        currentProducts.map((p) => (
                            <div key={p._id} className="border p-4 rounded shadow-lg flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
                                    <img
                                        src={`http://localhost:8000/api/product/product-photo/${p._id}`}
                                        alt={p.name}
                                        className="w-full h-40 object-cover mb-4"
                                    />
                                    <p className="text-gray-700 mb-2">{p.description.substring(0, 29)}...</p>
                                    <p className="text-gray-900 font-bold mb-2">Price: ${p.price}</p>
                                    <p className="text-gray-700 mb-2">Quantity: {p.quantity}</p>
                                    <p className="text-gray-700 mb-2">Shipping: {p.shipping ? 'Yes' : 'No'}</p>
                                    <p className="text-gray-700 mb-2">Category: {p.category?.name}</p>
                                </div>
                                <div className="flex space-x-4 mt-4">


                                    <Link
                                        className="bg-white text-blue-500 border border-blue-500 flex-grow px-6 py-3 rounded-md hover:bg-blue-100 focus:outline-none shadow-md transform transition-transform hover:scale-105"
                                        to={`/productDetails/${p.slug}`}

                                    >
                                        Details
                                    </Link>

                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-3xl text-center font-bold font-mono">
                            {/* Oops! Looks like we've run out of products in this category and price range.
                            But don't worry, our elves are working hard to restock. Check back soon! */}
                        </p>
                    )}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-6">
                    <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                        pageCount={totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageChange}
                        containerClassName={'pagination'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        previousClassName={'page-item'}
                        previousLinkClassName={'page-link'}
                        nextClassName={'page-item'}
                        nextLinkClassName={'page-link'}
                        breakClassName={'page-item'}
                        breakLinkClassName={'page-link'}
                        activeClassName={'active'}
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;