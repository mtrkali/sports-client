import React, { useState, useEffect } from "react";
import { FaBullhorn, FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";
import Swal from "sweetalert2";

const ManageAnnouncements = () => {
    const axiosSecure = useAxiosSecure();
    const { data: announcements = [], isLoading, refetch } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosSecure.get('/announcements')
            return res.data
        }
    })

    const queryClient = useQueryClient();
    const addMutation = useMutation({
        mutationFn: async (newData) => {
            const res = await axiosSecure.post('/announcements', newData)
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['announcements']),
                refetch(),
                Swal.fire('Sunccess!!', 'announcement successfully added', 'success')
        }
    })
    const updateMutation = useMutation({
        mutationFn: async ({id,newData}) => {
            const res = await axiosSecure.patch(`/announcements/${id}`, newData)
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['announcements']),
                refetch(),
                Swal.fire('Sunccess!!', 'announcement successfully updated', 'success')
        }
    })

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/announcements/${id}`)
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['announcements'])
            refetch();
            Swal.fire('Success!!', 'successfully deleted announcement', 'success');
        }
    })


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const { register, handleSubmit, reset } = useForm();

    // Prefill data for edit mode
    useEffect(() => {
        if (isEditMode && selectedAnnouncement) {
            reset({
                title: selectedAnnouncement.title,
                announceDate: selectedAnnouncement.announceDate.slice(0, 10),
                Valid_Till: selectedAnnouncement.Valid_Till.slice(0, 10),
                category: selectedAnnouncement.category,
                description: selectedAnnouncement.description,
                image: selectedAnnouncement.image,
            });
        }
    }, [isEditMode, selectedAnnouncement, reset]);

    // Add / Update Announcement (temporary local)
    const onSubmit = (data) => {
        if (isEditMode) {
            const updateData = { ...data, updatedAt: new Date() }
            updateMutation.mutate({id:selectedAnnouncement._id,newData:updateData});
        } else {
            const newData = { ...data, createdAt: new Date() }
            addMutation.mutate(newData)
        }
        setIsModalOpen(false);
        setIsEditMode(false);
        reset();
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(result=>{
            if(result.isConfirmed){
                deleteMutation.mutate(id)
            }
        })
    }


    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
                    <FaBullhorn className="text-yellow-500" />
                    Manage Announcements
                </h2>
                <button
                    onClick={() => {
                        setIsModalOpen(true);
                        setIsEditMode(false);
                        reset();
                    }}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    <FaPlus /> Add Announcement
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white shadow-md rounded-xl">
                <table className="w-full border-collapse">
                    <thead className="bg-blue-600 text-white text-sm">
                        <tr>
                            <th className="p-3 text-left">Title</th>
                            <th className="p-3 text-left">Category</th>
                            <th className="p-3 text-left">Announce Date</th>
                            <th className="p-3 text-left">Valid Till</th>
                            <th className="p-3 text-left">Image</th>
                            <th className="p-3 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {announcements.map((a) => (
                            <tr
                                key={a._id}
                                className="border-b hover:bg-gray-50 transition text-gray-700"
                            >
                                <td className="p-3 text-sm font-medium">{a.title}</td>
                                <td className="p-3 text-sm">{a.category}</td>
                                <td className="p-3 text-sm">
                                    {new Date(a.announceDate).toLocaleDateString()}
                                </td>
                                <td className="p-3 text-sm">
                                    {new Date(a.Valid_Till).toLocaleDateString()}
                                </td>
                                <td className="p-3 text-sm">
                                    <img
                                        src={a.image}
                                        alt={a.title}
                                        className="w-12 h-12 rounded-md object-cover"
                                    />
                                </td>
                                <td className="p-3 text-sm flex gap-3">
                                    <button
                                        onClick={() => {
                                            setIsEditMode(true);
                                            setSelectedAnnouncement(a);
                                            setIsModalOpen(true);
                                        }}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(a._id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl w-11/12 md:w-2/3 lg:w-1/2 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-700">
                            {isEditMode ? "Edit Announcement" : "Add Announcement"}
                        </h3>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black"
                        >
                            <input
                                {...register("title", { required: true })}
                                placeholder="Title"
                                className="border p-2 rounded-md"
                            />
                            <input
                                {...register("category", { required: true })}
                                placeholder="Category"
                                className="border p-2 rounded-md"
                            />
                            <input
                                {...register("announceDate", { required: true })}
                                type="date"
                                className="border p-2 rounded-md"
                            />
                            <input
                                {...register("Valid_Till", { required: true })}
                                type="date"
                                className="border p-2 rounded-md"
                            />
                            <input
                                {...register("image", { required: true })}
                                placeholder="Image URL"
                                className="border p-2 rounded-md col-span-1 md:col-span-2"
                            />
                            <textarea
                                {...register("description", { required: true })}
                                placeholder="Description"
                                className="border p-2 rounded-md col-span-1 md:col-span-2"
                            />
                            <div className="flex justify-end gap-3 col-span-2 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-300 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    {isEditMode ? "Update" : "Add"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageAnnouncements;
