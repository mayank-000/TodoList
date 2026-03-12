import { useContext } from "react";
import { AuthContext } from "./authContext";

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("Auth must be used inside provider");
    }

    return context;
};