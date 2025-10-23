import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Shared/Loading/Loading";

const PaymentPage = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);
    const navigate = useNavigate();

    // 🔹 Load booking data
    const {
        data: booking,
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ["booking", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/${id}`);
            return res.data;
        },
    });

    useEffect(()=>{
        if(booking?.totalPrice){
            setFinalPrice(booking.totalPrice)
        }      
    },[booking])
    
  
    const {data:coupons=[]} = useQuery({
        queryKey: ['coupons'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/coupons');
            return res.data
        }
    })

    

    const { register, handleSubmit } = useForm();
    const queryClient = useQueryClient();
    const updateMutation = useMutation({
        mutationFn: async({price})=>{
            const res = await axiosSecure.patch(`/bookings/${booking._id}`,{
                status: 'confirmed',
                payment: 'paid',
                paidAt: new Date(),
                usedCoupon: coupon? coupon:'not used',
                totalpaid: Number(price),})
            return res.data;
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries(['booking']);
             Swal.fire("Success", "Payment confirmed!", "success");
             navigate(-1);
             refetch();
        }
    })

     const onSubmit = async(data) => {
    updateMutation.mutate({price:finalPrice})
    
     };

    const handleApplyCoupon = () => {
        if (!booking?.totalPrice) return;

        const found = coupons.find(coup => coup.couponCode === coupon);

        if(found){
            const newPrice = booking.totalPrice * (1-found.discount/100)
            setDiscount(found.discount)
            setFinalPrice(newPrice)
        }else{
            setDiscount(0);
            setFinalPrice(booking.totalPrice);
            Swal.fire('warning', 'Invalid coupon code', 'warning')
        }
    };

    if (isLoading) {
        return <Loading></Loading>
    }

    if (!booking) {
        return (
            <div className="flex items-center justify-center h-screen text-red-500 text-lg">
                Booking not found!
            </div>
        );
    }

    return (
        <div className="min-h-screen  bg-gray-50 flex items-center justify-center p-4 md:p-10 text-black fixed inset-0 z-50">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6 md:p-10 relative">
                {/* Header */}
                <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
                 Payment Page
                </h2>

                <span onClick={() => navigate(-1)} className="bg-red-500 p-2 rounded-lg absolute top-3 right-3">X</span>

                {/* Coupon Section */}
                <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
                    <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <button
                        onClick={handleApplyCoupon}
                        type="button"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all"
                    >
                        Apply
                    </button>
                </div> 

                {/* Payment Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            readOnly
                            defaultValue={booking.requestBy}
                            {...register("email")}
                            className="w-full border border-gray-300 bg-gray-100 rounded-lg px-3 py-2 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                            Court Type
                        </label>
                        <input
                            type="text"
                            readOnly
                            defaultValue={booking.courtType}
                            {...register("courtType")}
                            className="w-full border border-gray-300 bg-gray-100 rounded-lg px-3 py-2 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                            Slots
                        </label>
                        <input
                            type="text"
                            readOnly
                            defaultValue={booking?.selectedSlots?.join(", ")}
                            {...register("slots")}
                            className="w-full border border-gray-300 bg-gray-100 rounded-lg px-3 py-2 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                            Date
                        </label>
                        <input
                            type="text"
                            readOnly
                            defaultValue={booking.selectedDate}
                            {...register("date")}
                            className="w-full border border-gray-300 bg-gray-100 rounded-lg px-3 py-2 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                            Price {discount > 0 && <span className="text-green-600">(−{discount}%)</span>}
                        </label>
                        <input
                            type="text"
                            readOnly
                            value={`${finalPrice.toFixed(2)} TK`}
                           
                            className="w-full border border-gray-300 bg-gray-100 rounded-lg px-3 py-2 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                    >
                        Confirm Payment
                    </button>
                </form>

                <p className="text-xs text-center text-gray-500 mt-5">
                    Your payment information is secure
                </p>
            </div>
        </div>
    );
};

export default PaymentPage;
