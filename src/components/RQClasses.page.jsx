import {useQuery} from "react-query";
import axios from "axios";

const fetchRpgClasses = () =>
    axios.get('http://localhost:4000/RPGClasses')

// features :
// *** fetching data with useQuery ** Handling Errors  ** devTools ** query cache ** stale time ** re-fetch defaults ** polling
export const RQClassesPage = () => {
    // STEP THREE : SIMPLE GET DATA
    const {
        isLoading,
        data,
        isError,
        error,
        isFetching // isFetching for checking for background re-fetch
    } = useQuery(
        'rpg-classes', // key
        fetchRpgClasses, // fetcher function
        { // options
            //cacheTime: 5000,//5 min by default
            //staleTime: 30000, // For how much the data is going to be fresh so no background re-fetching is needed defaults 0ms
            //refetchOnMount: "always", // default "always" or true => query re-fetch on mount if data is stale if false the data will not be fetched on page mount
            //refetchOnWindowFocus: "always", // default "always" or true => query re-fetch on window focus if data is stale if false the data will not be fetched on window focus
            //refetchInterval: 1000, // default false we can set it to a number in ms for polling data every interval and paused if window loses focus
            //refetchIntervalInBackground: true, // default false if true data will be polled even when browser not focused
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
                    }}>Class
                    </th>
                    <th style={{
                        width: "40%"
                    }}>Role
                    </th>
                </tr>
                {data?.data.map(cls => (
                    <tr style={{color: "rgb(255 238 0)"}}>
                        <td>{cls.id}</td>
                        <td>{cls.name}</td>
                        <td>{cls.role}</td>
                    </tr>)
                )}  </table>
        </>
    );
}