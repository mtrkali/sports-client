import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Home from "../Pages/Home/home";
import CourtsPage from "../Pages/CourtsPage/CourtsPage";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../Authentication/Login/Login";
import Register from "../Authentication/Register/Register";
import BookingDetails from "../Pages/BookingDetailsPage/BookingDetails";
import PrivateRoute from '../routes/priateRoute/PrivateRoute'

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: 'courts',
                element: <CourtsPage></CourtsPage>,
                children: [
                    {
                        path: 'bookingDetails/:id',
                        element: <PrivateRoute><BookingDetails modal = {true}></BookingDetails></PrivateRoute>
                    }
                ]
            },

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