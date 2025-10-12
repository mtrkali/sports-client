import axios from "axios";
import React from "react";
import GoogleSignIn from "../../Shared/GoogleSignIn/GoogleSignIn";

const Register = () => {

  // const handleImgUpload = async(e) =>{
  //   const image = e.target.file[0]
  //   const formData = new FormData();
  //   formData.append('image', image);

  //   const imageUploadURL  = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`
  //   const res = await axios.post(imageUploadURL,formData);

  //   setProfilePic(res.data.data.url);
  // }

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-50 px-6 md:px-20 py-12 rounded-lg">
    
      {/* Right: Form */}
      <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-lg p-8 md:p-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
          Member Registration
        </h2>

        <form className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Membership Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              you profile picture
            </label>
            <input type="file"
            // onchange={handleImgUpload}
            className="input w-full bg-gray-50 border-gray-300 text-black focus:outline-none focus:ring-2 focus:to-blue-500 px-4 py-2 border rounded-lg"
            name="profiePic" 
            placeholder="chose a photo for profile pic"/>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </form>
        <GoogleSignIn></GoogleSignIn>
      </div>
    </section>
  );
};

export default Register;
