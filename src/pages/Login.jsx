import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import Layout from "../components/Layout";

function Login() {
    const [loginObj, setLoginObj] = useState({ email: "", password: "" })
    const updateValue = (e) => {
        const { value, name } = e.target
        setLoginObj({
            ...loginObj,
            [name]: value
        })
    }

    const {login,googleLogin} = useAuth()

    const navigate = useNavigate()

    async function handleEmailLogin(e) {
        e.preventDefault()
        try {
            await login(loginObj)
            toast.success("Başarı ile giriş yaptınız!")
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
            toast.error(error.message)
        }
    }

    return (
        <Layout>
            <form onSubmit={handleEmailLogin} className="container mx-auto mt-20 space-y-4 p-2">
                <h1 className="text-2xl lg:text-start text-center">Giriş Yap</h1>
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
                    <input onChange={updateValue} type="password" className="grow" name="password" placeholder="***********" value={loginObj.password} />
                </label>

                <p><Link to={'/forget-pass'} className="hover:underline">Şifreni mi unuttun?</Link></p>

                <p>Henüz üye değil misin?<Link to={'/register'} className="underline">Üye ol.</Link></p>

                <button type="submit" className="btn btn-active block m-auto md:w-2/6 w-full rounded-md">Giriş Yap</button>

                <div onClick={handleGoogleLogin} className="flex items-center justify-center gap-2 btn btn-active cursor-pointer rounded-md md:w-2/6 w-full m-auto"><FcGoogle size={22} /><span>Goole ile giriş yap.</span></div>
            </form>
        </Layout>
    );
}

export default Login;