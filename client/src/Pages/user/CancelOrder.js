import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const CancelOrder = () => {
    const location = useLocation();
    const { order } = location.state || {};
    console.log(order._id)
    const [selectedReason, setSelectedReason] = useState('');
    const [customReason, setCustomReason] = useState('');
    const [orderStatus, setOrderStatus] = useState(order?.status || ''); // Initialize with order status
    const navigate = useNavigate();

    const cancelReasons = [
        "Did not like the product",
        "Selected the wrong product",
        "Changed my mind",
    ];

    const getToken = () => {
        const authData = localStorage.getItem('auth');
        return authData ? JSON.parse(authData).token : '';
    };

    const token = getToken();

    const handleCancelOrder = async () => {
        try {
            const reason = customReason || selectedReason;

            if (!reason) {
                toast.error("Please select or enter a reason for cancellation.");
                return;
            }

            if (order.status === "Placed" || order.status === "Pending" || order.status === "Confirmed") {
                // Make sure the endpoint matches your API
                await axios.put(`http://localhost:8000/api/order/cancel/${order?._id}`, {}, {
                    headers: {
                        Authorization: token,
                    }
                });

                // Update order status after successful cancellation
                setOrderStatus("Cancelled");

                toast.success("Order cancelled successfully.");
                alert("Order cancelled successfully.");
                navigate('/dashboard/user/orders');
            } else {
                toast.error("Order cannot be cancelled as it's already processed or completed.");
            }
        } catch (error) {
            console.error("Error cancelling order:", error);
            toast.error("There was an error cancelling the order. Please try again.");
        }
    };

    return (
        <div className="min-h-screen pt-16 px-4">
            <Toaster />
            <h1 className="text-2xl font-bold mb-6">Cancel Order</h1>
            {order ? (
                <div className="space-y-6 bg-white p-6 shadow-lg rounded-lg w-full max-w-lg mx-auto">
                    <div className="border-b pb-4">
                        <h2 className="text-xl font-semibold">Order Status: {orderStatus}</h2>
                    </div>
                    <div className="space-y-4">
                        {order.items && order.items.length > 0 ? (
                            order.items.map((item, index) => (
                                <div key={index} className="flex justify-between p-4 border-b">
                                    <span>{item.name}</span>
                                    <span>Quantity: {item.quantity}</span>
                                    <span>Price: ${item.price}</span>
                                </div>
                            ))
                        ) : (
                            <p>No items to display</p>
                        )}

                    </div>
                    {order.items && order.items.length > 0 ? (
                        order.items.map((item, index) => (
                            <div key={index}>

                                <span className=' font-semibold text-blue-600'>Total Price: ${item.price * item.quantity}</span>
                            </div>
                        ))
                    ) : (
                        <p>No items to display</p>
                    )}

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-4">Select a reason for cancellation:</h3>
                        <div className="space-y-2">
                            {cancelReasons.map((reason, index) => (
                                <label key={index} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="cancelReason"
                                        value={reason}
                                        onChange={() => setSelectedReason(reason)}
                                        className="form-radio h-5 w-5 text-red-600"
                                    />
                                    <span>{reason}</span>
                                </label>
                            ))}
                        </div>

                        <div className="mt-4">
                            <textarea
                                className="w-full border border-gray-300 rounded-lg p-2"
                                rows="4"
                                placeholder="Enter your own reason for cancellation (optional)"
                                value={customReason}
                                onChange={(e) => setCustomReason(e.target.value)}
                            />
                        </div>

                        <div className="mt-6">
                            <button
                                onClick={handleCancelOrder}
                                className="bg-red-600 text-white h-12 w-full rounded-lg hover:bg-red-700 transition duration-200"
                            >
                                Confirm Cancellation
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Order details not available</p>
            )}
        </div>
    );
};

export default CancelOrder;
