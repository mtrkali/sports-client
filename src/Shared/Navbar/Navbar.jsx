import React, { useState } from "react";
import logo from '../../assets/logo.png'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const isLoggedIn = false; // change to true to show Profile
    const [user, setUser] = useState({ name: "name", email: 'email.com' })

    return (
        <nav className="bg-gray-800 text-white px-2 md:px-6 lg:px-6 py-4">
            <div className="flex justify-between items-center">
                {/* Logo + Site Name */}
                <div className="flex items-center space-x-2">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-10 h-10 rounded-xl"
                    />
                    <span className="text-xl font-bold">Sports Club</span>
                </div>

                {/* Desktop Links */}
                <ul className="hidden md:flex space-x-6">
                    <li className="hover:text-gray-300 cursor-pointer">Home</li>
                    <li className="hover:text-gray-300 cursor-pointer">Courts</li>

                </ul>


                <div className="flex items-center gap-3">
                    {
                        user ?
                            <>
                                <div className="dropdown dropdown-bottom dropdown-end">
                                    <div tabIndex={0} role="button" className=""> <img src={logo} className="h-8 w-8 rounded-full" alt="" /> </div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                        <li><a>Item 1</a></li>
                                        <li><a>dashboard</a></li>
                                        <li><a>log out</a></li>
                                    </ul>
                                </div>
                            </>
                            :
                            <><button className="btn btn-secondary">button</button></>
                    }
                    {/* Mobile Hamburger */}
                    <div className="md:hidden">
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
                    <li className="hover:text-gray-300 cursor-pointer">Home</li>
                    <li className="hover:text-gray-300 cursor-pointer">Courts</li>
                </ul>
            )}

        </nav>
    );
};

export default Navbar;
