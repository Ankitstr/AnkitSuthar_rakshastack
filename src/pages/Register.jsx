import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Basic validation (can be extended)
    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    // Simulate user creation (you can connect to real backend later)
    console.log("Registered:", { name, email, password });

    // ✅ Redirect to login or home
    navigate("/login"); // or navigate("/") if preferred
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto shadow-2xl rounded-2xl overflow-hidden mt-10 bg-white dark:bg-gray-800 transition">
        {/* Left Banner */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 dark:from-yellow-500 dark:to-yellow-600 p-8">
          <div className="text-center text-white dark:text-gray-900">
            <h2 className="text-4xl font-bold mb-4">Join Us!</h2>
            <p className="text-lg">Create your free account today</p>
          </div>
        </div>

        {/* Registration Form */}
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center text-blue-700 dark:text-yellow-400 mb-8">
            Register
          </h2>
          <form className="space-y-6" onSubmit={handleRegister}>
            {/* Name */}
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 dark:text-gray-300"
                  aria-label="Toggle password visibility"
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
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-yellow-500 dark:to-yellow-700 text-white dark:text-gray-900 font-semibold rounded-lg shadow-md hover:scale-105 transition duration-300"
            >
              Sign Up
            </button>

            <p className="text-center text-sm text-gray-600 dark:text-gray-300">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-700 dark:text-yellow-400 underline cursor-pointer"
              >
                Login here
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
