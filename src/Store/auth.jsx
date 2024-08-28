import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    useEffect(() => {
        // Synchronize token state with localStorage
        localStorage.setItem("token", token);
    }, [token]);

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
    };

    const LogoutUser = () => {
        setToken("");
        localStorage.removeItem("token");
    };

    const isLoggedIn = !!token;

    console.log("isLoggedIn:", isLoggedIn);

    return (
        <AuthContext.Provider value={{ storeTokenInLS, LogoutUser, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return authContextValue;
};
