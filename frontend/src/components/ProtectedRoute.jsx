import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, replace } from 'react-router-dom';
import Loader from './Loader';
import toast from "react-hot-toast"
import API_URL from '../api/api';

function ProtectedRoute() {
    
     const [isAuth, setIsAuth] = useState(null);

    useEffect(() => {

        const checkAuth = async () => {

            try {

                const response = await fetch(
                    `${API_URL}/api/auth/me`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                
                const data = await response.json();
                if(!data.success){
                    toast.error(data.message);
                }
                setIsAuth(response.ok);
            

            } catch (error) {
                console.log(error);
                setIsAuth(false);
            }
        };

        checkAuth();

    }, []);

    if (isAuth === null) {
        return <Loader/>;
    }

    if (!isAuth) {
        
        return  <Navigate to="/login" replace /> 
    }

    return <Outlet/>;
}

export default ProtectedRoute;