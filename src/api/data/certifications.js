import { useQuery } from "react-query"
import { usePrivateApi } from "src/hooks/usePrivateApi"

export const usecertificationsQuery = () =>{
    const api = usePrivateApi()

    const getcertifications = async () => {
        try {
            const result = await api.get('core/certifications/')
            return result.data
        } catch (error) {
            console.log(error)   
        }
    }

    return useQuery({
        queryKey: ["certifications"],
        queryFn: () => getcertifications()
    })
}