import React from 'react';
import { NavLink, Outlet } from 'react-router';
import Logo from '../../Shared/logo/Logo';
import authImg from '../../assets/authImg.jpg'
import { Link } from 'lucide-react';

const AuthLayout = () => {
    return (
        <div className="p-0 md:p-12 bg-base-200">
            <div>
                <NavLink to='/'><Logo/></NavLink>
            </div>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className='hidden md:flex-1 '>
                    <img
                        src={authImg}
                        className="rounded-lg shadow-2xl h-[580px] w-full"
                    />
                </div>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;