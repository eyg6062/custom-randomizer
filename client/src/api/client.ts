export const BASE_URL = 'https://localhost:8081/api/';

export async function apiFetch (url:string, options = {}) {
    const response = await fetch(url, {...options});

    if (!response.ok) throw new Error('fetch failed');

    const contentType = response.headers.get('Content-Type') || response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {

        return response.json()

    } else {
        const text = await response.text();
        return text.length ? text : null;
    }

}