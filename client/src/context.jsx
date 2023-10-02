import { createContext, useEffect, useState } from "react"

export const UserContext = createContext({})

export function UserContextProvider({ children }) {

    const [userInfo, setUserInfo] = useState({})

    const URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetch(`${URL}/profile`, {
            credentials: "include"
        }).then(res => res.json().then(data => setUserInfo(data)))
    }, [])
    
    return(
        <UserContext.Provider value={{userInfo, setUserInfo}}>
            {children}
        </UserContext.Provider>
    )
}