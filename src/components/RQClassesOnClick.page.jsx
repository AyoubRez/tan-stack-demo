import {useQuery} from "react-query";
import axios from "axios";

const fetchRpgClasses = () =>
    axios.get('http://localhost:4000/RPGClasses')

// features :
// *** fetching data with useQuery ** onClick ** success and error callbacks ** transform data
export const RQClassesPageOnClick = () => {
    const onSuccess = (data) => {
        alert("👏 Perform side effects after data fetching the data are " + JSON.stringify(data, undefined, 2))
    }
    const onError = (error) => {
        alert("🙅 ERROR!!!:  Perform side effects after data fetching Error the error is :" + JSON.stringify(error, undefined, 2))
    }
    // STEP THREE : SIMPLE GET DATA
    const {
        isLoading,
        data,
        isError,
        error,
        isFetching,// isFetching for checking for background re-fetch
        refetch // on refetch subsequent refreshes dont trigger isLoading but isFetching instead
    } = useQuery(
        'rpg-classes',
        fetchRpgClasses,
        {
            enabled: false, // STEP ONE: disable query on mount
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

    if (isLoading) {
        return <h2>Loading...</h2>
    }
    if (isError) {
        return <h2 style={{color: 'red'}}> Oops : {error.message} !!</h2>
    }
    return (
        <>
            <h2>RQ Classes Page</h2>
            <button style={{margin: "3%"}} onClick={refetch}>Fetch Classes
            </button>
            <table style={{
                width: "100%",
                padding: "10%",
                backgroundColor: "#636161"
            }}>
                <tr>
                    <th style={{
                        width: "20%"
                    }}
                    >ID
                    </th>
                    <th style={{
                        width: "40%"
                    }}>Class+Role
                    </th>
                    <th style={{
                        width: "40%"
                    }}>Role
                    </th>
                </tr>
                {data?.map(cls => (
                    <tr style={{color: "rgb(255 238 0)"}}>
                        <td>{cls.myId}</td>
                        <td>{cls.nameAndRole}</td>
                        <td>{cls.myRole}</td>
                    </tr>)
                )}  </table>
        </>
    );
}