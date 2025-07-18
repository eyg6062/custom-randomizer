import { BASE_URL, apiFetch } from "./client";
//import { Trait } from "../types/trait";

const REQUEST_URL : string = `${BASE_URL}Trait`

export async function getTraitsByRandomizer(randomizerId: string) { 
    return apiFetch(`${REQUEST_URL}/ByRandomizer/${randomizerId}`);
}
