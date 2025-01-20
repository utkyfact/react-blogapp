import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import Layout from "../components/Layout";

function Register() {
    
    const navigate = useNavigate()

    const [registerObj, setRegisterObj] = useState({ email: "", password: "" })
    const {register,googleLogin} = useAuth()

    const updateValue = (e) => {
        const { value, name } = e.target
        setRegisterObj({
            ...registerObj,
            [name]: value
        })
    }

    async function handleEmailRegister(e) {
        e.preventDefault()
        try {
            await register(registerObj)
            toast.success("Başarı ile kayıt oldunuz!")
            navigate("/")
        } catch (error) {
            toast.error(error.message)
        }
    }

    async function handleGoogleLogin() {
        try {
            await googleLogin()
            toast.success("Başarı ile giriş yaptınız!")
            navigate("/")
        } catch (error) {
            console.log(error);
            toast.error(error.massage)
        }
    }

    return (
        <Layout>
            <form onSubmit={handleEmailRegister} className="container mx-auto mt-20 space-y-4 p-2">
                <h1 className="text-2xl lg:text-start text-center">Kayıt Ol</h1>
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
                    <input onChange={updateValue} type="text" className="grow" name="email" placeholder="Email" value={registerObj.email} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg>
                    <input onChange={updateValue} type="password" className="grow" name="password" placeholder="***********" value={registerObj.password} />
                </label>


                <p>Zaten üye misin?<Link to={'/login'} className="underline">Giriş yap.</Link></p>

                <button type="submit" className="btn btn-active block m-auto md:w-2/6 w-full rounded-md">Kayıt Ol</button>

                <div onClick={handleGoogleLogin} className="flex items-center justify-center gap-2 btn btn-active rounded-md cursor-pointer md:w-2/6 w-full m-auto"><FcGoogle /><span>Goole ile giriş yap.</span></div>
            </form>
        </Layout>
    );
}

export default Register;