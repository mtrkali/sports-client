import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Shared/Loading/Loading";

const ConfirmedBookings = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
  const {data:confirmedBookings=[],isLoading} = useQuery({
    queryKey: ['confirmedBookings'],
    queryFn: async()=>{
        const res = await axiosSecure.get(`/booking/confirmed?email=${user?.email}&status=confirmed`)
        return res.data
    }
  })

 if(isLoading){
    return <Loading></Loading>
 }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
        Confirmed Bookings
      </h2>

      {
        confirmedBookings.length === 0 &&
        <h1 className="bg-slate-300 text-center text-white p-20 rounded-lg text-3xl font-semibold">you have not any confirmed booking yet!!</h1>
      }

      {/* Responsive Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {confirmedBookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-5 flex flex-col justify-between"
          >
            {/* Header Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {booking.courtName}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                Type: <span className="font-medium">{booking.courtType}</span>
              </p>

              {/* Booking Info */}
              <div className="text-sm text-gray-600 space-y-1 mb-3">
                <p>
                  <span className="font-medium text-gray-700">Booking ID:</span>{" "}
                  {booking.bookingId}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Date:</span>{" "}
                  {booking.selectedDate}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Slots:</span>{" "}
                  {booking.selectedSlots.join(", ")}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Booked by:</span>{" "}
                  {booking.requestBy}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Status:</span>{" "}
                  <span className="text-green-600 font-semibold uppercase">
                    {booking.status}
                  </span>
                </p>
              </div>

              {/* Payment Info */}
              <div className="border-t border-gray-200 pt-2 mt-2">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Total Price:</span> ৳
                  {booking.totalPrice}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Paid:</span>{" "}
                  <span className="text-green-600 font-semibold">
                    ৳{booking.totalPaid}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Payment:</span>{" "}
                  {booking.payment.toUpperCase()}
                </p>
                <p className="text-xs text-gray-400">
                  Paid at: {new Date(booking.paidAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 bg-green-100 text-green-700 text-center rounded-lg py-2 font-medium text-sm">
               Payment Completed
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConfirmedBookings;
