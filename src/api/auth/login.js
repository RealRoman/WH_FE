import { useContext } from "react"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "src/context"
import { api } from 'src/api/confix'

export const useLoginMutation = () =>{
    const { setAuth } = useContext(AuthContext)
    const navigate = useNavigate()
    const login = async ({username, password}) => {
        try {
            const result = await api.post('/auth/', {username, password})
            return result.data
        } catch (error) {
            console.log(error)   
        }
    }

    return useMutation({
        mutationFn: login,
        onSuccess: (data, variables, context) =>{
            if(data){
                setAuth({
                    user: variables.username,
                    userState: 'active',
                    token: data.token
                })
                navigate('/main')
            }
        },
        onError: (error) => {
            console.log('error login ', error)
        }
    })
}