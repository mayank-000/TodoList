import React from "react";
import { Navigate } from 'react-router-dom';
import { useAuth } from '../service/auth.js';

export const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if(loading) {
        return (
            <div>
                <div>Loading...</div>
            </div>
        )
    }
    if(!user) {
        return <Navigate to="/register" replace />
    }
    return children;
}