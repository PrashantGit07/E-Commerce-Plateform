import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Input, Form } from 'antd';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';
const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Access totalPrice and items from state
    const { totalPrice, items } = location.state || {};

    const getToken = () => {
        const authData = localStorage.getItem('auth');
        return authData ? JSON.parse(authData).token : '';
    };

    const token = getToken();

    const handleSubmit = async (values) => {
        try {
            // Modify items to include product IDs and names
            console.log('Items:', items);

            const modifiedItems = items.map(item => ({

                name: item.name, // Include the name of the product
                quantity: item.quantity,
                price: item.price * item.quantity, // Ensure price is total for this item
            }));
            console.log('Modified Items:', modifiedItems);

            const payload = {
                items: modifiedItems,
                totalPrice,
                ...values,
            };

            const response = await axios.post('http://localhost:8000/api/order/create', payload, {
                headers: {
                    Authorization: token,
                },
            });

            toast.success('Order placed successfully!');
            navigate('/dashboard/user/orders'); // Redirect after success
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('Failed to place order.');
        }
    };


    return (
        <div className='flex justify-center items-center min-h-screen p-4'>
            <Toaster />
            <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-md mt-9'>
                <h2 className='text-2xl font-semibold mb-4 text-center'>Checkout</h2>

                {/* Display the passed totalPrice */}
                <p className='text-lg font-semibold mb-4'>Total Payable Amount: ${totalPrice}</p>

                {/* Display the cart items */}
                <div className='mb-6'>
                    <h3 className='text-lg font-semibold mb-2'>Cart Items:</h3>
                    <ul>
                        {items && items.map((item, index) => (
                            <li key={index} className='mb-2'>
                                {item.name} (Quantity: {item.quantity}) - ${item.price * item.quantity}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Card type information */}
                <div className='mb-6'>
                    <h3 className='text-lg font-semibold mb-2'>Accepted Debit Card Types:</h3>
                    <ul className='list-disc pl-5'>
                        <li>Visa</li>
                        <li>MasterCard</li>
                        <li>American Express</li>
                        <li>Discover</li>
                    </ul>
                </div>

                <Form
                    layout='vertical'
                    onFinish={handleSubmit}
                >
                    {/* Form fields for user details */}
                    <Form.Item
                        name="fullName"
                        label="Full Name"
                        rules={[{ required: true, message: 'Please enter your full name' }]}
                    >
                        <Input placeholder="Enter your full name" />
                    </Form.Item>

                    <Form.Item
                        name="address"
                        label="Address"
                        rules={[{ required: true, message: 'Please enter your address' }]}
                    >
                        <Input.TextArea rows={3} placeholder="Enter your address" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Please enter your email' },
                            { type: 'email', message: 'Please enter a valid email address' },
                        ]}
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>

                    <Form.Item
                        name="phoneNumber"
                        label="Phone Number"
                        rules={[{ required: true, message: 'Please enter your phone number' }]}
                    >
                        <Input placeholder="Enter your phone number" />
                    </Form.Item>

                    {/* Add card details fields */}
                    <Form.Item
                        name="cardNumber"
                        label="Card Number"
                        rules={[{ required: true, message: 'Please enter your card number' }]}
                    >
                        <Input placeholder="Enter your card number" />
                    </Form.Item>

                    <Form.Item
                        name="expiryDate"
                        label="Expiry Date"
                        rules={[{ required: true, message: 'Please enter card expiry date' }]}
                    >
                        <Input placeholder="MM/YY" />
                    </Form.Item>

                    <Form.Item
                        name="cvv"
                        label="CVV"
                        rules={[{ required: true, message: 'Please enter your CVV' }]}
                    >
                        <Input placeholder="Enter CVV" />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" className="w-full mt-4">
                        Pay
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default Checkout;
