import axios from "axios";
import React from "react";
import GoogleSignIn from "../../Shared/GoogleSignIn/GoogleSignIn";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";

const Register = () => {
  const {createUser} = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data);
    createUser(data.email, data.password)
    .then((result)=>{
      console.log('user in registration form', result.user);
    })
    .catch(error => {
      console.error('error on create user function', error);
    })
  }

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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              {...register('name', { required: true })}
              name="name"
              placeholder="Enter your full name"
              className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.name?.type === 'required' && <p className="text-red-500">name is reqired</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              {...register('email', { required: true })}
              name="email"
              placeholder="Enter your email"
              className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email?.type === 'required' && <p className="text-red-500">email is reqired</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              {...register('phone',{required:  true})}
              name="phone"
              placeholder="Enter your phone number"
              className="w-full text-black border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.phone?.type === 'required' && <p className="text-red-500">phone is reqired</p>}
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
              placeholder="chose a photo for profile pic" />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              {...register('password', {required: true, minLength: 6})}
              name="password"
              placeholder="Enter your password"
              className="w-full text-black border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.password?.type === 'required' && <p className="text-red-500">password is reqired</p>}
            {errors.password?.type === 'minLength' && <p className="text-red-500">Password must be 6 charecter</p>}
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
