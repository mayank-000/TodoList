import React, { createContext, useState, useEffect } from "react";
import { getProfile } from "../api/user.api.js";

const AuthContext = createContext(null);

export const CheckAuth = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
        
    useEffect(() => {
        const check = async () => {
            try {
                const uid = localStorage.getItem("TodoAppUID");
                if(!uid) {
                    setLoading(false);
                    return;
                }
                const response = await getProfile(uid);
                if(response?.user) {
                    setUser(response.user);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        check();
    }, []);

    const login = (userData, uid) => {
        localStorage.setItem("TodoAppUID", uid);
        setUser(userData);
    }

    const logout = () => {
        localStorage.removeItem("TodoAppUID");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}