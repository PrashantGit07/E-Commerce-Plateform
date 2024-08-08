import React from 'react'
import { NavLink } from 'react-router-dom'
// import UserProfile from '../../Pages/user/UserProfile'
// import UserOrders from '../../Pages/user/UserOrders'

const UserMenu = () => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto mt-8">
            <ul className="space-y-4">
                <li className="hover:bg-gray-100 rounded-md">
                    <NavLink to="/dashboard/user/profile" className="block px-4 py-2">
                        Profile
                    </NavLink>
                </li>
                <li className="hover:bg-gray-100 rounded-md">
                    <NavLink to="/dashboard/user/orders" className="block px-4 py-2">
                        My Orders
                    </NavLink>
                </li>

            </ul>
        </div>
    )
}

export default UserMenu