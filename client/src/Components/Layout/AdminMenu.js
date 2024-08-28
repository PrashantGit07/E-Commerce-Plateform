import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
    return (
        <div className="p-4 max-w-md mx-auto mt-6 border border-gray-300 rounded">
            <ul className="space-y-3">
                <li>
                    <NavLink to="/dashboard/admin/create-category" className="block px-3 py-2 text-gray-700 hover:text-black">
                        Manage Category
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/admin/create-product" className="block px-3 py-2 text-gray-700 hover:text-black">
                        Create Product
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/admin/users" className="block px-3 py-2 text-gray-700 hover:text-black">
                        User Order Details
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/dashboard/admin/products" className="block px-3 py-2 text-gray-700 hover:text-black">
                        Proucts
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default AdminMenu;
