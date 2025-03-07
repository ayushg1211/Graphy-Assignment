import {createBrowserRouter} from "react-router-dom" ;
// import App from "../App";
import Layout from "../pages/layout/Layout";
import Profile from "../pages/profile/Profile";
import Search from "../pages/search/Search";

export let myRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path:"/",
                element:<Search/>
            },
            {
                path:`/profile/users/:uname`,
                element:<Profile/>
            }
        ]
    }
])


