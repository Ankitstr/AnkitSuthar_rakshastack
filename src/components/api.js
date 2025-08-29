const API = import.meta.env.VITE_API_URL;

export async function getUsers() {
    const res = await fetch(`${API}/api/users`);
    return res.json();
}

export async function getPGs() {
    const res = await fetch(`${API}/api/pgs`);
    return res.json();
}