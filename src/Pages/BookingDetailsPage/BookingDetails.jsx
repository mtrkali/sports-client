import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const BookingDetails = () => {
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState("")
  const [totalPrice, setTotalPrice] = useState(0);
  const [court, setCourt] = useState(null);

  useEffect(() => {
    axios.get('/data/courts.json')
      .then((res) => {
        const found = res.data.find((c) => c.id === parseInt(id));
        setCourt(found)
      })
  }, [id])

  useEffect(() => {
    if (court) {
      const total = (selectedSlots.length * court.price).toFixed(2);
      setTotalPrice(total)
    }
  }, [selectedSlots, court])

  if (!court) return null;

  //handle multi slot section
  const handleSlotChange = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value)
    setSelectedSlots(value); //here value is an array
  }



  const handleConfirm = () => {
    if (selectedSlots.length === 0 || !selectedDate) {
      Swal.fire("Missing Info", 'please select date and at least one slot', 'warning');
      return;
    }

    const bookingData = {
      bookingId: `BK-${new Date()}- ${Math.floor(Math.random() * 1000)}`,
      courtId: court.id,
      courtName: court.name,
      courtType: court.type,
      status:'pending',
      selectedDate,
      selectedSlots,
      requestBy:user?.email,
      totalPrice: totalPrice,
      createdAt: new Date(),
    }
    axiosSecure.post('/booking', bookingData)
    .then((res) =>{
      if(res.data.insertedId){
        console.log(res.data);
        Swal.fire('Success', 'your booking has been confirmed', 'success')
      }
      navigate(-1);
    })
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl w-96 p-6 relative overflow-hidden"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Close Button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 bg-red-500 p-1 hover:scale-110 transition rounded-sm "
          >
            <X size={22} />
          </button>



          <h2 className="text-2xl font-bold text-gray-800 mb-3">Booking Details</h2>

          {/* Read-only Court Info */}
          <div className="space-y-2 text-sm">
            <div>
              <label className="font-semibold text-gray-500">Court Name:</label>
              <input
                type="text"
                value={court.name}
                readOnly
                className="w-full border rounded-lg px-3 py-1 mt-1 bg-gray-100 text-gray-700"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-500">Court Type:</label>
              <input
                type="text"
                value={court.type}
                readOnly
                className="w-full border rounded-lg px-3 py-1 mt-1 bg-gray-100 text-gray-700"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-500">Price per slot:</label>
              <input
                type="text"
                value={`৳${court.price}`}
                readOnly
                className="w-full border rounded-lg px-3 py-1 mt-1 bg-gray-100 text-gray-700"
              />
            </div>

            {/* Editable Date */}
            <div>
              <label className="font-semibold text-gray-500">Select Date:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full border rounded-lg px-3 py-1 mt-1 focus:ring-2 focus:ring-indigo-500 text-gray-500"
              />
            </div>

            {/* Multi Select Slots */}
            <div>
              <label className="font-semibold text-gray-500">Select Slots:</label>
              <select
                multiple
                value={selectedSlots}
                onChange={handleSlotChange}
                className="w-full border rounded-lg px-3 py-2 mt-1 h-24 focus:ring-2 focus:ring-indigo-500 text-gray-700"
              >
                {court.slotOptions.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                (Hold Ctrl/Command to select multiple slots)
              </p>
            </div>

            {/* Total Price */}
            <div className="pt-2">
              <p className="font-semibold text-gray-700">
                Total Price: <span className="text-indigo-600">৳{totalPrice}</span>
              </p>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition hover:scale-x-105"
          >
            Confirm Booking
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingDetails;
