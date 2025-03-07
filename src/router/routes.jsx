import {createBrowserRouter} from "react-router-dom" ;
import Home from "../pages/home/Home";
import App from "../App";
import Layout from "../pages/layout/Layout";
import Profile from "../pages/profile/Profile";

export let myRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path:"/",
                element:<Home/>
            },
            {
                path:`/profile/users/:uname`,
                element:<Profile/>
            }
        ]
    }
])


