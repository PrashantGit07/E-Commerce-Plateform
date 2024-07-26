import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

//1--we have to redirect unauthorized user after showing loader for some time

//2-- also we have to redirect the authorized user to that page afer login instead of home page , so we will use useLoaction() hook

import { useLocation } from 'react-router-dom'
const Loader = () => {

    const [count, setCount] = useState(5)

    const navigate = useNavigate()

    const location = useLocation()
    useEffect(() => {
        //now we will define interval logic and redirect again to login page

        const interval = setInterval(() => {
            setCount((prev) => --prev)
        }, 1000)
        count === 0 && navigate("/login", {
            //accessing current path
            state: location.pathname
        })

        //cleanup
        return () => { clearInterval(interval) }



        //also pass location in the dependencies
    }, [count, navigate, location])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-center mb-4">Redirecting you in {count} seconds</h1>
            <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"
                role="status"
            >
                <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >
                    Loading...
                </span>
            </div>
        </div>
    );
}

export default Loader