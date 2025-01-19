import React from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { FiLogIn, FiUserPlus } from "react-icons/fi";
import { useState } from "react";
import { useEffect } from "react";

function Navbar() {


    const { user, logout } = useAuth()
    const [theme, setTheme] = useState(localStorage.getItem("theme"))

    useEffect(() => {
        if (theme === null) {
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                setTheme("dark")
                document.querySelector("html").setAttribute("data-theme", "dark")
                localStorage.setItem("theme", "dark")
            } else {
                setTheme("light")
                document.querySelector("html").setAttribute("data-theme", "light")
                localStorage.setItem("theme", "light")
            }
        } else {
            document.querySelector("html").setAttribute("data-theme", theme)
        }
    }, [])

    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logout()
            toast.success('Başarı ile çıkış yapıldı!')
            navigate('/')
        } catch (error) {
            toast.error(error.message)
        }
    }

    const Allthemes = [
        "light",
        "dark",
        "cupcake",
        "bumblebee",
        "emerald",
        "corporate",
        "synthwave",
        "retro",
        "cyberpunk",
        "valentine",
        "halloween",
        "garden",
        "forest",
        "aqua",
        "lofi",
        "pastel",
        "fantasy",
        "wireframe",
        "black",
        "luxury",
        "dracula",
        "cmyk",
        "autumn",
        "business",
        "acid",
        "lemonade",
        "night",
        "coffee",
        "winter",
        "dim",
        "nord",
        "sunset",
    ]

    function changeTheme(e) {
        setTheme(e.target.value)
        localStorage.setItem("theme", e.target.value)
        document.querySelector("html").setAttribute("data-theme", e.target.value)
    }

    return (

        <div className="navbar bg-base-100 bg-opacity-55 container mx-auto mt-2 shadow-lg rounded-lg sticky top-5 space-x-1 z-50">
            <div className="flex-1">
                <Link to={"/"} className="btn btn-ghost text-xl">HW Blog</Link>
            </div>

            {
                user ? <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                {
                                    user.photoURL ? <img src={user.photoURL} />

                                        : <img src="./user.png" alt="Profile" />
                                }
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><Link to={"/profile"} className="justify-between">Profile</Link></li>
                            <li><button onClick={handleLogout}>Logout</button></li>
                        </ul>
                    </div>
                </div>

                    :
                    <ul className="flex">
                        <li><Link to={"/login"} className="btn btn-ghost"><FiLogIn size={25} /></Link></li>
                        <li><Link to={"/register"} className="btn btn-ghost"><FiUserPlus size={25} /></Link></li>
                    </ul>
            }

            <div className="dropdown dropdown-end">
                <select value={theme} onChange={changeTheme} className="select select-bordered w-full max-w-xs">
                    {
                        Allthemes.map((theme, i) => (
                            <option key={i} value={theme}>{theme[0].toLocaleUpperCase() + theme.slice(1)}</option>
                        ))
                    }
                </select>

            </div>
        </div>

    );
}

export default Navbar;