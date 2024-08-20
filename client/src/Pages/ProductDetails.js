import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast"
const ProductDetails = () => {
    const location = useLocation();
    const { product } = location.state || {};
    const [quantity, setQuantity] = useState(1);

    // const qty = product.quantity;
    const handleIncrease = () => {
        if (quantity < product.quantity) {
            setQuantity(prevQuantity => prevQuantity + 1);
        }
        else {
            toast.error('Cannot select more than available quantity.');
        }


    };
    const handleDecrease = () => setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden'>
            <div className='bg-white border border-black p-6 rounded-lg shadow-lg max-w-md w-full'>
                <h1 className='text-2xl font-bold mb-4'>{product.name}</h1>
                <img
                    src={`http://localhost:8000/api/product/product-photo/${product._id}`}
                    alt={product.name}
                    className='h-64 w-full object-cover mb-4 rounded'
                />
                <p className='text-lg text-gray-700 mb-4'>{product.description}</p>
                <p className='text-xl font-semibold mb-4'>Price: ${product.price}</p>

                <div className='flex items-center mb-4'>
                    <button
                        className='bg-gray-200 text-gray-700 border border-gray-300 p-2 rounded-l hover:bg-gray-300'
                        onClick={handleDecrease}
                    >
                        -
                    </button>
                    <input
                        type='text'
                        value={quantity}
                        readOnly
                        className='text-center border-t border-b border-gray-300 w-16'
                    />
                    <button
                        className='bg-gray-200 text-gray-700 border border-gray-300 p-2 rounded-r hover:bg-gray-300'
                        onClick={handleIncrease}
                    >
                        +
                    </button>
                </div>

                <button
                    className='bg-black text-white border border-black p-3 rounded-full w-full hover:bg-gray-800 transition-transform transform hover:scale-105'
                >
                    Add to Cart
                </button>
            </div>
            <Toaster />
        </div>
    );
}

export default ProductDetails;
