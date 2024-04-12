import {useMutation, useQuery, useQueryClient} from "react-query";
import {request} from '../utils/axios-utils.jsx';


// features custom hook query ** useMutation ** select manipulate data ** invalidate data  on success ** set data on success
const fetchRpgClasses = () =>
    request({url: '/RPGClasses'})

const addRpgClass = (rpgClass) =>
    request({url: '/RPGClasses', method: 'post', data: rpgClass})
export const useRpgClassesData = (onSuccess, onError) => {
    return useQuery(
        'rpg-classes',
        fetchRpgClasses,
        {
            enabled: true, // STEP ONE: disable query on mount
            onSuccess,
            onError,
            select: (data) => { // transforms data fetched from server to a format used by our application
                return data.data.map(cls => ({
                    myId: cls.id,
                    nameAndRole: cls.name + ' ' + cls.role,
                    myRole: cls.role

                }));
            }
        }
    )
}

export const useAddRpgClassData = () => {
    const queryClient = useQueryClient();
    return useMutation(addRpgClass, {
        /*  onSuccess: (data) => { // invalidate query to trigger a fetch
              // queryClient.invalidateQueries('rpg-classes'); // if the request doesn't return the created data we just invalidate
              queryClient.setQueriesData('rpg-classes', (oldData) => { // if the request returns the added data then for optimisation purposes we can add the data directly without the need for a request call
                  return {
                      ...oldData,
                      data: [...oldData.data, data.data]
                  }
              })
          }*/

        // Optimistic Updates
        onMutate: async (newClass) => {
            await queryClient.cancelQueries('rpg-classes');
            const previousRPGClassesData = queryClient.getQueryData('rpg-classes');
            queryClient.setQueriesData('rpg-classes', (oldData) => {
                return {
                    ...oldData,
                    data: [...oldData.data, {id: oldData.data.length + 1, ...newClass}]
                }
            })
            return {
                previousRPGClassesData, // this is used to rollback data if the mutation wasn't successful
            }
        },
        onError: (_error, _class, context) => {
            queryClient.setQueryData('rpg-classes', context.previousRPGClassesData)
        },
        onSettled: () => {
            queryClient.invalidateQueries('rpg-classes');
        },
    })
}