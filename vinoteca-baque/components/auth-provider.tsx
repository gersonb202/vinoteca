"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type AuthContextType = {
    isLoggedIn: boolean
    login: () => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode}) => {
    const [isLoggedIn, setIsloggedIn] = useState(false);
    const router = useRouter()
    useEffect(() => {
        const token = localStorage.getItem("authToken")
        if (token){
            setIsloggedIn(true)
        }
    }, [])

    const login = () => {
        localStorage.setItem("authToken", "dummy-token")
        setIsloggedIn(true)
        router.push("/cuenta")
    }

    const logout = () => {
        localStorage.removeItem("authToken")
        setIsloggedIn(false)
        router.push("/")
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(context === undefined){
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

