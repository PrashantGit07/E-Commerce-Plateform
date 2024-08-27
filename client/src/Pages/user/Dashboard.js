import React from 'react'
import UserMenu from '../../Components/Layout/UserMenu'
import { useAuth } from '../../Context/AuthContext'
const Dashboard = () => {
    const [auth] = useAuth()
    return (
        <div>

            <div className=' pt-16'>
                <UserMenu />
            </div>

        </div>
    )
}

export default Dashboard