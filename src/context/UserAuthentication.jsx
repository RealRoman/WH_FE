import { createContext, useState, useEffect } from "react"


export const AuthContext = createContext({
    auth: {user: null, userState: null, token: null},
    setAuth: () => {},
})

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: localStorage.getItem('userName') ?? null,
        userState: localStorage.getItem('userState') ?? null,
        token: localStorage.getItem('token') ?? null
    })

    useEffect(() => {
        if (Object.values(auth).some((value) => !value)) return

        localStorage.setItem('userName', `${auth?.user}`)
        localStorage.setItem('userState', `${auth?.userState}`)
        localStorage.setItem('token', `${auth?.token}`)
    }, [auth])
    return  <AuthContext.Provider value = {{auth, setAuth}}>
                {children}
            </AuthContext.Provider>
}