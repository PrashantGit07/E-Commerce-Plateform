import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className='bg-black text-white py-4'>
            <h1 className='text-center'>
                All Rights Reserved &copy; Tech Sprinters
            </h1>
            <div className='flex justify-center mt-4 space-x-4 md:space-x-10'>
                <NavLink to="/" className={({ isActive }) => isActive ? 'text-blue-600' : 'text-white'}>
                    Home
                </NavLink>
                <span>|</span>
                <NavLink to="/about" className={({ isActive }) => isActive ? 'text-blue-600' : 'text-white'}>
                    About
                </NavLink>
                <span>|</span>

                <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-blue-600' : 'text-white'}>
                    Contact
                </NavLink>
                <span>|</span>

                <NavLink to="/policy" className={({ isActive }) => isActive ? 'text-blue-600' : 'text-white'}>
                    Policy
                </NavLink>
            </div>
        </footer>
    );
}

export default Footer;
