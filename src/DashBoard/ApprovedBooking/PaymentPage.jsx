import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const PaymentPage = () => {
    const { id } = useParams();
    const [coupon, setCoupon] = useState('')
    const [discount, setDiscount] = useState(0);
    const booking = {
        bookingId: "BK-Fri Oct 17 2025 11:15:00 GMT+0600 - 101",
        courtName: "Tennis Court A",
        courtType: "Tennis",
        selectedDate: "2025-10-18",
        selectedSlots: ["9:00 AM - 10:00 AM"],
        totalPrice: "700",
    };
    const [finalPrice, setFinalPrice] = useState(booking.totalPrice)

    const { register, handleSubmit, formState: { errors }, } = useForm()
    const onsubmit = (data) => {
        console.log('this form data', data);
    }

    const handleApplyCoupon = () => {
        if (coupon === 'ABC') {
            const newPrice = booking.totalPrice * 0.95
            setDiscount(5);
            setFinalPrice(newPrice);
        } else if (coupon === 'SPORTS10') {
            const newPrice = booking.totalPrice * 0.90;
            setDiscount(10);
            setFinalPrice(newPrice)
        } else {
            setDiscount(0);
            setFinalPrice(booking.totalPrice)
            Swal.fire('Warning', 'Invalid coupon code', 'warning')
        }
    }


    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-10 fixed inset-0 text-black">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6 md:p-10">
                {/* Header */}
                <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
                    💳 Payment Page
                </h2>

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
                <form onSubmit={handleSubmit(onsubmit)} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            readOnly
                            defaultValue={booking.email}
                            {...register("email")}
                            className="w-full border text-black border-gray-300 bg-gray-100 rounded-lg px-3 py-2 focus:outline-none"
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
                            defaultValue={booking.selectedSlots.join(", ")}
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
                            value={`৳ ${finalPrice}`}
                            {...register("price")}
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

                {/* Footer */}
                <p className="text-xs text-center text-gray-500 mt-5">
                    Your payment information is secure 🔒
                </p>
            </div>
        </div>
    );
};

export default PaymentPage;
