import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { Outlet, useNavigate } from "react-router-dom";
import BookingDetails from "../BookingDetailsPage/BookingDetails";
import Swal from "sweetalert2";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const CourtsPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedCourt, setSelectedCourt] = useState(null);
  const navigate = useNavigate();

 const {data: courts = []} = useQuery({
  queryKey: ['courts'],
  queryFn: async()=>{
    const res = await axiosSecure.get('/courts')
    return res.data
  }
 })


  const handleBooking = (id) => {
    //set for modal
    navigate(`bookingDetails/${id}`)
  }

  

  return (
    <section className="py-16 px-6 md:px-20 bg-gray-50 my-5 rounded-lg">
      {/* Page Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
        Available Courts & Sessions
      </h2>

      {/* Courts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {courts.map((court) => (
          <div
            key={court._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 transition-transform"
          >
            {/* Court Image */}
            <img
              src={court.image}
              alt={court.name}
              className="w-full h-56 object-cover"
            />

            {/* Court Details */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {court.name}
              </h3>
              <p className="text-gray-500 mb-4">{court.type}</p>

              {/* Slot Time Dropdown (Static) */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Choose Slot
                </label>
                <select
                  className="w-full border border-gray-300 text-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value=''>Select a slot</option>
                  <option>8:00 AM - 9:00 AM</option>
                  <option>9:00 AM - 10:00 AM</option>
                  <option>4:00 PM - 5:00 PM</option>
                  <option>6:00 PM - 7:00 PM</option>
                </select>
              </div>

              {/* Price */}
              <p className="text-lg font-semibold text-gray-500 mb-4">
                Price per slot: {court.price} TK
              </p>

              {/* Book Now Button (Static for now) */}
              <button onClick={() => handleBooking(court._id)} className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
      {
        <Outlet></Outlet>
      }
    </section>
  );
};

export default CourtsPage;
