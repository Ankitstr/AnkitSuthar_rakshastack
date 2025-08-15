import React, { useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
function Listings({ pgs }) {
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [amenity, setAmenity] = useState("");
  const [price, setPrice] = useState(7000);

  // Helper: Convert "₹5000/month" -> 5000
  const getPriceValue = (priceStr) =>
    Number(priceStr.replace(/[^0-9]/g, "")) || 0;

  // Filtering logic
  const filteredPGs = pgs.filter(
    (pg) =>
      pg.name.toLowerCase().includes(search.toLowerCase()) &&
      (gender ? pg.gender === gender : true) &&
      (amenity ? pg.amenities.includes(amenity) : true) &&
      getPriceValue(pg.price) <= price
  );
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);
  return (
    <section className="min-h-full mx-auto py-12 px-4 bg-white dark:bg-gray-900 transition-colors">
      <h2 className="text-3xl font-bold text-blue-700 dark:text-yellow-400 mb-8">
        PG Listings
      </h2>

      {/* Search + Filter Section */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow-lg mb-10">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Search by name"
            className="border p-3 w-full md:w-1/2 rounded-xl dark:border-yellow-400 dark:bg-gray-800 dark:text-gray-100"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-6 items-end">
          {/* Price Range */}
          <div className="flex flex-col w-full sm:w-1/3">
            <label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Max Price: <span className="font-bold">₹{price}</span>
            </label>
            <input
              type="range"
              min="5000"
              max="7000"
              step="100"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="cursor-pointer accent-blue-600 dark:accent-yellow-400"
            />
          </div>

          {/* Gender */}
          <div className="w-full sm:w-1/4">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Gender
            </label>
            <select
              className="border w-full p-3 rounded-xl dark:border-yellow-400 dark:bg-gray-700 dark:text-gray-100"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Amenities */}
          <div className="w-full sm:w-1/4">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Amenities
            </label>
            <select
              className="border w-full p-3 rounded-xl dark:border-yellow-400 dark:bg-gray-700 dark:text-gray-100"
              value={amenity}
              onChange={(e) => setAmenity(e.target.value)}
            >
              <option value="">All</option>
              <option value="Wi-Fi">Wi-Fi</option>
              <option value="AC">AC</option>
            </select>
          </div>
        </div>
      </div>

      {/* PG Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredPGs.map((pg) => (
          <div
            key={pg.id}
            data-aos="zoom-in"
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transform transition duration-300 ease-in-out overflow-hidden"
          >

            <img
              src={pg.img}
              alt={pg.name}
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <div className="font-bold text-xl text-blue-700 dark:text-yellow-400">
                {pg.name}
              </div>
              <div className="text-gray-500 dark:text-gray-300">
                {pg.location}
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {pg.amenities.map((a) => (
                  <span
                    key={a}
                    className="bg-blue-50 text-blue-700 dark:bg-gray-700 dark:text-yellow-300 px-2 py-1 rounded text-xs"
                  >
                    {a}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-gray-700 dark:text-gray-200 font-semibold">
                {pg.price}
              </p>
              <Link to={`/details/${pg.id}`}>
                <button className="mt-4 w-full bg-gradient-to-r from-blue-500 to-blue-700 dark:from-yellow-500 dark:to-yellow-700 text-white dark:text-gray-900 px-4 py-2 rounded-xl shadow hover:scale-105 transition">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Listings;
