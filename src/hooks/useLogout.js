import { useContext } from "react"
import { AuthContext } from "src/context"
import { removeToken } from "src/api/utils/token"

export const useLogout = () =>{
    const { auth, setAuth } = useContext(AuthContext)

    const logout = () =>{
        removeToken()
        setAuth({
            ...auth,
            token: null
            })
    }

    const deactivateUser = () =>{
        setAuth({
            ...auth,
            userState: 'inactive'
        })
    }

    return {
        logout,
        deactivateUser
    }
}