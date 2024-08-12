import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { HiMenu, HiChevronDown } from 'react-icons/hi';
import { useAuth } from '../../Context/AuthContext';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [auth, setAuth] = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const title = "<ShopHere/>";
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Ensure dropdown is closed initially after login
        setDropdownOpen(false);
    }, [auth.user]);

    useEffect(() => {
        // Close the dropdown when the location changes
        setDropdownOpen(false);
    }, [location]);

    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: ''
        });
        localStorage.removeItem('auth');
        navigate("/login");
        setDropdownOpen(false);  // Close the dropdown after logout
    };

    const handleDashboard = () => {
        const dashboardRoute = auth.user.role === 1 ? "/dashboard/admin" : "/dashboard/user";
        navigate(dashboardRoute);
        setDropdownOpen(false);  // Close the dropdown after navigation
    };

    return (
        <nav className='h-16 bg-gray-600 w-full flex items-center justify-between px-4'>
            <div className='font-extrabold text-white'>{title}</div>

            <div className='hidden md:flex space-x-10'>
                <NavLink to="/" className={({ isActive }) => isActive ? 'text-white' : 'text-gray-300'}>Home</NavLink>

                {auth.user ? (
                    <div className="relative">
                        <button onClick={() => setDropdownOpen(!dropdownOpen)} className="text-white flex items-center space-x-1">
                            <span>{auth.user.name}</span>
                            <HiChevronDown />
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                <button onClick={handleDashboard} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                    Dashboard
                                </button>
                                <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <NavLink to="/login" className={({ isActive }) => isActive ? 'text-white' : 'text-gray-300'}>Login</NavLink>
                )}

                <NavLink to="/categories" className={({ isActive }) => isActive ? 'text-white' : 'text-gray-300'}>Category</NavLink>
                <NavLink to="/cart" className={({ isActive }) => isActive ? 'text-white' : 'text-gray-300'}>Cart(0)</NavLink>
            </div>

            <div className='md:hidden flex items-center'>
                <button onClick={() => setIsOpen(!isOpen)}>
                    <HiMenu className='text-white' size={24} />
                </button>
            </div>

            {isOpen && (
                <div className='absolute top-16 left-0 w-full bg-gray-600 flex flex-col items-center space-y-4 py-4 md:hidden'>
                    <NavLink to="/" className={({ isActive }) => isActive ? 'text-white' : 'text-gray-300'} onClick={() => setIsOpen(false)}>Home</NavLink>
                    {auth.user ? (
                        <div className="relative">
                            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="text-white flex items-center space-x-1">
                                <span>{auth.user.name}</span>
                                <HiChevronDown />
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                    <button onClick={handleDashboard} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                        Dashboard
                                    </button>
                                    <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <NavLink to="/login" className={({ isActive }) => isActive ? 'text-white' : 'text-gray-300'} onClick={() => setIsOpen(false)}>Login</NavLink>
                    )}
                    <NavLink to="/categories" className={({ isActive }) => isActive ? 'text-white' : 'text-gray-300'} onClick={() => setIsOpen(false)}>Category</NavLink>
                    <NavLink to="/cart" className={({ isActive }) => isActive ? 'text-white' : 'text-gray-300'} onClick={() => setIsOpen(false)}>Cart(0)</NavLink>
                </div>
            )}
        </nav>
    );
};

export default Header;
