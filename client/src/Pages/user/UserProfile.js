import React from 'react'
import { useAuth } from '../../Context/AuthContext'

const UserProfile = () => {
    const [auth] = useAuth()
    return (
        <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
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
            </div>
        </div>
    )
}

export default UserProfile
