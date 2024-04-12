import {useParams} from 'react-router-dom'
import {useRpgClassData} from "../hooks/useRpgClassData.jsx";


export const RQRpgClassPage = () => {
    const {classId} = useParams()
    const {isLoading, data, isError, error} = useRpgClassData(classId);

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }
    return (
        <div>
            <h2>RPG Class Details</h2>
            {data.data.name} - {data.data.role}
        </div>
    )
}