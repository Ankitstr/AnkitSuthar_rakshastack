import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddPG() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        location: "",
        price: "",
        gender: "",
        amenities: "",
        img: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Get existing PGs from localStorage
        const oldData = JSON.parse(localStorage.getItem("pgs")) || [];

        // Create new PG
        const newPG = {
            ...form,
            id: Date.now(),
            amenities: form.amenities.split(",").map((a) => a.trim())
        };

        // Add new PG to existing ones
        const updatedData = [...oldData, newPG];

        // Save back to localStorage
        localStorage.setItem("pgs", JSON.stringify(updatedData));

        navigate("/dashboard");
    };


    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-8">
            <h2 className="text-3xl font-bold text-blue-700 dark:text-yellow-400 mb-6">Add New PG</h2>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
                {["name", "location", "price", "gender", "img"].map((field) => (
                    <div key={field}>
                        <label className="block mb-1 capitalize">{field}</label>
                        <input
                            type="text"
                            required
                            className="w-full border p-3 rounded dark:bg-gray-800 dark:border-yellow-400"
                            value={form[field]}
                            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                        />
                    </div>
                ))}
                <div>
                    <label className="block mb-1">Amenities (comma separated)</label>
                    <input
                        type="text"
                        required
                        className="w-full border p-3 rounded dark:bg-gray-800 dark:border-yellow-400"
                        value={form.amenities}
                        onChange={(e) => setForm({ ...form, amenities: e.target.value })}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white dark:bg-yellow-500 dark:text-black px-6 py-2 rounded hover:bg-blue-700 dark:hover:bg-yellow-600"
                >
                    Save PG
                </button>
            </form>
        </div>
    );
}

export default AddPG;
