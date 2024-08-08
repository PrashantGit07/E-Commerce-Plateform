import React from 'react'
import UserMenu from '../../Components/Layout/UserMenu'
import { useAuth } from '../../Context/AuthContext'
const Dashboard = () => {
    const [auth] = useAuth()
    return (
        <div>

            <div className=' mt-10'>
                <UserMenu />
            </div>

        </div>
    )
}

export default Dashboard