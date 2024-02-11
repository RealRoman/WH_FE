import { useContext } from "react";
import { AuthContext } from "src/context";
import { useEffect } from "react";
import { api } from "src/api/confix";

export const usePrivateApi = () =>{
    const { auth } = useContext(AuthContext)
    
    // pokazde kdyz se updatuje context auth, nastavi se bearer na novy token
    useEffect(() => {
        const requestIntercept = api.interceptors.request.use(
            async (config) => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Token ${auth.token}`
                }
                return config
            },
            (error) => {
                console.log(error)
                return Promise.reject(error)
            },
        )

    
        return () => {
            api.interceptors.request.eject(requestIntercept)
        }
    }, [auth])

    return api
}