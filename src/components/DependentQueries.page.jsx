import axios from "axios";
import {useQuery} from "react-query";


const fetchPlayerByUsername = ({queryKey}) =>
    axios.get(`http://localhost:4000/Players/${queryKey[1]}`);

const fetchRegionById = ({queryKey}) =>
    axios.get(`http://localhost:4000/Regions/${queryKey[1]}`);
export const DependentQueriesPage = ({username}) => {
    const {data: player} = useQuery(['player', username], fetchPlayerByUsername);
    const regionId = player?.data.regionId;
    const {data: region} = useQuery(['region', regionId], fetchRegionById, {enabled: !!regionId}); // when not enable the query status is idle
    return (
        <div>
            <h2>Dependent Queries </h2>
            <h2>{region?.data.regionName}</h2>
            <h3>List of Servers</h3>
            <table style={{
                width: "100%",
                backgroundColor: "#636161"
            }}>
                {region?.data.servers.map(server => (
                    <tr style={{color: "rgb(255 238 0)"}}>
                        <td>{server}</td>
                    </tr>)
                )}  </table>
        </div>
    )
}