import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FaTasks } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Shared/Loading/Loading";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const ManageBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient();
  const { data: bookings = [], isLoading, refetch } = useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const res = await axiosSecure.get('/booking/pending?status=pending')
      return res.data
    }
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, userEmail }) => {
      await axiosSecure.patch(`/booking/approve/${id}`, { status: 'approved', approvedAt: new Date() })
      await axiosSecure.patch(`/users/${userEmail}`, { role: 'member', memberAt: new Date() })
      return 'done';
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['bookings'])
      queryClient.invalidateQueries(['users'])
      refetch();
      Swal.fire('Approved!', 'request approved successfully', 'success')
    }
  })

  const deleteMutaion = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/booking/${id}`)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['bookings'])
      refetch();
      Swal.fire('Success!', 'successfully reject request', 'success')
    }
  })

  const hadleReject = (id) => {
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
        deleteMutaion.mutate(id);
      }
    })
  }

  if (isLoading) {
    return <Loading></Loading>
  }
  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl md:text-3xl font-bold flex justify-center items-center gap-2 text-slate-500 mb-8 ">
        <FaTasks className="text-amber-500" /> Manage Bookings
      </h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-2xl">
        <table className="min-w-full border-collapse text-sm md:text-base">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs md:text-sm">
            <tr>
              <th className="px-4 py-3 text-left">Booking ID</th>
              <th className="px-4 py-3 text-left">Court</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Slots</th>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-right">Price (৳)</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr
                key={b._id}
                className="hover:bg-gray-50 transition-colors text-black"
              >
                <td className="px-4 py-3">BK- {b.bookingId.slice(65, 90)}</td>
                <td className="px-4 py-3">{b.courtName}</td>
                <td className="px-4 py-3">{b.selectedDate}</td>
                <td className="px-4 py-3">
                  {b.selectedSlots.map((slot, i) => (
                    <div key={i} className="text-gray-700">
                      {slot}
                    </div>
                  ))}
                </td>
                <td className="px-4 py-3">{b.requestBy}</td>
                <td className="px-4 py-3 text-right font-medium">
                  {b.totalPrice}
                </td>

                <td className="px-4 py-3 text-center space-x-2">
                  {/* Accept Button */}
                  <button
                    onClick={() => updateMutation.mutate({ id: b._id, userEmail: b.requestBy })}
                    className="px-3 py-1 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
                  >
                    Approve
                  </button>

                  {/* Reject Button */}
                  <button
                    onClick={() => hadleReject(b._id)}
                    className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* If no bookings */}
      {bookings.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No booking requests available.
        </p>
      )}
    </div>
  );
};

export default ManageBookings;
