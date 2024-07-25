import React from 'react';
import { useNavigate } from 'react-router-dom';

export const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
            <div className='text-center'>
                <h1 className='text-6xl font-extrabold text-dark-red mb-4'>
                    404
                </h1>
                <p className='text-2xl font-bold text-dark-red mb-6'>
                    Oops! Page not found
                </p>
                <button
                    onClick={() => navigate(-1)}
                    className='px-4 py-2 bg-dark-red text-black font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300'
                >
                    Go Back
                </button>
            </div>
        </div>
    );
}
