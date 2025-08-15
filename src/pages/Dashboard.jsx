import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/pgs.json")
      .then((res) => {
        setPgs(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col p-6">
        <div className="text-2xl font-bold mb-8">PG Management</div>
        <nav className="flex flex-col gap-4">
          <Link to="/" className="hover:bg-blue-600 px-3 py-2 rounded">
            Dashboard
          </Link>
          <Link to="/listings" className="hover:bg-blue-600 px-3 py-2 rounded">
            PGs
          </Link>
          <Link to="/add" className="hover:bg-blue-600 px-3 py-2 rounded">
            Add PG
          </Link>
        </nav>
        <div className="mt-auto pt-8 border-t border-blue-600">
          <span className="text-sm">Logged in as Admin</span>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700">PG List</h1>
          <Link
            to="/add"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Add PG
          </Link>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Location</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Gender</th>
                <th className="py-2 px-4">Amenities</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pgs.map((pg) => (
                <tr key={pg.id} className="border-t">
                  <td className="py-2 px-4">{pg.name}</td>
                  <td className="py-2 px-4">{pg.location}</td>
                  <td className="py-2 px-4">{pg.price}</td>
                  <td className="py-2 px-4">{pg.gender}</td>
                  <td className="py-2 px-4">{pg.amenities.join(", ")}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <Link
                      to={`/details/${pg.id}`}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-xs"
                    >
                      View
                    </Link>
                    <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-xs">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
