import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import axios from 'axios'

const CartContext = createContext()

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [auth] = useAuth()

    const [Error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const userId = auth?.user?._id
    console.log(auth?.user?._id)
    const url = `http://localhost:8000/api/cart/cartItems/${userId}`
    const GetCartItems = async () => {
        try {
            const response = await axios.get(url)
            if (response.data && Array.isArray(response.data.items)) {
                setCart(response.data.items);
            } else {
                throw new Error("Invalid data format: Items should be an array");
            }
        }
        catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        GetCartItems()
    }, [auth?.user?._id])

    return (
        <CartContext.Provider value={[cart, loading, Error, GetCartItems]}>
            {children}
        </CartContext.Provider>
    )
}


const useCart = () => useContext(CartContext)
export { useCart, CartProvider }