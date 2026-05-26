import React, { useEffect, useState } from 'react'
import { Navigate, replace } from 'react-router-dom';

function ProtectedRoute({children}) {
    
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {

        const checkAuth = async () => {

            try {

                const response = await fetch(
                    "http://localhost:3000/api/auth/me",
                    {
                        credentials: "include",
                    }
                );

                const data = await response.json();
                console.log(data)

                if(data.success){
                    setIsAuthenticated(true);
                   
                }
                else{
                    setIsAuthenticated(false);
                }

            } catch(error){
                setIsAuthenticated(false);
            }
            finally{
                setLoading(false);
            }
        };

        checkAuth();

    }, []);

    if(loading){
        return <h1>Loading...</h1>;
    }

    if(!isAuthenticated){
        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedRoute;