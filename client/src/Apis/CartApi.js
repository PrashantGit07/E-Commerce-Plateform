import axios from "axios";

const URL = "http://localhost:8000/api/cart"

export const AddToCart = async (userId, productId, quantity, categoryId) => {
    try {
        const response = await axios.post(`${URL}/add-to-cart`, { userId, productId, quantity, categoryId })
        // console.log(response?.data?.items)
        return response?.data?.items

    }
    catch (e) {
        console.log(e)
    }
}



export const GetCartItems = async (userId) => {
    try {
        const response = await axios.get(`${URL}/cartItems/${userId}`);
        console.log(response?.data?.items)
        return response?.data?.items
    }
    catch (e) {
        console.log(e)
    }
}



export const removeFromCart = async (userId, productId) => {
    try {
        const response = axios.delete(`${URL}/remove-from-cart`, {
            data: { userId, productId },
        })
        console.log(response?.data?.items)
        return response?.data?.items

    }
    catch (e) {
        console.log(e)
    }
}