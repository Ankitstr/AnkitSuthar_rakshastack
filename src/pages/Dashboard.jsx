import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/pgs.json")
      .then((res) => {
        if (res.data && Array.isArray(res.data)) {
          setPgs(res.data);
        } else {
          setError("Invalid PG data format.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load PG data");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-10 dark:text-white">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600 dark:text-red-400">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col md:flex-row transition-colors">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 bg-blue-700 text-white dark:bg-gray-800 dark:text-yellow-400 flex-col p-6">
        <div className="text-2xl font-bold mb-8">PG Management</div>
        <nav className="flex flex-col gap-4">
          <Link to="/" className="hover:bg-blue-600 dark:hover:bg-gray-700 px-3 py-2 rounded">
            Dashboard
          </Link>
          <Link to="/listings" className="hover:bg-blue-600 dark:hover:bg-gray-700 px-3 py-2 rounded">
            PGs
          </Link>
          <Link to="/add" className="hover:bg-blue-600 dark:hover:bg-gray-700 px-3 py-2 rounded">
            Add PG
          </Link>
        </nav>
        <div className="mt-auto pt-8 border-t border-blue-600 dark:border-gray-600">
          <span className="text-sm">Logged in as Admin</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 text-gray-800 dark:text-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 dark:text-yellow-400">
            PG List
          </h1>
          <Link
            to="/add"
            className="bg-blue-600 dark:bg-yellow-500 dark:text-black text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-yellow-600 transition"
          >
            Add PG
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="text-gray-700 dark:text-yellow-300 border-b dark:border-gray-700">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Location</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Gender</th>
                <th className="py-2 px-4">Amenities</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pgs.length > 0 ? (
                pgs.map((pg) => (
                  <tr
                    key={pg.id}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    <td className="py-2 px-4">{pg.name}</td>
                    <td className="py-2 px-4">{pg.location}</td>
                    <td className="py-2 px-4">{pg.price}</td>
                    <td className="py-2 px-4">{pg.gender}</td>
                    <td className="py-2 px-4">
                      {Array.isArray(pg.amenities)
                        ? pg.amenities.join(", ")
                        : "N/A"}
                    </td>
                    <td className="py-2 px-4 flex gap-2 flex-wrap">
                      <Link
                        to={`/details/${pg.id}`}
                        className="bg-blue-500 text-white dark:bg-yellow-500 dark:text-black px-2 py-1 rounded hover:bg-blue-600 dark:hover:bg-yellow-600 text-xs"
                      >
                        View
                      </Link>
                      <button className="bg-yellow-500 text-white dark:text-black dark:bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-600 dark:hover:bg-yellow-500 text-xs">
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-xs">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500 dark:text-gray-400">
                    No PGs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
