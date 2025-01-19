import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";


function ForgetPass() {
    const [loginObj, setLoginObj] = useState({ email: ""})
    const updateValue = (e) => {
        const { value, name } = e.target
        setLoginObj({
            ...loginObj,
            [name]: value
        })
    }

    const {resetEmail} = useAuth()

    const navigate = useNavigate()

    async function handleForgetPass(e) {
        e.preventDefault()
        try {
            await resetEmail(loginObj)
            toast.success("Şifre sıfırlama bağlantısı gönderildi. Mailinizi kontrol edin!")      
            navigate('/login')
        } catch (error) {
            toast.error(error.message)
        }
    }


    return (
        <>
            <form onSubmit={handleForgetPass} className="container mx-auto mt-20 space-y-4 p-2">
                <h1 className="text-2xl lg:text-start text-center">Şifre sıfırlama emaili gönder</h1>
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input onChange={updateValue} type="text" className="grow" name="email" placeholder="Email" value={loginObj.email} />
                </label>
                

                <button type="submit" className="btn btn-active block m-auto">Gönder</button>
            </form>
        </>
    );
}

export default ForgetPass;