import {useQuery, useQueryClient} from "react-query";
import axios from "axios";

const fetchRpgClass = ({queryKey}) =>
    axios.get(`http://localhost:4000/RPGClasses/${queryKey[1]}`)
export const useRpgClassData = (classId) => {

    const queryClient = useQueryClient()
    return useQuery(
        ['rpg-class', classId],
        fetchRpgClass, // the params are passed automatically to the fetcher fn
        { // initial data
            initialData: () => {
                const rpgClass = queryClient.getQueryData('rpg-classes')?.data?.find(cls => cls.id === parseInt(classId));
                console.log(rpgClass);
                if (rpgClass) {
                    return {
                        data: rpgClass
                    }
                } else return undefined
            }
        }
    )
}