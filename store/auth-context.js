import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        AsyncStorage.setItem("token", token);
    }

    function logout() {
        setAuthToken(null);
        AsyncStorage.removeItem("token");
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