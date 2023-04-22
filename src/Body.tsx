import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Contests from "./contests/Contests";
import TrendingSymbols from "./symbols/symbols/TrendingSymbols";
import ProtectedRoute from "./config/ProtectedRoute";
import UserDetails from "./userdetails/UserDetails";
import AdminContests from "./admin/AdminContests";
import AdminCreateContest from "./admin/AdminCreateContest";
import {AdminUpdateContestForm} from "./admin/AdminUpdateContestForm";
import SymbolDetails from "./symboldetails/SymbolDetails";
import {ContestDetails} from "./contestdetails/ContestDetails";
import {Leaderboard} from "./leaderboard/Leaderboard";
import {DefaultNavigation} from "./navigation/default/DefaultNavigation";
import {AdminNavigation} from "./navigation/admin/AdminNavigation";
import AccountDetails from "./account/AccountDetails";


const getProtectedComponent = (child: JSX.Element) => {
    return (
        <ProtectedRoute>
            <DefaultNavigation/>
            {child}
        </ProtectedRoute>
    )
}

const getProtectedAdminComponent = (child: JSX.Element) => {
    return (
        <ProtectedRoute>
            <AdminNavigation/>
            {child}
        </ProtectedRoute>
    )
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/*"
                element={getProtectedComponent(<TrendingSymbols/>)}
            />
            <Route path="contests"
                element={getProtectedComponent(<Contests/>)}
            />
            <Route path="contest/:contestNumber"
                element={getProtectedComponent(<ContestDetails/>)}
            />
            <Route path="leaderboard"
                element={getProtectedComponent(<Leaderboard/>)}
            />
            <Route path="symbol/:symbol"
                element={getProtectedComponent(<SymbolDetails/>)}
            />
            <Route path="account"
                element={getProtectedComponent(<AccountDetails/>)}
            />
            <Route path="user/:username"
                element={getProtectedComponent(<UserDetails/>)}
            />
            <Route path="admin/contests"
                element={getProtectedAdminComponent(<AdminContests/>)}
            />
            <Route path="admin/contests/create"
                element={getProtectedAdminComponent(<AdminCreateContest/>)}
            />
            <Route path="admin/contests/update"
                element={getProtectedComponent(<AdminUpdateContestForm/>)}
            />
        </Route>
    )
);


const Body = () => {
    return (
        <RouterProvider router={router}/>
    );
}

export default Body;
