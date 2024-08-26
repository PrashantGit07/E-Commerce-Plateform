import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { MenuOutlined, DownOutlined } from '@ant-design/icons';
import logo from "../../Assets/logo.png";
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';
import { useCart } from '../../Context/CartContext';


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [auth, setAuth] = useAuth();
    const { cart } = useCart()
    const cartItemCount = cart?.items?.length
    console.log(cartItemCount)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/category/get-category");
                if (response.status === 200) {
                    setCategories(response.data.data);
                }
            } catch (e) {
                console.error("Error fetching categories:", e);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        setDropdownOpen(false);
        setCategoryDropdownOpen(false);

        // Reset category selection when navigating to the home page
        if (location.pathname === "/") {
            setSelectedCategory(null);
        }
    }, [location, auth.user]);

    const handleLogout = () => {
        setAuth({ ...auth, user: null, token: '' });
        localStorage.removeItem('auth');
        navigate("/login");
        setDropdownOpen(false);
        setCategoryDropdownOpen(false);
    };

    const handleDashboard = () => {
        const dashboardRoute = auth.user.role === 1 ? "/dashboard/admin" : "/dashboard/user";
        navigate(dashboardRoute);
        setDropdownOpen(false);
        setCategoryDropdownOpen(false);
    };

    const handleCategorySelect = (slug, name) => {
        setSelectedCategory(name);
        navigate(`/caetgory-product/${slug}`);
        setIsOpen(false);
        setCategoryDropdownOpen(false);
    };

    const toggleCategoryDropdown = () => {
        setCategoryDropdownOpen(prev => !prev);
        setDropdownOpen(false);
    };






    return (
        <nav className='fixed top-0 left-0 right-0 h-16 bg-blue-500 rounded-md text-white w-full flex items-center justify-between px-4 z-50 shadow-blue-600 shadow-md'>
            <img src={logo} className="w-12 h-auto cursor-pointer" alt="Logo" onClick={() => navigate("/")} />

            <div className='hidden md:flex space-x-10'>
                <NavLink to="/" className={({ isActive }) => isActive ? 'text-white' : 'text-gray-300'}>Home</NavLink>

                {auth.user ? (
                    <div className="relative">
                        <button
                            onClick={() => {
                                setDropdownOpen(prev => !prev);
                                setCategoryDropdownOpen(false);
                            }}
                            className="text-white flex items-center space-x-1"
                        >
                            <span>{auth.user.name}</span>
                            <DownOutlined />
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

                <div className="relative">
                    <button
                        onClick={toggleCategoryDropdown}
                        className="text-white flex items-center space-x-1"
                    >
                        <span>{selectedCategory || "Category"}</span>
                        <DownOutlined />
                    </button>
                    {categoryDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                            {categories.map((category) => (
                                <button
                                    key={category._id}
                                    onClick={() => handleCategorySelect(category.slug, category.name)}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <NavLink to="dashboard/user/cart" className={({ isActive }) => isActive ? 'text-white' : 'text-gray-300'}>Cart({cartItemCount}) </NavLink>
            </div>

            <div className='md:hidden flex items-center'>
                <button onClick={() => setIsOpen(!isOpen)}>
                    <MenuOutlined className='text-white' size={24} />
                </button>
            </div>

            {isOpen && (
                <div className='absolute top-16 left-0 w-full bg-gray-600 flex flex-col items-center space-y-4 py-4 md:hidden'>
                    <NavLink to="/" className={({ isActive }) => isActive ? 'text-white' : 'text-gray-300'} onClick={() => setIsOpen(false)}>Home</NavLink>
                    {auth.user ? (
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setDropdownOpen(prev => !prev);
                                    setCategoryDropdownOpen(false);
                                }}
                                className="text-white flex items-center space-x-1"
                            >
                                <span>{auth.user.name}</span>
                                <DownOutlined />
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
                    <div className="relative">
                        <button
                            onClick={toggleCategoryDropdown}
                            className="text-white flex items-center space-x-1"
                        >
                            <span>{selectedCategory || "Category"}</span>
                            <DownOutlined />
                        </button>
                        {categoryDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                {categories.map((category) => (
                                    <button
                                        key={category._id}
                                        onClick={() => handleCategorySelect(category._id, category.name)}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <NavLink to="dashboard/user/cart" className={({ isActive }) => isActive ? 'text-white' : 'text-gray-300'} onClick={() => setIsOpen(false)}>Cart ({cartItemCount}) </NavLink>
                </div>
            )}
        </nav>
    );
};

export default Header;
