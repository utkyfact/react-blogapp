
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { Triangle } from 'react-loader-spinner'

const AuthContext = createContext()

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    const login = ({email,password}) => {
        return signInWithEmailAndPassword(auth,email,password)
    }

    const register = ({email,password}) => {
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const googleLogin = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth,provider)
    }

    const logout = () => {
        return signOut(auth)
    }

    const emailVerification = () => {
        return sendEmailVerification(auth.currentUser)
    }

    const resetEmail = ({email}) => {
        return sendPasswordResetEmail(auth,email)
    }


    return (
        <>
            <AuthContext.Provider value={{ user,login,googleLogin,register,logout,emailVerification,resetEmail }}>
                {loading ?
                    <div className="h-dvh flex justify-center items-center">
                        <Triangle
                            visible={true}
                            height="100"
                            width="100"
                            color="#ff0000"
                            ariaLabel="triangle-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                    </div>
                    : children}
            </AuthContext.Provider>
        </>
    );
}

export const useAuth = () => useContext(AuthContext)