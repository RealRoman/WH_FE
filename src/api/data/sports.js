import { useQuery } from "react-query"
import { api } from 'src/api/confix'

export const useSportsQuery = () =>{

    const getSports = async () => {
        try {
            const result = await api.get('core/sports/')
            return result.data
        } catch (error) {
            console.log(error)   
        }
    }

    return useQuery({
        queryKey: ["sports"],
        queryFn: () => getSports()
    })
}