import {logout} from "./auth.js";


export async function authFetch(url, options = {}) {
    const token = localStorage.getItem("token");
    const response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            "Authorization": `Bearer ${token}`
        }
    });
    if (response.status === 401) {
        logout();
        window.location.href = "/login";
        throw new Error("Session expired. Please login again.");
    }
    return response;
}