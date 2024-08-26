import React, { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import axios from 'axios';
import { Button } from 'antd';
import { toast } from 'react-hot-toast'; // Import toast if using react-toastify
import { Toaster } from 'react-hot-toast';

const CartDetails = () => {
    const URL1 = "http://localhost:8000/api/cart/cartItems";
    const URL2 = "http://localhost:8000/api/cart/remove-from-cart";
    const [auth] = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const GetCartItems = async () => {
        try {
            const userId = auth?.user?._id;
            if (!userId) {
                throw new Error("User not logged in");
            }
            const response = await axios.get(`${URL1}/${userId}`);

            // Check if response data is valid
            if (response.data && Array.isArray(response.data.items)) {
                setCartItems(response.data.items);
            } else {
                throw new Error("Invalid data format: Items should be an array");
            }
        } catch (e) {
            setError(e.message || "Failed to fetch cart items");
            console.error("Error fetching cart items:", e);
        } finally {
            setLoading(false);
        }
    };

    const deleteCartItem = async (productId) => {
        try {
            const userId = auth?.user?._id;
            if (!userId) {
                throw new Error("User not logged in");
            }
            await axios.delete(`${URL2}`, { data: { userId, productId } });
            setCartItems(cartItems.filter(item => item.productId._id !== productId));
            toast.success("Item deleted from cart");
        } catch (e) {
            console.log(e);
            toast.error("Failed to delete item");
        }
    };

    useEffect(() => {
        GetCartItems();
    }, [auth?.user?._id]);

    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => total + (item.productId.price * item.quantity), 0);

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col">
            <Toaster />
            <h1 className="text-3xl font-bold mb-6">Cart Details</h1>
            {cartItems.length === 0 ? (
                <p className="text-center text-gray-700">Your cart is empty.</p>
            ) : (
                <div className="flex-grow">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        {cartItems.map(item => (
                            <div key={item._id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col">
                                <img
                                    src={`http://localhost:8000/api/product/product-photo/${item.productId._id}`}
                                    alt={item.productId.name}
                                    className="w-full h-32 object-cover mb-4 rounded-lg"
                                />
                                <h2 className="text-xl font-semibold mb-2">{item.productId.name}</h2>
                                <p className="text-gray-700 mb-2">Quantity: {item.quantity}</p>
                                <p className="text-gray-700 mb-4">Price: ${item.productId.price}</p>
                                <Button
                                    type="primary"
                                    className="mt-auto mb-2"
                                    onClick={() => {/* Handle checkout for this item */ }}
                                >
                                    Checkout
                                </Button>
                                <Button
                                    type="danger"
                                    onClick={() => deleteCartItem(item.productId._id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center mt-6">
                        <p className="text-lg font-semibold">Total Price: ${totalPrice.toFixed(2)}</p>
                        <Button type="primary" className="ml-auto">
                            Checkout All
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartDetails;
