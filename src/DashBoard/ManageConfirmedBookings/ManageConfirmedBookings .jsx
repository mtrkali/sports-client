import React, { use, useState } from "react";
import { FaSearch, FaCheckCircle } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";

const ManageConfirmedBookings = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const axiosSecure = useAxiosSecure();

    const {data: bookings=[], isLoading} = useQuery({
        queryKey: ['confirmedBookings',searchTerm],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/booking/manageConfirmedBooings?query=${searchTerm}`)
            return res.data;
        }
    })

   
if(isLoading){
    return <Loading></Loading>
}
    

    return (
        <div className="p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-3">
                <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" /> Manage Confirmed Bookings
                </h2>

                {/* Search box */}
                <div className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2 w-full md:w-1/3 shadow-sm">
                    <FaSearch className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by court or booking ID"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full outline-none text-gray-700"
                        autoFocus = {true}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white shadow-md rounded-xl">
                <table className="w-full border-collapse">
                    <thead className="bg-blue-600 text-white text-sm">
                        <tr>
                            <th className="p-3 text-left">Booking ID</th>
                            <th className="p-3 text-left">Court</th>
                            <th className="p-3 text-left">Type</th>
                            <th className="p-3 text-left">Date</th>
                            <th className="p-3 text-left">Slots</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Price</th>
                            <th className="p-3 text-left">Paid</th>
                            <th className="p-3 text-left">Coupon</th>
                            <th className="p-3 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length > 0 ? (
                            bookings.map((booking) => (
                                <tr
                                    key={booking._id}
                                    className="border-b hover:bg-gray-50 transition text-black"
                                >
                                    <td className="p-3 text-sm">{booking.bookingId}</td>
                                    <td className="p-3 text-sm font-semibold text-gray-700">
                                        {booking.courtName}
                                    </td>
                                    <td className="p-3 text-sm">{booking.courtType}</td>
                                    <td className="p-3 text-sm">{booking.selectedDate}</td>
                                    <td className="p-3 text-sm">
                                        {booking.selectedSlots.join(", ")}
                                    </td>
                                    <td className="p-3 text-sm">{booking.requestBy}</td>
                                    <td className="p-3 text-sm text-gray-800 font-medium">
                                        ৳{booking.totalPrice}
                                    </td>
                                    <td className="p-3 text-sm text-green-600 font-medium">
                                        ৳{booking.totalpaid}
                                    </td>
                                    <td className="p-3 text-sm text-gray-500">
                                        {booking.usedCoupon || "—"}
                                    </td>
                                    <td className="p-3 text-sm">
                                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-semibold">
                                            {booking.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="10"
                                    className="text-center text-gray-500 py-6 text-sm"
                                >
                                    No confirmed bookings found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageConfirmedBookings;
