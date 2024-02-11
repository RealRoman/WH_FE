import { useContext } from "react"
import { AuthContext } from "src/context"
import { Button } from "src/widgets"
import { useLogout } from "src/hooks/useLogout"

export const Logout = () =>{
    const { auth } = useContext(AuthContext)
    const logout = useLogout()

    const handleClick = () =>{
        logout.logout()
    }

    return (
        <div>
            <div className="text-white flex justify-center flex-col items-center mt-32">
                <p>{auth.token}</p>
                <p>{auth.user}</p>
                <p>{auth.userState}</p>
            </div>
            <div className="flex justify-center mt-32">
                <div className="w-64 h-16">
                    <Button onClick={handleClick}>Logout</Button>
                </div>
                
            </div>
        </div>
    )
}