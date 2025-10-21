import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../Shared/Loading/Loading";

const ManageCoupons = () => {
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const [editingCoupon, setEditingCoupon] = useState(null);
    

    const { data: coupons = [], isLoading, refetch } = useQuery({
        queryKey: ['coupons'],
        queryFn: async () => {
            const res = await axiosSecure.get('/coupons')
            return res.data;
        }
    })

    const addMutation = useMutation({
        mutationFn: async (newCoupon) => {
            const res = await axiosSecure.post('/coupons', newCoupon)
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['coupons'])
            Swal.fire('Success!', 'coupon added successfully', 'success')
            refetch();
        }
    })

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/coupons/${id}`);
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['coupons'])
            Swal.fire('Success!', 'coupon deleted successfully', 'success')
            refetch()
        }
    })
    const updateMutation = useMutation({
        mutationFn: async ({ id, updatedCoupon }) => {
            const res = await axiosSecure.patch(`/coupons/${id}`, updatedCoupon);
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['coupons'])
            Swal.fire('Updated!', 'coupon updated successfully', 'success')
            setEditingCoupon(null);
            refetch();
        }
    })

    const onsubmit = (data) => {
        const newCoupon = {
            couponCode: data.code,
            discount: Number(data.discount),
            expiredDate: new Date(data.date),
            createAt: new Date(),
        }
        addMutation.mutate(newCoupon);
        reset();
    }

    const handleDelete = id => {
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
                deleteMutation.mutate(id)
            }
        })
    }

    const dateFormater = isoDate => {
        const formatedDate = new Date(isoDate).toLocaleDateString('en-us', { month: 'long', day: 'numeric', year: 'numeric' })
        return formatedDate;
    }

    useEffect(() => {
        if (editingCoupon) {
            reset({
                code: editingCoupon.couponCode,
                discount: editingCoupon.discount,
                date: new Date(editingCoupon.expiredDate)
                    .toISOString()
                    .split("T")[0],
            })
        }
    }, [editingCoupon, reset])

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className="p-4 md:p-10 bg-gray-50 min-h-screen">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
                🎟️ Manage Coupons
            </h2>

            {/* Add Coupon Form */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Coupon</h3>
                <form onSubmit={handleSubmit(onsubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        {...register('code')}
                        placeholder="Coupon Code"
                        className="border border-gray-300  text-black  rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="number"
                        placeholder="Discount (%)"
                        {...register('discount')}
                        className="border border-gray-300  text-black rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="date"
                        {...register('date')}
                        className="border border-gray-300  text-black rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 font-medium transition-all md:col-span-3"
                    >
                        Add Coupon
                    </button>
                </form>
            </div>

            {/* Coupon List */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {coupons.map((coupon) => (
                    <div
                        key={coupon._id}
                        className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-5 flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                Code: <span className="text-blue-600">{coupon.couponCode}</span>
                            </h3>
                            <p className="text-sm text-gray-600 mb-1">
                                Discount: <span className="font-medium">{coupon.discount}%</span>
                            </p>
                            <p className="text-sm text-gray-600 mb-4">
                                Expiry Date: <span className="font-medium">{dateFormater(coupon.expiredDate)}</span>
                            </p>
                            <p className="text-sm text-gray-600 mb-4">
                                publish Date: <span className="font-medium">{dateFormater(coupon.createAt)}</span>
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-2">
                            <button onClick={() => setEditingCoupon(coupon)} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-all">
                                Update
                            </button>
                            <button onClick={() => handleDelete(coupon._id)} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition-all">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {/* modal part */}
            {
                editingCoupon && (
                    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center">
                        <div className="bg-white rounded-xl p-6 w-[90%] md:w-[400px] shadow-lg">
                            <h3 className="text-xl font-semibold mb-4 text-center text-black">Update Coupon</h3>
                            <form onSubmit={handleSubmit((data) => {
                                const updatedCoupon = {
                                    couponCode: data.code,
                                    discount: Number(data.discount),
                                    expiredDate: new Date(data.date),
                                    updatedAt: new Date(),
                                }
                                updateMutation.mutate({ id: editingCoupon._id, updatedCoupon })
                            })}
                                className="space-y-4"
                            >
                                <input
                                    type="text"
                                    {...register('code')}
                                    
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black"
                                />
                                <input
                                    type="number"
                                    {...register('discount')}
                                    defaultValue={editingCoupon.discount}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black"
                                />
                                <input
                                    type="date"
                                    {...register('date')}
                                    defaultValue={new Date(editingCoupon.expiredDate).toISOString().split('T')[0]}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black"
                                />

                                <div className="flex justify-between gap-3">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                                    >
                                        Update
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setEditingCoupon(null)}
                                        className="flex-1 bg-gray-300 hover:bg-gray-400 text-black py-2 rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default ManageCoupons;
