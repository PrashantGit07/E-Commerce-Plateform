import React, { useContext } from 'react'
import { UserContext } from '../Store/UserProvider.js'
import { useNavigate } from 'react-router-dom'

const UserProfile = () => {
    const navigate = useNavigate()
    const { user } = useContext(UserContext)

    return (
        <>
            {!user ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="relative w-16 h-16">
                        <div className="absolute inset-0 flex justify-center items-center">
                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                        </div>
                        <div className="absolute inset-0 flex justify-center items-center animate-spin-slow">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="p-4">
                    <h2 className="text-2xl font-bold">User Profile</h2>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Address:</strong> {user.address} </p>
                </div>
            )}
            <style jsx>{`
                .animate-spin-slow {
                    animation: spin 1.5s linear infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>

            <button onClick={() => navigate("/login")}>Logout</button>
        </>
    )
}

export default UserProfile
