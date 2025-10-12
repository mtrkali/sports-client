import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Home from "../Pages/Home/home";
import CourtsPage from "../Pages/CourtsPage/CourtsPage";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../Authentication/Login/Login";
import Register from "../Authentication/Register/Register";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children:[
            {
                index:true,
                Component: Home,
            },
            {
                path: 'courts',
                Component: CourtsPage
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login,
            },
            {
                path: 'register',
                Component: Register,
            }
        ]
    }
])