import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types/models';
import { loginUser } from '../api/users';

type AuthContextType = {
    user: User | null
    login: (username: string) => Promise<void>
    logout: () => void
};

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
        setIsLoading(false)
    }, [])

    const login = async (username: string) => {
        try {
            const response = await loginUser({username})
            const data = response.payload.data
            localStorage.setItem("user", JSON.stringify(data))
            setUser(data)
        } catch (err) {
            console.error("Login failed:", err)
            alert("Login failed");
        }
    }

    const logout = () => {
        localStorage.removeItem("user")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {!isLoading && children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth used outside an AuthProvider")
    }
    return context
}