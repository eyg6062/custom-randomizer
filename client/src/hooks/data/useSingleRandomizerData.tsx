import { useQuery } from "@tanstack/react-query"
import { Randomizer } from "../../types/randomizer"
import { getRandomizer } from "../../api/randomizer"

export function useSingleRandomizerData(id: string) {
    
    const { isFetching, error, data: randomizerData } = useQuery<Randomizer>({
        queryKey: ['singleRandomizerData'],
        queryFn: () => getRandomizer(id),
    })
    
    return { isFetching, error, randomizerData }
}