import React from 'react';
import AdminMenu from '../../Components/Layout/AdminMenu';
import { useAuth } from '../../Context/AuthContext';
const AdminDashboard = () => {
    const [auth] = useAuth()
    return (
        <div>
            <h1 className=' font-extrabold font-mono text-center text-5xl text-gray-500 mt-4  select-none'>Admin Panel</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
                <div className="md:col-span-1 bg-white shadow-lg rounded-lg p-6">
                    <AdminMenu />
                </div>
                <div className="md:col-span-3 bg-white shadow-lg font-semibold rounded-lg p-6">

                    {auth?.user.name} <br />
                    {auth?.user.email}<br />
                    {auth?.user.address}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
