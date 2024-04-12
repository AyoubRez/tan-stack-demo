import {RpgClassesPage} from "./components/RpgClasses.page.jsx";
import {RQClassesPage} from "./components/RQClasses.page.jsx";
import {HomePage} from "./components/Home.page.jsx";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './App.css'
import {RootLayer} from "./components/Root.layer.jsx";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import {RQClassesPageOnClick} from "./components/RQClassesOnClick.page.jsx";
import {RQClassesCustomHook} from "./components/RQClassesCustomHook.page.jsx";
import {RQRpgClassPage} from "./components/RQClass.page.jsx";
import {ParallelQueriesPage} from "./components/ParallelQueries.page.jsx";
import {DynamicParallelQueriesPage} from "./components/DynamicParallelQueries.page.jsx";
import {DependentQueriesPage} from "./components/DependentQueries.page.jsx";
import {PaginatedQueriesPage} from "./components/PaginatedQueries.page.jsx";
import {InfiniteQueriesPage} from "./components/InfiniteQueries.page.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayer/>,
        children: [
            {
                path: "",
                element: <HomePage/>,
            },
            {
                path: "rpg-classes-traditional",
                element: <RpgClassesPage/>,
            },
            {
                path: "rpg-classes-rq",
                element: <RQClassesPage/>,
            },
            {
                path: "rpg-classes-rq-on-click",
                element: <RQClassesPageOnClick/>,
            },
            {
                path: "rpg-classes-rq-custom",
                element: <RQClassesCustomHook/>,
            },
            {
                path: "rpg-class/:classId",
                element: <RQRpgClassPage/>,
            },
            {
                path: "rq-parallel",
                element: <ParallelQueriesPage/>,
            },
            {
                path: "rq-dynamic-parallel",
                element: <DynamicParallelQueriesPage classIds={[1, 3]}/>,
            },
            {
                path: "rq-dependent",
                element: <DependentQueriesPage username={"JohnCena123"}/>,
            },
            {
                path: "rq-paginated",
                element: <PaginatedQueriesPage/>,
            },
            {
                path: "rq-infinite-paginated",
                element: <InfiniteQueriesPage/>,
            },
        ]
    },

]);

// STEP ONE
const queryClient = new QueryClient();

function App() {
    return (
        // STEP TWO
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
            <ReactQueryDevtools position={"bottom-right"}/>
        </QueryClientProvider>
    )
}

export default App
