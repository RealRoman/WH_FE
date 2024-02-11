import { useQuery } from "react-query"
import { api } from 'src/api/confix'

export const useExperienceQuery = () =>{

    const getExperience = async () => {
        try {
            const result = await api.get('core/experience/')
            return result.data
        } catch (error) {
            console.log(error)   
        }
    }

    return useQuery({
        queryKey: ["experience"],
        queryFn: () => getExperience()
    })
}