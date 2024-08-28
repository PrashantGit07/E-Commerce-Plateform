import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsersDetails = () => {
    const [allUserOrders, setAllUserOrders] = useState([]);

    const getToken = () => {
        const authData = localStorage.getItem('auth');
        return authData ? JSON.parse(authData).token : '';
    };

    const token = getToken();

    const getAllOrders = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/order/all", {
                headers: {
                    Authorization: token,
                }
            });
            if (response.status === 200) {
                console.log(response?.data?.orders);
                setAllUserOrders(response?.data?.orders);
            }
        } catch (e) {
            console.log(e);
        }
    };


    const confirmOrderHandler = async (orderId) => {
        try {
            const response = await axios.put(`http://localhost:8000/api/order/confirm/${orderId}`, {}, {
                headers: {
                    Authorization: token,
                }
            });
            if (response.status === 200) {

                setAllUserOrders(prevOrders =>
                    prevOrders.map(order =>
                        order._id === orderId
                            ? { ...order, status: 'Confirmed' }
                            : order
                    )
                );
                console.log("order confirmed")
            }
        } catch (e) {
            console.log(e);
            alert("Failed to confirm order. Please try again.");
        }
    };

    useEffect(() => {
        getAllOrders();

    }, []);

    return (
        <div className='flex flex-col min-h-screen pt-16 px-4'>
            <div className='flex flex-col space-y-4'>
                {allUserOrders.map(order => (
                    <div key={order._id} className='bg-white p-4 rounded-lg shadow-lg'>
                        <div className='flex justify-between items-center mb-4'>
                            <h2 className='text-xl font-semibold'>{order.user.name}</h2>
                            <span className='text-sm text-gray-600'>{order.user.email}</span>
                        </div>
                        <div className='mb-4'>
                            <h3 className='text-lg font-semibold'>Order Items:</h3>
                            <ul className='list-disc pl-5'>
                                {order.items.map(item => (
                                    <li key={item._id} className='mb-2'>
                                        <span className='font-medium'>{item.name}</span> - {item.quantity} x ${item.price}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='flex justify-between items-center mb-4'>
                            <span className='font-medium text-lg'>Total Price:<span className=' text-blue-800'> ${order.totalPrice}</span></span>

                        </div>
                        <div className='flex justify-between items-center'>
                            <div>
                                <span className={`px-2 py-1 rounded text-white ${order.status === 'Pending' ? 'bg-yellow-500' : 'bg-green-500'
                                    }`}>
                                    {order.status}
                                </span>
                            </div>
                            <button
                                className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
                                onClick={() => confirmOrderHandler(order._id)}
                            >
                                Confirm Order
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UsersDetails;
