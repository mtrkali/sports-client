import React, { useState } from "react";
import logo from '../../assets/logo.png'
import { Link, NavLink } from "react-router-dom";
import Logo from "../logo/Logo";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                console.log('logout successfull')
            }).catch(err => {
                console.error('error in logout function', err)
            })
    }

    return (
        <nav className="bg-slate-700 text-white px-2 md:px-6 lg:px-6 py-2 border-b-4 border-t-1 border-slate-200 mb-1 rounded-2xl">
            <div className="flex justify-between items-center">
                <Logo />

                {/* Desktop Links */}
                <ul className="hidden md:flex space-x-6">
                    <NavLink to='/'><li className="hover:text-gray-300 cursor-pointer">Home</li></NavLink>
                    <NavLink to='/courts'><li className="hover:text-gray-300 cursor-pointer">Courts</li></NavLink>
                </ul>


                <div className="flex items-center gap-3">
                    {
                        user ?
                            <>
                                <div className="dropdown dropdown-bottom dropdown-end border-3 border-amber-400 rounded-full p-1">
                                    <div tabIndex={0} role="button" className=""> <img src={user?.photoURL || logo} className="h-8 w-8 rounded-full" alt="" /> </div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                        <li className="font-semibold"><a>{user?.displayName}</a></li>
                                        <li className="underline"><NavLink to='/dashboard'>DashBoard</NavLink></li>
                                        <li className="underline" onClick={handleLogOut}><a>log out</a></li>
                                    </ul>
                                </div>
                            </>
                            :
                            <><NavLink to='/login'><button className="btn btn-secondary">log In</button></NavLink></>
                    }
                    {/* Mobile Hamburger */}
                    <div className="md:hidden mt-2">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="focus:outline-none"
                        >
                            <svg
                                className="w-8 h-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <ul className="md:hidden mt-4 space-y-2">
                    <NavLink to='/'><li className="hover:text-gray-300 cursor-pointer">Home</li></NavLink>
                    <NavLink to='/courts'><li className="hover:text-gray-300 cursor-pointer">Courts</li></NavLink>
                </ul>
            )}

        </nav>
    );
};

export default Navbar;
