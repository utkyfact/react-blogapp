import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router";
import { toast } from "react-toastify";




function PrivateRoute({ children }) {

    const {user} = useAuth()
    const navigate = useNavigate()
    useEffect(()=> {
        if(!user) {
            toast.warning("Bu sayfaya erişebilmek için önce giriş yapmalısınız!")
            navigate("/login")
        }
    },[])

    return ( 
        <>
            { children }
        </>
     );
}

export default PrivateRoute;