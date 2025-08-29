import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditPG() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        location: "",
        price: "",
        gender: "",
        amenities: "",
        img: ""
    });

    useEffect(() => {
        const pgData = JSON.parse(localStorage.getItem("pgs")) || [];
        const pgToEdit = pgData.find(pg => pg.id === Number(id));
        if (pgToEdit) {
            setForm({
                ...pgToEdit,
                amenities: pgToEdit.amenities.join(", ")
            });
        } else {
            alert("PG not found.");
            navigate("/");
        }
    }, [id, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedPG = {
            ...form,
            id: Number(id),
            amenities: form.amenities.split(",").map(a => a.trim())
        };

        const pgData = JSON.parse(localStorage.getItem("pgs")) || [];
        const updatedList = pgData.map(pg => (pg.id === updatedPG.id ? updatedPG : pg));
        localStorage.setItem("pgs", JSON.stringify(updatedList));
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-8">
            <h2 className="text-3xl font-bold text-blue-700 dark:text-yellow-400 mb-6">Edit PG</h2>
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
                    Update PG
                </button>
            </form>
        </div>
    );
}

export default EditPG;
