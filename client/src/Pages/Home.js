import React from 'react'

//checking if context api is working properly or not
import { useAuth } from '../Context/AuthContext'
const Home = () => {
    const [auth, setAuth] = useAuth()
    return (
        <div>
            <pre>{JSON.stringify(auth, null, 4)}</pre>
        </div>
    )
}

export default Home