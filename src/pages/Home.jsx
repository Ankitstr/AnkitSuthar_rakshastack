import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [search, setSearch] = useState("");
  const [pgs, setPgs] = useState([]);
  const featuredPGs = pgs.slice(0, 6);

  useEffect(() => {
    axios.get("/pgs.json").then((res) => setPgs(res.data));
  }, []);

  return (
    <section className="max-w-8xl mx-auto py-16 px-1 bg-white dark:bg-gray-900 transition-colors">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-blue-700 dark:text-yellow-400 mb-4">
          Find Your Perfect PG
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-300">
          Search and discover the best PG rooms near you.
        </p>
      </div>
      <form className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
        <input
          type="text"
          placeholder="Search by location or name"
          className="border border-blue-300 dark:border-yellow-400 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-yellow-400 w-full md:w-1/4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="button"
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 dark:from-yellow-500 dark:to-yellow-700 text-white dark:text-gray-900 px-6 py-3 rounded-xl shadow hover:scale-105 transition"
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
          Search
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuredPGs
          .filter(
            (pg) =>
              pg.name.toLowerCase().includes(search.toLowerCase()) ||
              pg.location.toLowerCase().includes(search.toLowerCase())
          )
          .map((pg) => (
            <div
              key={pg.id}
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition overflow-hidden"
            >
              <img
                src={pg.img}
                alt={pg.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="font-bold text-xl text-blue-700 dark:text-yellow-400">
                  {pg.name}
                </div>
                <div className="text-gray-500 dark:text-gray-300">
                  {pg.location}
                </div>
                <div className="flex gap-2 mt-2">
                  {pg.amenities.map((a) => (
                    <span
                      key={a}
                      className="bg-blue-50 dark:bg-gray-700 text-blue-700 dark:text-yellow-300 px-2 py-1 rounded text-xs"
                    >
                      {a}
                    </span>
                  ))}
                </div>
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

export default Home;
