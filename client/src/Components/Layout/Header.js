import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const title = "<ShopHere/>";

    return (
        <nav className='h-16 bg-gray-600 w-full flex items-center justify-between px-4'>
            <div className='font-extrabold text-white '>{title}</div>
            <div className='hidden md:flex space-x-10'>
                <NavLink to="/" className={({ isActive }) => isActive ? 'text-white' : 'text-gray-300'}>Home</NavLink>
                {/* <NavLink to="/register" className={({ isActive }) => isActive ? 'text-white' : 'text-gray-300'}>Register</NavLink> */}
                <NavLink to="/login" className={({ isActive }) => isActive ? 'text-white' : 'text-gray-300'}>Profile</NavLink>
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
                    {/* <NavLink to="/signup" className={({ isActive }) => isActive ? 'text-white' : 'text-gray-300'} onClick={() => setIsOpen(false)}>Signup</NavLink> */}
                    <NavLink to="/login" className={({ isActive }) => isActive ? 'text-white' : 'text-gray-300'} onClick={() => setIsOpen(false)}>Login</NavLink>
                    <NavLink to="/categories" className={({ isActive }) => isActive ? 'text-white' : 'text-gray-300'} onClick={() => setIsOpen(false)}>Category</NavLink>
                    <NavLink to="/cart" className={({ isActive }) => isActive ? 'text-white' : 'text-gray-300'} onClick={() => setIsOpen(false)}>Cart(0)</NavLink>
                </div>
            )}
        </nav>
    );
}

export default Header;
