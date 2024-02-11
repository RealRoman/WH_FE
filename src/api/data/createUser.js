import { useMutation } from "react-query";
import { api } from "../confix";
import { useContext } from "react";
import { AuthContext } from "src/context";


export const useCreateUserMutation = () =>{
    const { setAuth } = useContext(AuthContext)
    

    const createUser = async (data) =>{
        const response = await api.post('/core/users/create/', data)
        return response.data
    }

    return useMutation({
        mutationFn: createUser,
        onSuccess: (data, variables, context) =>{
            setAuth({
                user: data.username,
                userState: 'logged-in',
                token: data.token
            })
            return data
        },
        onError: (error) => {
            console.log(error)
            return error
        }
    })
}