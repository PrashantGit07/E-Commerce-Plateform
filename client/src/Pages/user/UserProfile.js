import React from 'react';
import { useAuth } from '../../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from "@ant-design/icons"
const UserProfile = () => {
    const navigate = useNavigate()
    const [auth] = useAuth();
    return (
        <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-lg mt-20">
            <ArrowLeftOutlined onClick={() => navigate("/dashboard/user")} />
            <h1 className="text-2xl font-bold mb-4 text-center">Profile</h1>
            <div className="space-y-4">
                <div className="flex items-center">
                    <span className="font-semibold w-24">Name:</span>
                    <span>{auth?.user.name}</span>
                </div>
                <div className="flex items-center">
                    <span className="font-semibold w-24">Email:</span>
                    <span>{auth?.user.email}</span>
                </div>
                <div className="flex items-center">
                    <span className="font-semibold w-24">Phone:</span>
                    <span>{auth?.user.phone}</span>
                </div>
                <div className="flex items-center">
                    <span className="font-semibold w-24">Address:</span>
                    <span>{auth?.user.address}</span>
                </div>

                <Link
                    to="/dashboard/user/update-profile"
                    className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg mt-6 transition duration-300"
                >
                    Update Profile
                </Link>
            </div>
        </div>
    );
};

export default UserProfile;
