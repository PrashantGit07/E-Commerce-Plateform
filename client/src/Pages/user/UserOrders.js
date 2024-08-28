import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserOrders = () => {
    const [orders, setOrders] = useState([]);

    const getToken = () => {
        const authData = localStorage.getItem('auth');
        return authData ? JSON.parse(authData).token : '';
    };

    const token = getToken();
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/order/user', {
                    headers: {
                        Authorization: token
                    }
                });
                setOrders(response.data.orders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [token]);

    return (
        <div className='p-6 bg-gray-50 min-h-screen'>
            <h2 className='text-3xl font-bold mb-6 text-gray-800'>My Orders</h2>
            <input type='text' />
            {orders.length === 0 ? (
                <p className='text-lg text-gray-600 text-center'>No orders found.</p>
            ) : (
                <div className='space-y-4'>
                    {orders.map((order) => (
                        <div key={order._id} className='bg-white shadow-lg rounded-lg p-5 border border-gray-200'>
                            <h3 className='text-2xl font-semibold mb-3 text-blue-800'>Order ID: {order._id}</h3>
                            <p className='text-lg font-medium mb-2 text-green-700'> Price: ${order.totalPrice}</p>
                            <p className='text-lg font-medium mb-2 text-gray-700'>Status: {order.status}</p>

                            <ul className='list-disc pl-5'>
                                {order.items.map((item, index) => (
                                    <li key={index} className='mb-2 text-gray-600'>
                                        <p className='text-lg font-medium mb-2 text-gray-800'>Items:</p>
                                        <span className='font-medium text-blue-600'>{item.name ? item.name : "No name available"}</span> -
                                        <span className='font-medium'> Quantity: {item.quantity}</span>
                                        <p className='mt-1 text-blue-800  font-semibold'>Total Price: ${item.price * item.quantity}</p>
                                    </li>
                                ))}
                            </ul>

                            {order.status !== "Cancelled" && <Link
                                to={"/dashboard/user/cancel-order"}
                                className='bg-red-600 text-white h-8 w-32 flex items-center justify-center rounded-lg hover:bg-red-700 transition duration-200'
                                state={{ order }}
                            >
                                Cancel Order
                            </Link>}

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserOrders;
