import React from 'react';
import { NavLink } from 'react-router-dom';
import CreateCategory from '../../Pages/Admin/CreateCategory';
import CreateProduct from '../../Pages/Admin/CreateProduct';
import UsersDetails from '../../Pages/Admin/UsersDetails';


const AdminMenu = () => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto mt-8">
            <ul className="space-y-4">
                <li className="hover:bg-gray-100 rounded-md">
                    <NavLink to="/dashboard/admin/create-category" className="block px-4 py-2">
                        <CreateCategory />
                    </NavLink>
                </li>
                <li className="hover:bg-gray-100 rounded-md">
                    <NavLink to="/dashboard/admin/create-product" className="block px-4 py-2">
                        <CreateProduct />
                    </NavLink>
                </li>
                <li className="hover:bg-gray-100 rounded-md">
                    <NavLink to="/dashboard/admin/users" className="block px-4 py-2">
                        <UsersDetails />
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default AdminMenu;
