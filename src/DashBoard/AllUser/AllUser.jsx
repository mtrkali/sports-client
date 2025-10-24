import React, { useState } from "react";
import { FaUser, FaEnvelope, FaSearch } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  const { data: users = [], refetch, } = useQuery({
    queryKey: ['users', search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?name=${search}`)
      return res.data;
    }
  })

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/users/${id}`)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      refetch();
      Swal.fire('Success!!', 'user successfully removed', 'success')
    }
  })

  const handleDelete = (id) => {
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
        deleteMutation.mutate(id);
      }
    })
  }




  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaUser className="text-blue-500" /> All Users
      </h2>

      {/* 🔍 Search Bar */}
      <div className="relative w-full md:w-1/2 mb-6">
        <FaSearch className="absolute left-3 top-3 text-gray-500" />
        <input
          type="text"
          placeholder="Search user by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* 👥 Users Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaUser className="text-blue-500 text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-black">{user.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <FaEnvelope /> {user.email}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-600">
                Role: <span className="font-medium">{user.role}</span>
              </p>
              <p className="text-sm text-gray-500">
                Joined: {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>

            <button onClick={()=>handleDelete(user._id)} className="mt-4 bg-red-500 text-white py-1.5 rounded-lg hover:bg-red-600 transition">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
