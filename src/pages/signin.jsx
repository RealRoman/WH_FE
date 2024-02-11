import { useContext } from "react"
import { AuthContext } from "src/context"
import { Button } from "src/widgets"

export const SignIn = () =>{
    const { auth, setAuth } = useContext(AuthContext)

    const handleClick = () =>{
        setAuth({user: 'Roman', userState: 'active', token: 'NahodnyTokenString'})
    }

    return (
        <div className="h-screen text-white flex justify-center items-center flex-col">
            <div className="text-white flex justify-center flex-col items-center mt-32">
                <p>{auth.token}</p>
                <p>{auth.user}</p>
                <p>{auth.userState}</p>
            </div>
            <div className="w-64 h-16">
            <Button onClick={handleClick}>Sign in</Button>
            </div>
            
        </div>
    )
}