import React, { useEffect, useState } from 'react'
import { Navigate, replace } from 'react-router-dom';
import Loader from './Loader';

function ProtectedRoute({children}) {
    
     const [isAuth, setIsAuth] = useState(null);

    useEffect(() => {

        const checkAuth = async () => {

            try {

                const response = await fetch(
                    "http://localhost:3000/api/auth/me",
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

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
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;