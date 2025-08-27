import { AnyTrait, EditTraitDto } from "../types/trait";
import { BASE_URL, apiFetch } from "./client";

const REQUEST_URL : string = `${BASE_URL}Trait`

export async function getTraitsByRandomizer(randomizerId: string) { 
    return apiFetch(`${REQUEST_URL}/ByRandomizer/${randomizerId}`);
}

export async function getTrait(id: string) {
    return apiFetch(`${REQUEST_URL}/${id}`);
}

export async function putTrait(id: string, data: EditTraitDto) {
    // traitType must be first value in json

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

export async function postTrait(data: Omit<AnyTrait, 'id'>) {
    // traitType must be first value in json

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    return apiFetch(REQUEST_URL, options);
}

export async function deleteTrait(id: string) {
    const options = {
        method: 'DELETE'
    };

    return apiFetch(`${REQUEST_URL}/${id}`, options);
}