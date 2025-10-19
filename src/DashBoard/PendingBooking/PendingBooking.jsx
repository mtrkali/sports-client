import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../Shared/Loading/Loading";

const PendingBookings = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient()

    const { data: bookings = [], refetch, isLoading, } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/booking?email=${user.email}`)
            return res.data;
        }
    })


    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/booking/${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['bookings']);
            Swal.fire('Deleted!!', 'Booking has been removed', 'success')
            refetch
        },
        onError: () => {
            Swal.fire('Error!!', 'Failed to delete booking', 'error');
        }
    })

    const handleCancel = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(id);
            }
        })
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <section className="min-h-screen bg-gray-50 px-4 md:px-10 py-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
                Pending Bookings
            </h2>

            {/* Table Container */}
            <div className="overflow-x-auto bg-white shadow-lg rounded-2xl">
                <table className="min-w-full text-left">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th className="py-3 px-6 font-semibold">Booking ID</th>
                            <th className="py-3 px-6 font-semibold">Court</th>
                            <th className="py-3 px-6 font-semibold">Date</th>
                            <th className="py-3 px-6 font-semibold">Slots</th>
                            <th className="py-3 px-6 font-semibold">Price</th>
                            <th className="py-3 px-6 font-semibold">payment</th>
                            <th className="py-3 px-6 font-semibold">Status</th>
                            <th className="py-3 px-6 font-semibold text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr
                                key={booking._id}
                                className="border-b border-gray-200 hover:bg-gray-50 transition"
                            >
                                <td className="py-4 px-6 text-gray-700">
                                    BK- {booking.bookingId.slice(65, 90)}
                                </td>
                                <td className="py-4 px-6 font-medium text-gray-800">
                                    {booking.courtName}
                                </td>

                                <td className="py-4 px-6 text-gray-600">
                                    {new Date(booking.selectedDate).toDateString()}
                                </td>
                                <td className="py-4 px-6 text-gray-600 text-xs">
                                    {booking.selectedSlots.join(", ")}
                                </td>
                                <td className="py-4 px-6 text-gray-600">
                                    ৳{booking.totalPrice}
                                </td>
                                <td className="py-4 px-6 text-red-500">
                                    {booking.payment}
                                </td>
                                <td className="py-4 px-6">
                                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <button onClick={() => handleCancel(booking._id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Empty state example */}
            {bookings.length === 0 && <div className="text-center text-gray-500 mt-10">
                No pending bookings found.
            </div>}
        </section>
    );
};

export default PendingBookings;
