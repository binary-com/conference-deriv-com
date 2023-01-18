import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

const defaultContext = {
    currentUser: null,
    setCurrentUser: null,
}

export const AuthContext = createContext(defaultContext)
export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }: any) => {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
        })
    }, [])

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthValue() {
    return useContext(AuthContext)
}

export default AuthProvider
