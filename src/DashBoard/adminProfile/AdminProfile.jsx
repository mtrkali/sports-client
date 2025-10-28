import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaUserShield, FaEnvelope, FaUsers, FaUserFriends, FaTableTennis } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Shared/Loading/Loading";

const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();

  // 🔹 Fetch admin overview data
  const { data: overview = {}, isLoading } = useQuery({
    queryKey: ["adminOverview"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/overview");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const { adminInfo = {}, stats = {} } = overview;

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <h2 className="text-2xl font-bold text-blue-600 mb-6 flex items-center gap-2">
        <FaUserShield className="text-yellow-500" /> Admin Profile Overview
      </h2>

      {/* Profile Card */}
      <div className="bg-slate-200 shadow-md rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center ">
        <img
          src={adminInfo.image || "https://i.ibb.co/placeholder.png"}
          alt="Admin"
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
        />
        <div className="flex flex-col gap-2 text-gray-700">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <FaUserShield className="text-blue-500" /> {adminInfo.name}
          </h3>
          <p className="flex items-center gap-2 text-gray-600">
            <FaEnvelope className="text-blue-400" /> {adminInfo.email}
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Total Courts */}
        <div className="bg-white border shadow-sm rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition">
          <FaTableTennis className="text-4xl text-green-500" />
          <div>
            <p className="text-gray-500 text-sm">Total Courts</p>
            <h4 className="text-2xl text-black font-bold">{stats.totalCourts || 0}</h4>
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-white border shadow-sm rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition">
          <FaUsers className="text-4xl text-blue-500" />
          <div>
            <p className="text-gray-500 text-sm">Total Users</p>
            <h4 className="text-2xl text-black font-bold">{stats.totalUsers || 0}</h4>
          </div>
        </div>

        {/* Total Members */}
        <div className="bg-white border shadow-sm rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition">
          <FaUserFriends className="text-4xl text-purple-500" />
          <div>
            <p className="text-gray-500 text-sm">Total Members</p>
            <h4 className="text-2xl text-black font-bold">{stats.totalMembers || 0}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
