import {useAddRpgClassData, useRpgClassesData} from "../hooks/useRpgClassesData.jsx";
import {Link} from "react-router-dom";
import {useState} from "react";
import {useRpgClassData} from "../hooks/useRpgClassData.jsx";


// features :
// *** fetching data with useQuery custom hook
export const RQClassesCustomHook = () => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');

    const {mutate: addClass} = useAddRpgClassData(); // MUTATION
    const onSuccess = (data) => {
        // alert("👏 Perform side effects after data fetching the data are " + JSON.stringify(data, undefined, 2))
    }
    const onError = (error) => {
        //  alert("🙅 ERROR!!!:  Perform side effects after data fetching Error the error is :" + JSON.stringify(error, undefined, 2))
    }
    // STEP THREE : SIMPLE GET DATA
    const {
        isLoading,
        data,
        isError,
        error,
        isFetching,// isFetching for checking for background re-fetch
        refetch // on refetch subsequent refreshes dont trigger isLoading but isFetching instead
    } = useRpgClassesData(onSuccess, onError);

    if (isLoading) {
        return <h2>Loading...</h2>
    }
    if (isError) {
        return <h2 style={{color: 'red'}}> Oops : {error.message} !!</h2>
    }

    const handleAddClassClick = () => {
        const rpgClass = {name, role}
        addClass(rpgClass);
    }
    return (
        <>
            <h2>RQ Classes Page</h2>
            <div>
                <input
                    placeholder={"RPG Class Name"}
                    style={{margin: "2%", width: 200, height: 30}}
                    type='text'
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    placeholder={"RPG Class Role"}
                    style={{margin: "2%", width: 200, height: 30}}
                    type='text'
                    value={role}
                    onChange={e => setRole(e.target.value)}
                />
                <button onClick={handleAddClassClick}>Add RPG Class</button>
            </div>
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
                        <td><Link to={`/rpg-class/${cls.myId}`}>{cls.nameAndRole}</Link></td>
                        <td>{cls.myRole}</td>
                    </tr>)
                )}  </table>
        </>
    );
}