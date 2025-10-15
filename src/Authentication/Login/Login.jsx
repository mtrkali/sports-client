import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleSignIn from "../../Shared/GoogleSignIn/GoogleSignIn";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";

const Login = () => {
  const {logInUser} = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || '/';
  const {register, handleSubmit, formState:{errors}} = useForm()

  const onSubmit = data  =>{
    logInUser(data.email, data.password)
    .then((result)=>{
      const user = result.user
      console.log('user in log in user function', user)
      navigate(from);
    })
    .catch(err =>{
      console.error('error in logInUser function ', err)
    })
  }
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50 shadow-2xl px-6 py-12 rounded-lg">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 md:p-10">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
          Login to Your Account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              {...register('email',{required: true})}
              name="email"
              placeholder="Enter your email"
              className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email?.type === 'required' && <p className="text-red-500">email must required</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              {...register('password',{required: true, minLength: 6})}
              name="password"
              placeholder="Enter your password"
              className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.password?.type === 'required' && <p className="text-red-500">password must required</p>}
            {errors.password?.type === 'minLength' && <p className="text-red-500">password must 6 charecter</p>}
          </div>

          {/* Register Link */}
          <p className="text-center text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link to='/register' className="text-indigo-600 hover:underline">
              Register
            </Link>
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>
        <GoogleSignIn from = {from}></GoogleSignIn>
      </div>
    </section>
  );
};

export default Login;
