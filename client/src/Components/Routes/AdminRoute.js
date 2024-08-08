import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../utils/Loader';

const AdminRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth] = useAuth();

    useEffect(() => {
        const AuthCheck = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/auth/admin-auth', {
                    headers: {
                        "Authorization": auth?.token
                    }
                });

                if (res.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
            } catch (error) {
                setOk(false); // Handle error by setting ok to false
            }
        };

        if (auth?.token) AuthCheck();
    }, [auth?.token]);

    return ok ? <Outlet /> : <Loader />;
};

export default AdminRoute;
