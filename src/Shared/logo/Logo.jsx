import React from 'react';
import logo from '../../assets/logo.png'
const Logo = () => {
    return (
        <div className="flex items-center space-x-2">
            <img
                src={logo}
                alt="Logo"
                className="w-10 h-10 rounded-xl"
            />
            <span className="text-xl font-bold">Sports Club</span>
        </div>
    );
};

export default Logo;