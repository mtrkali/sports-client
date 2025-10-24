import React, { useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageMembers = () => {
    const axiosSecure = useAxiosSecure();
    const [searchQuery, setSearchQuery] = useState("");

    const { data: members = [],refetch } = useQuery({
        queryKey: ['members', searchQuery],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/member?search=${searchQuery}`)
            return res.data
        }
    })

    const queryClient = useQueryClient();
    const updateMutaion = useMutation({
        mutationFn: async (email) => {
            const res = await axiosSecure.patch(`/users/rejectmember/${email}`, { role: 'user' })
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['members'])
            Swal.fire('Success!!', 'user successfully deleted', 'success');
            refetch();
        }
    })

    const handleDelete = (email) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(result =>{
            if(result.isConfirmed){
                updateMutaion.mutate(email);
            }
        })
    }


    



    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            <h2 className="text-2xl md:text-3xl font-bold flex justify-center items-center gap-2 text-gray-800 mb-8">
                <FaUserFriends /> Manage Members
            </h2>

            {/* Search Input */}
            <div className="flex items-center mb-6 max-w-md mx-auto">
                <FiSearch className="text-gray-500 mr-2 text-xl" />
                <input
                    type="text"
                    placeholder="Search by member name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 border text-black border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>

            {/* Members List */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {members.map((member) => (
                    <div
                        key={member._id}
                        className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition-all"
                    >
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                {member.name}
                            </h3>
                            <p className="text-sm text-gray-500 mb-1">Email: {member.email}</p>
                            <p className="text-sm text-gray-500 mb-1">
                                Role:{" "}
                                <span className="text-green-600 font-medium">
                                    {member.role}
                                </span>
                            </p>
                            <p className="text-xs text-gray-400">
                                Last Sign-in: {new Date(member.last_signIn).toLocaleString()}
                            </p>
                        </div>

                        {/* Delete Button */}
                        <button onClick={() => handleDelete(member.email)} className="mt-4 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition-all">
                            <FiTrash2 /> Delete
                        </button>
                    </div>
                ))}

                {members.length === 0 && (
                    <p className="text-center text-gray-500 col-span-full">
                        No members found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ManageMembers;
