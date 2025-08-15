import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Add useNavigate
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); // ✅ For redirection

  const handleLogin = (e) => {
    e.preventDefault();

    // TODO: Replace with real auth logic
    if (email && password) {
      console.log("Logging in with", email, password);
      navigate("/"); // ✅ Redirect to home
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto shadow-2xl rounded-2xl overflow-hidden mt-10 bg-white dark:bg-gray-800 transition">
        {/* Illustration */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 dark:from-yellow-500 dark:to-yellow-600 p-8">
          <div className="text-center text-white dark:text-gray-900">
            <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-lg">Please login to your account</p>
          </div>
        </div>

        {/* Login Form */}
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center text-blue-700 dark:text-yellow-400 mb-8">
            Login
          </h2>
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Email */}
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-gray-700 dark:text-gray-200 mb-1">
                Password
              </label>
              <div className="flex items-center relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-gray-500 dark:text-gray-300"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-yellow-500 dark:to-yellow-700 text-white dark:text-gray-900 font-semibold rounded-lg shadow-md hover:scale-105 transition"
            >
              Login
            </button>

            <p className="text-center text-gray-600 dark:text-gray-300">
              Not registered?{" "}
              <Link
                to="/register"
                className="text-blue-700 dark:text-yellow-400 underline"
              >
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
