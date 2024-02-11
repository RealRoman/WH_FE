import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from '../context'
import { useContext } from "react"

export const ProtectedRoute = ({path = '/auth'}) =>{
    const {auth} = useContext(AuthContext)
    
    return auth.token != null ? <Outlet/> : <Navigate to={path} replace={true}/>
}