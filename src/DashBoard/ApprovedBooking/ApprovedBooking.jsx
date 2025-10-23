import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Loading from "../../Shared/Loading/Loading";
import Swal from "sweetalert2";
import { Outlet, useNavigate } from "react-router-dom";

const ApprovedBookings = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: approvedBookings = [], isLoading, refetch } = useQuery({
        queryKey: ['approvedBookings'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/booking/approved?email=${user.email}&status=approved`)
            return res.data;
        }
    })

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/booking/${id}`)
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['approvedBookings'])
            Swal.fire('Success', 'successfuly canceled booking', 'success')
            refetch();
        },
        onError: () => {
            Swal.fire('Error!!', 'Failed to delete booking', 'error')
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
        }).then(result => {
            if (result.isConfirmed) {
                deleteMutation.mutate(id);
            }
        })
    }

    const handlePaymentNavigate = (id) => {
        navigate(`paymentPage/${id}`)
    }

    if (isLoading) {
        return <Loading></Loading>
    }


    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                ✅ Approved Bookings
            </h2>
            {approvedBookings.length === 0 &&
                <>
                    <h1 className="text-3xl p-20 border rounded-lg">there is no approved booking yet!!</h1>
                </>
            }

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {approvedBookings.map((booking) => (
                    <div
                        key={booking._id}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl p-5 transition-all duration-300 flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                {booking.courtName}
                            </h3>
                            <p className="text-sm text-gray-500 mb-1">
                                <span className="font-medium text-gray-700">Type:</span>{" "}
                                {booking.courtType}
                            </p>
                            <p className="text-sm text-gray-500 mb-1">
                                <span className="font-medium text-gray-700">Date:</span>{" "}
                                {booking.selectedDate}
                            </p>
                            <p className="text-sm text-gray-500 mb-1">
                                <span className="font-medium text-gray-700">Slot:</span>{" "}
                                {booking.selectedSlots.join(", ")}
                            </p>
                            <p className="text-sm text-gray-500 mb-1">
                                <span className="font-medium text-gray-700">Price:</span> ৳
                                {booking.totalPrice}
                            </p>
                            <p className="text-sm text-gray-500 mb-3">
                                <span className="font-medium text-gray-700">Booked by:</span>{" "}
                                {booking.requestBy}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 mt-3">
                            {/* 🔹 Payment Button (redirect later) */}
                            <button onClick={() => handlePaymentNavigate(booking._id)} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-all">
                                Pay Now
                            </button>

                            {/* 🔹 Cancel Button */}
                            <button onClick={() => handleCancel(booking._id)} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition-all">
                                Cancel
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {
                <Outlet></Outlet>
            }
        </div>
    );
};

export default ApprovedBookings;
