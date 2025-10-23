import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaWallet } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Shared/Loading/Loading";

const PaymentHistory = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
  const {data: payments =[], isLoading} = useQuery({
    queryKey: ['payments'],
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
      <h2 className="text-2xl md:text-3xl font-bold flex gap-2 justify-center items-center text-gray-800 mb-8">
        <FaWallet className="text-slate-500"/> Payment History
      </h2>

      {/* Table Container */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
        <table className="min-w-full border-collapse text-sm md:text-base">
          <thead className="bg-green-200 text-gray-700 uppercase text-xs md:text-sm">
            <tr>
              <th className="px-4 py-3 text-left">Booking ID</th>
              <th className="px-4 py-3 text-left">Court</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-right">Total (৳)</th>
              <th className="px-4 py-3 text-right">Paid (৳)</th>
              <th className="px-4 py-3 text-left">Coupon</th>
              <th className="px-4 py-3 text-left">Paid At</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p) => (
              <tr
                key={p._id}
                className="hover:bg-gray-50 transition-colors text-black"
              >
                <td className="px-4 py-3">BK- {p.bookingId.slice(65,90)}</td>
                <td className="px-4 py-3">{p.courtName}</td>
                <td className="px-4 py-3 text-sm">{p.selectedDate}</td>
                <td className="px-4 py-3 text-sm">{p.requestBy}</td>
                <td className="px-4 py-3 text-right">{p.totalPrice}</td>
                <td className="px-4 py-3 text-right text-green-600 font-medium">
                  {p.totalpaid}
                </td>
                <td className="px-4 py-3 text-green-500">
                  {p.usedCoupon}
                </td>
                <td className="px-4 py-3 text-gray-500 text-sm">
                  {new Date(p.paidAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* If no data */}
      {payments.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No payment history available.
        </p>
      )}
    </div>
  );
};

export default PaymentHistory;
