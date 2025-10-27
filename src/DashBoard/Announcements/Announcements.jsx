import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Shared/Loading/Loading";
import { FaBullhorn } from "react-icons/fa";



const Announcements = () => {
    const axiosSecure = useAxiosSecure();
    const {data: announcements = [], isLoading} = useQuery({
        queryKey: ['announcements'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/announcements')
            return res.data;
        }
    })
    if(isLoading){
        return <Loading></Loading>
    }
  return (
    <section className="bg-gray-50 min-h-screen px-4 md:px-10 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10 flex gap-2 justify-center items-center">
       <FaBullhorn className="text-blue-500" /> Club Announcements
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {announcements.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition duration-300"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  Category: <span className="font-medium text-indigo-600">{item.category}</span>
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  {item.description.length > 100
                    ? item.description.slice(0, 100) + "..."
                    : item.description}
                </p>
              </div>

              <div className="text-xs text-gray-500 border-t pt-3 mt-auto bg-base-bg-bse">
                <p>Announced: {new Date(item.Valid_Till).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric"
                })}</p>
                <p> Valid Till: {new Date(item.announceDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric"
                })}</p>
                <p>By Admin</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Announcements;
