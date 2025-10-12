import React from "react";
import { Link } from "react-router-dom";
import GoogleSignIn from "../../Shared/GoogleSignIn/GoogleSignIn";

const Login = () => {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50 shadow-2xl px-6 py-12 rounded-lg">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 md:p-10">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
          Login to Your Account
        </h2>

        {/* Form */}
        <form className="space-y-5">
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
        <GoogleSignIn></GoogleSignIn>
      </div>
    </section>
  );
};

export default Login;
