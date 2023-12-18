import { createContext, useState, useEffect, useMemo, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
});

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const authToken = Cookies.get('authToken');
        setIsLoggedIn(!!authToken);
    }, []);

    const contextValue = useMemo(
        () => ({
            isLoggedIn,
            setIsLoggedIn,
        }),
        [isLoggedIn, setIsLoggedIn]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}