import axios from "axios";
import {useInfiniteQuery} from "react-query";
import {Fragment} from "react";

const fetchGuildMembers = ({pageParam = 1}) => {
    return axios.get(`http://localhost:4000/guildMembers?_page=${pageParam}&_per_page=2`)
}

export const InfiniteQueriesPage = () => {
    const {
        isLoading,
        isError,
        error,
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage
    } = useInfiniteQuery(['infiniteGuildMembers'], fetchGuildMembers, {
        getNextPageParam: (_lastPage, pages) => {
            console.log(_lastPage);
            if (pages.length < _lastPage.data.pages) {
                return pages.length + 1
            } else {
                return undefined
            }
        }
    })

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }
    return (
        <>
            <div>
                {data?.pages.map((group, i) => {
                    return (
                        <Fragment key={i}>
                            {group.data.data.map(member => (
                                <h2 key={member.id}>
                                    {member.id} {member.name}
                                </h2>
                            ))}
                        </Fragment>
                    )
                })}
            </div>
            <div>
                <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
                    Load more
                </button>
            </div>
            <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
        </>
    )
}