import { createContext, useState } from "react";

export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    authenticate: (token)=>{},
    logout: ()=>{},
});

function AuthContextProvider({ children }) {
    const [authToken, setAuthToken] = useState();

    function authenticate(token) {
        setAuthToken(token);
    }

    function logout() {
        setAuthToken(null);
    }

    // The context value that will be provided to the components
    const contextValue = {
        token: authToken,
        isAuthenticated: !!authToken, // convert to boolean
        authenticate: authenticate,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;