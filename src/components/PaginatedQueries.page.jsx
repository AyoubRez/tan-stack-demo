import axios from "axios";
import {useState} from "react";
import {useQuery} from "react-query";

const fetchGuildMembers = pageNumber => {
    return axios.get(`http://localhost:4000/guildMembers?_page=${pageNumber}&_per_page=2`)
}

export const PaginatedQueriesPage = () => {
    const [pageNumber, setPageNumber] = useState(1)
    const {isLoading, isError, error, data, isFetching} = useQuery(
        ['guildMembers', pageNumber],
        () => fetchGuildMembers(pageNumber),
        {
            keepPreviousData: true // maintain data even though the query key has changed
        }
    )

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }

    return (
        <>
            <div>
                {data?.data.data.map(member => {
                    return (
                        <div key={member.id}>
                            <h2>
                                {member.id}. {member.name}
                            </h2>
                        </div>
                    )
                })}
            </div>
            <div>
                <button
                    onClick={() => setPageNumber(page => page - 1)}
                    disabled={pageNumber === 1}>
                    Prev Page
                </button>
                <button
                    onClick={() => setPageNumber(page => page + 1)}
                    disabled={pageNumber === 4}>
                    Next Page
                </button>
            </div>
            {isFetching && 'Loading'}
        </>
    )
}