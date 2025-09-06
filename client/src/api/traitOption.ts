import { TraitOption } from "../types/traitOption";
import { apiFetch, BASE_URL } from "./client";

const REQUEST_URL : string = `${BASE_URL}TraitOption`

export async function putTraitOptions(data: TraitOption[]) {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    
    return apiFetch(`${REQUEST_URL}/Batch`, options);
}

export async function postTraitOptions(traitId: string, traitOptions: TraitOption[]) {
    const data = traitOptions.map(opt => ({
        text: opt.text,
        imageKey: opt.imageKey
    }));

    const params = new URLSearchParams({
        traitId: traitId
    });

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    return apiFetch(`${REQUEST_URL}/Batch?${params.toString()}`, options);
}

export async function deleteTraitOptions(traitOptions: TraitOption[]) {
    const data: string[] = traitOptions.map(opt => (opt.id)) 

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    return apiFetch(`${REQUEST_URL}/Batch`, options);
}