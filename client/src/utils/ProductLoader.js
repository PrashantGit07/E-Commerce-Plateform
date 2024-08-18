import React from 'react'


//1--we have to redirect unauthorized user after showing loader for some time

//2-- also we have to redirect the authorized user to that page afer login instead of home page , so we will use useLoaction() hook


const ProductLoader = () => {





    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <p className=' text-2xl font-bold font-mono'>  Hold tight, our products are just finishing their beauty sleep!</p>
            <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"
                role="status"
            >

                <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >

                </span>
            </div>
        </div>
    );
}

export default ProductLoader