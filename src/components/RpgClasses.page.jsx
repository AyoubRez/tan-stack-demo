import {useEffect, useState} from "react";
import axios from "axios";

export const RpgClassesPage = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        axios.get('http://localhost:4000/RPGClasses').then(res => {
            setData(res.data)
        }).catch(error => {
            setError(error.message)
        }).finally(() => {
            setIsLoading(false)
        })
    }, [])

    if (isLoading) {
        return <h2>Loading...</h2>
    }
    if (error) {
        return <h2 style={{color: 'red'}}> Oops : {error} !!</h2>
    }

    return (
        <>
            <h2>RPG Classes</h2>
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
                {data.map(cls => (
                    <tr style={{color: "rgb(255 238 0)"}}>
                        <td>{cls.id}</td>
                        <td>{cls.name}</td>
                        <td>{cls.role}</td>
                    </tr>)
                )}  </table>
        </>
    );
}