import React, { useContext, useState } from 'react'
import { getLoginInfo } from './LoginInfo';

const authenticateContext = React.createContext()
const useAuthenticate = () => useContext(authenticateContext);

const AuthenticateProvider = ({ children }) => {
    const [authenticate, setAuthenticate] = useState(
        getLoginInfo()
            ? getLoginInfo()
            : {
                isLogin: false,
                loginData: ""
            }
    )

    return (
        <authenticateContext.Provider value={[authenticate, setAuthenticate]}>
            {children}
        </authenticateContext.Provider>
    )
}

export { AuthenticateProvider, useAuthenticate }