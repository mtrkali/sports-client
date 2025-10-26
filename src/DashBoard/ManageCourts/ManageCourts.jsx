import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaEdit, FaTrash, FaPlus, FaTableTennis } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageCourts = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedCourt, setSelectedCourt] = useState(null);
    const axiosSecure = useAxiosSecure();

    const { data: courts = [], refetch } = useQuery({
        queryKey: ['courts'],
        queryFn: async () => {
            const res = await axiosSecure.get('/courts')
            return res.data
        }
    })

    const queryClient = useQueryClient();
    const postMutation = useMutation({
        mutationFn: async (newCourt) => {
            const res = await axiosSecure.post('/courts', newCourt)
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['courts'])
            refetch();
            Swal.fire('Success!', 'court successfully added', 'success')
        }
    })

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/courts/${id}`)
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['courts'])
            refetch()
            Swal.fire('Success!', 'court successfully removed', 'success')
        }
    })

    const updateMutation = useMutation({
        mutationFn: async({id,updateCourt})=>{
            const res = await axiosSecure.patch(`courts/${id}`,updateCourt)
            return res.data
        },
        onSuccess: () =>{
            queryClient.invalidateQueries(['courts']),
            refetch(),
            Swal.fire('Success!!', 'courts successfully updated', 'success')
        }
    })

    const { register, handleSubmit, reset } = useForm();

    // 🧾 Submit handler (only console now)
    const onSubmit = (data) => {

        const courtData = {
            ...data,
            slotOptions: data.slotOptions.split(',').map(s => s.trim()),
            price: parseFloat(data.price),
        }
        if(isEditMode && selectedCourt){
            const updateData = {...courtData, updatedAt: new Date()}
            updateMutation.mutate({id: selectedCourt._id,updateCourt: updateData})
        }else{
            const newCourt = {...courtData, createdAt: new Date()}
            postMutation.mutate(newCourt)
        }
        reset();
        setIsModalOpen(false);
    };

    // ✏️ Edit Handler
    const handleEdit = (court) => {
        setSelectedCourt(court);
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    // ➕ Add Handler
    const handleAdd = () => {
        setSelectedCourt(null);
        setIsEditMode(false);
        reset(); // clear form
        setIsModalOpen(true);
    };

    // 🔁 When modal opens for edit → prefill data
    useEffect(() => {
        if (isEditMode && selectedCourt) {
            reset({
                name: selectedCourt.name,
                type: selectedCourt.type,
                price: selectedCourt.price,
                image: selectedCourt.image,
                slotOptions: selectedCourt.slotOptions.join(", "),
            });
        }
    }, [isEditMode, selectedCourt, reset]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(result =>{
            if(result.isConfirmed){
                deleteMutation.mutate(id)
            }
        })
    }

    return (
        <div className="p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2 text-blue-600">
                    <FaTableTennis /> Manage Courts
                </h2>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                    <FaPlus /> Add New Court
                </button>
            </div>

            {/* Courts Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {courts.map((court) => (
                    <div
                        key={court._id}
                        className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
                    >
                        <img
                            src={court.image}
                            alt={court.name}
                            className="h-40 w-full object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-black">{court.name}</h3>
                            <p className="text-gray-500 text-sm mb-2">
                                Type: <span className="font-medium">{court.type}</span>
                            </p>
                            <p className="text-gray-700 font-medium mb-3">
                                Price: ৳{court.price}
                            </p>

                            {/* Slots */}
                            <div className="mb-3">
                                <p className="text-sm text-gray-600 font-semibold mb-1">
                                    Available Slots:
                                </p>
                                <ul className="text-sm text-gray-500 list-disc list-inside">
                                    {court.slotOptions.map((slot, index) => (
                                        <li key={index}>{slot}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Buttons */}
                            <div className="flex items-center justify-between mt-4">
                                <button
                                    onClick={() => handleEdit(court)}
                                    className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1.5 rounded hover:bg-blue-600 transition"
                                >
                                    <FaEdit /> Edit
                                </button>
                                <button onClick={()=>handleDelete(court._id)} className="flex items-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 transition">
                                    <FaTrash /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                        <h3 className="text-xl font-semibold mb-4 text-center text-blue-600">
                            {isEditMode ? "Edit Court" : "Add New Court"}
                        </h3>

                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-3 right-4 text-gray-600 hover:text-red-600 text-xl font-bold"
                        >
                            ✕
                        </button>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-black">
                            <div>
                                <label className="block text-sm font-medium">Court Name</label>
                                <input
                                    {...register("name")}
                                    placeholder="Enter court name"
                                    className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Court Type</label>
                                <input
                                    {...register("type")}
                                    placeholder="Enter court type"
                                    className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Price</label>
                                <input
                                    {...register("price")}
                                    type="number"
                                    placeholder="Enter price"
                                    className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Image URL</label>
                                <input
                                    {...register("image")}
                                    placeholder="Enter image URL"
                                    className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">
                                    Slot Options (comma separated)
                                </label>
                                <input
                                    {...register("slotOptions")}
                                    placeholder="e.g. 08:00 AM - 09:00 AM, 10:00 AM - 11:00 AM"
                                    className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>

                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                                >
                                    {isEditMode ? "Update Court" : "Add Court"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCourts;
