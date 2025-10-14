import React, { useState } from "react";
import { X } from "lucide-react"; // সুন্দর close icon (optional)
import { motion, AnimatePresence } from "framer-motion"; // সুন্দর animation

const BookingDetails = ({ court, setSelectedCourt }) => {
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState("")

  if (!court) return null;

  const slotOption = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "16:00 - 17:00",
  "18:00 - 19:00",
  ];

  //handle multi slot section
  const handle

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0  backdrop-blur-sm flex items-center justify-center z-50"
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
            onClick={() => setSelectedCourt(null)}
            className="absolute top-3 p-2 right-3 text-gray-500 hover:text-gray-800 transition bg-red-500"
          >
            <X size={22} />
          </button>

          {/* Court Image */}
          <img
            src={court.image}
            alt={court.name}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />

          {/* Booking Info */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">{court.name}</h2>
            <p className="text-gray-500">{court.type}</p>
            <p className="text-indigo-600 font-semibold">
              ৳{court.price} / session
            </p>

            <div className="bg-gray-50 p-3 rounded-lg mt-3">
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-gray-800">Selected Slot:</span>{" "}
                {court.slotTime?.label}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Date:</span>{" "}
                {new Date(court.slotTime?.start).toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            onClick={() => {
              alert(`✅ Booking confirmed for ${court.name}`);
              setSelectedCourt(null);
            }}
            className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Confirm Booking
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingDetails;
