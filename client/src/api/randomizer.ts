import { BASE_URL, apiFetch } from "./client";
import { Randomizer } from "../types/randomizer";

const REQUEST_URL : string = `${BASE_URL}Randomizer`

export async function getRandomizers() {
    return apiFetch(REQUEST_URL);
}

export async function postRandomizer(data: Omit<Randomizer, 'id'>) {
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
    };

    return apiFetch(REQUEST_URL, options)
}

