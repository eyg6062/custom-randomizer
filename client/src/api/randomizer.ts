import { BASE_URL, apiFetch } from "./client";
import { Randomizer, EditRandomizerDto } from "../types/randomizer";

const REQUEST_URL : string = `${BASE_URL}Randomizer`

export async function getRandomizers() {
    return apiFetch(REQUEST_URL);
}

export async function getRandomizersWithImageUrl() {
    return apiFetch(`${REQUEST_URL}/WithImageUrl`)
}

export async function getRandomizer(id: string) {
    return apiFetch(`${REQUEST_URL}/${id}`);
}

export async function putRandomizer(id: string, data: EditRandomizerDto) {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    console.log(JSON.stringify(data))

    return apiFetch(`${REQUEST_URL}/${id}`, options);
}

export async function postRandomizer(data: Omit<Randomizer, 'id'>) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    return apiFetch(REQUEST_URL, options);
}

export async function apiDeleteRandomizer(id: string) {
    const options = {
        method: 'DELETE'
    };

    return apiFetch(`${REQUEST_URL}/${id}`, options);
}
