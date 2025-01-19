import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { toast } from 'react-toastify';




function Layout({ children }) {

    const { user, emailVerification } = useAuth()
    const [verification, setVerification] = useState({status:false, message:""})

    async function sendVerification() {
        try {
            await emailVerification()
            toast.success("Email adresinizi kontrol ediniz.")
        } catch (error) {
            if (error.message == 'Firebase: Error (auth/too-many-requests).') {
                toast.error('Çok sık istek gönderdiğiniz için beklemeniz gerekiyor.')
            }
        }
    }

    useEffect(() => {
        if (user && !user.emailVerified) {
            setVerification({
                status: true, message: (
                <div className="flex items-center justify-between w-full">
                    <span>Doğrulanmamış email adresi!</span>
                    <button onClick={sendVerification} className="btn btn-ghost">Doğrulama maili gönder!</button>
                </div>
                )
            })
        }
        if (user && !user.displayName) {
            setVerification({
                status: true, message: (
                <div>
                    <span>Kullanıcı bilgilerinizi güncellemeniz gerekmektedir. Kullanıcı adı zorunlu bir bilgidir.</span>
                </div>
                )
            })
        }
    }, [])



    return (
        <>
            {
                verification.status &&
                <div role="alert" className="alert alert-warning rounded-md">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {verification.message}
                </div>
            }
            <Navbar />
            {children}
        </>
    );
}

export default Layout;