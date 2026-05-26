import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children}) {
   

    const [isAuth,setIsAuth] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try{ 
                const response = await fetch("https://myquote-app-backend.vercel.app/api/auth/me",
                    {
                        method:"GET",
                        credentials:"include"
                    });
                    const data = await response.json();

                    if(data.success){
                        setIsAuth(true);
                    }else {
                        setIsAuth(false);
                    }

            }
            catch (error){
                setIsAuth(false);

            }
            checkAuth();
        }
    },[]);

    if(isAuth === null){
        return <h1>Loading...</h1>
    }
    if(!isAuth){
        return <Navigate to="/login" replace />
    }
 return children
}

export default ProtectedRoute