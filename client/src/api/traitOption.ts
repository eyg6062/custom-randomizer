import { TraitOption, TraitOptionEditProps, TraitOptionProps } from "../types/traitOption";
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

    console.log(JSON.stringify(data))
    
    return apiFetch(`${REQUEST_URL}/Batch`, options);
}