import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const UserProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: userProfiles = {} } = useQuery({
        queryKey: ['user', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user.email}`)
            return res.data;
        }
    })

    const dateFormater = (isoDate) => {
        const formatedDate = new Date(isoDate).toLocaleDateString('en-us', { month: 'long', day: 'numeric', year: 'numeric' })
        return formatedDate;
    }

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-16">
            {
                userProfiles.map(userProfile => (
                    <div key={userProfile._id} className="bg-white rounded-2xl shadow-lg p-8 md:p-10 w-full max-w-lg">
                        {/* Profile Header */}
                        <div className="flex flex-col items-center text-center">
                            {/* Profile Image */}
                            <img
                                src={user.photoURL}
                                alt="User Profile"
                                className="w-28 h-28 rounded-full border-4 border-indigo-500 shadow-md mb-4 object-cover"
                            />

                            {/* Name & Email */}
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                                {userProfile.name}
                            </h2>
                            <p className="text-gray-500 text-sm md:text-base mb-2">
                                {user.displayName}
                            </p>

                            {/* Registration Date */}
                            <p className="text-gray-600 text-sm">
                                Registration Date: <span className="font-semibold">{dateFormater(userProfile.createdAt)}</span>
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-200 my-8"></div>

                        {/* Extra Info (Static placeholder) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
                            <div className="bg-gray-100 rounded-xl p-4 shadow-sm">
                                <p className="text-gray-500 text-sm">last signIn</p>
                                <p className="text-xl font-semibold text-indigo-600">{userProfile.last_signIn ? dateFormater(userProfile.last_signIn) : 'first time login'}</p>
                            </div>
                            <div className="bg-gray-100 rounded-xl p-4 shadow-sm">
                                <p className="text-gray-500 text-sm">Membership Type</p>
                                <p className="text-xl font-semibold text-indigo-600">{userProfile.role}</p>
                            </div>
                        </div>

                        <p className="p-3 bg-gray-300 text-black my-3 rounded-lg">Register Date: {dateFormater(userProfile.createdAt)}</p>

                        {/* Edit Button (Static for now) */}
                        <div className="mt-10 text-center">
                            <button className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 transition">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                ))
            }
        </section>
    );
};

export default UserProfile;
