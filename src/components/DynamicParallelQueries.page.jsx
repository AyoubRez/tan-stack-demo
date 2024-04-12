import axios from "axios";
import {useQueries} from "react-query";

const fetchRpgClass = (classId) =>
    axios.get(`http://localhost:4000/RPGClasses/${classId}`)

// feature avoid hook rule error we can't use useQuery in a for loop
export const DynamicParallelQueriesPage = ({classIds}) => {
    const queryResults = useQueries(
        classIds.map((id) => ({
            queryKey: ['rpg-class', id],
            queryFn: () => fetchRpgClass(id)
        })));
    console.log(queryResults);
    return (
        <div>
            <h2>Parallel Queries Page</h2>
            {queryResults.map(result =>
                <div style={{margin: "10%"}}>
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
                        <tr style={{color: "rgb(255 238 0)"}}>
                            <td>{result.data?.data.id}</td>
                            <td>{result.data?.data.name}</td>
                            <td>{result.data?.data.role}</td>
                        </tr>
                    </table>
                </div>
            )}
        </div>

    )
}