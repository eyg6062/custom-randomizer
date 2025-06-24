export const BASE_URL = 'https://localhost:8081/api/';

export async function apiFetch (url:string, options = {}) {
    const response = await fetch(url, {...options});

    if (!response.ok) throw new Error('fetch failed');

    return response.json();
}