import axios from "axios";
import {useQuery} from "react-query";

const fetchRpgClasses = () =>
    axios.get('http://localhost:4000/RPGClasses')

const fetchRpgJobs = () =>
    axios.get('http://localhost:4000/RPGJobs')


export const ParallelQueriesPage = () => {
    const {data: rpgClasses} = useQuery('rpg-classes', fetchRpgClasses);
    const {data: rpgJobs} = useQuery('rpg-jobs', fetchRpgJobs);
    return (
        <div>
            <h2>Parallel Queries Page</h2>
            <div style={{margin: "10%"}}>
                <h2>RPG Classes : </h2>
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
                    {rpgClasses?.data.map(cls => (
                        <tr style={{color: "rgb(255 238 0)"}}>
                            <td>{cls.id}</td>
                            <td>{cls.name}</td>
                            <td>{cls.role}</td>
                        </tr>)
                    )}  </table>
            </div>

            <div style={{margin: "10%"}}>
                <h2>RPG JOBS : </h2>
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
                        }}>JOB TITLE
                        </th>
                    </tr>
                    {rpgJobs?.data.map(job => (
                        <tr style={{color: "rgb(255 238 0)"}}>
                            <td>{job.id}</td>
                            <td>{job.name}</td>
                        </tr>)
                    )}  </table>
            </div>
        </div>

    )
}