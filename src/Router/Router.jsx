import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Home from "../Pages/Home/home";
import CourtsPage from "../Pages/CourtsPage/CourtsPage";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../Authentication/Login/Login";
import Register from "../Authentication/Register/Register";
import BookingDetails from "../Pages/BookingDetailsPage/BookingDetails";
import PrivateRoute from '../routes/priateRoute/PrivateRoute'
import DashBoardLayout from "../Layouts/DashBoardLayout/DashBoardLayout";
import MyProfile from "../DashBoard/MyProfile/MyProfile";
import PendingBookings from "../DashBoard/PendingBooking/PendingBooking";
import Announcements from "../DashBoard/Announcements/Announcements";
import ApprovedBooking from "../DashBoard/ApprovedBooking/ApprovedBooking";
import PaymentPage from "../DashBoard/ApprovedBooking/PaymentPage";
import ManageCoupons from "../DashBoard/ManageCoupons/ManageCoupons";
import ConfirmedBookings from "../DashBoard/ConfirmedBookings/ConfirmedBookings";
import PaymentHistory from "../DashBoard/PaymentHistory/PaymentHIstory";
import ManageBookings from "../DashBoard/ManageBookings/ManageBookings";
import ManageMembers from "../DashBoard/ManageMembers/ManageMembers";
import AllUsers from "../DashBoard/AllUser/AllUser";
import ManageCourts from "../DashBoard/ManageCourts/ManageCourts";

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
                        element: <PrivateRoute><BookingDetails modal={true}></BookingDetails></PrivateRoute>
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
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
        children: [
            {
                index: true,
                Component: MyProfile,
            },
            {
                path: 'pendingBooking',
                Component: PendingBookings,
            },
            {
                path: 'announcements',
                Component: Announcements,
            },
            {
                path: 'approvedBooking',
                Component: ApprovedBooking,
                children: [
                    {
                        path: 'paymentPage/:id',
                        Component: PaymentPage,
                    }
                ]
            },
            {
                path: 'manageCoupons',
                Component: ManageCoupons,
            },
            {
                path: 'confirmedBookings',
                Component: ConfirmedBookings,
            },
            {
                path: 'paymentHistory',
                Component: PaymentHistory,
            },
            {
                path: 'manageBookings',
                Component: ManageBookings,
            },
            {
                path: 'manageMembers',
                Component: ManageMembers,
            },
            {
                path: 'allUser',
                Component: AllUsers,
            },
            {
                path: 'mangeCourts',
                Component: ManageCourts,
            },
        ]
    }
])