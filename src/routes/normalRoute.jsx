import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "src/context"

export const NormalRoute = ({path='/main'}) => {
    const { auth } = useContext(AuthContext)

    return auth.token ? <Navigate to={path}/> : <Outlet/>
}