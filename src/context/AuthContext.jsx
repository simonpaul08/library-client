import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const useAuthContext = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(null);

    const API_URL = import.meta.env.VITE_APP_API;

    const publicInstance = axios.create({
        baseURL: `${API_URL}`,
    });

    const privateInstance = axios.create({
        baseURL: `${API_URL}`,
        headers: {
            Authorization: token,
        },
    });


    // handle set user
    const handleSetUser = (user, token) => {
        setCurrentUser(user)
        setToken(token)
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token)
    }

    // handle logout 
    const handleLogout = () => {
        setCurrentUser(null)
        setToken(null);
        localStorage.removeItem("user")
        localStorage.removeItem("token")
    }

    let values = {
        currentUser,
        setCurrentUser,
        token,
        handleSetUser,
        handleLogout,
        publicInstance,
        privateInstance
    }

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"));
        let token = localStorage.getItem("token")
        if (user && token) {
            setCurrentUser(user)
            setToken(token)
        }
    }, [])

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;