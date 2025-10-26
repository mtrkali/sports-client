import React from 'react';
import Logo from '../../Shared/logo/Logo'
import { NavLink, Outlet } from 'react-router-dom';
import { FaBullhorn, FaCheckCircle, FaHome, FaMoneyCheckAlt, FaRegCheckCircle, FaTableTennis, FaTags, FaTasks, FaUser, FaUserFriends, FaUserTie } from 'react-icons/fa';


const DashBoardLayout = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">

                {/* Navbar */}
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none ">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>

                </div>
                {/* Page content here */}
                <Outlet></Outlet>
                {/* Page content here */}

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <Logo></Logo>
                    <li>
                        <NavLink to="/">
                            <FaHome /> Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard">
                            <FaUser /> my profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/pendingBooking">
                           <FaTasks /> pending booking
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/announcements">
                           <FaBullhorn />announcements
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/approvedBooking">
                           <FaCheckCircle />approved Booking
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manageCoupons">
                          <FaTags /> manageCoupons
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/confirmedBookings">
                          <FaRegCheckCircle /> cinfirmed bookings
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/paymentHistory">
                          <FaMoneyCheckAlt /> payment history
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manageBookings">
                          <FaTasks /> manage bookings
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manageMembers">
                          <FaUserFriends /> manage member
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/allUser">
                          <FaUserTie /> all user
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/mangeCourts">
                          <FaTableTennis /> manage courts
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DashBoardLayout;