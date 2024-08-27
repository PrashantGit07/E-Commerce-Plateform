import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast'; // Assuming you're using react-toastify for toasts

const UpdateProfile = () => {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const getToken = () => {
        const authData = localStorage.getItem('auth');
        return authData ? JSON.parse(authData).token : '';
    }
    const token = getToken();
    const [formData, setFormData] = useState({
        name: auth.user.name,
        email: auth.user.email,
        phone: auth.user.phone,
        address: auth.user.address,
        password: ''  // Password can be updated separately if needed
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:8000/api/auth/update-profile`, formData, {
                headers: {
                    Authorization: token,
                }
            });

            if (response && response.data.success) {
                // Assuming the API returns the updated user data
                setAuth({ ...auth, user: response.data.user });
                toast.success('Profile updated successfully');
                navigate(-1); // Navigate back to the previous page
            } else {
                toast.error('Failed to update profile');
            }
        } catch (e) {
            console.log(e);
            toast.error('An error occurred while updating the profile');
        }
    };

    return (
        <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-lg mt-20">
            <Toaster />

            <h1 className="text-2xl font-bold mb-4 text-center">Update Profile</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label className="font-semibold mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="p-2 border rounded-lg"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-semibold mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled
                        onChange={handleInputChange}
                        className="p-2 border rounded-lg"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-semibold mb-2">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="p-2 border rounded-lg"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-semibold mb-2">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="p-2 border rounded-lg"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-semibold mb-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="p-2 border rounded-lg"
                        placeholder="Leave blank to keep the current password"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg mt-6 transition duration-300"
                >
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default UpdateProfile;
