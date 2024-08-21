import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);

    const params = useParams();

    useEffect(() => {
        if (params?.slug) {
            getProduct();
        }
    }, [params.slug]);

    const getProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/product/get-product/${params.slug}`);
            setProduct(response?.data?.product);
        } catch (e) {
            console.log(e);
        }
    };

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    return (
        <div className="p-6 bg-gray-100 h-screen">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
                <div className="flex">
                    <div className="w-1/3 pr-4">
                        <img
                            src={`http://localhost:8000/api/product/product-photo/${product._id}`}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-lg"
                        />
                    </div>
                    <div className="w-2/3">
                        <h1 className="text-2xl font-bold mb-4">{product?.name}</h1>
                        <p className="text-gray-700 mb-4">{product?.description}</p>
                        <div className="flex items-center mb-4">
                            <div className="text-lg font-semibold mr-4">Price: ${product?.price}</div>
                            <div className="text-lg font-semibold mr-4">Available Quantity: {product?.quantity}</div>
                            <div className="flex items-center">
                                <button
                                    onClick={decreaseQuantity}
                                    className="px-3 py-1 bg-gray-300 rounded-l hover:bg-gray-400 transition-colors"
                                >
                                    -
                                </button>
                                <span className="px-4 py-1 bg-white border-t border-b border-gray-300">{quantity}</span>
                                <button
                                    onClick={increaseQuantity}
                                    className="px-3 py-1 bg-gray-300 rounded-r hover:bg-gray-400 transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <button
                            className="w-32 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
            {/* Placeholder for similar products */}
            <div className="mt-8">
                {/* Similar products would be displayed here */}
            </div>
        </div>
    );
};

export default ProductDetails;
