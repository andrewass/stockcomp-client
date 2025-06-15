import React from "react";
import ReactDOM from "react-dom/client";
import "./root.css";
import App from "./App";

/*
const ProtectedComponent = () => {
    return (
        <ProtectedRoute>
            <DefaultNavigation/>
            <DefaultLayout>
                <Outlet/>
            </DefaultLayout>
        </ProtectedRoute>
    );
}


const AdminLayoutComponent = () => (
    <ProtectedRoute>
        <AdminNavigation/>
        <DefaultLayout>
            <Outlet/>
        </DefaultLayout>
    </ProtectedRoute>
);

const router = createBrowserRouter([
        {
            element: <ProtectedComponent/>,
            children: [
                {path: "symbols", element: <SymbolsPage/>},
                {path: "symbols/:symbol", element: <SymbolDetailsPage/>},
                {path: "leaderboard", element: <Leaderboard/>},
                {path: "contests", element: <ContestsPage/>},
                {path: "contests/:contestId", element: <ContestPage/>},
                {path: "leaderboard", element: <Leaderboard/>},
                {path: "account", element: <AccountDetails/>},
                {path: "user/:username", element: <UserDetails/>}
            ]
        },
        {
            element: <AdminLayoutComponent/>,
            children: [
                {path: "admin/", element: <AdminContestsPage/>},
                {path: "admin/contests", element: <AdminContestsPage/>},
                {path: "admin/users", element: <AdminUsers/>}
            ]
        },
    ]
);


 */

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
